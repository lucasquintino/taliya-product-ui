import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const crmSourcePath = path.join(root, "packages/crm/src/index.tsx");
const reportJsonPath = path.join(root, "specs/001-product-ui-foundation/domain-wrapper-audit.json");
const reportMdPath = path.join(root, "specs/001-product-ui-foundation/domain-wrapper-audit.md");

const wrapperContracts = [
  {
    name: "InvoiceTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["invoiceStatusLabelByStatus", "invoiceRowPeriod", "invoiceRowDue", "tcrm-invoice-table__actions"],
    value: "maps invoice rows into the official DataTable with billing-specific status, amount, due-date and sort behavior"
  },
  {
    name: "UsageLedgerTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["UsageLedgerOriginCell", "usageLedgerStatusTone", "usageLedgerStatusLabel", "data-component=\"UsageLedgerTable\""],
    value: "maps usage ledger rows into the official DataTable with usage-specific type, quota, status and sorting behavior"
  },
  {
    name: "TaskTable",
    kind: "table",
    globalRoots: ["<CrmWorklistTable"],
    requiredSnippets: ["taskTableStatusLabel", "taskTablePriorityLabel", "taskTableModeLabel", "taskTableSortValue", "data-component=\"TaskTable\""],
    value: "maps task rows into the official CrmWorklistTable with task-specific labels, chips, selected-row and disabled-row behavior"
  },
  {
    name: "LeadTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["leadTableSortValue", "tcrm-lead-table__lead-cell", "qualityTone", "nextActionTone", "data-component=\"LeadTable\""],
    value: "maps sales lead rows into the official DataTable with lead identity cells, quality/next-action tones and lead sorting"
  },
  {
    name: "ChecklistTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["ChecklistTableProgressCell", "checklistTableStatusLabel", "checklistTableStatusTone", "checklistTableSortValue", "data-component=\"ChecklistTable\""],
    value: "maps checklist rows into the official DataTable with progress cells, status tone and checklist sorting"
  },
  {
    name: "ApprovalTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["ApprovalTableRequesterCell", "approvalTableTypeIcon", "approvalTableRiskLabel", "approvalTableStatusTone", "data-component=\"ApprovalTable\""],
    value: "maps approval rows into the official DataTable with requester cells, type icon, risk label and status tone"
  },
  {
    name: "StudentTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["StudentTablePersonCell", "studentTableStatusLabel", "studentTableFinanceLabel", "studentTableRiskTone", "data-component=\"StudentTable\""],
    value: "maps student rows into the official DataTable with person cells, status/finance labels and risk tone"
  },
  {
    name: "ReplacementTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["ReplacementTableStudentCell", "replacementTableStatusLabel", "replacementTableModeLabel", "replacementTableSortValue", "data-component=\"ReplacementTable\""],
    value: "maps replacement rows into the official DataTable with student cells, status/mode labels and replacement sorting"
  },
  {
    name: "OperationActivityTable",
    kind: "table",
    globalRoots: ["<section"],
    requiredSnippets: ["operationActivityStatusIcon", "operationActivityTone", "tcrm-operation-activity-table__row", "data-component=\"OperationActivityTable\""],
    value: "renders the operation activity list with operation-specific actor/action/object/status row anatomy and source/empty/loading/blocked states"
  },
  {
    name: "FieldMappingTable",
    kind: "table",
    globalRoots: ["<DataTable"],
    requiredSnippets: ["targetOptions", "statusByState", "tcrm-field-mapping-panel__select", "tcrm-field-mapping-panel__status"],
    value: "maps imported fields to Taliya fields with select controls, validation state labels and row actions"
  },
  {
    name: "ReconciliationSummaryTable",
    kind: "table",
    globalRoots: ["<Panel"],
    requiredSnippets: ["rows.map", "role=\"table\"", "onReconcile?.(row)", "data-component=\"ReconciliationSummaryTable\""],
    value: "renders the source-derived reconciliation summary in an official Panel with finance-specific cells, status tones and row reconciliation actions"
  },
  {
    name: "ExecutionTraceTable",
    kind: "table",
    globalRoots: ["<Panel"],
    requiredSnippets: ["tcrm-execution-trace__table", "role=\"table\"", "onViewAll", "data-component=\"ExecutionTraceTable\""],
    value: "renders the source-derived agent execution trace in an official Panel with step, tool, status, duration, cost and error mapping"
  },
  {
    name: "PrivacyRequestTable",
    kind: "table",
    globalRoots: ["<Panel"],
    requiredSnippets: ["tcrm-privacy-request__table", "role=\"table\"", "onOpenRequest?.(id)", "data-component=\"PrivacyRequestTable\""],
    value: "renders the source-derived privacy request workflow in an official Panel with LGPD actions, status mapping and request callbacks"
  },
  {
    name: "TaskDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["tcrm-task-drawer__check-row", "tcrm-task-drawer__comment", "historySection", "component=\"TaskDrawer\""],
    value: "wraps the official CrmDrawer with task-specific facts, checklist rows, comments, activity and footer actions"
  },
  {
    name: "ApprovalDrawer",
    kind: "drawer",
    globalRoots: ["<ApprovalPanel"],
    requiredSnippets: ["open = true", "role=\"complementary\"", "data-component=\"ApprovalDrawer\"", "className={cn(\"tcrm-approval-drawer\""],
    value: "keeps the certified approval drawer wrapper around ApprovalPanel with open=false lifecycle and complementary landmark semantics"
  },
  {
    name: "CaseDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["facts", "history", "footerActions", "component=\"CaseDrawer\""],
    value: "wraps the official CrmDrawer with case-specific facts, history and case footer actions"
  },
  {
    name: "PaymentDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["tcrm-payment-drawer__summary", "tcrm-payment-drawer__history", "tcrm-payment-drawer__footer", "component=\"PaymentDrawer\""],
    value: "wraps the official CrmDrawer with payment-specific summary, history, copilot context and finance actions"
  },
  {
    name: "ReplacementDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["options", "tcrm-replacement-drawer__option", "tcrm-replacement-drawer__footer", "component=\"ReplacementDrawer\""],
    value: "wraps the official CrmDrawer with replacement options, scheduling notes and replacement actions"
  },
  {
    name: "LeadDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["checklist", "history", "drawerActions", "component=\"LeadDrawer\""],
    value: "wraps the official CrmDrawer with lead-specific checklist, timeline, sales facts and footer actions"
  },
  {
    name: "ChecklistDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["ProgressBar", "tcrm-checklist-drawer__step-button", "tcrm-checklist-drawer__activity", "component=\"ChecklistDrawer\""],
    value: "wraps the official CrmDrawer with checklist progress, step toggles, activity and footer actions"
  },
  {
    name: "StudentDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["tcrm-student-drawer__facts", "tcrm-student-drawer__classes", "tcrm-student-drawer__finance", "component=\"StudentDrawer\""],
    value: "wraps the official CrmDrawer with student facts, classes, finance, presence and pending-action sections"
  },
  {
    name: "ClassDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["Roster", "tcrm-class-drawer__summary", "tcrm-class-drawer__roster", "component=\"ClassDrawer\""],
    value: "wraps the official CrmDrawer with roster status controls, attendance summary and class footer actions"
  },
  {
    name: "AgentFlowDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["tcrm-agent-flow-drawer__questions", "tcrm-agent-flow-drawer__composer", "emitAgentFlowDrawerAction", "component=\"AgentFlowDrawer\""],
    value: "wraps the official CrmDrawer with suggested agent questions, chat composer and agent help actions"
  },
  {
    name: "UsageDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["usageDrawerCopy", "tcrm-usage-drawer__questions", "tcrm-usage-drawer__composer", "component=\"UsageDrawer\""],
    value: "wraps the official CrmDrawer with contextual usage-support copy, suggested questions and support composer"
  },
  {
    name: "SupportTicketDrawer",
    kind: "drawer",
    globalRoots: ["<SupportTicketPanel"],
    requiredSnippets: ["stateKey", "data-component=\"SupportTicketDrawer\"", "tcrm-support-ticket-drawer__panel", "role=\"complementary\""],
    value: "wraps the support ticket panel with ticket drawer lifecycle, state normalization and complementary landmark semantics"
  },
  {
    name: "TenantSecurityDrawer",
    kind: "drawer",
    globalRoots: ["<SecurityRulePanel"],
    requiredSnippets: ["tenantSecurityPanelState", "data-component=\"TenantSecurityDrawer\"", "tcrm-tenant-security-drawer__panel", "role=\"complementary\""],
    value: "wraps the tenant security panel with tenant-specific state normalization, close handling and disabled behavior"
  },
  {
    name: "TenantSummaryDrawer",
    kind: "drawer",
    globalRoots: ["<CrmDrawer"],
    requiredSnippets: ["defaultTenantSummaryFacts", "defaultTenantSummaryActivities", "tcrm-tenant-summary-drawer__actions", "component=\"TenantSummaryDrawer\""],
    value: "wraps the official CrmDrawer with selected-tenant facts, health, security, activity, copilot and governed actions"
  },
  {
    name: "CrmRecordDrawer",
    kind: "drawer",
    globalRoots: ["<Drawer"],
    requiredSnippets: ["DrawerSection", "Tabs", "tcrm-record-drawer__facts", "data-component=\"CrmRecordDrawer\""],
    value: "composes the official Drawer primitive into a generic CRM record drawer with facts, sections, tabs and actions"
  }
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function functionBlock(source, functionName) {
  const marker = `export function ${functionName}`;
  const start = source.indexOf(marker);
  if (start < 0) return null;

  const paramsStart = source.indexOf("(", start);
  if (paramsStart < 0) return null;

  let parenDepth = 0;
  let paramsEnd = -1;
  for (let index = paramsStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "(") parenDepth += 1;
    if (char === ")") {
      parenDepth -= 1;
      if (parenDepth === 0) {
        paramsEnd = index;
        break;
      }
    }
  }

  if (paramsEnd < 0) return null;

  const bodyStart = source.indexOf("{", paramsEnd);
  if (bodyStart < 0) return null;

  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  return null;
}

function publicExportNames(source) {
  const matches = [...source.matchAll(/export\s+function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g)];
  return matches.map((match) => match[1]);
}

function contractRow(source, contract) {
  const body = functionBlock(source, contract.name);
  const missingGlobalRoots = body ? contract.globalRoots.filter((snippet) => !body.includes(snippet)) : contract.globalRoots;
  const missingRequiredSnippets = body ? contract.requiredSnippets.filter((snippet) => !body.includes(snippet)) : contract.requiredSnippets;
  const pass = Boolean(body) && missingGlobalRoots.length === 0 && missingRequiredSnippets.length === 0;

  return {
    name: contract.name,
    kind: contract.kind,
    value: contract.value,
    present: Boolean(body),
    globalRoots: contract.globalRoots,
    requiredSnippets: contract.requiredSnippets,
    missingGlobalRoots,
    missingRequiredSnippets,
    pass
  };
}

const crmSource = read(crmSourcePath);
const rows = wrapperContracts.map((contract) => contractRow(crmSource, contract));
const failedRows = rows.filter((row) => !row.pass);
const legacyDirectDrawerRows = rows.filter((row) => (
  row.kind === "drawer" && row.globalRoots.some((rootSnippet) => rootSnippet.includes("<aside"))
));
const knownWrapperNames = new Set(wrapperContracts.map((contract) => contract.name));
const exportedNames = publicExportNames(crmSource);
const unmanagedDomainWrappers = exportedNames.filter((name) => {
  if (knownWrapperNames.has(name)) return false;
  return /(Table|Drawer)$/.test(name) && !["DataTable", "CrmDrawer"].includes(name);
});

const unmanagedAllowed = new Set([]);
const unexpectedUnmanagedDomainWrappers = unmanagedDomainWrappers.filter((name) => !unmanagedAllowed.has(name));

const report = {
  date: new Date().toISOString().slice(0, 10),
  status: failedRows.length === 0 && unexpectedUnmanagedDomainWrappers.length === 0 && legacyDirectDrawerRows.length === 0 ? "pass" : "fail",
  contractCount: rows.length,
  failedCount: failedRows.length,
  legacyDirectDrawerCount: legacyDirectDrawerRows.length,
  rows,
  legacyDirectDrawerRows: legacyDirectDrawerRows.map((row) => row.name),
  unmanagedDomainWrappers: unmanagedDomainWrappers.map((name) => ({
    name,
    status: unmanagedAllowed.has(name) ? "allowed-existing-domain-wrapper" : "unmanaged-wrapper-contract-required"
  })),
  unexpectedUnmanagedDomainWrappers,
  note: "This audit proves retained domain wrappers add explicit domain mapping/anatomy instead of staying empty pass-through wrappers. It does not certify pixel-level visual parity. Drawer wrappers may use CrmDrawer or another documented official drawer/panel root, but direct <aside> drawer contracts fail this audit."
};

if (!checkMode) fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

function markdownCell(value) {
  return String(value).replaceAll("|", "\\|");
}

const tableRows = rows.map((row) => {
  const missing = [...row.missingGlobalRoots, ...row.missingRequiredSnippets].join(", ") || "-";
  return `| \`${markdownCell(row.name)}\` | ${row.kind} | ${row.pass ? "pass" : "fail"} | ${markdownCell(row.value)} | ${markdownCell(missing)} |`;
});
const unmanagedRows = report.unmanagedDomainWrappers.length
  ? report.unmanagedDomainWrappers.map((row) => `| \`${markdownCell(row.name)}\` | ${row.status} |`).join("\n")
  : "| None | - |";

if (!checkMode) fs.writeFileSync(
  reportMdPath,
  `# Domain Wrapper Audit

Generated: ${new Date().toISOString()}

Status: ${report.status}

This audit protects the official library architecture rule that domain wrappers may remain only when they add domain-specific mapping or anatomy instead of staying empty pass-through wrappers. Rows also preserve global roots such as \`CrmWorklistTable\`, \`DataTable\`, \`CrmDrawer\`, and documented official drawer/panel roots. Direct \`<aside>\` drawer contracts fail this audit instead of being accepted as future hidden debt.

Legacy direct drawer contracts: ${report.legacyDirectDrawerCount}

It is not source-image 1:1 certification.

## Contract Rows

| Wrapper | Kind | Status | Domain value | Missing snippets |
| --- | --- | --- | --- | --- |
${tableRows.join("\n")}

## Other Exported Domain Wrappers

These wrappers are intentionally left for future focused contracts or existing domain-drawer coverage. New table/drawer wrappers must be added to this audit instead of staying unmanaged.

| Wrapper | Status |
| --- | --- |
${unmanagedRows}
`
);

if (!checkMode) console.log(`Domain wrapper audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Domain wrapper contracts: ${rows.length} scanned, ${failedRows.length} failed.`);

if (checkMode && report.status !== "pass") {
  console.error("Domain wrapper audit failed.");
  console.error(JSON.stringify({
    failedRows,
    legacyDirectDrawerRows: report.legacyDirectDrawerRows,
    unexpectedUnmanagedDomainWrappers
  }, null, 2));
  process.exit(1);
}
