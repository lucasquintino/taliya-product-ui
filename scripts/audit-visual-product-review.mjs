import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const checkMode = args.includes("--check");

function optionValue(name, fallback) {
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  if (equals) return equals.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

function readJson(path, label) {
  if (!existsSync(path)) throw new Error(`Missing ${label}: ${relative(root, path)}`);
  return JSON.parse(readFileSync(path, "utf8"));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fileUrl(path) {
  return pathToFileURL(path).href;
}

const specDir = resolve(root, "specs/001-product-ui-foundation");
const planPath = resolve(specDir, optionValue("--plan", "visual-certification-plan-audit.json"));
const capturePath = resolve(specDir, optionValue("--capture", "visual-certification-capture-audit.json"));
const reportJsonPath = resolve(specDir, optionValue("--report", "visual-product-review-audit.json"));
const reportMdPath = resolve(specDir, optionValue("--report-md", "visual-product-review-audit.md"));
const boardDir = resolve(root, optionValue("--board-dir", "tmp/visual-product-review"));
const boardPath = resolve(boardDir, "index.html");
const sourceDir = resolveSourceAssetsDir({ root, args, requireExisting: true }).path;

const plan = readJson(planPath, "visual certification plan");
const capture = readJson(capturePath, "visual certification capture");
const captureByImage = new Map((capture.rows ?? []).map((row) => [row.image, row]));
const pendingRows = plan.pendingRows ?? [];

const rows = pendingRows.map((row, index) => {
  const evidence = captureByImage.get(row.image);
  const sourcePath = resolve(sourceDir, row.image);
  const currentPath = evidence?.currentArtifact ? resolve(root, evidence.currentArtifact) : "";
  const diffPath = evidence?.diffArtifact ? resolve(root, evidence.diffArtifact) : "";
  return {
    priority: index + 1,
    image: row.image,
    status: row.status,
    mode: row.certificationMode,
    storyId: row.story,
    storyUrl: evidence?.storyUrl ?? null,
    sourcePath,
    currentPath,
    diffPath,
    sourceExists: existsSync(sourcePath),
    currentExists: Boolean(currentPath) && existsSync(currentPath),
    diffExists: Boolean(diffPath) && existsSync(diffPath),
    sourceSha256: evidence?.sourceSha256 ?? null,
    currentSha256: evidence?.currentSha256 ?? null,
    diffSha256: evidence?.diffSha256 ?? null,
    meanAbsoluteRgbDelta: evidence?.meanAbsoluteRgbDelta ?? null,
    differentPixelRatio: evidence?.differentPixelRatio ?? null,
    renderValid: evidence?.renderValid === true,
    blocker: row.blocker,
    nextAction: row.nextAction
  };
});

const invalidRows = rows.filter((row) =>
  !row.sourceExists || !row.currentExists || !row.diffExists || !row.renderValid ||
  !row.sourceSha256 || !row.currentSha256 || !row.diffSha256
);
const reviewContract = rows.map((row) => ({
  image: row.image,
  status: row.status,
  mode: row.mode,
  storyId: row.storyId,
  sourceSha256: row.sourceSha256,
  currentSha256: row.currentSha256,
  diffSha256: row.diffSha256,
  meanAbsoluteRgbDelta: row.meanAbsoluteRgbDelta,
  differentPixelRatio: row.differentPixelRatio,
  blocker: row.blocker,
  nextAction: row.nextAction
}));
const reviewContractSha256 = sha256(JSON.stringify(reviewContract));
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  status: invalidRows.length === 0 && rows.length === pendingRows.length ? "pass-review-ready-not-approved" : "fail-review-evidence",
  note: "This report prepares product review. It never approves visual parity automatically.",
  sourceDir,
  planRowCount: pendingRows.length,
  reviewRowCount: rows.length,
  invalidRowCount: invalidRows.length,
  productReviewDecisionCount: rows.filter((row) => row.mode === "product-review-decision").length,
  reviewContractSha256,
  rows
};

if (checkMode) {
  const recorded = readJson(reportJsonPath, "visual product review report");
  const current = recorded.schemaVersion === 1 &&
    recorded.reviewContractSha256 === reviewContractSha256 &&
    recorded.reviewRowCount === rows.length &&
    recorded.invalidRowCount === 0 &&
    recorded.status === "pass-review-ready-not-approved";
  if (!current || report.status !== "pass-review-ready-not-approved") {
    console.error(`Visual product review evidence is stale or invalid: rows=${rows.length}; invalid=${invalidRows.length}`);
    process.exit(1);
  }
  console.log(`Visual product review evidence: current; ${rows.length}/${rows.length} rows review-ready, 0 approved automatically.`);
  process.exit(0);
}

mkdirSync(boardDir, { recursive: true });
writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(reportMdPath, `# Visual Product Review Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit prepares source-backed product review. It does not approve any image automatically.

| Metric | Count |
| --- | ---: |
| Pending plan rows | ${report.planRowCount} |
| Review-ready rows | ${report.reviewRowCount - report.invalidRowCount} |
| Invalid evidence rows | ${report.invalidRowCount} |
| Product-review decisions | ${report.productReviewDecisionCount} |

Review contract SHA-256: \`${report.reviewContractSha256}\`

Generated local board: \`${relative(root, boardPath)}\`

| Priority | Image | Mean RGB delta | Different pixels | Evidence |
| ---: | --- | ---: | ---: | --- |
${rows.map((row) => `| ${row.priority} | \`${row.image}\` | ${row.meanAbsoluteRgbDelta?.toFixed(4) ?? "n/a"} | ${row.differentPixelRatio == null ? "n/a" : `${(row.differentPixelRatio * 100).toFixed(2)}%`} | ${row.sourceExists && row.currentExists && row.diffExists && row.renderValid ? "ready" : "invalid"} |`).join("\n")}
`);

const cards = rows.map((row) => `
  <article class="review-row" id="row-${row.priority}">
    <header>
      <div><span class="priority">${row.priority}</span><h2>${escapeHtml(row.image)}</h2></div>
      <a href="${escapeHtml(row.storyUrl)}" target="_blank" rel="noreferrer">Abrir Storybook</a>
    </header>
    <div class="metrics">
      <span>Delta RGB <strong>${row.meanAbsoluteRgbDelta?.toFixed(4) ?? "n/a"}</strong></span>
      <span>Pixels diferentes <strong>${row.differentPixelRatio == null ? "n/a" : `${(row.differentPixelRatio * 100).toFixed(2)}%`}</strong></span>
      <span>Status <strong>${escapeHtml(row.status)}</strong></span>
    </div>
    <div class="comparison">
      <figure><figcaption>Fonte</figcaption><a href="${fileUrl(row.sourcePath)}"><img loading="lazy" decoding="async" src="${fileUrl(row.sourcePath)}" alt="Fonte ${escapeHtml(row.image)}"></a></figure>
      <figure><figcaption>Render atual</figcaption><a href="${fileUrl(row.currentPath)}"><img loading="lazy" decoding="async" src="${fileUrl(row.currentPath)}" alt="Render atual ${escapeHtml(row.image)}"></a></figure>
      <figure><figcaption>Diff</figcaption><a href="${fileUrl(row.diffPath)}"><img loading="lazy" decoding="async" src="${fileUrl(row.diffPath)}" alt="Diff ${escapeHtml(row.image)}"></a></figure>
    </div>
    <dl><dt>Bloqueador</dt><dd>${escapeHtml(row.blocker)}</dd><dt>Próxima ação</dt><dd>${escapeHtml(row.nextAction)}</dd></dl>
  </article>`).join("\n");

writeFileSync(boardPath, `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Taliya Visual Product Review</title>
<style>
:root{font-family:Inter,system-ui,sans-serif;color:#17191d;background:#f4f5f7}*{box-sizing:border-box}body{margin:0}nav{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:#fff;border-bottom:1px solid #d9dde4}nav strong{font-size:16px}nav span{color:#5c6470;font-size:13px}main{max-width:1480px;margin:auto;padding:24px}.review-row{margin:0 0 24px;padding:20px;background:#fff;border:1px solid #d9dde4;border-radius:6px}.review-row header,.review-row header div,.metrics{display:flex;align-items:center}.review-row header{justify-content:space-between;gap:16px}.review-row header div{min-width:0;gap:10px}.review-row h2{margin:0;font-size:15px;overflow-wrap:anywhere}.priority{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#17191d;color:#fff;font-size:12px;flex:none}a{color:#075ee8;text-decoration:none}.metrics{gap:24px;margin:14px 0;color:#5c6470;font-size:12px}.metrics strong{color:#17191d}.comparison{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}figure{margin:0;border:1px solid #d9dde4;background:#f7f8fa}figcaption{padding:8px 10px;font-size:12px;font-weight:700;border-bottom:1px solid #d9dde4}img{display:block;width:100%;aspect-ratio:1.45;object-fit:contain;background:#fff}dl{display:grid;grid-template-columns:110px 1fr;gap:8px 12px;margin:16px 0 0;font-size:12px}dt{font-weight:700}dd{margin:0;color:#454c57}@media(max-width:800px){main{padding:12px}.comparison{grid-template-columns:1fr}.metrics{align-items:flex-start;flex-direction:column;gap:6px}dl{grid-template-columns:1fr}.review-row header{align-items:flex-start;flex-direction:column}}
</style></head><body><nav><strong>Taliya Visual Product Review</strong><span>${rows.length} decisões, zero aprovações automáticas</span></nav><main>${cards}</main></body></html>`);

console.log(`Visual product review: ${report.status}; ${rows.length}/${rows.length} rows.`);
console.log(`Wrote ${relative(root, reportMdPath)}`);
console.log(`Wrote ${relative(root, reportJsonPath)}`);
console.log(`Wrote ${relative(root, boardPath)}`);

if (report.status !== "pass-review-ready-not-approved") process.exit(1);
