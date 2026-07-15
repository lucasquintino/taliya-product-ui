import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "public-api-audit.json");
const reportMdPath = path.join(specDir, "public-api-audit.md");
const manifestPath = path.join(specDir, "contracts/standard-page-kit.manifest.json");
const check = process.argv.includes("--check");

const packageFiles = {
  "@taliya/ui": {
    source: path.join(root, "packages/ui/src/index.tsx"),
    readme: path.join(root, "packages/ui/README.md")
  },
  "@taliya/crm": {
    source: path.join(root, "packages/crm/src/index.tsx"),
    readme: path.join(root, "packages/crm/README.md")
  }
};
const crmRuntimeManifestPath = path.join(root, "packages/crm/src/standard-page-kit.ts");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function validateManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== "object") {
    return ["manifest must be an object"];
  }
  if (manifest.version !== 1) {
    errors.push("version must be 1");
  }
  if (!Array.isArray(manifest.components) || manifest.components.length === 0) {
    errors.push("components must be a non-empty array");
    return errors;
  }

  const seen = new Set();
  manifest.components.forEach((component, index) => {
    const prefix = `components[${index}]`;
    for (const key of ["name", "package", "story", "category"]) {
      if (typeof component?.[key] !== "string" || component[key].trim().length === 0) {
        errors.push(`${prefix}.${key} must be a non-empty string`);
      }
    }
    if (component?.package && !packageFiles[component.package]) {
      errors.push(`${prefix}.package must be one of ${Object.keys(packageFiles).join(", ")}`);
    }
    const componentKey = `${component?.package}:${component?.name}`;
    if (seen.has(componentKey)) {
      errors.push(`${prefix} duplicates ${componentKey}`);
    }
    seen.add(componentKey);
  });

  return errors;
}

function exportNames(source) {
  const names = new Set();
  const patterns = [
    /export\s+(?:function|const|class|interface|type)\s+([A-Za-z][A-Za-z0-9_]*)/g,
    /export\s+type\s+\{\s*([^}]+)\s*\}/g,
    /export\s+\{\s*([^}]+)\s*\}/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source))) {
      if (pattern === patterns[1] || pattern === patterns[2]) {
        for (const part of match[1].split(",")) {
          const name = part.trim().split(/\s+as\s+/).pop()?.trim();
          if (name) names.add(name);
        }
        continue;
      }
      names.add(match[1]);
    }
  }

  return names;
}

const packageSources = Object.fromEntries(
  Object.entries(packageFiles).map(([packageName, files]) => [
    packageName,
    {
      exports: exportNames(read(files.source)),
      readme: read(files.readme)
    }
  ])
);

const manifest = readJson(manifestPath);
const manifestErrors = validateManifest(manifest);
if (manifestErrors.length > 0) {
  console.error(`Invalid standard page kit manifest: ${manifestErrors.join("; ")}`);
  process.exit(1);
}

const requiredKit = manifest.components;
const storyDir = path.join(root, "apps/docs/src/stories");
const crmRuntimeManifestSource = read(crmRuntimeManifestPath);
function extractRuntimeManifestRows(source) {
  const rows = [];
  const rowPattern =
    /\{\s*name:\s*"([^"]+)",\s*package:\s*"([^"]+)",\s*story:\s*"([^"]+)",\s*category:\s*"([^"]+)"\s*\}/g;
  let match;
  while ((match = rowPattern.exec(source))) {
    rows.push({
      name: match[1],
      package: match[2],
      story: match[3],
      category: match[4]
    });
  }
  return rows;
}

function componentKey(item) {
  return `${item.package}:${item.name}`;
}

const runtimeManifestRows = extractRuntimeManifestRows(crmRuntimeManifestSource);
const runtimeManifestMissingRows = requiredKit.filter((item) => {
  const expected = [
    `name: "${item.name}"`,
    `package: "${item.package}"`,
    `story: "${item.story}"`,
    `category: "${item.category}"`
  ];
  return !expected.every((fragment) => crmRuntimeManifestSource.includes(fragment));
});
const requiredKeys = new Set(requiredKit.map(componentKey));
const runtimeKeys = new Set(runtimeManifestRows.map(componentKey));
const runtimeManifestExtraRows = runtimeManifestRows.filter((item) => !requiredKeys.has(componentKey(item)));
const runtimeManifestCountMatches = runtimeManifestRows.length === requiredKit.length;
const runtimeManifestExactParity =
  runtimeManifestCountMatches &&
  JSON.stringify(runtimeManifestRows) === JSON.stringify(requiredKit) &&
  runtimeManifestMissingRows.length === 0 &&
  runtimeManifestExtraRows.length === 0 &&
  runtimeManifestRows.every((item) => runtimeKeys.has(componentKey(item)));
const runtimeManifestExportPresent =
  packageSources["@taliya/crm"].exports.has("standardPageKitManifest") &&
  packageSources["@taliya/crm"].exports.has("StandardPageKitComponent") &&
  packageSources["@taliya/crm"].exports.has("StandardPageKitManifest");
const rows = requiredKit.map((item) => {
  const packageInfo = packageSources[item.package];
  const exportPresent = packageInfo.exports.has(item.name);
  const storyPresent = fs.existsSync(path.join(storyDir, item.story));
  const readmePresent = packageInfo.readme.includes(item.name);
  return {
    ...item,
    exportPresent,
    storyPresent,
    readmePresent,
    pass: exportPresent && storyPresent && readmePresent
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  manifest: path.relative(root, manifestPath),
  manifestVersion: manifest.version,
  requiredCount: rows.length,
  passCount: rows.filter((row) => row.pass).length,
  failCount: rows.filter((row) => !row.pass).length,
  rows,
  summary: {
    pass: rows.every((row) => row.pass) && runtimeManifestExportPresent && runtimeManifestExactParity,
    runtimeManifestExportPresent,
    runtimeManifestExactParity,
    runtimeManifestCount: runtimeManifestRows.length,
    runtimeManifestCountMatches,
    runtimeManifestMissingRows: runtimeManifestMissingRows.map((row) => ({
      name: row.name,
      package: row.package,
      story: row.story,
      category: row.category
    })),
    runtimeManifestExtraRows: runtimeManifestExtraRows.map((row) => ({
      name: row.name,
      package: row.package,
      story: row.story,
      category: row.category
    })),
    failed: rows.filter((row) => !row.pass).map((row) => ({
      name: row.name,
      package: row.package,
      exportPresent: row.exportPresent,
      storyPresent: row.storyPresent,
      readmePresent: row.readmePresent
    }))
  }
};

if (!check) fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  "# Public API Audit",
  "",
  "This audit checks the standard Internal/CRM page kit from `contracts/standard-page-kit.manifest.json` against package exports, isolated Storybook stories, and package READMEs.",
  "",
  `Manifest: \`${path.relative(root, manifestPath)}\``,
  "",
  `Manifest version: ${manifest.version}`,
  "",
  `Runtime manifest export: ${runtimeManifestExportPresent ? "Pass" : "Fail"}`,
  "",
  `Runtime manifest exact parity: ${runtimeManifestExactParity ? "Pass" : "Fail"}`,
  "",
  `Runtime manifest count: ${runtimeManifestRows.length}/${requiredKit.length}`,
  "",
  `Runtime manifest missing rows: ${report.summary.runtimeManifestMissingRows.length ? report.summary.runtimeManifestMissingRows.map((row) => `${row.package}:${row.name}`).join(", ") : "None"}`,
  "",
  `Runtime manifest extra rows: ${report.summary.runtimeManifestExtraRows.length ? report.summary.runtimeManifestExtraRows.map((row) => `${row.package}:${row.name}`).join(", ") : "None"}`,
  "",
  `Status: ${report.summary.pass ? "Pass" : "Fail"}`,
  "",
  "| Component | Package | Export | Story | README | Status |",
  "| --- | --- | --- | --- | --- | --- |",
  ...rows.map((row) =>
    `| \`${row.name}\` | \`${row.package}\` | ${row.exportPresent ? "Pass" : "Fail"} | ${row.storyPresent ? "Pass" : "Fail"} | ${row.readmePresent ? "Pass" : "Fail"} | ${row.pass ? "Pass" : "Fail"} |`
  ),
  ""
].join("\n");
if (!check) fs.writeFileSync(reportMdPath, markdown);

if (!check) console.log(`Public API audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Public API: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  const failedRows = report.summary.failed.map((row) => `${row.package}:${row.name}`);
  const runtimeRows = report.summary.runtimeManifestMissingRows.map((row) => `${row.package}:${row.name}`);
  const extraRuntimeRows = report.summary.runtimeManifestExtraRows.map((row) => `${row.package}:${row.name}`);
  console.error(`Failed public API rows: ${[...failedRows, ...runtimeRows, ...extraRuntimeRows].join(", ") || "runtime manifest export/parity"}`);
  process.exit(1);
}
