import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "package-boundaries-audit.json");
const reportMdPath = path.join(specDir, "package-boundaries-audit.md");
const check = process.argv.includes("--check");

const packages = {
  "@taliya/tokens": {
    root: "packages/tokens",
    allowedTaliyaDeps: [],
    forbiddenImports: [
      "@taliya/ui",
      "@taliya/crm",
      "@taliya/docs",
      "apps/docs",
      "agentes-landing-system",
      "taliya-internal"
    ]
  },
  "@taliya/ui": {
    root: "packages/ui",
    allowedTaliyaDeps: ["@taliya/tokens"],
    forbiddenImports: [
      "@taliya/crm",
      "@taliya/docs",
      "apps/docs",
      "agentes-landing-system",
      "taliya-internal"
    ]
  },
  "@taliya/crm": {
    root: "packages/crm",
    allowedTaliyaDeps: ["@taliya/tokens", "@taliya/ui"],
    forbiddenImports: [
      "@taliya/docs",
      "apps/docs",
      "agentes-landing-system",
      "taliya-internal"
    ]
  },
  "@taliya/docs": {
    root: "apps/docs",
    allowedTaliyaDeps: ["@taliya/tokens", "@taliya/ui", "@taliya/crm"],
    forbiddenImports: ["agentes-landing-system", "taliya-internal"]
  }
};

const ignoredDirs = new Set(["node_modules", "dist", "storybook-static", "coverage", ".turbo", ".vite"]);
const sourceExtensions = [".ts", ".tsx", ".js", ".jsx", ".css"];
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function packageJson(packageRoot) {
  const filePath = path.join(root, packageRoot, "package.json");
  return JSON.parse(read(filePath));
}

function dependencyNames(packageData) {
  return Object.keys({
    ...(packageData.dependencies ?? {}),
    ...(packageData.devDependencies ?? {}),
    ...(packageData.peerDependencies ?? {})
  });
}

function walk(dirPath, files = []) {
  if (!exists(dirPath)) return files;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(dirPath, entry.name), files);
      }
      continue;
    }

    if (sourceExtensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(path.join(dirPath, entry.name));
    }
  }

  return files;
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function importedSpecifiers(filePath) {
  const source = read(filePath);
  const imports = [];
  let match;

  while ((match = importPattern.exec(source))) {
    const specifier = match[1] ?? match[2];
    if (!specifier) continue;
    imports.push({
      specifier,
      line: lineNumber(source, match.index ?? 0)
    });
  }

  return imports;
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function forbiddenSpecifierMatches(packageName, config, sourceFiles) {
  const matches = [];

  for (const filePath of sourceFiles) {
    for (const imported of importedSpecifiers(filePath)) {
      const matchedRule = config.forbiddenImports.find((forbiddenImport) =>
        imported.specifier === forbiddenImport || imported.specifier.startsWith(`${forbiddenImport}/`)
      );

      if (matchedRule) {
        matches.push({
          package: packageName,
          file: relative(filePath),
          line: imported.line,
          specifier: imported.specifier,
          rule: matchedRule
        });
      }
    }
  }

  return matches;
}

function dependencyBoundaryStatus(packageName, config, packageData) {
  const deps = dependencyNames(packageData).filter((dependencyName) => dependencyName.startsWith("@taliya/"));
  const forbiddenDeps = deps.filter((dependencyName) => !config.allowedTaliyaDeps.includes(dependencyName));

  return {
    pass: forbiddenDeps.length === 0,
    declaredTaliyaDeps: deps,
    allowedTaliyaDeps: config.allowedTaliyaDeps,
    forbiddenDeps
  };
}

const packageRows = Object.entries(packages).map(([packageName, config]) => {
  const packageData = packageJson(config.root);
  const sourceFiles = walk(path.join(root, config.root, "src"));
  const dependencyStatus = dependencyBoundaryStatus(packageName, config, packageData);
  const forbiddenMatches = forbiddenSpecifierMatches(packageName, config, sourceFiles);

  return {
    package: packageName,
    packageRoot: config.root,
    dependencyStatus,
    importStatus: {
      pass: forbiddenMatches.length === 0,
      forbiddenMatches
    },
    pass: dependencyStatus.pass && forbiddenMatches.length === 0
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    pass: packageRows.every((row) => row.pass),
    failedPackages: packageRows.filter((row) => !row.pass).map((row) => row.package)
  },
  packageRows
};

if (!check) fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  "# Package Boundaries Audit",
  "",
  "This audit checks dependency direction and source imports for the standalone Taliya Product UI library.",
  "",
  `Status: ${report.summary.pass ? "Pass" : "Fail"}`,
  "",
  "| Package | Declared Taliya deps | Dependency status | Forbidden source imports | Status |",
  "| --- | --- | --- | --- | --- |",
  ...packageRows.map((row) => {
    const deps = row.dependencyStatus.declaredTaliyaDeps.length
      ? row.dependencyStatus.declaredTaliyaDeps.map((dependencyName) => `\`${dependencyName}\``).join(", ")
      : "None";
    return `| \`${row.package}\` | ${deps} | ${row.dependencyStatus.pass ? "Pass" : "Fail"} | ${row.importStatus.forbiddenMatches.length} | ${row.pass ? "Pass" : "Fail"} |`;
  }),
  "",
  "## Forbidden Matches",
  "",
  ...packageRows.flatMap((row) =>
    row.importStatus.forbiddenMatches.length
      ? row.importStatus.forbiddenMatches.map(
          (match) =>
            `- \`${match.package}\` imports \`${match.specifier}\` in \`${match.file}:${match.line}\` (rule: \`${match.rule}\`).`
        )
      : [`- \`${row.package}\`: none.`]
  ),
  ""
].join("\n");
if (!check) fs.writeFileSync(reportMdPath, markdown);

if (!check) console.log(`Package boundaries audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Package boundaries: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  console.error(`Failed packages: ${report.summary.failedPackages.join(", ")}`);
  process.exit(1);
}
