# FAA Technology Stack Inventory

## Overview

The FAA operates one of the most complex IT environments in the federal government — approximately 500+ applications, 3,000+ databases, and technology spanning six decades. This document catalogs the current technology landscape across the enterprise.

---

## Programming Languages

| Language | Usage | Systems | Estimated LOC |
|----------|-------|---------|---------------|
| **Java** | Primary for distributed systems | SWIM, TFMS, NASR, CDM, AIS | 15M+ |
| **C/C++** | Real-time, embedded, safety-critical | ERAM, STARS, ASDE-X, TAMR | 20M+ |
| **Ada** | Legacy safety-critical (diminishing) | ERAM (portions), legacy radar | 5M+ |
| **COBOL** | Mainframe batch and CICS transactions | Personnel, finance, logistics, legacy NAS support | 8M+ |
| **PL/SQL** | Database logic, ETL, reporting | All Oracle-backed systems | 3M+ |
| **Python** | Analytics, ML/AI, automation, scripting | Data analytics, safety analysis, test automation | 1M+ (growing) |
| **C#/.NET** | Some COTS-integrated tools | Training systems, some admin tools | 500K |
| **JavaScript/TypeScript** | Web frontends, Node.js services | Portals, dashboards, newer SWIM UIs | 2M+ (growing) |
| **Shell/Perl** | System admin, legacy ETL | Infrastructure automation, cron jobs | 500K |
| **FORTRAN** | Legacy scientific/weather | Some weather processing, legacy analysis | 200K (diminishing) |

---

## Databases

### Primary Platforms

| Platform | Version Range | Count (Approx) | Usage |
|----------|--------------|-----------------|-------|
| **Oracle Database** | 12c, 19c (target: 19c+) | ~1,800 | Primary RDBMS for most NAS and mission-support systems |
| **IBM DB2 for z/OS** | 12.1+ | ~400 | Mainframe transactional and batch |
| **PostgreSQL** | 13–16 | ~200 (growing) | New development, cloud-native, migration target |
| **Microsoft SQL Server** | 2016–2022 | ~300 | COTS applications, admin tools |
| **SQLite** | 3.x | ~100+ (embedded) | Embedded in field equipment, portable apps |
| **MongoDB** | 5.x–7.x | ~30 | Document store for newer services, ADS-B data |
| **Elasticsearch** | 7.x–8.x | ~20 | NOTAM search, log aggregation |
| **Redis** | 6.x–7.x | ~50 | Caching layer for SWIM services |
| **TimescaleDB** | 2.x | ~10 | Time-series for ADS-B and surveillance data |

### Database Distribution

```
Oracle:      ████████████████████████████████  60%
DB2:         ████████████                      13%
SQL Server:  ██████████                        10%
PostgreSQL:  ██████                             7% (growing)
Other:       ██████████                        10%
```

---

## Middleware & Integration

| Technology | Version | Usage |
|------------|---------|-------|
| **IBM MQ** | 9.x | Primary message broker for NAS-to-NAS system communication |
| **Apache Kafka** | 3.x | Newer event streaming (SWIM modernization, ADS-B pipelines) |
| **TIBCO EMS** | 10.x | Legacy messaging in some SWIM services |
| **Apache ActiveMQ** | 5.x / Artemis 2.x | Some SWIM consumer-facing JMS |
| **Apache Camel** | 3.x | Integration routing in newer SWIM services |
| **MuleSoft** | 4.x | API gateway for some external-facing services |
| **IBM DataPower** | 10.x | XML/SOAP gateway, legacy SWIM services |
| **Apache CXF** | 3.x | SOAP/REST framework for Java services |
| **gRPC** | 1.x | Emerging for internal high-throughput service-to-service |

---

## Application Frameworks

| Framework | Version | Status | Systems |
|-----------|---------|--------|---------|
| **Spring Boot** | 2.7.x / 3.x | Current standard | SWIM, NASR, new services |
| **Spring Framework** | 5.x / 6.x | Current | All Java services |
| **Spring Data JPA** | 2.x / 3.x | Current | Database access layer |
| **Apache Struts** | 1.x / 2.x | Legacy (being retired) | Older SWIM UIs, legacy portals |
| **EJB 2.x/3.x** | — | Legacy (being retired) | Older J2EE applications on WebSphere |
| **CICS TS** | 5.x | Active (mainframe) | Mainframe transaction processing |
| **React** | 18.x | Current for new UIs | SWIM dashboards, operator tools |
| **Angular** | 14+ | Some newer UIs | Admin portals |
| **jQuery** | 3.x | Legacy UIs | Many older web interfaces |

---

## Infrastructure

### Current State (Primarily On-Premise)

| Component | Technology | Location |
|-----------|-----------|----------|
| **Primary Data Centers** | FAA WJHTC (Atlantic City), Mike Monroney (Oklahoma City) | On-prem |
| **Mainframe** | IBM z15 / z16 | WJHTC |
| **x86 Servers** | Dell PowerEdge, HPE ProLiant | WJHTC, regional facilities |
| **Virtualization** | VMware vSphere 7/8 | Standard for non-mainframe |
| **Containers** | Red Hat OpenShift 4.x, Docker | Newer services |
| **OS (Server)** | RHEL 8/9 (standard), Windows Server 2019/2022 | Mixed |
| **OS (Mainframe)** | z/OS 2.5+ | IBM mainframe |
| **Load Balancing** | F5 BIG-IP, HAProxy | Network edge |
| **DNS/DHCP** | Infoblox | Enterprise |
| **Monitoring** | Splunk, Nagios, Dynatrace (newer) | Mixed |
| **Storage** | NetApp (NAS/SAN), IBM DS8000 (mainframe) | On-prem |

### Cloud Migration Target (AWS GovCloud)

| Component | AWS Service | Status |
|-----------|------------|--------|
| **Compute** | EC2, ECS, EKS | Pilot programs active |
| **Database** | RDS (PostgreSQL, Oracle), Aurora | Migration planning |
| **Messaging** | Amazon MQ, MSK (Kafka) | Evaluation |
| **Storage** | S3, EFS | Active for non-NAS-critical |
| **Networking** | VPC, Direct Connect, Transit Gateway | Established |
| **Security** | IAM, KMS, GuardDuty, Security Hub | Required for ATO |
| **Certification** | FedRAMP High, IL4/IL5 | Required baseline |

### Cloud Migration Constraints

- NAS safety-critical systems remain on-prem (ERAM, STARS) for the foreseeable future
- Data sovereignty requirements limit what can leave FAA-controlled facilities
- Real-time systems (<100ms latency) require co-location with NAS infrastructure
- All cloud deployments require ATO (Authority to Operate) per NIST 800-53 Rev 5

---

## CI/CD & DevOps

| Tool | Usage | Coverage |
|------|-------|----------|
| **Jenkins** | Primary CI/CD orchestrator | ~70% of pipelines |
| **GitLab CI** | Newer systems, container builds | ~20% (growing) |
| **GitHub Actions** | Limited — some open-source adjacent projects | ~5% |
| **Bitbucket/Bamboo** | Legacy, being retired | ~5% |
| **SonarQube** | Static analysis (mandatory) | All Java, C/C++ projects |
| **Fortify** | SAST (mandatory for ATO) | All external-facing apps |
| **Black Duck** | SCA / open-source license compliance | All projects with OSS dependencies |
| **Nexus/Artifactory** | Artifact repository | Enterprise-wide |
| **Ansible** | Configuration management | Server provisioning |
| **Terraform** | Infrastructure as Code (cloud) | AWS GovCloud deployments |
| **Helm** | Kubernetes package management | OpenShift deployments |

---

## Testing & Quality

| Tool | Purpose |
|------|---------|
| **JUnit 5** | Java unit testing (standard) |
| **Mockito** | Java mocking framework |
| **Selenium** | Web UI automated testing |
| **Playwright** | Newer UI testing (replacing Selenium) |
| **JMeter** | Performance/load testing |
| **Gatling** | Performance testing (newer) |
| **Cucumber** | BDD acceptance testing (some teams) |
| **Robot Framework** | Acceptance testing (some teams) |
| **Coverity** | C/C++ static analysis |

---

## Identity & Access Management

| Component | Technology |
|-----------|-----------|
| **Directory** | Microsoft Active Directory (on-prem), Azure AD (hybrid) |
| **SSO** | SAML 2.0 via Shibboleth / ADFS |
| **PKI** | FAA PKI (internal CA), DoD PKI (interop) |
| **MFA** | PIV/CAC card (primary), RSA SecurID (backup) |
| **API Auth** | OAuth 2.0 + JWT (newer), WS-Security (legacy SOAP) |
| **Certificate Management** | Venafi |
