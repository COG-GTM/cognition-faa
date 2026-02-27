# Playbook: Migrate FAA Oracle Database to PostgreSQL

## Trigger
User requests migration of an FAA Oracle database (12c–19c) to PostgreSQL.

## Context
Load: `faa-knowledge/faa-tech-stack.md`, `faa-knowledge/faa-coding-conventions.md`

## Steps

### 1. Discovery & Scope
```
- Connect to Oracle and catalog: schemas, tables, views, indexes, constraints
- Count rows per table (ORDER BY row_count DESC)
- Inventory PL/SQL objects:
  SELECT object_type, COUNT(*) FROM dba_objects 
  WHERE owner = '<SCHEMA>' GROUP BY object_type;
- Identify Oracle-specific features in use:
  - Partitioning (range, list, hash, interval)
  - Materialized views with refresh schedules
  - Oracle Advanced Queuing (AQ)
  - Oracle Spatial/GIS functions (SDO_GEOMETRY)
  - XMLDB / XMLType columns
  - Virtual columns, invisible columns
  - Edition-based redefinition
  - Oracle Text (full-text search)
  - Database links (cross-database queries)
  - Sequences with CACHE/NOCACHE
  - CONNECT BY (hierarchical queries)
- Map PL/SQL dependency graph:
  SELECT * FROM dba_dependencies WHERE owner = '<SCHEMA>';
```

### 2. Compatibility Assessment
```
Generate compatibility matrix:

| Oracle Feature | PostgreSQL Equivalent | Migration Complexity |
|---------------|----------------------|---------------------|
| NUMBER(p,s) | NUMERIC(p,s) | Low |
| VARCHAR2 | VARCHAR | Low |
| DATE (includes time) | TIMESTAMP | Medium (semantics differ) |
| CLOB/BLOB | TEXT/BYTEA | Medium |
| ROWID | ctid (not stable) | High |
| CONNECT BY | WITH RECURSIVE CTE | Medium |
| MERGE INTO | INSERT ... ON CONFLICT | Medium |
| NVL() | COALESCE() | Low |
| DECODE() | CASE WHEN | Low |
| DBMS_OUTPUT | RAISE NOTICE | Low |
| DBMS_SCHEDULER | pg_cron | Medium |
| Oracle AQ | pgmq or Kafka | High |
| Partitioning | Native (PG 12+) | Medium |
| Materialized Views | Supported (no fast refresh) | Medium-High |
| Oracle Spatial (SDO) | PostGIS | Medium |
| Bitmap indexes | Not available (partial indexes) | Medium |
| Global temp tables | Supported (PG 15+) | Low |
| PL/SQL packages | Schema + functions (no packages) | High |
```

### 3. Schema Conversion
```
- Use ora2pg for initial schema conversion:
  ora2pg -t TABLE -o tables.sql
  ora2pg -t VIEW -o views.sql
  ora2pg -t SEQUENCE -o sequences.sql
  ora2pg -t INDEX -o indexes.sql
  ora2pg -t TRIGGER -o triggers.sql
  ora2pg -t FUNCTION -o functions.sql
  ora2pg -t PROCEDURE -o procedures.sql
  ora2pg -t PACKAGE -o packages.sql
  
- Review and fix ora2pg output:
  - DATE → TIMESTAMP conversions
  - Oracle-specific SQL syntax
  - Package decomposition (PG has no packages — convert to schema-grouped functions)
  - Sequence ownership and defaults
```

### 4. PL/SQL to PL/pgSQL Conversion
```
For each PL/SQL package:
1. Create a PostgreSQL schema matching the package name
2. Convert package spec to function signatures
3. Convert package body to function implementations
4. Key syntax changes:
   - Package variables → session variables or table-based state
   - %TYPE → explicit type reference
   - %ROWTYPE → composite type or RECORD
   - EXCEPTION WHEN OTHERS → EXCEPTION WHEN OTHERS
   - BULK COLLECT → array aggregation or set-returning functions
   - FORALL → INSERT ... SELECT or COPY
   - DBMS_LOB → standard TEXT/BYTEA operations
   - UTL_FILE → pg_read_file / COPY / external tools
   - REF CURSOR → REFCURSOR (similar)
   
FAA-specific patterns:
- gov_faa_error_pkg.log_error → custom error logging function
- Audit trail packages → pg_audit extension + custom functions
- NOTAM processing packages → decompose into individual functions
```

### 5. Data Migration
```
- For tables < 10M rows: ora2pg -t COPY
- For tables > 10M rows: 
  - Export via Oracle Data Pump (expdp)
  - Transform with custom ETL (Python/pandas or Spark)
  - Load via PostgreSQL COPY command
- Validate row counts match
- Validate checksums on critical columns
- Handle character set conversion (AL32UTF8 → UTF-8, usually clean)
- Handle Oracle NULL vs empty string semantics (Oracle treats '' as NULL)
```

### 6. Application Code Changes
```
Java (Spring Boot):
- Switch JDBC driver: ojdbc8 → postgresql
- Update application.yml:
  spring.datasource.url: jdbc:postgresql://host:5432/dbname
  spring.datasource.driver-class-name: org.postgresql.Driver
- Update JPA/Hibernate dialect:
  spring.jpa.properties.hibernate.dialect: org.hibernate.dialect.PostgreSQLDialect
- Fix native queries:
  - SYSDATE → CURRENT_TIMESTAMP
  - NVL() → COALESCE()
  - ROWNUM → LIMIT/OFFSET or ROW_NUMBER()
  - (+) outer join syntax → ANSI JOIN
  - DUAL table → remove (PG allows SELECT without FROM)
  - TO_DATE/TO_CHAR format strings (minor differences)
  - Sequence syntax: seq.NEXTVAL → nextval('seq')
```

### 7. Testing
```
- Unit tests: Run full Java test suite against PostgreSQL
- Integration tests: SWIM consumer/producer tests with PG backend
- Data validation: Row counts, sample record comparison, aggregate checks
- Performance baseline: Run standard query set, compare Oracle vs PG execution times
- Load test: Simulate peak FAA traffic (varies by system — TFMS: ~500 TPS, SWIM: ~1000 msg/min)
- Failover test: PostgreSQL streaming replication switchover
```

### 8. Cutover Plan
```
1. Final Oracle backup
2. Quiesce application (stop writes)
3. Run delta migration (changes since last full migration)
4. Validate data integrity
5. Switch application connection strings
6. Smoke test critical paths
7. Monitor for 24-48 hours
8. Decommission Oracle read access after 30-day parallel run
```

## Output Format
Migration plan document with:
1. Scope summary (table/object counts, estimated data volume)
2. Compatibility assessment matrix
3. Risk items and mitigation
4. Converted DDL scripts
5. Application change list
6. Test plan
7. Cutover runbook

## Guardrails
- Never drop Oracle objects during migration — maintain parallel operation
- All DDL changes must have rollback scripts
- Performance regression > 20% on any critical query requires investigation before cutover
- FAA security requirements: PostgreSQL must be STIG-hardened before receiving production data
