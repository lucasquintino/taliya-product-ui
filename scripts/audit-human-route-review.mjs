import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const coveragePath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
const manifestPath = resolve(root, "specs/002-readiness-evidence-portability/source-assets-manifest.json");
const outputPath = resolve(root, "specs/004-human-route-review/human-route-review.json");
const markdownPath = outputPath.replace(/\.json$/, ".md");

const coverage = JSON.parse(readFileSync(coveragePath, "utf8"));
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : { rows: [] };
const existingByImage = new Map((existing.rows ?? []).map((row) => [row.image, row]));
const sourceByName = new Map((manifest.images ?? []).map((image) => [image.name, image]));

function familyScenarios(family) {
  const shared = ["shell-navigation", "global-actions"];
  const byFamily = {
    Hoje: ["operational-row-actions", "section-navigation", "drawer-open-close"],
    "Operação": ["filter-search", "quick-filters", "kanban-card-actions", "drawer-open-close"],
    Tarefas: ["filter-search", "quick-filters", "table-selection", "pagination", "drawer-open-close"],
    Checklists: ["filter-search", "quick-filters", "table-selection", "checklist-actions", "drawer-open-close"],
    Inbox: ["conversation-selection", "thread-scroll", "composer", "context-panel-actions"],
    Aprovacoes: ["filter-search", "quick-filters", "table-selection", "approval-actions", "drawer-open-close"],
    Agenda: ["calendar-navigation", "calendar-item-actions", "drawer-open-close"],
    Alunos: ["filter-search", "quick-filters", "table-selection", "profile-tabs", "drawer-open-close"],
    Financeiro: ["filter-search", "table-or-kanban-actions", "pagination", "drawer-open-close"],
    "Reposições": ["filter-search", "quick-filters", "table-selection", "drawer-open-close"],
    Vendas: ["filter-search", "table-or-kanban-actions", "drawer-open-close"],
    Retencao: ["filter-search", "queue-selection", "drawer-open-close"],
    Relatorios: ["date-or-segment-filters", "dashboard-actions", "export-actions"],
    Suporte: ["support-navigation", "search", "support-actions"],
    Internal: ["internal-navigation", "table-selection", "tenant-actions", "drawer-open-close"],
    Setup: ["step-navigation", "form-controls", "back-continue", "validation-states"],
    Agentes: ["agent-selection", "flow-controls", "test-or-publish-actions", "drawer-or-panel-actions"],
    Configuracoes: ["settings-navigation", "form-controls", "save-actions", "validation-states"],
    Billing: ["billing-navigation", "plan-or-invoice-actions", "confirmation-states"],
    Usage: ["usage-filters", "table-or-summary-actions", "pagination"],
    "Access Subscription": ["form-controls", "back-continue", "validation-states", "handoff-actions"],
    "Image 79 Empty Shell": ["shell-navigation", "empty-state-actions"]
  };
  return [...new Set([...(family === "Access Subscription" || family === "Image 79 Empty Shell" ? [] : shared), ...(byFamily[family] ?? [])])];
}

function pendingReview() {
  return { status: "pending", reviewedAt: null, evidence: [], issues: [] };
}

const rows = coverage.rows.map((coverageRow) => {
  const previous = existingByImage.get(coverageRow.image);
  const source = sourceByName.get(coverageRow.image);
  const family = coverageRow.storyTitle.replace("CRM / Image Coverage / ", "");
  return {
    image: coverageRow.image,
    storyId: coverageRow.storyId,
    storyTitle: coverageRow.storyTitle,
    family,
    sourceViewport: { width: source?.width ?? null, height: source?.height ?? null },
    reviewViewports: {
      canonical: { width: source?.width ?? null, height: source?.height ?? null },
      desktopReduced: { width: 1448, height: 1086 },
      mobile: { width: 390, height: 844 }
    },
    expectedInteractions: familyScenarios(family),
    canonicalVisual: previous?.canonicalVisual ?? pendingReview(),
    desktopResponsive: previous?.desktopResponsive ?? pendingReview(),
    mobileResponsive: previous?.mobileResponsive ?? pendingReview(),
    interactionReview: previous?.interactionReview ?? { ...pendingReview(), tested: [] },
    sourceComparison: previous?.sourceComparison ?? pendingReview(),
    finalStatus: previous?.finalStatus ?? "pending",
    notes: previous?.notes ?? []
  };
});

const sourceImages = rows.map((row) => row.image);
const duplicateImages = sourceImages.filter((image, index, all) => all.indexOf(image) !== index);
const staleImages = (existing.rows ?? []).map((row) => row.image).filter((image) => !sourceImages.includes(image));
const invalidRows = rows.filter((row) =>
  !row.sourceViewport.width ||
  !row.sourceViewport.height ||
  ![row.canonicalVisual, row.desktopResponsive, row.mobileResponsive, row.interactionReview, row.sourceComparison]
    .every((review) => ["pending", "pass", "fail", "blocked", "not-applicable"].includes(review.status))
);
const completedRows = rows.filter((row) => row.finalStatus === "pass");
const failedRows = rows.filter((row) => row.finalStatus === "fail");
const status = duplicateImages.length || staleImages.length || invalidRows.length
  ? "fail-contract"
  : completedRows.length === rows.length
    ? "complete"
    : "in-progress";

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  status,
  targetRouteCount: rows.length,
  completedRouteCount: completedRows.length,
  failedRouteCount: failedRows.length,
  pendingRouteCount: rows.length - completedRows.length - failedRows.length,
  duplicateImages,
  staleImages,
  invalidImages: invalidRows.map((row) => row.image),
  rows
};

const familyRows = [...new Set(rows.map((row) => row.family))].sort().map((family) => {
  const familyRoutes = rows.filter((row) => row.family === family);
  return `| ${family} | ${familyRoutes.length} | ${familyRoutes.filter((row) => row.finalStatus === "pass").length} | ${familyRoutes.filter((row) => row.finalStatus === "fail").length} |`;
}).join("\n");

const markdown = `# Human Route Review\n\nGenerated: ${report.generatedAt}\n\nStatus: ${report.status}\n\n- Routes: ${report.targetRouteCount}\n- Passed: ${report.completedRouteCount}\n- Failed: ${report.failedRouteCount}\n- Pending: ${report.pendingRouteCount}\n\n| Family | Routes | Passed | Failed |\n| --- | ---: | ---: | ---: |\n${familyRows}\n\nThis ledger records browser-observed visual and interaction evidence. Automated Storybook coverage alone does not advance a route to pass.\n`;

if (!checkMode) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(markdownPath, markdown);
}

if (checkMode) {
  if (!existsSync(outputPath)) throw new Error("Human route review ledger is missing.");
  const recorded = JSON.parse(readFileSync(outputPath, "utf8"));
  const stable = ({ generatedAt: _generatedAt, ...value }) => value;
  if (JSON.stringify(stable(recorded)) !== JSON.stringify(stable(report))) {
    console.error("Human route review ledger is stale or its route contract drifted.");
    process.exit(1);
  }
}

console.log(`Human route review: ${status}; complete=${completedRows.length}/${rows.length}; failed=${failedRows.length}; pending=${report.pendingRouteCount}.`);
if (status === "fail-contract") process.exit(1);
