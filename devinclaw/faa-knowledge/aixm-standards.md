# AIXM 5.1.1 Standards Reference

## Overview

The Aeronautical Information Exchange Model (AIXM) version 5.1.1 is the international standard for encoding aeronautical information as structured XML. The FAA uses AIXM as the canonical data model for SWIM aeronautical data services, D-NOTAMs, and the National Airspace System Resource (NASR) database modernization.

AIXM is maintained by the AIXM community (FAA + EUROCONTROL joint effort) and is based on ISO 19100 geographic information standards and OGC GML 3.2.

---

## Core Feature Types

AIXM defines ~150 feature types. The most critical for FAA systems:

### Airport & Heliport

| Feature | Description | Key Properties |
|---------|-------------|----------------|
| `AirportHeliport` | Airport/heliport facility | designator, name, type, certifiedICAO, fieldElevation, magneticVariation |
| `Runway` | Physical runway | designator, length, width, surfaceType, strengthClassification |
| `RunwayDirection` | Directional end of a runway | designator, trueBearing, magneticBearing, elevationTDZ |
| `TouchDownLiftOff` | Helicopter TLOF | designator, length, width, surfaceType |
| `Taxiway` | Taxiway segment | designator, type, width, surfaceType |
| `Apron` | Apron/ramp area | name, surfaceType |
| `GuidanceLine` | Surface painted guidance | designator, type |

### Airspace

| Feature | Description | Key Properties |
|---------|-------------|----------------|
| `Airspace` | Controlled/uncontrolled airspace volume | type (CTR, TMA, FIR, CTA, etc.), designator, localType |
| `AirspaceVolume` | 3D geometry of an airspace | upperLimit, lowerLimit, horizontalProjection (GML surface) |
| `RouteSegment` | Airway segment | upperLimit, lowerLimit, length, widthLeft, widthRight |
| `Route` | Named airway/route | designator, type (ATS, NAT, RNAV) |

### Navigation

| Feature | Description | Key Properties |
|---------|-------------|----------------|
| `Navaid` | Navigation aid (VOR, DME, NDB, TACAN) | type, designator, frequency, position |
| `DesignatedPoint` | Named waypoint/fix | designator, type (ICAO, terminal, enroute) |
| `NavaidEquipment` | Physical transmitter | type, frequency, range |
| `StandardInstrumentDeparture` | SID procedure | designator, codingStandard |
| `StandardInstrumentArrival` | STAR procedure | designator, codingStandard |
| `InstrumentApproachProcedure` | IAP | designator, approachType (ILS, RNAV, VOR) |

### Obstacles & Terrain

| Feature | Description | Key Properties |
|---------|-------------|----------------|
| `VerticalStructure` | Obstacle (tower, building, crane) | type, group, lighted, markingPattern |
| `ObstacleArea` | Collection of obstacles | type (OAS, OIS) |

### Services & Units

| Feature | Description | Key Properties |
|---------|-------------|----------------|
| `Unit` | ATC unit (ARTCC, TRACON, Tower) | type, name, designator |
| `Service` | ATC service provided | type (ACS, AIS, FIS), callsign |
| `RadioCommunicationChannel` | Frequency assignment | frequency, mode, emissionType |

---

## Temporal Model

AIXM's temporal model is its most distinctive and complex feature. Every AIXM feature is versioned through TimeSlices rather than simple record updates.

### TimeSlice Structure

```xml
<aixm:AirportHeliport gml:id="APT_KLAX">
  <aixm:timeSlice>
    <aixm:AirportHeliportTimeSlice gml:id="APT_KLAX_TS_1">
      <gml:validTime>
        <gml:TimePeriod>
          <gml:beginPosition>2020-01-01T00:00:00Z</gml:beginPosition>
          <gml:endPosition indeterminatePosition="unknown"/>
        </gml:TimePeriod>
      </gml:validTime>
      <aixm:interpretation>BASELINE</aixm:interpretation>
      <aixm:sequenceNumber>1</aixm:sequenceNumber>
      <aixm:correctionNumber>0</aixm:correctionNumber>
      
      <aixm:designator>KLAX</aixm:designator>
      <aixm:name>LOS ANGELES INTL</aixm:name>
      <aixm:type>AD</aixm:type>
      <aixm:fieldElevation uom="FT">128</aixm:fieldElevation>
    </aixm:AirportHeliportTimeSlice>
  </aixm:timeSlice>
</aixm:AirportHeliport>
```

### Interpretation Types

| Interpretation | Meaning | Use Case |
|----------------|---------|----------|
| `BASELINE` | Permanent state of the feature | Initial publication, permanent amendments |
| `TEMPDELTA` | Temporary modification to one or more properties | NOTAMs, temporary closures, seasonal changes |
| `PERMDELTA` | Permanent change to specific properties (diff) | AIRAC cycle amendments that modify specific fields |
| `SNAPSHOT` | Complete state at a point in time | Query responses, state reconstruction |

### Sequence & Correction Numbers

- **sequenceNumber** — Monotonically increasing integer per feature. Each new TimeSlice increments this.
- **correctionNumber** — Starts at 0. If a published TimeSlice has an error, a correction is issued with the same sequenceNumber but incremented correctionNumber.

### Temporal Resolution Algorithm

To determine the current state of a feature:

1. Find the most recent `BASELINE` TimeSlice with `validTime` covering "now"
2. Apply all `PERMDELTA` TimeSlices in sequenceNumber order
3. Apply all active `TEMPDELTA` TimeSlices (where validTime covers "now")
4. Result is the effective current state

```
BASELINE (seq=1) + PERMDELTA (seq=2) + TEMPDELTA (seq=5, active) = Current State
```

### AIRAC Cycle Alignment

Permanent changes (BASELINE, PERMDELTA) align to 28-day AIRAC cycles. The `featureLifetime` element tracks the overall feature existence, while `validTime` on each TimeSlice tracks when that specific slice is effective.

---

## GML Geometry Types

AIXM uses GML 3.2 (ISO 19136) for all spatial data:

### Common Geometry Types

| GML Type | AIXM Usage | Example |
|----------|------------|---------|
| `gml:Point` | Navaid position, waypoint location | `<gml:pos srsName="urn:ogc:def:crs:EPSG::4326">33.9425 -118.4081</gml:pos>` |
| `gml:Curve` | Airway centerline, runway centerline | Series of `gml:LineStringSegment` or `gml:Arc` |
| `gml:Surface` | Airspace horizontal projection, obstacle area | `gml:Polygon` with `gml:exterior` ring |
| `gml:CircleByCenterPoint` | Circular airspace (Class D, Class C) | Center point + radius |
| `gml:ArcByCenterPoint` | Arc segments in airspace boundaries | Center, radius, start/end angle |

### Coordinate Reference System

All AIXM geometry uses **EPSG:4326** (WGS 84 geographic) with coordinates in **latitude, longitude** order (per GML convention — note this is the opposite of GeoJSON's lon,lat).

```xml
<aixm:ElevatedPoint srsName="urn:ogc:def:crs:EPSG::4326">
  <gml:pos>33.94250000 -118.40806000</gml:pos>
  <aixm:elevation uom="FT">128</aixm:elevation>
</aixm:ElevatedPoint>
```

### Elevation Model

AIXM uses `ElevatedPoint` and `ElevatedCurve` to attach vertical components:

- `elevation` — Height above mean sea level (MSL)
- `geoidUndulation` — Difference between WGS84 ellipsoid and geoid
- `verticalDatum` — Reference datum (EGM_96, MSL)

---

## SWIM Integration Patterns

### AIXM in SWIM Services

| SWIM Service | AIXM Role | Format |
|--------------|-----------|--------|
| **NASR (Aeronautical Data)** | Full AIXM 5.1.1 feature set | AIXM XML via SOAP/REST |
| **NOTAM Distribution (NDS)** | Event features (D-NOTAMs) | AIXM XML via JMS |
| **TFMS** | Airspace and route references | AIXM identifiers (not full XML) |
| **STDDS (Surface)** | Airport surface features | AIXM subset |

### Common SWIM AIXM Patterns

**1. Feature Query (Pull)**
```
Consumer → SWIM REST → NASR Database → AIXM XML Response
```

**2. Event Subscription (Push)**
```
NOTAM System → SWIM JMS Topic → Consumer receives AIXM Event XML
```

**3. Baseline + Delta**
```
Consumer pulls BASELINE from NASR at startup
Consumer subscribes to JMS for TEMPDELTA/PERMDELTA updates
Consumer maintains local state by applying deltas to baseline
```

### AIXM Namespace Declarations

```xml
xmlns:aixm="http://www.aixm.aero/schema/5.1.1"
xmlns:gml="http://www.opengis.net/gml/3.2"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:gts="http://www.isotc211.org/2005/gts"
xmlns:gco="http://www.isotc211.org/2005/gco"
xmlns:gmd="http://www.isotc211.org/2005/gmd"
xmlns:gss="http://www.isotc211.org/2005/gss"
```

---

## Validation

AIXM XML must validate against:
1. **AIXM 5.1.1 XSD** — `AIXM_Features.xsd` (structural validation)
2. **GML 3.2 XSD** — Geometry validation
3. **AIXM Business Rules** — Schematron rules for semantic validation (e.g., runway designators must be 01-36)
4. **SWIM Profile** — FAA-specific constraints on which AIXM elements are required/optional

Schema files: `http://www.aixm.aero/schema/5.1.1/`
