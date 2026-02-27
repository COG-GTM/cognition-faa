# Playbook: Analyze FAA Legacy Application

## Trigger
User requests analysis of an FAA Java, COBOL, or PL/SQL application for modernization assessment.

## Context
Load: `faa-knowledge/faa-systems-inventory.md`, `faa-knowledge/faa-tech-stack.md`, `faa-knowledge/faa-coding-conventions.md`

## Steps

### 1. Identify the System and Technology
```
- Determine which FAA system this code belongs to (ERAM, TFMS, SWIM, NOTAM, mission-support, etc.)
- Identify the primary language (Java, COBOL, PL/SQL, C/C++, Ada)
- Identify the database (Oracle, DB2, PostgreSQL)
- Check for middleware dependencies (IBM MQ, TIBCO, JMS)
- Catalog external system integrations (SWIM, CDM, TFMS feeds)
```

### 2. Codebase Survey
```
- Count lines of code by language: cloc --by-file-by-lang .
- Identify framework versions: grep for Spring version, Struts config, EJB descriptors
- Find build system: look for pom.xml (Maven), build.gradle, build.xml (Ant), Makefile
- Map dependency tree: mvn dependency:tree or equivalent
- Identify deprecated APIs: search for javax.* (vs jakarta.*), Struts 1.x patterns, EJB 2.x
```

### 3. Architecture Analysis
```
- Map module/package structure → identify layering violations
- Find entry points: REST controllers, SOAP endpoints, CICS transactions, JMS listeners, batch main classes
- Trace data flow: entry point → service → repository → database
- Identify coupling: which modules depend on which? Use jdepend or similar
- Check for circular dependencies between packages
- Map external touchpoints: outbound HTTP, JMS publish, MQ puts, file drops
```

### 4. Database Dependency Analysis
```
For Oracle/DB2:
- Extract schema: tables, views, materialized views, synonyms
- Count and categorize PL/SQL objects: packages, procedures, functions, triggers
- Identify cross-schema dependencies
- Find business logic in database (complex PL/SQL packages, triggers with logic)
- Map stored procedure call chains
- Check for Oracle-specific features: partitioning, Advanced Queuing, Spatial, XMLDB

For COBOL/DB2:
- Extract DCLGEN copybooks
- Map program-to-table relationships
- Identify batch job dependencies (JCL → program → table)
```

### 5. Technical Debt Assessment
```
- Run static analysis: SonarQube profile for FAA rules
- Identify security vulnerabilities: Fortify scan or OWASP dependency-check
- Find dead code: unreachable methods, unused classes, commented-out blocks
- Check test coverage: JaCoCo report, identify untested critical paths
- Catalog hardcoded values: connection strings, endpoints, magic numbers
- Find copy-paste duplication: CPD (PMD) or SonarQube duplicate detection
```

### 6. Modernization Risk Assessment
```
Rate each dimension (1-5, 5=highest risk):
- Coupling: How tightly coupled to other NAS systems?
- Data complexity: How much business logic lives in the database?
- Safety criticality: Is this in the NAS operational path? (DO-278A applies)
- Team knowledge: Is there institutional knowledge or is this "inherited" code?
- Test coverage: Can we safely refactor?
- Volume: How many LOC need to change?
```

### 7. Generate Report
```
Output a structured modernization assessment:
1. Executive Summary (1 paragraph)
2. System Profile (tech stack, size, dependencies)
3. Architecture Diagram (text-based)
4. Findings by Category (architecture, code quality, security, performance)
5. Risk Matrix (dimensions from step 6)
6. Recommended Modernization Strategy:
   - Retire / Replace / Refactor / Re-platform / Retain
7. Estimated Effort (T-shirt sizing: S/M/L/XL)
8. Dependencies and Sequencing Constraints
```

## Output Format
Markdown report with sections matching step 7. Include specific file references and code examples for all findings.

## Guardrails
- Do NOT modify any source code during analysis
- Do NOT execute application code or database queries against production
- Flag any credentials, keys, or secrets found in source code
- Note all safety-critical designations (DO-278A applicability)
