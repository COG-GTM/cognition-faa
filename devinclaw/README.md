# DevinClaw — FAA Overlay

This directory contains the FAA-specific overlay for [DevinClaw](https://github.com/COG-GTM/devinclaw), Cognition's enterprise deployment framework for Devin.

## Quick Start

1. **Clone the base framework:**
   ```bash
   git clone https://github.com/COG-GTM/devinclaw.git
   cd devinclaw
   ```

2. **Copy this overlay into the base framework:**
   ```bash
   cp -r /path/to/cognition-faa-ui/devinclaw/* .
   ```

3. **Configure your environment** per the base framework's setup guide, then layer in the FAA-specific skills and knowledge below.

## What's Included

### `faa-knowledge/`
Domain knowledge that Devin loads as context when working on FAA systems:
- **NOTAM formats** — ICAO structure, D-NOTAM XML, SWIM distribution
- **AIXM standards** — AIXM 5.1.1 data model, temporal model, GML geometries
- **FAA coding conventions** — Java, PL/SQL, COBOL standards per FAA directives
- **FAA tech stack** — Complete technology inventory across the enterprise
- **FAA systems inventory** — 20+ major NAS systems with tech stacks and modernization status

### `faa-playbooks/`
Step-by-step Devin playbooks for common FAA modernization tasks:
- Legacy code analysis (Java/COBOL/PL/SQL)
- Oracle-to-PostgreSQL migration
- STIG + NIST security auditing
- SWIM service endpoint modernization

### `faa-skills/`
Skill configuration overrides that tune DevinClaw's built-in skills for FAA-specific intent detection, knowledge requirements, and scope parameters.

### `SKILLS-MAP-FAA.md`
Maps each DevinClaw skill to concrete FAA systems and modernization scenarios.

## Architecture

This overlay follows DevinClaw's standard extension pattern:
```
devinclaw/
├── README.md                    # This file
├── SKILLS-MAP-FAA.md            # Skill-to-system mapping
├── faa-knowledge/               # Domain context (loaded into Devin sessions)
├── faa-playbooks/               # Executable playbooks (.devin.md)
└── faa-skills/                  # Skill config overrides (.json)
```

Knowledge files are injected as context when Devin enters an FAA workspace. Playbooks are selectable from the DevinClaw orchestration layer. Skill configs override default thresholds and intent matching for FAA-specific terminology.

## Scope

This overlay targets the FAA's National Airspace System (NAS) modernization portfolio — approximately 500+ applications, 3,000+ databases, and decades of accumulated technical debt across mainframe, midrange, and distributed systems.
