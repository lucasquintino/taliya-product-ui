import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");

function optionValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`Missing value for ${name}`);
  return value;
}

const mapPath = resolve(root, optionValue("--map", "specs/001-product-ui-foundation/image-coverage-map.md"));
const storybookIndexPath = resolve(root, optionValue("--storybook-index", "apps/docs/storybook-static/index.json"));
const sourceManifestPath = resolve(root, optionValue("--source-manifest", "specs/002-readiness-evidence-portability/source-assets-manifest.json"));
const outputDir = resolve(root, optionValue("--out-dir", "specs/001-product-ui-foundation"));
const reportJsonPath = resolve(outputDir, "reference-sheet-coverage-audit.json");
const reportMdPath = resolve(outputDir, "reference-sheet-coverage-audit.md");
const sourceDir = resolveSourceAssetsDir({ root, args: process.argv.slice(2), requireExisting: true }).path;
const officialTitlePrefixes = ["Foundations / Tokens /", "Primitives / UI /", "CRM /"];

const referenceImages = new Set([
  "01_round-1_visual-dna-tokens_aprovada.png",
  "07_round-3a_componentes-web-referencia_aprovada.png",
  "08_round-3b1_inputs-formularios-filtros_aprovada.png",
  "09_round-3b2_overlays-feedback_aprovada.png",
  "10_round-3b3_visualizacoes-operacionais_aprovada.png",
  "11_round-3b4_comunicacao-agentes_aprovada.png",
  "12_round-3b5_sistema-plano-governanca_aprovada.png",
  "13_round-3c1_objetos-setup-dados_aprovada.png",
  "14_round-3c2_agenda-financeiro-documentos_aprovada.png",
  "15_round-3c3_agentes-auditoria-relatorios_aprovada.png",
  "16_round-4.1S_app-shell_01_base-web.png"
]);

const storyAliases = {
  "Design tokens": "foundations-tokens-overview--default",
  "Typography tokens": "foundations-tokens-typography--default",
  "Status semantic tokens": "foundations-tokens-status--default",
  SidebarItem: "crm-shell-components--sidebar-item-states",
  ProductWindowFrame: "crm-shell-components--product-window-frame-story",
  CrmProductShell: "crm-shell-journeyshellcanvas--source",
  CompactCalendar: "crm-agenda-compactcalendar--source",
  ComposerPanel: "crm-inbox-composerpanel--source",
  ChannelStatusPanel: "crm-inbox-channelstatuspanel--source",
  ConversationList: "crm-inbox-conversationlist--source-compact",
  ConversationThread: "crm-inbox-conversationthread--source-compact",
  CopilotPanel: "crm-agent-copilotpanel--source",
  ApprovalPanel: "crm-approvals-approvalpanel--source-compact",
  ExecutionReceipt: "crm-agents-executionreceipt--source-compact",
  HandoffBanner: "crm-inbox-handoffbanner--source-compact",
  StudentHeader: "crm-students-studentheader--source-reference",
  WeeklyCalendar: "crm-agenda-weeklycalendar--source-reference",
  ClassCard: "crm-agenda-classcard--source-reference",
  Roster: "crm-agenda-roster--source-reference",
  FlowBuilder: "crm-agents-flowbuilder--source-reference",
  ModeSelector: "crm-agents-modeselector--source-reference",
  BeforeAfterDiff: "crm-approvals-beforeafterdiffreference--source",
  AuditTrail: "crm-timeline-audittrailreference--source",
  Sidebar: "crm-shell-components--sidebar-story",
  Topbar: "crm-shell-components--topbar-story",
  PageHeader: "crm-shell-components--page-header-story",
  GlobalActions: "crm-shell-components--global-actions-story"
};

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function stableAudit(audit, generatedAt = audit.generatedAt) {
  return `${JSON.stringify({ ...audit, generatedAt }, null, 2)}\n`;
}

function mapRows() {
  return readFileSync(mapPath, "utf8").split(/\r?\n/).flatMap((line, index) => {
    if (!line.trim().startsWith("|") || line.includes("| ---")) return [];
    const cells = line.split("|").slice(1, -1).map((cell) => cell.replace(/`/g, "").trim());
    const image = cells[0] ?? "";
    if (!referenceImages.has(image)) return [];
    return [{
      line: index + 1,
      image,
      mapStatus: cells[1] ?? "",
      role: cells[2] ?? "",
      requiredComponents: (cells[3] ?? "").split(",").map((value) => value.trim()).filter(Boolean)
    }];
  });
}

if (!existsSync(storybookIndexPath)) throw new Error("Build Storybook before auditing reference-sheet coverage.");
if (!existsSync(sourceManifestPath)) throw new Error("Generate the source-assets manifest before auditing reference-sheet coverage.");
const storybook = JSON.parse(readFileSync(storybookIndexPath, "utf8"));
const sourceManifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));
const sourceManifestByName = new Map((sourceManifest.images ?? []).map((image) => [image.name, image]));
const storyEntries = Object.entries(storybook.entries ?? {}).filter(([, entry]) => entry.type === "story");

function resolveStory(component) {
  const alias = storyAliases[component];
  if (alias) {
    const entry = storybook.entries?.[alias];
    return {
      storyId: entry?.type === "story" ? alias : null,
      candidates: entry?.type === "story" ? [alias] : [],
      official: Boolean(entry && officialTitlePrefixes.some((prefix) => entry.title.startsWith(prefix)))
    };
  }
  const expected = normalize(component);
  const candidates = storyEntries
    .filter(([, entry]) => normalize(entry.title.split("/").at(-1)?.trim() ?? "") === expected)
    .map(([storyId]) => storyId);
  const storyId = candidates.length === 1 ? candidates[0] : null;
  const entry = storyId ? storybook.entries[storyId] : null;
  return {
    storyId,
    candidates,
    official: Boolean(entry && officialTitlePrefixes.some((prefix) => entry.title.startsWith(prefix)))
  };
}

const rows = mapRows().map((row) => {
  const sourcePath = resolve(sourceDir, row.image);
  const sourceExists = existsSync(sourcePath);
  const sourceSha256 = sourceExists ? sha256(sourcePath) : null;
  const manifestImage = sourceManifestByName.get(row.image) ?? null;
  const componentRows = row.requiredComponents.map((component) => {
    const resolution = resolveStory(component);
    return { component, ...resolution };
  });
  const missingComponents = componentRows.filter((item) => !item.storyId).map((item) => item.component);
  const ambiguousComponents = componentRows.filter((item) => item.candidates.length > 1).map((item) => item.component);
  const nonOfficialComponents = componentRows.filter((item) => item.storyId && !item.official).map((item) => item.component);
  const manifestMatches = Boolean(manifestImage && manifestImage.sha256 === sourceSha256);
  return {
    ...row,
    sourceExists,
    sourceSha256,
    sourceManifestSha256: manifestImage?.sha256 ?? null,
    sourceManifestMatches: manifestMatches,
    componentRows,
    storyIds: [...new Set(componentRows.map((item) => item.storyId).filter(Boolean))],
    missingComponents,
    ambiguousComponents,
    nonOfficialComponents,
    status: sourceExists && manifestMatches && missingComponents.length === 0 && ambiguousComponents.length === 0 && nonOfficialComponents.length === 0
      ? "pass"
      : "fail"
  };
});

const missingReferenceRows = [...referenceImages].filter((image) => !rows.some((row) => row.image === image));
const audit = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  status: rows.length === referenceImages.size && rows.every((row) => row.status === "pass") ? "pass-structural-not-visual" : "fail",
  note: "This maps each active reference-sheet component to an official Storybook target. It does not certify whole-sheet pixel parity.",
  inputs: {
    imageCoverageMapSha256: sha256(mapPath),
    storybookIndexSha256: sha256(storybookIndexPath),
    sourceAssetsManifestSha256: sha256(sourceManifestPath)
  },
  referenceImageCount: referenceImages.size,
  mappedReferenceImageCount: rows.length,
  resolvedComponentCount: rows.reduce((sum, row) => sum + row.componentRows.length - row.missingComponents.length, 0),
  missingComponentCount: rows.reduce((sum, row) => sum + row.missingComponents.length, 0),
  ambiguousComponentCount: rows.reduce((sum, row) => sum + row.ambiguousComponents.length, 0),
  nonOfficialComponentCount: rows.reduce((sum, row) => sum + row.nonOfficialComponents.length, 0),
  sourceManifestMismatchCount: rows.filter((row) => !row.sourceManifestMatches).length,
  missingReferenceRows,
  rows
};

if (!checkMode) {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(reportJsonPath, stableAudit(audit));
  const table = rows.map((row) =>
    `| \`${row.image}\` | ${row.requiredComponents.length} | ${row.storyIds.length} | ${row.missingComponents.join(", ") || "none"} | ${row.status} |`
  ).join("\n");
  writeFileSync(reportMdPath, `# Reference Sheet Coverage Audit

Generated: ${audit.generatedAt}

Status: ${audit.status}

This maps every component named by the 11 active reference sheets to an official Storybook story. It is structural certification coverage, not whole-sheet pixel approval.

| Image | Required components | Official story targets | Missing components | Status |
| --- | ---: | ---: | --- | --- |
${table}
`);
}

if (checkMode && outputDir === specDir) {
  const current = existsSync(reportJsonPath) ? JSON.parse(readFileSync(reportJsonPath, "utf8")) : null;
  if (!current || stableAudit(audit, current.generatedAt) !== stableAudit(current)) {
    console.error("Reference-sheet coverage report is stale. Run reference-sheet-coverage:audit:update after rebuilding Storybook and source evidence.");
    process.exit(1);
  }
}

console.log(`Reference sheets: ${audit.status}; ${audit.mappedReferenceImageCount}/${audit.referenceImageCount} sheets, ${audit.resolvedComponentCount} components resolved.`);
if (audit.status === "fail") {
  console.error(JSON.stringify({ missingReferenceRows, failedRows: rows.filter((row) => row.status === "fail") }, null, 2));
  process.exit(1);
}
