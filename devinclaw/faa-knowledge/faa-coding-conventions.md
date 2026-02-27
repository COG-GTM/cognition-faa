# FAA Coding Conventions & Development Standards

## Overview

FAA software development follows strict standards driven by safety-critical requirements (DO-178C for airborne, DO-278A for ground-based), federal acquisition regulations, and internal FAA Orders governing IT systems. This document covers coding conventions across the primary technology stacks.

---

## Java Conventions (FAA Standard)

### Version & Framework Standards

| Component | Standard | Notes |
|-----------|----------|-------|
| **Java Version** | 8 (legacy) → 11 (current standard) → 17 (new development) | Java 8 still prevalent in SWIM, TFMS |
| **Framework** | Spring Boot 2.7+ / Spring Framework 5.x | Spring Boot 3.x approved for new systems |
| **Build Tool** | Maven 3.8+ (standard), Gradle 7+ (permitted for new) | Maven is overwhelmingly dominant |
| **Application Server** | Apache Tomcat 9/10, IBM WebSphere (legacy), JBoss EAP (some) | WebSphere being phased out |

### Package Naming

```
gov.faa.<system>.<module>.<layer>

Examples:
gov.faa.swim.notam.service
gov.faa.swim.notam.model
gov.faa.swim.notam.repository
gov.faa.tfms.flow.controller
gov.faa.nasr.aixm.parser
```

### Code Structure (Layered Architecture)

```
src/main/java/gov/faa/<system>/
├── config/           # Spring configuration classes
├── controller/       # REST controllers (or SOAP endpoints for legacy)
├── service/          # Business logic
│   └── impl/         # Service implementations
├── repository/       # Data access (Spring Data JPA or JDBC)
├── model/            # Entity classes, DTOs
│   ├── entity/       # JPA entities
│   └── dto/          # Data transfer objects
├── mapper/           # MapStruct or manual DTO mappers
├── exception/        # Custom exceptions
├── util/             # Utility classes
└── integration/      # External system integration (JMS, SWIM, etc.)
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase, noun | `NotamSearchService`, `AirportRepository` |
| Interfaces | PascalCase, no "I" prefix | `NotamService` (impl: `NotamServiceImpl`) |
| Methods | camelCase, verb-first | `findActiveNotams()`, `parseAixmEvent()` |
| Constants | UPPER_SNAKE_CASE | `MAX_NOTAM_AGE_HOURS`, `DEFAULT_PAGE_SIZE` |
| Packages | lowercase, no underscores | `gov.faa.swim.notam` |
| Test classes | `*Test` (unit), `*IT` (integration) | `NotamServiceTest`, `SwimConnectionIT` |

### FAA-Specific Java Requirements

1. **Logging:** SLF4J + Logback (Log4j banned after CVE-2021-44228). All log statements must include correlation IDs for distributed tracing.
2. **Exception handling:** Checked exceptions for recoverable conditions, runtime for programming errors. All service methods must declare specific exceptions, not generic `Exception`.
3. **Null handling:** `Optional<T>` for return types that may be absent. `@NonNull`/`@Nullable` annotations required on public API methods.
4. **Thread safety:** Document thread safety on all shared classes. Use `@ThreadSafe`/`@NotThreadSafe` annotations.
5. **Date/Time:** `java.time` API only (no `java.util.Date` in new code). All timestamps UTC unless explicitly displaying local time.

### Security Requirements (Java)

- Input validation on all external inputs (OWASP guidelines)
- Parameterized queries only (no string concatenation for SQL/JPQL)
- TLS 1.2+ for all network communication
- FIPS 140-2 validated cryptographic providers for sensitive data
- No hardcoded credentials — use JNDI or externalized configuration

---

## PL/SQL Conventions (Oracle 12c–19c)

### Package Structure

The FAA Oracle environment is heavily package-oriented:

```sql
-- Package specification
CREATE OR REPLACE PACKAGE gov_faa_notam_pkg AS
  -- Public types
  TYPE t_notam_rec IS RECORD (
    notam_id     NUMBER(12),
    series       VARCHAR2(3),
    number_val   NUMBER(6),
    location     VARCHAR2(4),
    eff_start    TIMESTAMP WITH TIME ZONE,
    eff_end      TIMESTAMP WITH TIME ZONE
  );
  
  TYPE t_notam_tab IS TABLE OF t_notam_rec;
  
  -- Public procedures/functions
  FUNCTION get_active_notams(p_location IN VARCHAR2) RETURN t_notam_tab PIPELINED;
  PROCEDURE create_notam(p_notam IN t_notam_rec, p_status OUT VARCHAR2);
  
END gov_faa_notam_pkg;
/
```

### Naming Standards

| Element | Convention | Example |
|---------|-----------|---------|
| Packages | `gov_faa_<system>_pkg` | `gov_faa_notam_pkg` |
| Tables | `<SYSTEM>_<ENTITY>` | `NOTAM_ACTIVE`, `NASR_AIRPORT` |
| Columns | `UPPER_SNAKE_CASE` | `NOTAM_ID`, `EFF_START_DT` |
| Indexes | `<TABLE>_<COLS>_IDX` | `NOTAM_ACTIVE_LOC_IDX` |
| Sequences | `<TABLE>_SEQ` | `NOTAM_ACTIVE_SEQ` |
| Procedures | `snake_case` with verb | `create_notam`, `update_status` |
| Parameters | `p_` prefix | `p_location`, `p_start_date` |
| Local vars | `l_` prefix | `l_count`, `l_notam_rec` |
| Global vars | `g_` prefix | `g_max_records` |
| Cursors | `c_` prefix | `c_active_notams` |
| Types | `t_` prefix | `t_notam_rec`, `t_notam_tab` |

### PL/SQL Requirements

1. **Exception blocks:** Every procedure/function must have an exception handler. Log errors via `gov_faa_error_pkg.log_error`.
2. **Bulk operations:** Use `BULK COLLECT` and `FORALL` for multi-row operations. Row-by-row processing requires justification.
3. **Bind variables:** Always use bind variables. Literal SQL is a finding in security audits.
4. **Audit columns:** All tables must include `CREATED_BY`, `CREATED_DT`, `MODIFIED_BY`, `MODIFIED_DT`.
5. **Partitioning:** Tables exceeding 10M rows must have a partitioning strategy (typically range on date).

---

## COBOL Conventions (Mainframe)

### Environment

| Component | Standard |
|-----------|----------|
| **COBOL Version** | Enterprise COBOL 6.x (z/OS) |
| **Transaction Monitor** | CICS TS 5.x |
| **Database** | DB2 12+ for z/OS |
| **Job Scheduler** | CA-7 / TWS (Tivoli Workload Scheduler) |
| **Source Control** | Endevor (migrating to Git with IBM Dependency Based Build) |

### Program Structure

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. FAANOTM1.
      *==========================================================
      * PROGRAM: FAANOTM1
      * PURPOSE: PROCESS INCOMING NOTAM BATCH FEED
      * AUTHOR:  FAA ATO SYSTEM ENGINEERING
      * DATE:    2024-01-15
      * CHANGE LOG:
      *   2024-01-15 - INITIAL VERSION
      *   2024-06-01 - ADDED D-NOTAM XML PARSING
      *==========================================================
       
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-NOTAM-RECORD.
          05 WS-NOTAM-ID          PIC 9(12).
          05 WS-NOTAM-SERIES      PIC X(3).
          05 WS-NOTAM-NUMBER      PIC 9(6).
          05 WS-NOTAM-LOCATION    PIC X(4).
          05 WS-NOTAM-EFF-START   PIC X(14).
          05 WS-NOTAM-EFF-END     PIC X(14).
       
       01 WS-DB2-SQLCODE          PIC S9(9) COMP.
       01 WS-RETURN-CODE          PIC S9(4) COMP VALUE 0.
       
       PROCEDURE DIVISION.
       0000-MAIN-PROCESS.
           PERFORM 1000-INITIALIZE
           PERFORM 2000-PROCESS-RECORDS
              UNTIL END-OF-FILE
           PERFORM 9000-TERMINATE
           STOP RUN.
```

### COBOL Naming Standards

| Element | Convention | Example |
|---------|-----------|---------|
| Programs | `FAA<SYS><NNN>` (8 chars max) | `FAANOTM1`, `FAATFMS2` |
| Copybooks | `FAA<SYS><NN>C` | `FAANOTM1C` |
| Paragraphs | `NNNN-DESCRIPTION` | `2000-PROCESS-RECORDS` |
| Variables (WS) | `WS-DESCRIPTION` | `WS-NOTAM-ID` |
| Variables (linkage) | `LK-DESCRIPTION` | `LK-INPUT-RECORD` |
| DB2 host vars | `HV-DESCRIPTION` | `HV-NOTAM-SERIES` |
| Switches/flags | `SW-DESCRIPTION` | `SW-END-OF-FILE` |
| Accumulators | `AC-DESCRIPTION` | `AC-RECORD-COUNT` |

### COBOL Requirements

1. **Paragraph numbering:** Use 1000-level increments for major sections, 100-level for sub-paragraphs.
2. **Error handling:** Check `SQLCODE` after every DB2 operation. Non-zero SQLCODE (other than +100) must branch to error paragraph.
3. **CICS:** Use `EXEC CICS HANDLE CONDITION` or `RESP` checking on every CICS command.
4. **Copybooks:** Shared data structures must be in copybooks, never duplicated.
5. **Comments:** Every paragraph must have a purpose comment. Change log in IDENTIFICATION DIVISION.

---

## Code Review Requirements

### FAA Order 1370.xx Series (IT Policy)

Code review requirements derive from FAA Orders governing IT acquisition and development:

| Review Type | When Required | Participants |
|-------------|---------------|-------------|
| **Peer Review** | All code changes | ≥1 developer on same team |
| **Technical Review** | Before integration test | Tech lead + architect |
| **Security Review** | All external-facing code, auth/crypto changes | AppSec team |
| **Safety Review** | NAS-critical systems (ERAM, STARS, TFMS) | Safety engineer (DO-278A) |
| **IV&V Review** | Major releases of safety-critical systems | Independent V&V contractor |

### Review Checklist (Standard)

- [ ] Code compiles without warnings
- [ ] Unit tests pass with ≥80% line coverage (90% for safety-critical)
- [ ] No SonarQube Critical/Blocker findings
- [ ] No hardcoded credentials or secrets
- [ ] Input validation on all external data
- [ ] Error handling covers all failure paths
- [ ] Logging includes correlation IDs
- [ ] Thread safety documented for shared resources
- [ ] Database changes have rollback scripts
- [ ] Performance impact assessed for queries touching >100K rows

---

## Documentation Standards

### Required Documentation Per Component

| Document | Format | When |
|----------|--------|------|
| **Javadoc / Code Comments** | In-code | All public APIs |
| **README.md** | Markdown | Every repository |
| **Architecture Decision Record (ADR)** | Markdown (MADR format) | Significant design decisions |
| **API Specification** | OpenAPI 3.0 (REST) or WSDL (SOAP) | All service endpoints |
| **Database Schema Doc** | ERD + Data Dictionary | All schema changes |
| **Runbook** | Markdown/Confluence | Every deployed service |
| **Test Plan** | Standardized template | Before system test |

### Javadoc Requirements

```java
/**
 * Searches for active NOTAMs matching the given criteria.
 * 
 * <p>Results are filtered by effective time range and ordered by
 * issuance date descending. Maximum results limited by system
 * configuration (default: 500).
 * 
 * @param location ICAO airport identifier (e.g., "KLAX") or ARTCC designator
 * @param startTime beginning of the effective time window (UTC)
 * @param endTime end of the effective time window (UTC), may be null for open-ended
 * @return list of matching NOTAMs, empty list if none found (never null)
 * @throws InvalidLocationException if location format is not recognized
 * @throws DataAccessException if database query fails
 * @since 2.3.0
 */
public List<NotamDto> searchActiveNotams(
    String location, 
    Instant startTime, 
    @Nullable Instant endTime
);
```
