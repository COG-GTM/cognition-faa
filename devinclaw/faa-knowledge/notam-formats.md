# NOTAM Formats & Distribution

## Overview

Notices to Air Missions (NOTAMs) are the primary mechanism for distributing time-critical aeronautical information. The FAA processes approximately 80,000+ active NOTAMs at any given time through a combination of legacy text-based formats and modern digital (D-NOTAM) XML distribution via SWIM.

---

## ICAO NOTAM Format (Traditional)

### Series Designators

| Series | Scope | Examples |
|--------|-------|---------|
| **A-series** | Domestic NOTAMs for navigational facilities, airspace, and airports | A0001/26 |
| **FDC** | Flight Data Center NOTAMs — regulatory (TFRs, instrument procedures, chart changes) | FDC 6/0234 |
| **Military** | Military NOTAMs for DOD facilities | M0001/26 |
| **D-series** | Distant (international) NOTAMs | D0001/26 |

### NOTAM Structure

```
(NOTAM-ID) (Q-LINE)
A) LOCATION  B) START TIME  C) END TIME
D) SCHEDULE (if applicable)
E) FREE TEXT DESCRIPTION
F) LOWER LIMIT  G) UPPER LIMIT
```

**Example:**
```
A0234/26 NOTAMN
Q) ZLA/QMRLC/IV/NBO/A/000/999/3356N11824W005
A) KLAX  B) 2602150000  C) 2602152359
E) RWY 25L CLSD DUE TO CONSTRUCTION
```

### Q-Line Decoding

The Q-line encodes machine-readable metadata in a fixed structure:

```
Q) FIR/QCODE/TRAFFIC/PURPOSE/SCOPE/LOWER FL/UPPER FL/COORDINATES
```

| Field | Values | Description |
|-------|--------|-------------|
| **FIR** | ZLA, ZNY, ZDC, etc. | ARTCC/FIR responsible |
| **QCODE** | 5-character code | Subject + condition (e.g., QMRLC = Runway Closed) |
| **Traffic** | I=IFR, V=VFR, IV=Both | Affected traffic type |
| **Purpose** | N=Immediate, B=Briefing, O=Flight Ops, M=Misc | Distribution purpose |
| **Scope** | A=Airport, E=En Route, W=Nav Warning, K=Checklist | Geographic scope |
| **Lower FL** | 000-999 | Lower flight level (hundreds of feet) |
| **Upper FL** | 000-999 | Upper flight level |
| **Coordinates** | DDMMN/DDDMME + radius | Center point and radius in NM |

### QCODE Structure (2nd/3rd + 4th/5th characters)

**Subject (2nd/3rd):**
- `MR` = Runway
- `MA` = Movement area
- `LC` = Lighting
- `FA` = Facility/service
- `OB` = Obstacle
- `AP` = Approach procedure
- `NA` = NAVAID

**Condition (4th/5th):**
- `LC` = Closed
- `LI` = Limited
- `AS` = Active/operational
- `AH` = Changed
- `XX` = Other

---

## D-NOTAM (Digital NOTAM) XML Format

### Background

D-NOTAMs encode NOTAM information as structured XML using the AIXM 5.1.1 data model, enabling machine parsing, automated conflict detection, and geographic filtering. The FAA's D-NOTAM initiative replaces free-text interpretation with semantically rich digital events.

### XML Structure

D-NOTAMs use AIXM Event features wrapped in an OGC Web Feature Service (WFS) transaction:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<aixm:Event xmlns:aixm="http://www.aixm.aero/schema/5.1.1"
            xmlns:gml="http://www.opengis.net/gml/3.2"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            gml:id="EVT_NOTAM_A0234">
  
  <aixm:timeSlice>
    <aixm:EventTimeSlice gml:id="EVT_TS_001">
      <gml:validTime>
        <gml:TimePeriod>
          <gml:beginPosition>2026-02-15T00:00:00Z</gml:beginPosition>
          <gml:endPosition>2026-02-15T23:59:00Z</gml:endPosition>
        </gml:TimePeriod>
      </gml:validTime>
      <aixm:interpretation>TEMPDELTA</aixm:interpretation>
      <aixm:sequenceNumber>1</aixm:sequenceNumber>
      
      <aixm:textNOTAM>
        <aixm:NOTAM>
          <aixm:series>A</aixm:series>
          <aixm:number>0234</aixm:number>
          <aixm:year>2026</aixm:year>
          <aixm:type>N</aixm:type>
          <aixm:location>KLAX</aixm:location>
          <aixm:text>RWY 25L CLSD DUE TO CONSTRUCTION</aixm:text>
        </aixm:NOTAM>
      </aixm:textNOTAM>
      
      <aixm:featureLifetime>
        <gml:TimePeriod>
          <gml:beginPosition>2026-02-15T00:00:00Z</gml:beginPosition>
          <gml:endPosition>2026-02-15T23:59:00Z</gml:endPosition>
        </gml:TimePeriod>
      </aixm:featureLifetime>
    </aixm:EventTimeSlice>
  </aixm:timeSlice>
  
  <aixm:concernedAirportHeliport xlink:href="urn:uuid:airport-klax-001"/>
  <aixm:concernedRunwayDirection xlink:href="urn:uuid:rwy-25l-klax"/>
</aixm:Event>
```

### Key D-NOTAM Elements

| Element | Purpose |
|---------|---------|
| `aixm:Event` | Root container for the NOTAM event |
| `aixm:EventTimeSlice` | Temporal validity with AIXM interpretation model |
| `aixm:textNOTAM` | Preserves traditional NOTAM text for backward compatibility |
| `aixm:concernedAirportHeliport` | XLink reference to the affected airport feature |
| `aixm:concernedRunwayDirection` | XLink reference to specific runway |
| `aixm:interpretation` | TEMPDELTA (temporary change), PERMDELTA (permanent), SNAPSHOT |
| `aixm:scenario` | Encodes the operational scenario (closure, restriction, etc.) |

### AIXM Integration

D-NOTAMs reference existing AIXM baseline features via `xlink:href` URIs. The Event acts as a temporal overlay:

1. **Baseline Feature** — The permanent state of the airport/runway/airspace in AIXM
2. **Event (TEMPDELTA)** — The NOTAM modifies specific properties for a time period
3. **Resolution** — Consumers merge the Event onto the baseline to compute current state

---

## SWIM NOTAM Distribution Service

### Architecture

The FAA distributes NOTAMs through the System Wide Information Management (SWIM) infrastructure using two primary services:

| Service | Protocol | Format | Consumers |
|---------|----------|--------|-----------|
| **NOTAM Search** | HTTPS REST | JSON + ICAO text | Pilot briefing, EFB apps |
| **NOTAM Distribution Service (NDS)** | JMS (AMQP 1.0) | AIXM 5.1.1 XML | NAS automation, airlines, ANSP |
| **TFMS NOTAM Feed** | JMS | Proprietary XML | TFMS, CDM participants |

### SWIM NDS Message Flow

```
NOTAM Author (FSS/NOTAM Office)
    ↓ (enters via USNS)
US NOTAM System (USNS)
    ↓ (generates D-NOTAM XML)
SWIM TI Gateway
    ↓ (publishes to JMS topic)
SWIM Consumers (airlines, ANSP, automation)
```

### JMS Topic Structure

```
jms.topic.faa.swim.notam.all          # All NOTAMs
jms.topic.faa.swim.notam.artcc.ZLA    # Filtered by ARTCC
jms.topic.faa.swim.notam.apt.KLAX     # Filtered by airport
jms.topic.faa.swim.notam.tfr          # TFRs only
```

### Connection Requirements

- **Transport:** AMQP 1.0 over TLS 1.2+
- **Authentication:** FAA SWIM client certificate (PKI)
- **Registration:** Requires SWIM consumer agreement and SWIM Cloud Distribution Service (SCDS) onboarding
- **Bandwidth:** Expect 5,000-10,000 messages/hour during peak operations
- **Message Size:** Typical D-NOTAM XML is 2-15 KB; TFR NOTAMs with complex geometry can reach 50+ KB

### NOTAM REST API (NOTAM Search)

```
GET https://notams.aim.faa.gov/notamSearch/search
  ?searchType=0
  &designatorsForLocation=KLAX
  &notamType=N,R,C
  &operatorIntentType=PILOT_BRIEFING
```

Response includes both ICAO text and (where available) D-NOTAM structured data. Rate-limited to 100 requests/minute per API key.

---

## Modernization Notes

The FAA's NOTAM modernization effort focuses on three tracks:

1. **Complete D-NOTAM Coverage** — Converting remaining free-text-only NOTAMs to structured D-NOTAM XML (currently ~60% coverage)
2. **SWIM Migration** — Moving all consumers from legacy AFTN/AMHS distribution to SWIM JMS/REST
3. **Graphic NOTAMs** — Rendering D-NOTAM geometry on moving maps and EFB displays
4. **AI/ML Parsing** — Using NLP to extract structure from legacy free-text NOTAMs that haven't been converted to D-NOTAM format
