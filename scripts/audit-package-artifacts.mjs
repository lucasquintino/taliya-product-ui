import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "package-artifacts-audit.json");
const reportMdPath = path.join(specDir, "package-artifacts-audit.md");
const check = process.argv.includes("--check");
const localReleaseManifestPath = path.join(root, "dist-packages/taliya-product-ui-local-manifest.json");
const localReleaseManifest = fs.existsSync(localReleaseManifestPath) ? JSON.parse(fs.readFileSync(localReleaseManifestPath, "utf8")) : null;

function packageTarball(packageName, fallback) {
  const manifestRow = localReleaseManifest?.packages?.find((row) => row.name === packageName);
  return manifestRow?.file ?? fallback;
}

const packageSpecs = [
  {
    packageDir: "packages/tokens",
    packageName: "@taliya/tokens",
    tarball: packageTarball("@taliya/tokens", "dist-packages/taliya-tokens-0.0.0.tgz"),
    requiredFiles: [
      "package/package.json",
      "package/README.md",
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/src/tokens.css"
    ],
    expectedFilesField: ["dist", "src/tokens.css"],
    requiredExports: [".", "./tokens.css"],
    requiredPackedLocalDependencies: {},
    requiredPeerDependencies: [],
    requiredReadmeSnippets: [
      'import "@taliya/tokens/tokens.css"',
      "@taliya/tokens"
    ]
  },
  {
    packageDir: "packages/ui",
    packageName: "@taliya/ui",
    tarball: packageTarball("@taliya/ui", "dist-packages/taliya-ui-0.0.0.tgz"),
    requiredFiles: [
      "package/package.json",
      "package/README.md",
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/src/styles.css"
    ],
    expectedFilesField: ["dist", "src/styles.css"],
    requiredExports: [".", "./styles.css"],
    requiredPackedLocalDependencies: {
      "@taliya/tokens": "@taliya/tokens"
    },
    requiredPeerDependencies: ["react", "react-dom"],
    requiredReadmeSnippets: [
      'import "@taliya/tokens/tokens.css"',
      'import "@taliya/ui/styles.css"',
      "react",
      "react-dom"
    ]
  },
  {
    packageDir: "packages/crm",
    packageName: "@taliya/crm",
    tarball: packageTarball("@taliya/crm", "dist-packages/taliya-crm-0.0.0.tgz"),
    requiredFiles: [
      "package/package.json",
      "package/README.md",
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/dist/standard-page-kit.js",
      "package/dist/standard-page-kit.d.ts",
      "package/src/styles.css"
    ],
    expectedFilesField: ["dist", "src/styles.css"],
    requiredExports: [".", "./standard-page-kit", "./styles.css"],
    requiredPackedLocalDependencies: {
      "@taliya/tokens": "@taliya/tokens",
      "@taliya/ui": "@taliya/ui"
    },
    requiredPeerDependencies: ["react", "react-dom"],
    requiredReadmeSnippets: [
      'import "@taliya/tokens/tokens.css"',
      'import "@taliya/ui/styles.css"',
      'import "@taliya/crm/styles.css"',
      "standardPageKitManifest",
      'import { standardPageKitManifest } from "@taliya/crm/standard-page-kit"',
      'drawerPlacement="fixed" | "content" | "floating"',
      'pageHeaderRhythm="dashboard" | "reports" | "support" | "internal-overview" | "internal-tenants" | "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish" | "settings-hub" | "overview"',
      'CrmDashboardPage layoutVariant="settings-hub"',
      'rightPanelVariant="settings-permissions"',
      'rightPanelVariant="settings-payments"',
      'rightPanelVariant="agent-routine"',
      'rightPanelVariant="agent-flow"',
      'rightPanelVariant="agent-test"',
      'rightPanelVariant="agent-publish"',
      'rightPanelVariant="agent-execution"',
      'frame="window" | "window-inset"',
      'contentLayout="internal-tenant-detail"',
      "TenantDetailLayout footerNote",
      'SetupPage frameVariant="default" | "guided" | "guided-block" | "guided-main" | "guided-wide" | "guided-review" | "shell-global"',
      'WeeklyHoursGrid variant="availability" | "schedule"',
      'SetupAgentChat variant="step" | "welcome"',
      "observacoes operacionais apos as linhas",
      "react",
      "react-dom"
    ]
  }
];

const forbiddenPackedFilePatterns = [
  /\/src\/(?!tokens\.css$|styles\.css$)/,
  /\.stories\./,
  /\.test\./,
  /\.spec\./,
  /\/__tests__\//,
  /\/storybook/i,
  /\/tmp\//,
  /\/coverage\//,
  /\/node_modules\//,
  /\/apps\//,
  /\/specs\//,
  /\/references\//
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function tarList(tarballPath) {
  const result = spawnSync("tar", ["-tf", tarballPath], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    return {
      ok: false,
      files: [],
      error: result.stderr || result.stdout || `tar exited with ${result.status}`
    };
  }

  return {
    ok: true,
    files: result.stdout.split(/\r?\n/).filter(Boolean),
    error: ""
  };
}

function tarReadJson(tarballPath, entryPath) {
  const result = spawnSync("tar", ["-xOf", tarballPath, entryPath], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    return {
      ok: false,
      json: null,
      error: result.stderr || result.stdout || `tar exited with ${result.status}`
    };
  }

  try {
    return {
      ok: true,
      json: JSON.parse(result.stdout),
      error: ""
    };
  } catch (error) {
    return {
      ok: false,
      json: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

function tarReadText(tarballPath, entryPath) {
  const result = spawnSync("tar", ["-xOf", tarballPath, entryPath], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    return {
      ok: false,
      text: "",
      error: result.stderr || result.stdout || `tar exited with ${result.status}`
    };
  }

  return {
    ok: true,
    text: result.stdout,
    error: ""
  };
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function cssSideEffectsPresent(packageJson) {
  const sideEffects = packageJson?.sideEffects;
  if (sideEffects === true) return true;
  if (!Array.isArray(sideEffects)) return false;

  return sideEffects.some((entry) => typeof entry === "string" && entry.includes(".css"));
}

function filesFieldMatches(packageJson, expectedFilesField) {
  const files = packageJson?.files;
  if (!Array.isArray(files)) return false;
  if (files.length !== expectedFilesField.length) return false;

  return expectedFilesField.every((entry, index) => files[index] === entry);
}

function forbiddenPackedFiles(files) {
  return files.filter((filePath) => forbiddenPackedFilePatterns.some((pattern) => pattern.test(filePath)));
}

function requiredPeerDependenciesPresent(packageJson, requiredPeerDependencies) {
  const peerDependencies = packageJson?.peerDependencies ?? {};
  return requiredPeerDependencies.every((name) => typeof peerDependencies[name] === "string" && peerDependencies[name].length > 0);
}

function misplacedPeerDependencies(packageJson, requiredPeerDependencies) {
  const dependencies = packageJson?.dependencies ?? {};
  return requiredPeerDependencies.filter((name) => typeof dependencies[name] === "string");
}

function workspaceDependencyRows(packageJson) {
  const dependencyGroups = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  return dependencyGroups.flatMap((group) =>
    Object.entries(packageJson?.[group] ?? {})
      .filter(([, version]) => typeof version === "string" && version.startsWith("workspace:"))
      .map(([name, version]) => ({ group, name, version }))
  );
}

function requiredPackedLocalDependencyRows(packedJson, requiredPackedLocalDependencies, packageVersionByName) {
  const dependencies = packedJson?.dependencies ?? {};

  return Object.entries(requiredPackedLocalDependencies).map(([dependencyName, packageName]) => {
    const expectedVersion = packageVersionByName.get(packageName) ?? "";
    const actualVersion = dependencies[dependencyName] ?? "";

    return {
      dependencyName,
      packageName,
      expectedVersion,
      actualVersion,
      pass: Boolean(expectedVersion) && actualVersion === expectedVersion
    };
  });
}

function missingReadmeSnippets(readme, snippets) {
  return snippets.filter((snippet) => !readme.includes(snippet));
}

const packageVersionByName = new Map(
  packageSpecs.map((spec) => {
    const packageJson = readJson(path.join(root, spec.packageDir, "package.json"));
    return [spec.packageName, packageJson.version];
  })
);

function auditPackage(spec) {
  const sourcePackageJsonPath = path.join(root, spec.packageDir, "package.json");
  const sourcePackageJson = readJson(sourcePackageJsonPath);
  const tarballPath = path.join(root, spec.tarball);
  const tarballExists = fs.existsSync(tarballPath);
  const tarballStats = tarballExists ? fs.statSync(tarballPath) : null;
  const listed = tarballExists ? tarList(tarballPath) : { ok: false, files: [], error: "Tarball missing." };
  const packedPackageJson = tarballExists
    ? tarReadJson(tarballPath, "package/package.json")
    : { ok: false, json: null, error: "Tarball missing." };
  const packedReadme = tarballExists
    ? tarReadText(tarballPath, "package/README.md")
    : { ok: false, text: "", error: "Tarball missing." };
  const sourceReadmePath = path.join(root, spec.packageDir, "README.md");
  const sourceReadme = fs.existsSync(sourceReadmePath) ? fs.readFileSync(sourceReadmePath, "utf8") : "";

  const missingFiles = spec.requiredFiles.filter((filePath) => !listed.files.includes(filePath));
  const packedJson = packedPackageJson.json;
  const sourceExports = Object.keys(sourcePackageJson.exports ?? {});
  const packedExports = Object.keys(packedJson?.exports ?? {});
  const missingExports = spec.requiredExports.filter((exportPath) => !packedExports.includes(exportPath));
  const sourceExportMismatch = spec.requiredExports.filter((exportPath) => !sourceExports.includes(exportPath));

  const packageNameMatches = packedJson?.name === sourcePackageJson.name && packedJson?.name === spec.packageName;
  const versionMatches = packedJson?.version === sourcePackageJson.version;
  const mainMatches = packedJson?.main === sourcePackageJson.main;
  const moduleMatches = packedJson?.module === sourcePackageJson.module;
  const typesMatches = packedJson?.types === sourcePackageJson.types;
  const sourceFilesFieldMatches = filesFieldMatches(sourcePackageJson, spec.expectedFilesField);
  const packedFilesFieldMatches = filesFieldMatches(packedJson, spec.expectedFilesField);
  const forbiddenFiles = forbiddenPackedFiles(listed.files);
  const sourcePublishable = sourcePackageJson.private !== true;
  const packedPublishable = packedJson?.private !== true;
  const sourceCssSideEffects = cssSideEffectsPresent(sourcePackageJson);
  const packedCssSideEffects = cssSideEffectsPresent(packedJson);
  const sourcePeerDependencies = requiredPeerDependenciesPresent(sourcePackageJson, spec.requiredPeerDependencies);
  const packedPeerDependencies = requiredPeerDependenciesPresent(packedJson, spec.requiredPeerDependencies);
  const sourceMisplacedPeerDependencies = misplacedPeerDependencies(sourcePackageJson, spec.requiredPeerDependencies);
  const packedMisplacedPeerDependencies = misplacedPeerDependencies(packedJson, spec.requiredPeerDependencies);
  const sourceWorkspaceDependencies = workspaceDependencyRows(sourcePackageJson);
  const packedWorkspaceDependencies = workspaceDependencyRows(packedJson);
  const requiredPackedLocalDependencies = requiredPackedLocalDependencyRows(
    packedJson,
    spec.requiredPackedLocalDependencies,
    packageVersionByName
  );
  const sourceReadmeMissingSnippets = missingReadmeSnippets(sourceReadme, spec.requiredReadmeSnippets);
  const packedReadmeMissingSnippets = missingReadmeSnippets(packedReadme.text, spec.requiredReadmeSnippets);

  const pass =
    tarballExists &&
    listed.ok &&
    packedPackageJson.ok &&
    missingFiles.length === 0 &&
    missingExports.length === 0 &&
    sourceExportMismatch.length === 0 &&
    packageNameMatches &&
    versionMatches &&
    mainMatches &&
    moduleMatches &&
    typesMatches &&
    sourceFilesFieldMatches &&
    packedFilesFieldMatches &&
    forbiddenFiles.length === 0 &&
    sourcePublishable &&
    packedPublishable &&
    sourceCssSideEffects &&
    packedCssSideEffects &&
    sourcePeerDependencies &&
    packedPeerDependencies &&
    sourceMisplacedPeerDependencies.length === 0 &&
    packedMisplacedPeerDependencies.length === 0 &&
    packedWorkspaceDependencies.length === 0 &&
    requiredPackedLocalDependencies.every((row) => row.pass) &&
    sourceReadmeMissingSnippets.length === 0 &&
    packedReadme.ok &&
    packedReadmeMissingSnippets.length === 0;

  return {
    packageName: spec.packageName,
    sourcePackage: relative(sourcePackageJsonPath),
    tarball: spec.tarball,
    tarballExists,
    tarballSize: tarballStats?.size ?? 0,
    requiredFiles: spec.requiredFiles,
    missingFiles,
    requiredExports: spec.requiredExports,
    sourceExports,
    packedExports,
    missingExports,
    sourceExportMismatch,
    packageNameMatches,
    versionMatches,
    mainMatches,
    moduleMatches,
    typesMatches,
    expectedFilesField: spec.expectedFilesField,
    sourceFilesFieldMatches,
    packedFilesFieldMatches,
    forbiddenFiles,
    sourcePublishable,
    packedPublishable,
    sourceCssSideEffects,
    packedCssSideEffects,
    requiredPeerDependencies: spec.requiredPeerDependencies,
    sourcePeerDependencies,
    packedPeerDependencies,
    sourceMisplacedPeerDependencies,
    packedMisplacedPeerDependencies,
    sourceWorkspaceDependencies,
    packedWorkspaceDependencies,
    requiredPackedLocalDependencies,
    requiredReadmeSnippets: spec.requiredReadmeSnippets,
    sourceReadmeExists: fs.existsSync(sourceReadmePath),
    packedReadmeReadable: packedReadme.ok,
    sourceReadmeMissingSnippets,
    packedReadmeMissingSnippets,
    tarListError: listed.error,
    packageJsonError: packedPackageJson.error,
    readmeError: packedReadme.error,
    pass
  };
}

const packageRows = packageSpecs.map(auditPackage);
const report = {
  generatedAt: new Date().toISOString(),
  packageRows,
  summary: {
    pass: packageRows.every((row) => row.pass),
    failedPackages: packageRows.filter((row) => !row.pass).map((row) => row.packageName)
  }
};

if (!check) fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  "# Package Artifacts Audit",
  "",
  "This audit checks local tarballs generated by `corepack pnpm pack:local` for installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented public entrypoints.",
  "",
  `Status: ${report.summary.pass ? "Pass" : "Fail"}`,
  "",
  "| Package | Tarball | Size | Required files | Required exports | Metadata | Publishable | CSS side effects | Peer deps | Workspace deps | README | Status |",
  "| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...packageRows.map((row) => {
    const files = row.missingFiles.length ? `Missing: ${row.missingFiles.map((filePath) => `\`${filePath}\``).join(", ")}` : "Pass";
    const exportsStatus = row.missingExports.length || row.sourceExportMismatch.length
      ? `Missing: ${[...row.missingExports, ...row.sourceExportMismatch].map((exportPath) => `\`${exportPath}\``).join(", ")}`
      : "Pass";
    const metadata = [
      `name:${row.packageNameMatches ? "pass" : "fail"}`,
      `version:${row.versionMatches ? "pass" : "fail"}`,
      `main:${row.mainMatches ? "pass" : "fail"}`,
      `module:${row.moduleMatches ? "pass" : "fail"}`,
      `types:${row.typesMatches ? "pass" : "fail"}`
    ].join("<br />");
    const packageFiles = [
      `source files:${row.sourceFilesFieldMatches ? "pass" : "fail"}`,
      `tarball files:${row.packedFilesFieldMatches ? "pass" : "fail"}`,
      `forbidden:${row.forbiddenFiles.length}`
    ].join("<br />");
    const publishable = `source:${row.sourcePublishable ? "pass" : "fail"}<br />tarball:${row.packedPublishable ? "pass" : "fail"}`;
    const sideEffects = `source:${row.sourceCssSideEffects ? "pass" : "fail"}<br />tarball:${row.packedCssSideEffects ? "pass" : "fail"}`;
    const peerDeps = row.requiredPeerDependencies.length
      ? `source:${row.sourcePeerDependencies && row.sourceMisplacedPeerDependencies.length === 0 ? "pass" : "fail"}<br />tarball:${row.packedPeerDependencies && row.packedMisplacedPeerDependencies.length === 0 ? "pass" : "fail"}`
      : "N/A";
    const packedLocalDeps = row.requiredPackedLocalDependencies.length
      ? row.requiredPackedLocalDependencies
          .map((dependencyRow) => `${dependencyRow.dependencyName}:${dependencyRow.pass ? "pass" : `fail ${dependencyRow.actualVersion || "missing"}!=${dependencyRow.expectedVersion}`}`)
          .join("<br />")
      : "N/A";
    const workspaceDeps = row.packedWorkspaceDependencies.length
      ? `tarball leaks:${row.packedWorkspaceDependencies.map((dependencyRow) => `${dependencyRow.group}/${dependencyRow.name}=${dependencyRow.version}`).join(", ")}`
      : `tarball:none<br />local:${packedLocalDeps}`;
    const readme = row.sourceReadmeMissingSnippets.length || row.packedReadmeMissingSnippets.length || !row.packedReadmeReadable
      ? `source missing:${row.sourceReadmeMissingSnippets.length}<br />tarball missing:${row.packedReadmeMissingSnippets.length}`
      : "Pass";
    return `| \`${row.packageName}\` | \`${row.tarball}\` | ${row.tarballSize} | ${files}<br />${packageFiles} | ${exportsStatus} | ${metadata} | ${publishable} | ${sideEffects} | ${peerDeps} | ${workspaceDeps} | ${readme} | ${row.pass ? "Pass" : "Fail"} |`;
  }),
  ""
].join("\n");
if (!check) fs.writeFileSync(reportMdPath, markdown);

if (!check) console.log(`Package artifacts audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Package artifacts: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  console.error(`Failed packages: ${report.summary.failedPackages.join(", ")}`);
  process.exit(1);
}
