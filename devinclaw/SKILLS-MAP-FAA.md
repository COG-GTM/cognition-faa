# DevinClaw Skills Map — FAA Overlay

This document maps DevinClaw's core skills to specific FAA systems and modernization scenarios.

---

## legacy-analysis

**Skill:** Analyze legacy codebases for modernization readiness.

| FAA System | Language | Scenario |
|------------|----------|----------|
| **ERAM** | C++, Ada | Assess Ada modules for C++ conversion; map real-time constraints and safety-critical paths |
| **TFMS** | Java (Spring), Swing | Evaluate Swing fat-client for web UI migration; assess Oracle coupling |
| **SWIM** | Java (Spring, CXF) | Assess SOAP endpoints for REST conversion; catalog JMS topic dependencies |
| **USNS (NOTAM)** | COBOL, Java | Map mainframe batch jobs; evaluate hybrid COBOL/Java integration points |
| **CDM** | Java, SOAP | Assess SOAP web services for modernization; map airline integration contracts |
| **ATOP** | Java, Oracle | Evaluate oceanic ATC automation for cloud readiness |
| **CASTLE** | COBOL, DB2 | Full mainframe assessment for cloud migration |
| **REGIS** | Java, Oracle, PL/SQL | Assess financial system PL/SQL business logic complexity |

**Key signals:** "analyze," "assess," "evaluate," "review," "technical debt," "modernization readiness"

---

## plsql-migration

**Skill:** Migrate Oracle PL/SQL to PostgreSQL PL/pgSQL.

| FAA System | Database | Complexity | Notes |
|------------|----------|------------|-------|
| **TFMS** | Oracle 19c | High | Heavy PL/SQL packages for flow management algorithms |
| **SWIM (NASR)** | Oracle 19c | Medium | AIXM data management procedures, spatial queries (SDO → PostGIS) |
| **NOTAM** | Oracle 19c | Medium | NOTAM lifecycle management, D-NOTAM generation |
| **REGIS** | Oracle 19c | High | Financial processing, audit trails, regulatory reporting |
| **CEDAR** | Oracle 19c | Medium | Capital investment tracking, budget calculations |
| **VITAL** | Oracle 12c | Low | Training records — straightforward CRUD |
| **CDM** | Oracle 19c | Medium | Airline data exchange, slot management |

**Migration priority:** VITAL (wave 1) → CEDAR (wave 2) → NOTAM, CDM (wave 2) → NASR, SWIM (wave 3) → TFMS, REGIS (wave 3-4)

**Key signals:** "Oracle to PostgreSQL," "PL/SQL migration," "database migration," "reduce Oracle licensing"

---

## cobol-conversion

**Skill:** Convert COBOL programs to modern languages (Java/Python).

| FAA System | Platform | Program Count (Est.) | Scenario |
|------------|----------|---------------------|----------|
| **CASTLE** | z/OS, DB2, CICS | ~200 programs | HR/personnel processing — convert to Java/Spring Boot |
| **USNS (NOTAM)** | z/OS, DB2 | ~50 programs | Legacy NOTAM batch processing — partially replaced by Java |
| **Financial batch** | z/OS, DB2 | ~100 programs | Payroll, accounting batch jobs |
| **Logistics** | z/OS, DB2, CICS | ~150 programs | Supply chain and inventory management |
| **Legacy NAS support** | z/OS | ~80 programs | Reporting and data extraction for NAS systems |

**Approach by complexity:**
- **Simple batch** (read → transform → write): Automated conversion + review
- **CICS online** (screen-driven): Rewrite as REST API + web UI
- **Complex business logic** (decision trees, calculations): Manual conversion with domain expert review

**Key signals:** "COBOL," "mainframe," "convert," "modernize batch," "CICS," "DB2"

---

## security-scan

**Skill:** STIG compliance and NIST 800-53 security assessment.

| FAA System | FIPS Category | Key STIGs | ATO Concerns |
|------------|---------------|-----------|--------------|
| **ERAM** | HIGH | RHEL, custom C++ runtime | Safety-critical — DO-278A + STIG |
| **STARS** | HIGH | RHEL, custom runtime | Safety-critical — DO-278A + STIG |
| **TFMS** | HIGH | RHEL, Oracle 19c, Tomcat, Java | Operational — full STIG stack |
| **SWIM** | HIGH | RHEL, Oracle 19c, Tomcat, ActiveMQ | Internet-facing consumers — full STIG + penetration test |
| **TFDM** | HIGH | RHEL, PostgreSQL, Kafka | Modern stack — STIG + cloud security controls |
| **Mission support** | MODERATE | RHEL/Windows, Oracle/SQL Server | Standard STIG + NIST |
| **Public web** | LOW | Apache/Nginx, RHEL | Web server STIG + OWASP |

**ATO process:** Scan → POA&M → Remediate CAT I → Submit package → CISO review → ATO granted (typically 6-12 months for new systems)

**Key signals:** "STIG," "ATO," "security audit," "NIST," "compliance," "FISMA," "vulnerability"

---

## db-rationalization

**Skill:** Assess and consolidate the FAA's database estate.

| Segment | Count (Est.) | Platform | Rationalization Action |
|---------|-------------|----------|----------------------|
| **NAS operational** | ~200 | Oracle, embedded | Retain (safety-critical) |
| **SWIM services** | ~150 | Oracle | Migrate (PostgreSQL) — waves 2-3 |
| **Mission support** | ~500 | Oracle, SQL Server | Migrate + consolidate |
| **Mainframe** | ~400 | DB2 | Migrate with app rewrite (wave 4) |
| **Development/test** | ~800 | Mixed | Consolidate onto shared instances |
| **Inactive/orphan** | ~400 | Mixed | Retire after data archival |
| **COTS-managed** | ~300 | SQL Server, Oracle | Retain (vendor-controlled) |
| **Analytics/reporting** | ~100 | Oracle, PostgreSQL | Migrate to cloud (RDS/Aurora) |
| **Field/embedded** | ~150 | SQLite, custom | Retain (equipment-specific) |

**ROI model:**
- Wave 1 (retire inactive + consolidate dev/test): ~$2M/year Oracle license savings
- Wave 2 (migrate mission support): ~$5M/year
- Wave 3 (migrate SWIM/NAS support): ~$8M/year
- Total potential: ~$15M/year in license cost reduction

**Key signals:** "database consolidation," "Oracle licensing," "3,000 databases," "rationalization," "reduce footprint"

---

## test-generation

**Skill:** Generate automated tests for untested legacy code.

| FAA System | Current Coverage (Est.) | Target | Test Type |
|------------|------------------------|--------|-----------|
| **TFMS** | 35% | 80% | JUnit 5 + Mockito, integration tests |
| **SWIM services** | 45% | 80% | JUnit 5, Spring Boot test, contract tests |
| **NOTAM (Java)** | 25% | 80% | JUnit 5, AIXM validation tests |
| **NOTAM (COBOL)** | 5% | 60% | Batch job regression tests |
| **CDM** | 30% | 80% | JUnit 5, SOAP consumer contract tests |
| **TFDM** | 65% | 90% | JUnit 5, Playwright (UI), Kafka integration |
| **PL/SQL packages** | 10% | 70% | utPLSQL framework |

**Priority:** Generate tests BEFORE modernization — tests become the safety net for refactoring.

**Approach:**
1. Analyze code paths and generate test scaffolding
2. Create data fixtures from production-like samples
3. Generate boundary-condition and null-safety tests
4. Generate integration tests for external system interfaces
5. Generate regression tests from known bug reports

**Key signals:** "test coverage," "generate tests," "untested code," "regression tests," "test automation"

---

## Cross-Skill Workflows

### Full Modernization Pipeline
```
legacy-analysis → test-generation → plsql-migration → security-scan
```
Assess the system, generate safety-net tests, migrate the database, then validate security compliance.

### Mainframe Exit
```
legacy-analysis → cobol-conversion → db-rationalization → test-generation → security-scan
```
Assess COBOL programs, convert to Java, migrate DB2 to PostgreSQL, generate tests, get ATO.

### SWIM Modernization
```
legacy-analysis → test-generation → faa-swim-integration (playbook) → security-scan
```
Assess current SWIM service, generate contract tests, modernize endpoints, validate security.
