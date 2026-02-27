# FAA Systems Inventory

## Overview

The FAA's National Airspace System (NAS) and mission-support portfolio comprises 500+ applications. This inventory covers the major systems relevant to modernization efforts, with current technology stacks and status.

---

## En Route & Terminal Systems

### ERAM — En Route Automation Modernization
| Attribute | Detail |
|-----------|--------|
| **Function** | Primary en route air traffic control automation for ARTCCs |
| **Tech Stack** | C++ (primary), Ada (legacy modules), POSIX/Linux, Oracle (flight data) |
| **Architecture** | Distributed real-time, redundant active/standby |
| **Sites** | 20 ARTCCs + backup (Salt Lake City) |
| **Status** | Operational. Incremental upgrades (ERAM Sustainment) |
| **Modernization** | Hardware refresh cycles, Ada-to-C++ migration ongoing |

### STARS — Standard Terminal Automation Replacement System
| Attribute | Detail |
|-----------|--------|
| **Function** | Terminal radar approach control (TRACON) and tower automation |
| **Tech Stack** | C/C++, Linux (RHEL), custom display subsystem |
| **Architecture** | Real-time processing with redundant display channels |
| **Sites** | 170+ TRACONs and large towers |
| **Status** | Operational. TAMR program extending to smaller facilities |
| **Modernization** | TAMR Phase 3 deployment, consolidating ARTS/DBRITE onto STARS |

### TAMR — Terminal Automation Modernization and Replacement
| Attribute | Detail |
|-----------|--------|
| **Function** | Program to replace legacy terminal systems (ARTS, DBRITE) with STARS |
| **Tech Stack** | Same as STARS (C/C++, Linux) |
| **Status** | Active deployment — ~50 facilities remaining |

### DASR — Digital Airport Surveillance Radar
| Attribute | Detail |
|-----------|--------|
| **Function** | Primary/secondary radar for terminal airspace |
| **Tech Stack** | C/C++, embedded Linux, FPGA signal processing |
| **Status** | Operational at 40+ sites |

---

## Traffic Management

### TFMS — Traffic Flow Management System
| Attribute | Detail |
|-----------|--------|
| **Function** | Strategic traffic flow management, ground delay programs, AFPs, reroutes |
| **Tech Stack** | Java (Spring), Oracle 19c, IBM MQ, Swing GUI (fat client) |
| **Architecture** | Client-server with centralized Oracle database |
| **Sites** | ATCSCC (Warrenton, VA) + TMU positions at ARTCCs |
| **Status** | Operational. GUI modernization planned (Swing → web) |
| **Modernization** | TBFM integration, web-based UI, cloud migration evaluation |

### TBFM — Time Based Flow Management
| Attribute | Detail |
|-----------|--------|
| **Function** | Arrival metering, scheduling, terminal sequencing |
| **Tech Stack** | Java, C++ (algorithm core), Oracle, JMS |
| **Status** | Operational at 35+ ARTCCs. Active enhancement program |

### TFDM — Tower Flight Data Manager
| Attribute | Detail |
|-----------|--------|
| **Function** | Electronic flight data, surface management, departure sequencing |
| **Tech Stack** | Java (Spring Boot), PostgreSQL, React (web UI), Kafka |
| **Architecture** | Microservices, cloud-ready |
| **Status** | IOC at CLT (2023), deploying to 89 airports |
| **Notes** | One of the most modern FAA NAS systems — built cloud-native |

---

## Surveillance

### ASDE-X — Airport Surface Detection Equipment, Model X
| Attribute | Detail |
|-----------|--------|
| **Function** | Airport surface surveillance and runway incursion alerting |
| **Tech Stack** | C/C++, custom radar processing, X11 display |
| **Sites** | 35 airports |
| **Status** | Operational, being replaced by ASSC |

### ASSC — Airport Surface Surveillance Capability
| Attribute | Detail |
|-----------|--------|
| **Function** | Next-gen surface surveillance (replaces ASDE-X) |
| **Tech Stack** | C++, modern Linux, multilateration + ADS-B fusion |
| **Status** | Deployment in progress |

### ADS-B — Automatic Dependent Surveillance–Broadcast
| Attribute | Detail |
|-----------|--------|
| **Function** | Satellite-based aircraft surveillance |
| **Tech Stack** | Ground stations: C/embedded, Backend: Java, Kafka, TimescaleDB |
| **Status** | Fully operational (mandate effective Jan 2020) |

---

## Information Management

### SWIM — System Wide Information Management
| Attribute | Detail |
|-----------|--------|
| **Function** | Enterprise SOA for NAS data sharing (flight, aero, weather, surveillance) |
| **Tech Stack** | Java (Spring), SOAP/REST, JMS (ActiveMQ/IBM MQ), AIXM/FIXM/WXXM, Oracle |
| **Architecture** | Publish-subscribe via JMS topics, REST pull for on-demand |
| **Status** | Operational. Core NAS data backbone |
| **Modernization** | REST API modernization, Kafka migration, cloud-native gateway |

### NOTAM System (USNS — US NOTAM System)
| Attribute | Detail |
|-----------|--------|
| **Function** | Creation, management, and distribution of NOTAMs |
| **Tech Stack** | Legacy: mainframe (COBOL/DB2), Modern: Java, Oracle, AIXM XML |
| **Status** | Partially modernized. D-NOTAM initiative ongoing |
| **Modernization** | Full D-NOTAM conversion, REST API, SWIM distribution |

### NASR — National Airspace System Resource Database
| Attribute | Detail |
|-----------|--------|
| **Function** | Authoritative source for aeronautical data (airports, navaids, airspace, procedures) |
| **Tech Stack** | Oracle (primary store), Java services, AIXM 5.1.1 XML export |
| **Status** | Operational. AIXM modernization ongoing |

### EFS — Electronic Flight Strip
| Attribute | Detail |
|-----------|--------|
| **Function** | Digital replacement for paper flight strips |
| **Tech Stack** | Java, touchscreen UI, local SQLite + central Oracle |
| **Status** | Deployed at select facilities |

---

## Weather Systems

### ITWS — Integrated Terminal Weather System
| Attribute | Detail |
|-----------|--------|
| **Function** | Terminal area weather detection and prediction |
| **Tech Stack** | C/C++, X11 display, dedicated weather processing hardware |
| **Status** | Operational at 46 sites |

### CIWS — Corridor Integrated Weather System
| Attribute | Detail |
|-----------|--------|
| **Function** | En route weather analysis for traffic management |
| **Tech Stack** | C++, Java (newer components), custom visualization |
| **Status** | Operational |

### WARP — Weather and Radar Processor
| Attribute | Detail |
|-----------|--------|
| **Function** | Weather display for ERAM controller positions |
| **Tech Stack** | C++, integrated with ERAM display subsystem |
| **Status** | Operational as part of ERAM |

---

## Communication Systems

### NVS — NAS Voice Switch
| Attribute | Detail |
|-----------|--------|
| **Function** | ATC voice communication switching |
| **Tech Stack** | VoIP (SIP), embedded C, redundant architecture |
| **Status** | Deployment in progress (replacing legacy analog) |

### DLAP — Data Link Application Processor
| Attribute | Detail |
|-----------|--------|
| **Function** | Controller-pilot data link communications (CPDLC) |
| **Tech Stack** | C/C++, message queue integration with ERAM |
| **Status** | Operational for en route |

---

## Mission Support Systems

### MMAC Enterprise Systems
| System | Function | Tech Stack |
|--------|----------|------------|
| **CASTLE** | Personnel/HR | COBOL/DB2 (mainframe), migrating |
| **REGIS** | Financial management | Oracle, Java, PL/SQL |
| **PRISM** | Procurement | Oracle EBS |
| **CEDAR** | Capital investment tracking | Java, Oracle |
| **VITAL** | Training records | Java, Oracle |

### NAS-EA — Enterprise Architecture
| Attribute | Detail |
|-----------|--------|
| **Function** | NAS enterprise architecture modeling and governance |
| **Tech Stack** | TOGAF-based, Sparx Enterprise Architect, web portal (Java/Angular) |
| **Status** | Active governance tool |

---

## CDM — Collaborative Decision Making
| Attribute | Detail |
|-----------|--------|
| **Function** | Data exchange between FAA and airlines for traffic management |
| **Tech Stack** | Java, SOAP web services, IBM MQ, Oracle |
| **Status** | Operational |

## ATOP — Advanced Technologies and Oceanic Procedures
| Attribute | Detail |
|-----------|--------|
| **Function** | Oceanic air traffic control automation |
| **Tech Stack** | Java, Oracle, custom displays |
| **Sites** | Oakland, New York, Anchorage oceanic centers |
| **Status** | Operational |

## CARTS — Common ARTS (legacy terminal)
| Attribute | Detail |
|-----------|--------|
| **Function** | Legacy terminal automation (predecessor to STARS at some sites) |
| **Tech Stack** | Ada, C, specialized hardware |
| **Status** | Being replaced by STARS under TAMR program |

---

## Summary Matrix

| System | Primary Language | Database | Status | Cloud Path |
|--------|-----------------|----------|--------|------------|
| ERAM | C++/Ada | Oracle | Operational | On-prem (indefinite) |
| STARS | C/C++ | Embedded | Operational | On-prem (indefinite) |
| TFMS | Java | Oracle | Operational | Evaluation |
| TBFM | Java/C++ | Oracle | Operational | Evaluation |
| TFDM | Java | PostgreSQL | Deploying | Cloud-ready |
| SWIM | Java | Oracle | Operational | Hybrid target |
| USNS (NOTAM) | COBOL→Java | DB2→Oracle | Modernizing | Hybrid target |
| NASR | Java | Oracle | Operational | Cloud candidate |
| ASDE-X | C/C++ | Embedded | Being replaced | N/A |
| ADS-B | Java/C | TimescaleDB | Operational | Hybrid |
| CDM | Java | Oracle | Operational | Cloud candidate |
| ATOP | Java | Oracle | Operational | Evaluation |
| ITWS | C/C++ | Files | Operational | On-prem |
| NVS | C/SIP | Embedded | Deploying | On-prem |
| CASTLE | COBOL | DB2 | Migrating | Cloud target |
