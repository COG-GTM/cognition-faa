# Playbook: Modernize FAA SWIM Service Endpoints

## Trigger
User requests modernization of a SWIM (System Wide Information Management) service — converting legacy SOAP/JMS to modern REST/Kafka patterns.

## Context
Load: `faa-knowledge/aixm-standards.md`, `faa-knowledge/notam-formats.md`, `faa-knowledge/faa-tech-stack.md`

## Background

SWIM is the FAA's enterprise data-sharing backbone, connecting NAS systems, airlines, and external consumers. Many SWIM services were built in 2008-2015 using SOAP/XML over JMS. Modernization targets REST APIs with JSON payloads and Kafka event streaming while maintaining backward compatibility for existing consumers.

## Steps

### 1. Assess Current SWIM Service
```
Identify the service type:
- SWIM Publish/Subscribe (JMS topics) — most common
- SWIM Request/Reply (SOAP over HTTP) — some services
- SWIM File-based (FTP/SFTP drops) — legacy

Catalog current state:
- WSDL location and version
- JMS topic names and message format (AIXM, FIXM, WXXM, proprietary XML)
- Message volume (messages/hour at peak)
- Consumer count and types (FAA internal, airline, third-party)
- Authentication method (SWIM PKI certificates, WS-Security)
- SLA (latency, availability, message ordering guarantees)
- Data model version (AIXM 5.1.1, FIXM 4.x, etc.)
```

### 2. Design Modern API
```
REST API Design (OpenAPI 3.0):
- Base URL: /api/v1/swim/<domain>/<resource>
- Examples:
  GET  /api/v1/swim/aero/airports/{icao}          → Single airport (AIXM JSON)
  GET  /api/v1/swim/aero/airports?state=CA         → Filtered list
  GET  /api/v1/swim/notam/active?location=KLAX     → Active NOTAMs
  POST /api/v1/swim/notam/search                   → Complex NOTAM search
  GET  /api/v1/swim/flight/positions?bounds=...     → Surveillance data (ADS-B)

Response format — support both:
  Accept: application/json          → JSON (default for new consumers)
  Accept: application/xml           → AIXM XML (backward compatibility)

Pagination:
  ?page=1&size=50                   → Offset-based
  ?cursor=<token>&size=50           → Cursor-based (for streaming datasets)

Versioning:
  URL path: /api/v1/, /api/v2/
  Content negotiation for minor versions: Accept: application/vnd.faa.swim.v1.2+json
```

### 3. Design Event Streaming (Kafka)
```
Topic naming convention:
  faa.swim.<domain>.<resource>.<event-type>
  
  faa.swim.aero.notam.created
  faa.swim.aero.notam.updated
  faa.swim.aero.notam.cancelled
  faa.swim.aero.airport.amended
  faa.swim.flight.position.update
  faa.swim.weather.sigmet.issued

Message envelope:
{
  "header": {
    "messageId": "uuid",
    "timestamp": "2026-02-15T00:00:00Z",
    "source": "USNS",
    "domain": "aero",
    "eventType": "notam.created",
    "schemaVersion": "1.0",
    "correlationId": "uuid"
  },
  "payload": {
    // Domain-specific content (AIXM-derived JSON or original XML)
  }
}

Partitioning strategy:
- NOTAMs: partition by location (ICAO identifier)
- Flight data: partition by ARTCC
- Weather: partition by product type
- Ensures ordering within a location/region

Schema Registry:
- Confluent Schema Registry with Avro or JSON Schema
- Schema evolution: BACKWARD compatible changes only
- All producers must register schema before publishing
```

### 4. Build Bridge Layer (Backward Compatibility)
```
JMS-to-Kafka bridge:
- Deploy Apache Camel or custom Spring Boot bridge service
- Subscribe to existing JMS topics
- Transform XML → JSON (or pass through XML)
- Publish to corresponding Kafka topic
- Maintain message ordering (use JMS message sequence as Kafka key)

SOAP-to-REST adapter:
- Spring Boot service exposing REST endpoints
- Calls existing SOAP service via CXF client
- Transforms XML response to JSON
- Caches responses where appropriate (airports, navaids change infrequently)
- Circuit breaker (Resilience4j) for SOAP backend failures

Timeline:
Phase 1: Bridge layer (both old and new work simultaneously)
Phase 2: Migrate consumers to new APIs (12-18 months)
Phase 3: Decommission legacy endpoints (after last consumer migrates)
```

### 5. Implement Authentication & Authorization
```
Migration from SWIM PKI to OAuth 2.0 + mTLS:

Current: Client certificate (X.509) → SWIM gateway → service
Target:  Client certificate + OAuth 2.0 bearer token → API gateway → service

OAuth 2.0 flow (client_credentials for system-to-system):
1. Consumer presents client certificate to token endpoint
2. Token endpoint validates cert against FAA PKI CA chain
3. Issues JWT with scopes: swim:aero:read, swim:notam:write, etc.
4. Consumer includes JWT in Authorization header for API calls
5. API gateway validates JWT signature, expiry, and scopes

Rate limiting:
- Per-consumer quotas (configurable per agreement)
- Default: 1000 req/min for REST, unlimited for Kafka (consumer-paced)
- Rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
```

### 6. Data Format Modernization
```
AIXM XML → JSON mapping:

XML (current):
<aixm:AirportHeliport gml:id="APT_KLAX">
  <aixm:timeSlice>
    <aixm:AirportHeliportTimeSlice>
      <aixm:designator>KLAX</aixm:designator>
      <aixm:name>LOS ANGELES INTL</aixm:name>
      <aixm:fieldElevation uom="FT">128</aixm:fieldElevation>
    </aixm:AirportHeliportTimeSlice>
  </aixm:timeSlice>
</aixm:AirportHeliport>

JSON (modern):
{
  "id": "APT_KLAX",
  "type": "AirportHeliport",
  "designator": "KLAX",
  "name": "LOS ANGELES INTL",
  "fieldElevation": { "value": 128, "uom": "FT" },
  "position": { "latitude": 33.9425, "longitude": -118.4081 },
  "timeSlice": {
    "interpretation": "BASELINE",
    "sequenceNumber": 1,
    "validTime": {
      "begin": "2020-01-01T00:00:00Z",
      "end": null
    }
  }
}

Rules:
- Preserve AIXM semantics (temporal model, feature relationships)
- Use GeoJSON for geometry (not GML)
- UoM always explicit (never assume)
- XLink references → URI references
- Maintain XML endpoint for consumers that require AIXM compliance
```

### 7. Testing & Validation
```
- Contract testing: Pact or Spring Cloud Contract for consumer-driven contracts
- Load testing: Simulate peak SWIM traffic
  - NOTAM service: 10,000 msgs/hour
  - Flight data: 50,000 position reports/minute
  - Aero data: 100 queries/second
- Backward compatibility: Existing JMS consumers must continue receiving messages unchanged
- Data fidelity: JSON round-trip through AIXM XML → JSON → AIXM XML must preserve all data
- Latency: REST p99 < 200ms, Kafka end-to-end < 500ms
- Failover: Test Kafka broker failure, REST service instance failure
```

## Output Format
1. Current service assessment
2. OpenAPI 3.0 specification (YAML)
3. Kafka topic design document
4. Bridge layer architecture diagram
5. Migration timeline (phased)
6. Consumer migration guide

## Guardrails
- Never modify existing JMS topics or SOAP endpoints — additive changes only
- Bridge must guarantee no message loss (at-least-once delivery)
- All changes require SWIM governance board review
- Performance testing required before any consumer migration
