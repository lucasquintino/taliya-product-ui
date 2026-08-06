import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const certificationDir = path.join(root, "specs/005-joint-product-certification");
const sourceFile = path.join(root, "specs/001-product-ui-foundation/page-structure-family-audit.md");
const contractsFile = path.join(certificationDir, "surface-contracts.json");
const outputFile = path.join(certificationDir, "family-inventory.json");
const markdownFile = path.join(certificationDir, "family-inventory.md");
const update = process.argv.includes("--update");
const dimensions = [
  "purpose",
  "referenceAnatomy",
  "officialComponents",
  "variantsAndStates",
  "responsiveLayout",
  "interactionBehavior",
  "accessibility",
  "duplicateArchitecture",
  "pageAdoption",
  "visualComparison",
];

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pendingReviews(previous = {}) {
  return Object.fromEntries(
    dimensions.map((dimension) => [
      dimension,
      {
        status: previous?.[dimension]?.status ?? "pending",
        reviewedAt: previous?.[dimension]?.reviewedAt ?? null,
        evidence: Array.isArray(previous?.[dimension]?.evidence)
          ? previous[dimension].evidence
          : [],
        findings: Array.isArray(previous?.[dimension]?.findings)
          ? previous[dimension].findings
          : [],
      },
    ]),
  );
}

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

const markdown = await readFile(sourceFile, "utf8");
const section = markdown.split("## Structural Families")[1]?.split("## Page-To-Family Map")[0];
if (!section) throw new Error("Structural family table was not found.");

const contracts = await readJson(contractsFile);
const previous = await readJson(outputFile, { rows: [] });
const previousById = new Map((previous.rows ?? []).map((row) => [row.id, row]));
const rows = section
  .split(/\r?\n/)
  .filter(
    (line) =>
      line.startsWith("|") && !line.includes("---") && !line.includes("Family |"),
  )
  .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
  .filter((cells) => cells.length === 5)
  .map(([family, referenceImage, referenceReason, coreOfficialComponents, coveredPages]) => {
    const id = slug(family);
    const prior = previousById.get(id);
    const surfaces = contracts.surfaces
      .filter((surface) => surface.structuralFamilies.includes(family))
      .map((surface) => surface.surface);
    const visualTargetCount = contracts.surfaces
      .filter((surface) => surface.structuralFamilies.includes(family))
      .reduce((sum, surface) => sum + surface.visualTargets.length, 0);
    return {
      id,
      family,
      referenceImage,
      referenceReason,
      coreOfficialComponents,
      coveredPages,
      mappedSurfaces: surfaces,
      mappedVisualTargetCount: visualTargetCount,
      codex: pendingReviews(prior?.codex),
      productOwner: {
        status: prior?.productOwner?.status ?? "pending",
        reviewedAt: prior?.productOwner?.reviewedAt ?? null,
        evidence: Array.isArray(prior?.productOwner?.evidence) ? prior.productOwner.evidence : [],
        findings: Array.isArray(prior?.productOwner?.findings) ? prior.productOwner.findings : [],
      },
      jointStatus: prior?.jointStatus ?? "pending-codex",
    };
  });

const referencedFamilies = new Set(
  contracts.surfaces.flatMap((surface) => surface.structuralFamilies),
);
const inventoriedFamilies = new Set(rows.map((row) => row.family));
const missingFamilies = [...referencedFamilies].filter((family) => !inventoriedFamilies.has(family));
const staleRows = (previous.rows ?? [])
  .filter((row) => !rows.some((current) => current.id === row.id))
  .map((row) => row.family);
const summary = {
  structuralFamilyCount: rows.length,
  mappedProductFamilyCount: rows.filter((row) => row.mappedSurfaces.length > 0).length,
  nonPageReferenceFamilyCount: rows.filter((row) => row.mappedSurfaces.length === 0).length,
  jointPassCount: rows.filter((row) => row.jointStatus === "joint-pass").length,
  missingReferencedFamilyCount: missingFamilies.length,
};
const report = {
  schemaVersion: 1,
  generatedAt: update ? new Date().toISOString() : previous.generatedAt ?? null,
  status: summary.jointPassCount === rows.length ? "complete" : "in-progress",
  reviewDimensions: dimensions,
  summary,
  missingFamilies,
  staleRows,
  rows,
};

const errors = [];
if (!previous.rows?.length && !update) errors.push("Family inventory is missing.");
if (missingFamilies.length) errors.push(`Missing families: ${missingFamilies.join(", ")}`);
if (staleRows.length) errors.push(`Stale families: ${staleRows.join(", ")}`);
if (previous.rows?.length && previous.rows.length !== rows.length) {
  errors.push(`Stored inventory has ${previous.rows.length} rows; source has ${rows.length}.`);
}

const tableRows = rows
  .map(
    (row) =>
      `| ${row.family} | ${row.referenceImage} | ${row.mappedSurfaces.length} | ${row.mappedVisualTargetCount} | ${row.jointStatus} |`,
  )
  .join("\n");
const reportMarkdown = `# Structural Family Inventory\n\nGenerated: ${report.generatedAt}\n\n- Structural families: ${summary.structuralFamilyCount}\n- Families mapped to current product surfaces: ${summary.mappedProductFamilyCount}\n- Non-page reference families: ${summary.nonPageReferenceFamilyCount}\n- Joint passes: ${summary.jointPassCount}/${summary.structuralFamilyCount}\n\n| Family | Reference | Surfaces | Targets | Joint status |\n| --- | --- | ---: | ---: | --- |\n${tableRows}\n`;

if (update) {
  await writeFile(outputFile, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(markdownFile, reportMarkdown);
  console.log(
    `Family inventory updated: families=${rows.length}; mapped=${summary.mappedProductFamilyCount}.`,
  );
} else if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Family inventory: ${report.status}; joint=${summary.jointPassCount}/${rows.length}.`);
}
