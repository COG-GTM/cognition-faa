export const stats = [
  { value: "200+", label: "Applications" },
  { value: "3,000", label: "Databases" },
  { value: "200M+", label: "Lines of Code" },
  { value: "10yr", label: "Contract Horizon" },
];

export const sdlcPhases = [
  {
    phase: "Requirements",
    tool: "OpenClaw + Jira",
    capability: "NL \u2192 structured spec",
  },
  {
    phase: "Specification",
    tool: "SDD Templates",
    capability: "Spec-Driven Design",
  },
  {
    phase: "Design",
    tool: "DeepWiki + Devin",
    capability: "Architecture from context",
  },
  {
    phase: "Implementation",
    tool: "Devin Cloud/CLI",
    capability: "100+ parallel sessions",
  },
  {
    phase: "Testing",
    tool: "Devin + TDD",
    capability: "Tests before code",
  },
  {
    phase: "Code Review",
    tool: "Devin Review",
    capability: "Auto-review, bug catch",
  },
  {
    phase: "Security",
    tool: "Compliance Suite",
    capability: "STIG, NIST, FedRAMP",
  },
  {
    phase: "Deployment",
    tool: "Devin API + CI/CD",
    capability: "Automated pipelines",
  },
  {
    phase: "Knowledge Capture",
    tool: "Advanced Devin",
    capability: "Self-improving system",
  },
];

export const capabilities = [
  {
    title: "LEGACY ANALYSIS",
    items: [
      "DeepWiki indexes entire codebase in minutes.",
      "Context for all future sessions.",
    ],
  },
  {
    title: "CODE MIGRATION",
    items: [
      "PL/SQL\u2192Postgres",
      "COBOL\u2192Modern",
      "REST\u2192GraphQL",
      "Batch: 100+ files parallel",
    ],
  },
  {
    title: "DB MODERNIZATION",
    items: [
      "3,000 database rationalization",
      "Schema analysis",
      "Dedup + merge",
    ],
  },
  {
    title: "SECURITY",
    items: [
      "Zero Trust",
      "STIG compliance",
      "NIST 800-53",
      "FedRAMP controls",
      "Continuous scan",
    ],
  },
  {
    title: "TESTING",
    items: [
      "Test-Driven Design built in",
      "Auto-generate test suites",
      "Coverage gates",
      "Computer-use E2E verification",
    ],
  },
  {
    title: "SCHEDULED SESSIONS",
    items: [
      "Nightly/weekly automated runs",
      "Health digests + coverage reports",
      "Lights-out operation",
    ],
  },
  {
    title: "SELF-IMPROVING",
    items: [
      "Every session makes the next one better.",
      "Playbook gen + knowledge mgmt",
    ],
  },
];

export const useCases = [
  {
    id: 1,
    title: "LEGACY CODE ANALYSIS",
    description: "Index and understand 200+ FAA applications instantly.",
    tools: "DeepWiki + Advanced Devin",
  },
  {
    id: 2,
    title: "PL/SQL TO POSTGRESQL",
    description: "Migrate Oracle stored procedures at scale.",
    tools: "Batch migration: 50+ files in parallel sessions.",
  },
  {
    id: 3,
    title: "COBOL CONVERSION",
    description: "Convert mainframe code to modern languages.",
    tools: "Full test coverage before and after.",
  },
  {
    id: 4,
    title: "DATABASE RATIONALIZATION",
    description: "Analyze, deduplicate, and consolidate 3,000 databases.",
    tools: "Schema analysis + migration planning.",
  },
  {
    id: 5,
    title: "SECURITY REMEDIATION",
    description:
      "Scan and auto-fix vulnerabilities against federal standards.",
    tools: "STIG, NIST 800-53, Zero Trust architecture.",
  },
  {
    id: 6,
    title: "AUTOMATED TESTING",
    description: "Generate comprehensive test suites for legacy code.",
    tools: "TDD pipeline: tests first, implementation second.",
  },
  {
    id: 7,
    title: "API MODERNIZATION",
    description: "Transform monoliths to microservices architectures.",
    tools: "REST\u2192GraphQL, containerization, CI/CD.",
  },
  {
    id: 8,
    title: "INCIDENT RESPONSE",
    description: "Auto-investigate production alerts and open fix PRs.",
    tools: "Sentry/Datadog webhook \u2192 Devin session \u2192 PR by morning.",
  },
];

export const securityPlatforms = [
  { platform: "Windsurf", fedramp: "FedRAMP High", il: "IL5-IL6" },
  { platform: "Devin", fedramp: "SOC 2 Type II", il: "\u2014" },
  { platform: "OpenClaw", fedramp: "Open Source", il: "\u2014" },
];

export const complianceFrameworks = [
  "NIST SP 800-207 (Zero Trust Architecture)",
  "NIST SP 800-53 (Security Controls)",
  "DISA STIG (All 18 categories)",
  "FedRAMP High Baseline",
  "AES-256 encryption at rest",
  "TLS 1.3+ in transit",
  "CAC/PIV authentication support",
  "60+ audit event types",
  "Enterprise guardrail enforcement",
  "Full session audit trail",
];

export const methodologyPhases = [
  {
    phase: "Spec",
    output: "spec.md + spec.json",
    validation: "What + Why — requirements captured",
  },
  {
    phase: "Design",
    output: "design.md + design.json",
    validation: "How + Architecture decisions",
  },
  {
    phase: "Build",
    output: "PR + changeset.json",
    validation: "Implementation from spec",
  },
  {
    phase: "Test",
    output: "test_summary.json",
    validation: "Unit, integration, lint, typecheck",
  },
  {
    phase: "Review",
    output: "review_findings.json",
    validation: "Devin Review + Bug Catcher",
  },
  {
    phase: "Evidence Pack",
    output: "evidence.md + evidence.json",
    validation: "Immutable audit bundle",
  },
  {
    phase: "Deliver",
    output: "Merged PR + artifacts",
    validation: "All gates passed",
  },
];

export const methodologyBenefits = [
  "Deterministic stage boundaries — every stage produces paired markdown + JSON outputs",
  "Machine-verifiable proof of correctness via artifact contracts",
  "Every requirement traceable to a test, every test traceable to evidence",
  "Consistent quality across 100+ parallel sessions",
  "Outputs from one stage become inputs to the next — minimal translation",
  "Onboarding: clone repo \u2192 start building. Day one.",
];

export const selfImprovingSteps = [
  "Every completed task is analyzed by Advanced Devin",
  "Successful patterns become reusable playbooks",
  "Knowledge base grows with each codebase indexed",
  "If no skill exists for a task, the system creates one",
  "New skills are pushed to the shared repo",
  "The entire team benefits immediately",
];

export const selfImprovingTimeline = [
  { session: "Session 1", result: "4 hours to migrate a module" },
  { session: "Session 10", result: "45 minutes (same complexity)" },
  { session: "Session 100", result: "Fully autonomous with human review only" },
];

export const architectureNodes = [
  {
    id: "orchestrator",
    label: "ORCHESTRATOR (OpenClaw)",
    subtitle: "Task routing \u2022 Governance \u2022 Audit",
    detail: "MCP: Jira, Slack, Teams",
    description:
      "The orchestration layer manages task routing, governance enforcement, and full audit trailing. Integrates with enterprise tools via MCP (Model Context Protocol) including Jira for project management, Slack and Teams for communication, and custom webhook endpoints for CI/CD pipelines.",
  },
  {
    id: "brain",
    label: "BRAIN + KNOWLEDGE (DeepWiki)",
    subtitle: "Codebase intel \u2022 Context \u2022 Learning",
    detail: "Advanced session analysis \u2022 MCP",
    description:
      "DeepWiki indexes entire codebases to provide deep contextual understanding. Every Devin session benefits from accumulated knowledge about code patterns, architecture decisions, and domain-specific context. Advanced session analysis continuously improves the knowledge base.",
  },
  {
    id: "cloud",
    label: "CLOUD",
    subtitle: "100+ agents",
    description:
      "Massively parallel cloud execution with 100+ simultaneous Devin agents. Each agent operates in an isolated, secure environment with full access to the knowledge base. Ideal for batch migrations, large-scale refactoring, and parallel test generation.",
  },
  {
    id: "cli",
    label: "CLI",
    subtitle: "Local exec",
    description:
      "Local command-line interface for developer workstations. Enables engineers to leverage Devin's capabilities directly in their development environment. Supports air-gapped and restricted network configurations required for federal systems.",
  },
  {
    id: "api",
    label: "API",
    subtitle: "CI/CD webhooks",
    description:
      "RESTful API with webhook support for seamless CI/CD integration. Trigger Devin sessions from GitHub Actions, Jenkins, GitLab CI, or any pipeline tool. Automated PR creation, code review, and deployment workflows.",
  },
  {
    id: "ide",
    label: "IDE",
    subtitle: "FedRAMP IL5-6",
    description:
      "FedRAMP-authorized IDE environment (Windsurf) supporting Impact Level 5 and 6 workloads. Enables development on classified and sensitive government systems with full compliance guardrails and audit controls.",
  },
  {
    id: "review",
    label: "REVIEW",
    subtitle: "Auto PR",
    description:
      "Automated code review on every pull request. Devin analyzes changes for security vulnerabilities, performance issues, code quality, and adherence to project standards. Provides actionable feedback with auto-fix suggestions.",
  },
  {
    id: "verify",
    label: "VERIFY",
    subtitle: "Self-test + Arena",
    description:
      "Devin 2.2 self-verify and auto-fix loop: build, test, lint, typecheck, security scan, and computer-use E2E verification. Divergence detection runs N independent sessions on high-risk tasks, compares outputs, and flags contradictions. Arena mode for mission-critical work. Every task produces an immutable evidence pack.",
  },
];

export const verificationFeatures = [
  {
    title: "SELF-VERIFY + AUTO-FIX",
    description:
      "Devin 2.2 runs a verification loop after every implementation: build, test, lint, typecheck, security scan, and computer-use E2E. Failures trigger auto-fix and re-verification before delivery.",
    details: [
      "Build + test + lint + typecheck gates",
      "Security scan (dependency + static analysis)",
      "Computer-use E2E smoke tests",
      "Auto-fix on failure, then re-verify",
      "Minimum definition-of-done gates per work type",
    ],
  },
  {
    title: "DIVERGENCE DETECTION",
    description:
      "High-risk tasks run N independent sessions with different prompts. Outputs are normalized to the same JSON schema and compared for contradictions. Unresolved divergence escalates to human review.",
    details: [
      "N independent sessions per high-impact task",
      "Entity overlap + invariant agreement scoring",
      "Conflicting claims flagged automatically",
      "Threshold-based escalation to human reviewer",
      "Arena mode for mission-critical decisions",
    ],
  },
  {
    title: "EVIDENCE PACKS",
    description:
      "Every task produces an immutable, machine-collectable evidence bundle. Session IDs, diff hashes, test logs, scan results, review findings, and knowledge updates — all preserved for audit.",
    details: [
      "Session IDs + timestamps",
      "Diff hashes for every change",
      "Test logs + coverage deltas",
      "Security scan outputs",
      "PR review findings + knowledge updates",
    ],
  },
];

export const objectiveStrengths = [
  {
    title: "PARALLELISM AT SCALE",
    description:
      "100+ isolated Devin sessions with consistent tooling and audit. Each session operates independently with full knowledge base access.",
  },
  {
    title: "KNOWLEDGE-AS-A-SERVICE",
    description:
      "Repo intelligence via MCP becomes reusable across tools. DeepWiki and Devin MCP provide structured access to codebase understanding.",
  },
  {
    title: "REPEATABILITY",
    description:
      "Playbooks + scheduled sessions encode runbooks. Every workflow is reproducible, auditable, and improvable over time.",
  },
  {
    title: "INDEPENDENT VERIFICATION",
    description:
      "Devin Review as a separate lens from self-verify. Divergence detection and arena mode for high-stakes decisions.",
  },
  {
    title: "GOVERNANCE PRIMITIVES",
    description:
      "Service users, RBAC, audit logs, secret scoping. Enterprise-grade access control and accountability.",
  },
];

export const objectiveLimitations = [
  {
    title: "DATABASE MIGRATIONS",
    description:
      "Complex data movement rules remain industry-wide challenge. Devin excels at schema comprehension and documentation, but end-to-end migration plans require human SMEs.",
  },
  {
    title: "FALSE CONFIDENCE RISK",
    description:
      "AI systems can present uncertain conclusions with high confidence. Mitigated by divergence detection, evidence gating, and explicit uncertainty measurement.",
  },
  {
    title: "ORCHESTRATOR HARDENING",
    description:
      "OpenClaw is single-operator, local-first with plaintext token risks. Must be treated as untrusted layer or hardened/forked for government production.",
  },
  {
    title: "ENVIRONMENT HETEROGENEITY",
    description:
      "FAA environments vary significantly. Expect integration work for internal artifact stores, scanners, network configurations, and legacy toolchains.",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Security", href: "#security" },
  { label: "Verification", href: "#verification" },
  { label: "Methodology", href: "#methodology" },
];
