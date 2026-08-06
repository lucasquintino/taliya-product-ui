import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const certificationDir = path.join(root, "specs/005-joint-product-certification");
const contractsFile = path.join(certificationDir, "surface-contracts.json");
const legacyReviewFile = path.join(
  root,
  "specs/004-human-route-review/human-route-review.json",
);
const ledgerFile = path.join(certificationDir, "joint-certification-ledger.json");
const markdownFile = path.join(certificationDir, "joint-certification-ledger.md");
const update = process.argv.includes("--update");

const reviewDimensions = [
  "productPurpose",
  "requiredBlocks",
  "interactionOutcomes",
  "essentialStates",
  "componentOwnership",
  "duplicateArchitecture",
  "responsiveLayout",
  "accessibility",
  "consumerBoundary",
];
const reviewStatuses = new Set(["pending", "pass", "fail", "blocked", "not-applicable"]);
const ownerStatuses = new Set(["pending", "pass", "fail", "blocked"]);

function pendingReview() {
  return { status: "pending", reviewedAt: null, evidence: [], findings: [] };
}

function normalizeReview(review) {
  return {
    status: reviewStatuses.has(review?.status) ? review.status : "pending",
    reviewedAt: review?.reviewedAt ?? null,
    evidence: Array.isArray(review?.evidence) ? review.evidence : [],
    findings: Array.isArray(review?.findings) ? review.findings : [],
  };
}

function codexComplete(codex) {
  return reviewDimensions.every((dimension) =>
    ["pass", "not-applicable"].includes(codex[dimension].status),
  );
}

function deriveJointStatus(row) {
  const codexStatuses = reviewDimensions.map((dimension) => row.codex[dimension].status);
  if (codexStatuses.includes("fail") || row.productOwner.status === "fail") return "needs-fix";
  if (codexStatuses.includes("blocked") || row.productOwner.status === "blocked") return "blocked";
  if (!codexComplete(row.codex)) return "pending-codex";
  if (row.productOwner.status !== "pass") return "pending-product-owner";
  return "joint-pass";
}

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

const contracts = await readJson(contractsFile);
const legacyReview = await readJson(legacyReviewFile);
const previous = await readJson(ledgerFile, { rows: [] });

if (!contracts || !legacyReview) {
  throw new Error("Surface contracts and the legacy human review are required.");
}

const legacyByImage = new Map(legacyReview.rows.map((row) => [row.image, row]));
const previousByImage = new Map((previous.rows ?? []).map((row) => [row.image, row]));
const rows = [];

for (const surface of contracts.surfaces) {
  for (const target of surface.visualTargets) {
    const legacy = legacyByImage.get(target.image);
    const prior = previousByImage.get(target.image);
    const codex = {};
    for (const dimension of reviewDimensions) {
      codex[dimension] = normalizeReview(prior?.codex?.[dimension] ?? pendingReview());
    }

    const row = {
      image: target.image,
      storyId: target.storyId,
      storyTitle: target.storyTitle,
      surfaceId: surface.id,
      surface: surface.surface,
      route: surface.route,
      contractKind: surface.contractKind,
      structuralFamilies: surface.structuralFamilies,
      purposeContract: {
        requiredBlocks: surface.requiredBlocks,
        essentialActions: surface.essentialActions,
        essentialStates: surface.essentialStates,
        note: surface.note,
      },
      legacyHumanReview: {
        status: legacy?.finalStatus ?? "missing",
        canonicalVisual: legacy?.canonicalVisual?.status ?? "missing",
        desktopResponsive: legacy?.desktopResponsive?.status ?? "missing",
        mobileResponsive: legacy?.mobileResponsive?.status ?? "missing",
        interactionReview: legacy?.interactionReview?.status ?? "missing",
        evidence: [
          ...(legacy?.canonicalVisual?.evidence ?? []),
          ...(legacy?.desktopResponsive?.evidence ?? []),
          ...(legacy?.mobileResponsive?.evidence ?? []),
          ...(legacy?.interactionReview?.evidence ?? []),
        ],
      },
      codex,
      productOwner: {
        status: ownerStatuses.has(prior?.productOwner?.status)
          ? prior.productOwner.status
          : "pending",
        reviewedAt: prior?.productOwner?.reviewedAt ?? null,
        evidence: Array.isArray(prior?.productOwner?.evidence)
          ? prior.productOwner.evidence
          : [],
        findings: Array.isArray(prior?.productOwner?.findings)
          ? prior.productOwner.findings
          : [],
      },
      jointStatus: "pending-codex",
    };
    row.jointStatus = deriveJointStatus(row);
    rows.push(row);
  }
}

const currentImages = new Set(rows.map((row) => row.image));
const staleRows = (previous.rows ?? [])
  .filter((row) => !currentImages.has(row.image))
  .map((row) => row.image);
const invalidRows = rows.filter(
  (row) =>
    !reviewDimensions.every((dimension) => reviewStatuses.has(row.codex[dimension].status)) ||
    !ownerStatuses.has(row.productOwner.status),
);

const summary = {
  visualTargetCount: rows.length,
  surfaceCount: contracts.surfaceCount,
  legacyVisualPassCount: rows.filter((row) => row.legacyHumanReview.status === "pass").length,
  codexCompleteCount: rows.filter((row) => codexComplete(row.codex)).length,
  productOwnerPassCount: rows.filter((row) => row.productOwner.status === "pass").length,
  jointPassCount: rows.filter((row) => row.jointStatus === "joint-pass").length,
  needsFixCount: rows.filter((row) => row.jointStatus === "needs-fix").length,
  blockedCount: rows.filter((row) => row.jointStatus === "blocked").length,
  pendingCount: rows.filter((row) => row.jointStatus.startsWith("pending-")).length,
};

const report = {
  schemaVersion: 1,
  generatedAt: update ? new Date().toISOString() : previous.generatedAt ?? null,
  status:
    summary.jointPassCount === rows.length
      ? "complete"
      : summary.needsFixCount > 0
        ? "needs-fix"
        : "in-progress",
  reviewDimensions,
  summary,
  staleRows,
  invalidRowCount: invalidRows.length,
  rows,
};

function validate() {
  const errors = [];
  if (rows.length !== contracts.visualTargetCount) {
    errors.push(`Expected ${contracts.visualTargetCount} rows, found ${rows.length}.`);
  }
  if (staleRows.length) errors.push(`Stale rows: ${staleRows.join(", ")}`);
  if (invalidRows.length) errors.push(`Invalid rows: ${invalidRows.length}`);
  if (!previous.rows?.length && !update) errors.push("Joint certification ledger is missing.");
  if (previous.rows?.length && previous.rows.length !== rows.length) {
    errors.push(`Stored ledger has ${previous.rows.length} rows; expected ${rows.length}.`);
  }
  return errors;
}

const familySummary = new Map();
for (const row of rows) {
  for (const family of row.structuralFamilies) {
    const current = familySummary.get(family) ?? { targets: 0, jointPass: 0, needsFix: 0 };
    current.targets += 1;
    if (row.jointStatus === "joint-pass") current.jointPass += 1;
    if (row.jointStatus === "needs-fix") current.needsFix += 1;
    familySummary.set(family, current);
  }
}

const familyRows = [...familySummary.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(
    ([family, values]) =>
      `| ${family} | ${values.targets} | ${values.jointPass} | ${values.needsFix} |`,
  )
  .join("\n");
const markdown = `# Joint Certification Ledger\n\nGenerated: ${report.generatedAt}\n\nStatus: ${report.status}\n\n- Product surfaces: ${summary.surfaceCount}\n- Visual targets: ${summary.visualTargetCount}\n- Legacy visual passes: ${summary.legacyVisualPassCount}\n- Codex complete: ${summary.codexCompleteCount}\n- Product-owner passes: ${summary.productOwnerPassCount}\n- Joint passes: ${summary.jointPassCount}\n- Needs fix: ${summary.needsFixCount}\n- Pending: ${summary.pendingCount}\n\n| Structural family | Targets | Joint pass | Needs fix |\n| --- | ---: | ---: | ---: |\n${familyRows}\n\nA legacy visual pass is evidence only. It does not advance Codex product certification or product-owner approval.\n`;

if (update) {
  await writeFile(ledgerFile, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(markdownFile, markdown);
  console.log(
    `Joint certification ledger updated: joint=${summary.jointPassCount}/${rows.length}; legacy=${summary.legacyVisualPassCount}/${rows.length}.`,
  );
} else {
  const errors = validate();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Joint certification ledger: ${report.status}; joint=${summary.jointPassCount}/${rows.length}; pending=${summary.pendingCount}.`,
    );
  }
}
