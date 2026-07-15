import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const handoffPath = resolve(specDir, "future-crm-adoption-handoff.md");
const reportJsonPath = resolve(specDir, "future-crm-adoption-handoff-audit.json");
const reportMdPath = resolve(specDir, "future-crm-adoption-handoff-audit.md");

const requiredHandoffSnippets = [
  "# Future CRM Adoption Handoff",
  "## Current Scope Vs Global Goal",
  "## Candidate Discovery Criteria",
  "## Bootstrap Sequence",
  "## Adoption Evidence Required",
  "## Non-Completion Rule",
  "corepack pnpm future-consumer-discovery:audit",
  "corepack pnpm future-consumer-discovery:audit:negative-probe",
  "corepack pnpm future-consumer-discovery:audit:partial-probe",
  "corepack pnpm future-consumer-discovery:audit:positive-probe",
  "corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files",
  "<future-crm-app>/features/crm/kanban/kanban-page.tsx",
  "<future-crm-app>/app/crm/kanban/page.tsx",
  "KanbanBoard",
  "KanbanColumn",
  "KanbanCard",
  "node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --report-label future-crm",
  "corepack pnpm future-consumer-adoption:audit",
  "corepack pnpm consumer-page-kit:audit:uncovered-route-probe",
  "corepack pnpm consumer-page-kit:audit:path-traversal-probe",
  "corepack pnpm consumer-readiness-config:audit:path-traversal-probe",
  "corepack pnpm future-consumer-adoption:audit:negative-probe",
  "library-readiness-gate-<label>.json",
  "must not be absolute and must not use `..`",
  "current Internal/library readiness accepted, future CRM adoption process proven, real future CRM adoption not executed"
];

const requiredLinks = [
  {
    path: "README.md",
    snippets: ["specs/001-product-ui-foundation/future-crm-adoption-handoff.md"]
  },
  {
    path: "specs/001-product-ui-foundation/contracts/consumer-integration-contract.md",
    snippets: ["specs/001-product-ui-foundation/future-crm-adoption-handoff.md"]
  },
  {
    path: "specs/001-product-ui-foundation/consumer-adoption-playbook.md",
    snippets: ["specs/001-product-ui-foundation/future-crm-adoption-handoff.md"]
  },
  {
    path: "specs/001-product-ui-foundation/local-readiness-runbook.md",
    snippets: ["specs/001-product-ui-foundation/future-crm-adoption-handoff.md", "corepack pnpm future-crm-adoption-handoff:audit"]
  },
  {
    path: "specs/001-product-ui-foundation/library-readiness-audit.md",
    snippets: ["specs/001-product-ui-foundation/future-crm-adoption-handoff.md"]
  }
];

function fileContent(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) return "";
  return readFileSync(absolutePath, "utf8");
}

const handoffExists = existsSync(handoffPath);
const handoff = handoffExists ? readFileSync(handoffPath, "utf8") : "";
const missingHandoffSnippets = requiredHandoffSnippets.filter((snippet) => !handoff.includes(snippet));
const linkRows = requiredLinks.map((link) => {
  const content = fileContent(link.path);
  const missingSnippets = link.snippets.filter((snippet) => !content.includes(snippet));
  return {
    path: link.path,
    exists: content.length > 0,
    requiredSnippets: link.snippets,
    missingSnippets,
    pass: content.length > 0 && missingSnippets.length === 0
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  status: handoffExists && missingHandoffSnippets.length === 0 && linkRows.every((row) => row.pass) ? "pass" : "fail",
  handoff: {
    path: handoffPath,
    exists: handoffExists,
    missingSnippets: missingHandoffSnippets
  },
  linkRows
};

if (!checkMode) writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const linkTable = linkRows
  .map((row) => `| \`${row.path}\` | ${row.exists ? "yes" : "no"} | ${row.pass ? "Pass" : "Fail"} | ${row.missingSnippets.join("; ") || "none"} |`)
  .join("\n");

if (!checkMode) writeFileSync(
  reportMdPath,
  `# Future CRM Adoption Handoff Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit proves the future CRM adoption handoff exists, contains the required non-completion and labeled-evidence rules, and is linked from the consumer adoption docs used by readiness gates.

Handoff exists: ${handoffExists ? "yes" : "no"}

Missing handoff snippets: ${missingHandoffSnippets.length ? missingHandoffSnippets.map((snippet) => `\`${snippet}\``).join(", ") : "none"}

## Link Checks

| File | Exists | Status | Missing snippets |
| --- | --- | --- | --- |
${linkTable}
`
);

console.log(`Future CRM adoption handoff audit: ${report.status}`);
console.log("Wrote specs/001-product-ui-foundation/future-crm-adoption-handoff-audit.md");
console.log("Wrote specs/001-product-ui-foundation/future-crm-adoption-handoff-audit.json");

if (checkMode && report.status !== "pass") {
  console.error("Future CRM adoption handoff audit failed.");
  process.exit(1);
}
