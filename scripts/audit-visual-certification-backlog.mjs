import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");

const ledgerPaths = [
  resolve(specDir, "batch-9-status-ledger.md"),
  resolve(specDir, "batch-11-status-ledger.md")
];
const imageCoverageMapPath = resolve(specDir, "image-coverage-map.md");

const statusLabels = [
  "Aprovado",
  "Aprovada",
  "Semi-aprovada",
  "Semi-aprovado",
  "Em revisão visual",
  "Em revisao visual",
  "Em revisão",
  "Em revisao",
  "Em ajuste",
  "Implementado sem certificacao",
  "Implementado sem certificação",
  "Nao iniciado",
  "Não iniciado",
  "Ignorada",
  "Ignorado"
];

const blockerPatterns = [
  /not certified 1:1/i,
  /not approved 1:1/i,
  /not certified pixel-perfect 1:1/i,
  /not certified/i,
  /not pixel-certified/i,
  /not source-image/i,
  /source-image visual certification/i,
  /não.*1:1/i,
  /nao.*1:1/i,
  /certification remains pending/i,
  /visual certification remains pending/i
];

function normalizeStatus(status) {
  const value = status.trim().toLowerCase();
  if (value.includes("semi-aprovad")) return "semiApproved";
  if (value.includes("aprovad")) return "approved";
  if (value.includes("ignorada") || value.includes("ignorado")) return "ignored";
  if (value.includes("revis")) return "visualReview";
  if (value.includes("ajuste")) return "adjusting";
  if (value.includes("implementado sem certifica")) return "implementedUncertified";
  if (value.includes("nao iniciado") || value.includes("não iniciado")) return "notStarted";
  return "unknown";
}

function classifyRow(filePath, subject) {
  const ledger = basename(filePath);
  const cleanSubject = subject.replace(/`/g, "").trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanSubject)) return "processFollowup";
  if (ledger === "batch-9-status-ledger.md" && /^\d+[A-Z]?$/.test(cleanSubject)) return "component";
  if (ledger === "batch-11-status-ledger.md" && /\.png/.test(cleanSubject)) return "image";
  return "processFollowup";
}

function extractStatus(cells) {
  for (const cell of cells) {
    const cleaned = cell.replace(/`/g, "").trim();
    const status = statusLabels.find((label) => cleaned === label || cleaned.startsWith(`${label} /`));
    if (status) return status;
  }
  return null;
}

function parseLedger(filePath) {
  const text = readFileSync(filePath, "utf8");
  const rows = [];
  const blockerMentions = [];

  text.split(/\r?\n/).forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    if (trimmed.startsWith("|") && !trimmed.includes("| ---")) {
      const cells = trimmed
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const status = extractStatus(cells);

      if (status) {
        rows.push({
          ledger: basename(filePath),
          line: lineNumber,
          subject: cells[0] ?? "",
          status,
          statusBucket: normalizeStatus(status),
          scope: classifyRow(filePath, cells[0] ?? ""),
          excerpt: trimmed.length > 260 ? `${trimmed.slice(0, 257)}...` : trimmed
        });
      }
    }

    if (blockerPatterns.some((pattern) => pattern.test(trimmed))) {
      blockerMentions.push({
        ledger: basename(filePath),
        line: lineNumber,
        excerpt: trimmed.length > 260 ? `${trimmed.slice(0, 257)}...` : trimmed
      });
    }
  });

  return { rows, blockerMentions };
}

function parseImageMap(filePath) {
  if (!existsSync(filePath)) return [];

  const rows = [];
  const text = readFileSync(filePath, "utf8");
  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed.startsWith("|") || trimmed.includes("| ---")) return;

    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    const image = (cells[0] ?? "").replace(/`/g, "");
    const status = cells[1] ?? "";

    if (/\.(?:png|jpe?g|webp)$/i.test(image)) {
      rows.push({
        line: index + 1,
        image,
        status,
        active: !/(?:historical|duplicate|rejected|superseded)/i.test(status),
        certified: /certified/i.test(status),
        excerpt: trimmed.length > 260 ? `${trimmed.slice(0, 257)}...` : trimmed
      });
    }
  });

  return rows;
}

const missingLedgers = ledgerPaths.filter((filePath) => !existsSync(filePath));
if (missingLedgers.length > 0) {
  console.error(`Missing visual certification ledger(s): ${missingLedgers.join(", ")}`);
  process.exit(1);
}

const parsedLedgers = ledgerPaths.map(parseLedger);
const rows = parsedLedgers.flatMap((ledger) => ledger.rows);
const blockerMentions = parsedLedgers.flatMap((ledger) => ledger.blockerMentions);
const imageMapRows = parseImageMap(imageCoverageMapPath);
const activeImageMapRows = imageMapRows.filter((row) => row.active);
const certifiedMapRows = imageMapRows.filter((row) => row.certified);
const imageLedgerRows = rows.filter((row) => row.scope === "image");
const missingImageCertificationRows = activeImageMapRows
  .filter((mapRow) => !imageLedgerRows.some((row) => row.subject.replace(/`/g, "").includes(mapRow.image)))
  .map((mapRow) => ({
    ledger: "image-coverage-map.md",
    line: mapRow.line,
    subject: mapRow.image,
    status: "Nao iniciado",
    statusBucket: "notStarted",
    scope: "image",
    excerpt: mapRow.excerpt
  }));
const imageMapCertificationConflicts = certifiedMapRows
  .map((mapRow) => {
    const ledgerRow = imageLedgerRows.find((row) => row.subject.replace(/`/g, "").includes(mapRow.image));
    if (!ledgerRow || ["approved", "ignored"].includes(ledgerRow.statusBucket)) return null;

    return {
      image: mapRow.image,
      imageCoverageMapLine: mapRow.line,
      imageCoverageMapStatus: mapRow.status,
      ledger: ledgerRow.ledger,
      ledgerLine: ledgerRow.line,
      ledgerStatus: ledgerRow.status,
      ledgerStatusBucket: ledgerRow.statusBucket
    };
  })
  .filter(Boolean);

const counts = rows.reduce(
  (acc, row) => {
    acc[row.statusBucket] = (acc[row.statusBucket] ?? 0) + 1;
    return acc;
  },
  {
    approved: 0,
    semiApproved: 0,
    visualReview: 0,
    adjusting: 0,
    implementedUncertified: 0,
    notStarted: 0,
    ignored: 0,
    unknown: 0
  }
);

const countsByScope = rows.reduce((acc, row) => {
  acc[row.scope] ??= {
    approved: 0,
    semiApproved: 0,
    visualReview: 0,
    adjusting: 0,
    implementedUncertified: 0,
    notStarted: 0,
    ignored: 0,
    unknown: 0
  };
  acc[row.scope][row.statusBucket] = (acc[row.scope][row.statusBucket] ?? 0) + 1;
  return acc;
}, {});

const certificationRows = rows.filter((row) => ["component", "image"].includes(row.scope));
const certificationCounts = certificationRows.reduce(
  (acc, row) => {
    acc[row.statusBucket] = (acc[row.statusBucket] ?? 0) + 1;
    return acc;
  },
  {
    approved: 0,
    semiApproved: 0,
    visualReview: 0,
    adjusting: 0,
    implementedUncertified: 0,
    notStarted: 0,
    ignored: 0,
    unknown: 0
  }
);
certificationCounts.notStarted += missingImageCertificationRows.length;

countsByScope.image ??= {
  approved: 0,
  semiApproved: 0,
  visualReview: 0,
  adjusting: 0,
  implementedUncertified: 0,
  notStarted: 0,
  ignored: 0,
  unknown: 0
};
countsByScope.image.notStarted += missingImageCertificationRows.length;

const globallyIncompleteCount =
  certificationCounts.semiApproved +
  certificationCounts.visualReview +
  certificationCounts.adjusting +
  certificationCounts.implementedUncertified +
  certificationCounts.notStarted +
  certificationCounts.unknown;

const audit = {
  generatedAt: new Date().toISOString(),
  date: new Date().toISOString().slice(0, 10),
  status: imageMapCertificationConflicts.length === 0 && missingImageCertificationRows.length === 0 ? "pass" : "fail",
  visualCertificationStatus: globallyIncompleteCount === 0 && blockerMentions.length === 0 && missingImageCertificationRows.length === 0 ? "complete" : "not-complete",
  imageMapCertificationStatus: imageMapCertificationConflicts.length === 0 ? "pass" : "conflict",
  imageCertificationCoverageStatus: missingImageCertificationRows.length === 0 ? "pass" : "incomplete",
  summary: {
    ledgers: ledgerPaths.map((filePath) => basename(filePath)),
    rowCount: rows.length,
    certificationRowCount: certificationRows.length + missingImageCertificationRows.length,
    blockerMentionCount: blockerMentions.length,
    globallyIncompleteCount,
    imageMapCertificationConflictCount: imageMapCertificationConflicts.length,
    imageMapRowCount: imageMapRows.length,
    activeImageTargetCount: activeImageMapRows.length,
    imageCertificationCoverageCount: activeImageMapRows.length - missingImageCertificationRows.length,
    missingImageCertificationCount: missingImageCertificationRows.length,
    counts,
    certificationCounts,
    countsByScope
  },
  rows,
  missingImageCertificationRows,
  imageMapCertificationConflicts,
  blockerMentions
};

const bucketLabel = {
  approved: "Aprovado",
  semiApproved: "Semi-aprovado",
  visualReview: "Em revisao visual",
  adjusting: "Em ajuste",
  implementedUncertified: "Implementado sem certificacao",
  notStarted: "Nao iniciado",
  ignored: "Ignorado",
  unknown: "Desconhecido"
};

const countRows = Object.entries(counts)
  .map(([bucket, count]) => `| ${bucketLabel[bucket] ?? bucket} | ${count} |`)
  .join("\n");

const certificationCountRows = Object.entries(certificationCounts)
  .map(([bucket, count]) => `| ${bucketLabel[bucket] ?? bucket} | ${count} |`)
  .join("\n");

const incompleteRows = [
  ...certificationRows.filter((row) => !["approved", "ignored"].includes(row.statusBucket)),
  ...missingImageCertificationRows
]
  .slice(0, 80)
  .map((row) => `| ${row.ledger}:${row.line} | ${row.scope} | ${row.subject} | ${row.status} |`)
  .join("\n");

const blockerRows = blockerMentions
  .slice(0, 80)
  .map((mention) => `| ${mention.ledger}:${mention.line} | ${mention.excerpt.replace(/\|/g, "\\|")} |`)
  .join("\n");

const imageMapConflictRows = imageMapCertificationConflicts
  .slice(0, 80)
  .map(
    (conflict) =>
      `| image-coverage-map.md:${conflict.imageCoverageMapLine} | ${conflict.image} | ${conflict.imageCoverageMapStatus} | ${conflict.ledger}:${conflict.ledgerLine} | ${conflict.ledgerStatus} |`
  )
  .join("\n");

const md = `# Visual Certification Backlog Audit

Date: ${audit.date}

Status: ${audit.visualCertificationStatus}. Integrity gate: ${audit.imageMapCertificationStatus}. This audit reads the Batch 9 and Batch 11 ledgers and makes the remaining visual-certification scope explicit. It does not certify pixels by itself. Component/image rows drive the global visual backlog; process follow-up rows are counted separately as operational history.

Active image certification coverage: ${audit.summary.imageCertificationCoverageCount}/${audit.summary.activeImageTargetCount}. Missing certification rows: ${audit.summary.missingImageCertificationCount}.

## Component/Image Certification Counts

| Status bucket | Count |
| --- | ---: |
${certificationCountRows}

## All Ledger Status Counts

| Status bucket | Count |
| --- | ---: |
${countRows}

## Incomplete Certification Rows

| Source | Scope | Subject | Status |
| --- | --- | --- | --- |
${incompleteRows || "| None | None | None | None |"}

## Image Coverage Map Certification Conflicts

These rows prevent old map labels from implying full-image 1:1 approval when the current image ledger still marks the same image as semi-approved, visual review, or adjusting.

| Map source | Image | Map status | Ledger source | Ledger status |
| --- | --- | --- | --- | --- |
${imageMapConflictRows || "| None | None | None | None | None |"}

## 1:1 / Certification Blocker Mentions

| Source | Mention |
| --- | --- |
${blockerRows || "| None | None |"}
`;

if (!checkMode) {
  writeFileSync(resolve(specDir, "visual-certification-backlog-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(resolve(specDir, "visual-certification-backlog-audit.md"), md);
}

if (checkMode && audit.status !== "pass") {
  console.error(
    `Visual certification backlog audit failed: imageMapCertificationConflicts=${imageMapCertificationConflicts.length}, missingImageCertificationRows=${missingImageCertificationRows.length}`
  );
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/visual-certification-backlog-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/visual-certification-backlog-audit.json");
}
