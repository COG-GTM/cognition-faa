# Playbook: FAA Security Audit (STIG + NIST)

## Trigger
User requests a security audit of an FAA system for Authority to Operate (ATO) compliance.

## Context
Load: `faa-knowledge/faa-tech-stack.md`, `faa-knowledge/faa-systems-inventory.md`

## Background

FAA systems must comply with:
- **NIST SP 800-53 Rev 5** — Security and Privacy Controls (federal baseline)
- **DISA STIGs** — Technical implementation guides for specific technologies
- **FAA Order 1370.82A** — Information Systems Security Program
- **FISMA** — Federal Information Security Modernization Act (annual assessment)

ATO (Authority to Operate) is granted by the FAA CISO after demonstrating compliance. Without ATO, a system cannot operate on the FAA network.

## Steps

### 1. Determine System Boundary
```
- Identify all components in the authorization boundary:
  - Application servers (OS, middleware, app)
  - Database servers
  - Web servers / reverse proxies
  - Message brokers (IBM MQ, Kafka, ActiveMQ)
  - Load balancers
  - Network devices (in scope if system-specific)
  - Client workstations (if thick client)
- Identify interconnections with other FAA systems (ISA/MOU required)
- Determine FIPS 199 categorization: LOW / MODERATE / HIGH
  - Most NAS operational systems: HIGH
  - Mission support systems: MODERATE
  - Public-facing informational: LOW
```

### 2. STIG Compliance Scan — Operating System
```
RHEL 8/9 STIG (most common FAA server OS):
- Run OpenSCAP with DISA STIG profile:
  oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_stig \
    --results results.xml --report report.html \
    /usr/share/xml/scap/ssg/content/ssg-rhel8-ds.xml

Key STIG categories:
- CAT I (Critical): Default passwords, unpatched vulnerabilities, no encryption
- CAT II (High): Audit logging gaps, excessive permissions, weak configs
- CAT III (Medium): Banner text, minor hardening items

FAA-critical checks:
- [ ] FIPS mode enabled (fips=1 in kernel)
- [ ] SELinux enforcing
- [ ] Audit rules for privileged commands (auditd)
- [ ] SSH hardened (no root login, key-only, FIPS ciphers)
- [ ] USB storage disabled (operational positions)
- [ ] NTP synchronized to FAA time source
- [ ] Automatic patching configured (WSUS/Satellite)
```

### 3. STIG Compliance — Database
```
Oracle 19c STIG:
- [ ] Listener password set
- [ ] Default accounts locked (SCOTT, HR, etc.)
- [ ] Audit trail enabled (UNIFIED_AUDIT or DBMS_AUDIT_TRAIL)
- [ ] Transparent Data Encryption (TDE) for data at rest
- [ ] Network encryption (Oracle Native Encryption or TLS)
- [ ] Password complexity enforced (PROFILE with VERIFY_FUNCTION)
- [ ] Failed login lockout (FAILED_LOGIN_ATTEMPTS ≤ 5)
- [ ] Idle session timeout (IDLE_TIME)
- [ ] PUBLIC privileges revoked (UTL_FILE, UTL_HTTP, DBMS_JAVA, etc.)
- [ ] Database links use encrypted connections
- [ ] Patch level current (Critical Patch Update within 30 days)

PostgreSQL STIG (if migrated):
- [ ] pg_hba.conf: no trust/peer for remote, scram-sha-256 only
- [ ] ssl = on with valid certificates
- [ ] pgaudit extension installed and configured
- [ ] log_connections, log_disconnections enabled
- [ ] Row-level security where applicable
- [ ] Extension whitelist (no untrusted extensions)
```

### 4. STIG Compliance — Application Server
```
Apache Tomcat STIG:
- [ ] Default webapps removed (ROOT, docs, examples, manager)
- [ ] Server header suppressed
- [ ] TLS 1.2+ only (no SSL 3.0, TLS 1.0, TLS 1.1)
- [ ] FIPS-approved cipher suites only
- [ ] Access log enabled with correlation IDs
- [ ] Manager interface disabled or IP-restricted
- [ ] Session timeout ≤ 15 minutes (FAA standard)
- [ ] Error pages don't leak stack traces

JBoss/WildFly STIG (where applicable):
- Similar controls plus JMX security, management console restriction
```

### 5. STIG Compliance — Application Code
```
Static Analysis (Fortify or SonarQube):
- Run Fortify SCA: sourceanalyzer -b <build> -scan -f results.fpr
- Zero tolerance for:
  - SQL Injection (CAT I)
  - Cross-Site Scripting (CAT I)
  - Hardcoded credentials (CAT I)
  - Path traversal (CAT I)
  - XML External Entity (XXE) (CAT I)
- Must remediate:
  - Insecure deserialization (CAT II)
  - Missing input validation (CAT II)
  - Weak cryptography (CAT II)
  - Improper error handling / info leakage (CAT II)

Dependency scan:
- OWASP dependency-check or Black Duck
- No CRITICAL CVEs (must patch or mitigate with POA&M)
- HIGH CVEs require POA&M with remediation timeline
```

### 6. NIST 800-53 Control Families (Key Areas)
```
AC — Access Control:
- [ ] Role-based access control (RBAC) implemented
- [ ] Least privilege enforced
- [ ] Account lockout after failed attempts
- [ ] Session management (timeout, concurrent session limits)
- [ ] PIV/CAC authentication for privileged access

AU — Audit and Accountability:
- [ ] All authentication events logged
- [ ] All privileged actions logged
- [ ] Log integrity protection (append-only, shipped to SIEM)
- [ ] Audit reduction and reporting capability
- [ ] Logs retained per FAA records schedule (typically 1-3 years online)

CM — Configuration Management:
- [ ] Baseline configuration documented
- [ ] Change management process followed
- [ ] Software whitelist enforced
- [ ] Vulnerability scanning (monthly minimum)

IA — Identification and Authentication:
- [ ] Multi-factor authentication (PIV/CAC primary)
- [ ] Service accounts use certificates (no passwords)
- [ ] PKI certificates from FAA or DoD CA

SC — System and Communications Protection:
- [ ] Encryption in transit (TLS 1.2+)
- [ ] Encryption at rest (FIPS 140-2 validated)
- [ ] Network segmentation (NAS ops network isolated)
- [ ] Boundary protection (firewalls, IDS/IPS)

SI — System and Information Integrity:
- [ ] Antivirus/EDR on all endpoints
- [ ] Patch management (30-day CAT I, 90-day CAT II)
- [ ] Integrity monitoring (AIDE/Tripwire)
- [ ] SIEM integration (Splunk)
```

### 7. Generate POA&M (Plan of Action & Milestones)
```
For each finding:
| ID | Control | Finding | Severity | Status | Milestone | Due Date |
|----|---------|---------|----------|--------|-----------|----------|
| 001 | AC-2 | Unused accounts not disabled within 35 days | CAT II | Open | Implement automated disable script | 2026-04-01 |

Group by severity (CAT I → CAT II → CAT III)
CAT I findings must be remediated before ATO
CAT II/III may receive POA&M with timeline
```

## Output Format
1. System security posture summary
2. STIG scan results by component (with pass/fail/NA counts)
3. NIST 800-53 control assessment matrix
4. Critical findings (CAT I) with remediation steps
5. POA&M for remaining findings
6. Recommended security architecture improvements

## Guardrails
- Do NOT run active vulnerability scans (Nessus, Nmap) without explicit authorization
- STIG checks should use configuration review, not active exploitation
- Do NOT access or test production NAS operational systems without safety approval
- All findings are FOUO (For Official Use Only) — do not output to public channels
