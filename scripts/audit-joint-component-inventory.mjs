import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const certificationDir = path.join(root, "specs/005-joint-product-certification");
const outputFile = path.join(certificationDir, "component-inventory.json");
const markdownFile = path.join(certificationDir, "component-inventory.md");
const update = process.argv.includes("--update");
const dimensions = [
  "contract",
  "isolatedStory",
  "reusableArchitecture",
  "variantsAndStates",
  "realBehavior",
  "responsiveLayout",
  "accessibility",
  "visualComparison",
  "usageJustification",
  "duplicateReview",
];

function hasExportModifier(node) {
  return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}

function containsJsx(node) {
  let found = false;
  function visit(current) {
    if (
      ts.isJsxElement(current) ||
      ts.isJsxSelfClosingElement(current) ||
      ts.isJsxFragment(current)
    ) {
      found = true;
      return;
    }
    if (!found) ts.forEachChild(current, visit);
  }
  visit(node);
  return found;
}

function isComponentName(name) {
  return /^[A-Z][A-Za-z0-9]*$/.test(name);
}

function lineOf(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function collectExportedComponents(sourceText, file) {
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const components = [];

  for (const statement of sourceFile.statements) {
    if (
      ts.isExportDeclaration(statement) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause) &&
      !statement.isTypeOnly
    ) {
      for (const element of statement.exportClause.elements) {
        const name = element.name.text;
        if (isComponentName(name) && !element.isTypeOnly) {
          components.push({
            name,
            declarationKind: "re-export",
            reexportedFrom:
              statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
                ? statement.moduleSpecifier.text
                : null,
            line: lineOf(sourceFile, statement),
          });
        }
      }
    }

    if (ts.isFunctionDeclaration(statement) && hasExportModifier(statement) && statement.name) {
      const name = statement.name.text;
      if (isComponentName(name) && containsJsx(statement)) {
        components.push({ name, declarationKind: "function", line: lineOf(sourceFile, statement) });
      }
    }

    if (ts.isClassDeclaration(statement) && hasExportModifier(statement) && statement.name) {
      const name = statement.name.text;
      if (isComponentName(name) && containsJsx(statement)) {
        components.push({ name, declarationKind: "class", line: lineOf(sourceFile, statement) });
      }
    }

    if (ts.isVariableStatement(statement) && hasExportModifier(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
        const name = declaration.name.text;
        const callable =
          ts.isArrowFunction(declaration.initializer) ||
          ts.isFunctionExpression(declaration.initializer) ||
          ts.isCallExpression(declaration.initializer);
        if (isComponentName(name) && callable && containsJsx(declaration.initializer)) {
          components.push({ name, declarationKind: "const", line: lineOf(sourceFile, declaration) });
        }
      }
    }
  }

  return components;
}

async function listFiles(directory, predicate) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await listFiles(full, predicate)));
    else if (predicate(full)) output.push(full);
  }
  return output;
}

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

function pendingReview(previous = {}) {
  const review = {};
  for (const dimension of dimensions) {
    review[dimension] = {
      status: previous?.[dimension]?.status ?? "pending",
      reviewedAt: previous?.[dimension]?.reviewedAt ?? null,
      evidence: Array.isArray(previous?.[dimension]?.evidence)
        ? previous[dimension].evidence
        : [],
      findings: Array.isArray(previous?.[dimension]?.findings)
        ? previous[dimension].findings
        : [],
    };
  }
  return review;
}

const packageSources = [
  { package: "@taliya/ui", file: "packages/ui/src/internal-ui-runtime.tsx" },
  { package: "@taliya/crm", file: "packages/crm/src/internal-crm-runtime.tsx" },
];
const registryText = await readFile(path.join(root, "packages/crm/src/component-registry.ts"), "utf8");
const registry = new Map(
  [...registryText.matchAll(/\{ name: "([^"]+)", family: "([^"]+)", priority: "([^"]+)" \}/g)].map(
    (match) => [match[1], { family: match[2], priority: match[3] }],
  ),
);
const policy = await readJson(
  path.join(root, "specs/001-product-ui-foundation/contracts/public-api-surface.manifest.json"),
);
const testPolicy = await readJson(
  path.join(certificationDir, "component-test-policy.json"),
  { categories: [] },
);
const classificationKey = (packageName, componentName) => `${packageName}:${componentName}`;
const aliases = new Map(
  policy.compatibilityAliases.map((row) => [classificationKey(row.package, row.name), row]),
);
const specializations = new Map(
  policy.domainSpecializations.map((row) => [classificationKey(row.package, row.name), row]),
);
const sourceMapText = await readFile(
  path.join(root, "specs/001-product-ui-foundation/component-source-map.md"),
  "utf8",
);
const storyFiles = await listFiles(
  path.join(root, "apps/docs/src/stories"),
  (file) => file.endsWith(".stories.tsx") || file.endsWith(".stories.ts"),
);
const storySources = await Promise.all(
  storyFiles.map(async (file) => ({ file, text: await readFile(file, "utf8") })),
);
const testSources = await Promise.all(
  ["packages/ui/src/index.test.tsx", "packages/crm/src/index.test.tsx"].map(async (file) => ({
    file: path.join(root, file),
    text: await readFile(path.join(root, file), "utf8"),
  })),
);
const previous = await readJson(outputFile, { rows: [] });
const previousByKey = new Map(
  (previous.rows ?? []).map((row) => [`${row.package}:${row.name}`, row]),
);
const rows = [];

for (const source of packageSources) {
  const sourceText = await readFile(path.join(root, source.file), "utf8");
  for (const component of collectExportedComponents(sourceText, source.file)) {
    const prior = previousByKey.get(`${source.package}:${component.name}`);
    const storyReferences = storySources
      .filter(({ text }) => new RegExp(`\\b${component.name}\\b`).test(text))
      .map(({ file }) => path.relative(root, file));
    const testReferences = testSources
      .filter(({ text }) => new RegExp(`\\b${component.name}\\b`).test(text))
      .map(({ file }) => path.relative(root, file));
    const registryRow = source.package === "@taliya/crm" ? registry.get(component.name) : null;
    const alias = aliases.get(classificationKey(source.package, component.name));
    const specialization = specializations.get(classificationKey(source.package, component.name));
    rows.push({
      package: source.package,
      name: component.name,
      sourceFile: source.file,
      sourceLine: component.line,
      declarationKind: component.declarationKind,
      reexportedFrom: component.reexportedFrom ?? null,
      registry: registryRow ?? null,
      apiClassification: alias
        ? { kind: "compatibility-alias", ...alias }
        : specialization
          ? { kind: "domain-specialization", ...specialization }
          : { kind: "canonical-or-unclassified" },
      componentSourceMapMentioned: new RegExp(`\\b${component.name}\\b`).test(sourceMapText),
      storyReferences,
      testReferences,
      codex: pendingReview(prior?.codex),
      productOwner: {
        status: prior?.productOwner?.status ?? "pending",
        reviewedAt: prior?.productOwner?.reviewedAt ?? null,
        evidence: Array.isArray(prior?.productOwner?.evidence) ? prior.productOwner.evidence : [],
        findings: Array.isArray(prior?.productOwner?.findings) ? prior.productOwner.findings : [],
      },
      jointStatus: prior?.jointStatus ?? "pending-codex",
    });
  }
}

rows.sort((left, right) =>
  left.package === right.package
    ? left.name.localeCompare(right.name)
    : left.package.localeCompare(right.package),
);

const namesByPackage = new Map();
for (const row of rows) {
  const names = namesByPackage.get(row.package) ?? new Set();
  names.add(row.name);
  namesByPackage.set(row.package, names);
}
const crossPackageExactNameCollisions = [...(namesByPackage.get("@taliya/ui") ?? [])]
  .filter((name) => namesByPackage.get("@taliya/crm")?.has(name))
  .sort();
const unclassifiedCrossPackageExactNameCollisions = crossPackageExactNameCollisions.filter(
  (name) =>
    !aliases.has(classificationKey("@taliya/ui", name)) &&
    !aliases.has(classificationKey("@taliya/crm", name)),
);
const unregisteredCrmComponents = rows
  .filter((row) => row.package === "@taliya/crm" && !row.registry)
  .map((row) => row.name);
const registeredWithoutPublicComponent = [...registry.keys()]
  .filter(
    (name) =>
      !rows.some((row) => row.package === "@taliya/crm" && row.name === name),
  )
  .sort();
const withoutStoryReference = rows.filter((row) => row.storyReferences.length === 0).map((row) => row.name);
const withoutTestReference = rows.filter((row) => row.testReferences.length === 0).map((row) => row.name);
const testExceptionEntries = testPolicy.categories.flatMap((category) =>
  category.components.map((key) => ({
    key,
    category: category.id,
    requiresStory: category.requiresStory,
    requiresCompatibilityAlias: category.requiresCompatibilityAlias,
  })),
);
const testExceptionCounts = new Map();
for (const entry of testExceptionEntries) {
  testExceptionCounts.set(entry.key, (testExceptionCounts.get(entry.key) ?? 0) + 1);
}
const duplicateTestExceptions = [...testExceptionCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([key]) => key)
  .sort();
const testExceptionByKey = new Map(testExceptionEntries.map((entry) => [entry.key, entry]));
const rowByKey = new Map(rows.map((row) => [classificationKey(row.package, row.name), row]));
const withoutTestKeys = rows
  .filter((row) => row.testReferences.length === 0)
  .map((row) => classificationKey(row.package, row.name));
const unclassifiedWithoutDirectTest = withoutTestKeys
  .filter((key) => !testExceptionByKey.has(key))
  .sort();
const staleTestExceptions = testExceptionEntries
  .filter((entry) => !rowByKey.has(entry.key) || rowByKey.get(entry.key).testReferences.length > 0)
  .map((entry) => entry.key)
  .sort();
const invalidTestExceptions = testExceptionEntries
  .filter((entry) => {
    const row = rowByKey.get(entry.key);
    if (!row) return false;
    if (entry.requiresStory && row.storyReferences.length === 0) return true;
    return entry.requiresCompatibilityAlias && row.apiClassification.kind !== "compatibility-alias";
  })
  .map((entry) => entry.key)
  .sort();
const staleRows = (previous.rows ?? [])
  .filter((prior) => !rows.some((row) => row.package === prior.package && row.name === prior.name))
  .map((row) => `${row.package}:${row.name}`);

const summary = {
  publicVisualComponentCount: rows.length,
  uiComponentCount: rows.filter((row) => row.package === "@taliya/ui").length,
  crmComponentCount: rows.filter((row) => row.package === "@taliya/crm").length,
  crmRegistryCount: registry.size,
  unregisteredCrmComponentCount: unregisteredCrmComponents.length,
  registeredWithoutPublicComponentCount: registeredWithoutPublicComponent.length,
  withoutStoryReferenceCount: withoutStoryReference.length,
  withoutTestReferenceCount: withoutTestReference.length,
  directTestExceptionCount: testExceptionEntries.length,
  unclassifiedWithoutDirectTestCount: unclassifiedWithoutDirectTest.length,
  crossPackageExactNameCollisionCount: crossPackageExactNameCollisions.length,
  unclassifiedCrossPackageExactNameCollisionCount:
    unclassifiedCrossPackageExactNameCollisions.length,
  compatibilityAliasCount: rows.filter((row) => row.apiClassification.kind === "compatibility-alias").length,
  domainSpecializationCount: rows.filter((row) => row.apiClassification.kind === "domain-specialization").length,
  jointPassCount: rows.filter((row) => row.jointStatus === "joint-pass").length,
};

const report = {
  schemaVersion: 1,
  generatedAt: update ? new Date().toISOString() : previous.generatedAt ?? null,
  status: summary.jointPassCount === rows.length ? "complete" : "in-progress",
  reviewDimensions: dimensions,
  summary,
  crossPackageExactNameCollisions,
  unclassifiedCrossPackageExactNameCollisions,
  unregisteredCrmComponents,
  registeredWithoutPublicComponent,
  withoutStoryReference,
  withoutTestReference,
  duplicateTestExceptions,
  staleTestExceptions,
  invalidTestExceptions,
  unclassifiedWithoutDirectTest,
  staleRows,
  rows,
};

const errors = [];
if (!previous.rows?.length && !update) errors.push("Component inventory is missing.");
if (staleRows.length) errors.push(`Stale component rows: ${staleRows.join(", ")}`);
if (unregisteredCrmComponents.length) {
  errors.push(`Unregistered CRM components: ${unregisteredCrmComponents.join(", ")}`);
}
if (registeredWithoutPublicComponent.length) {
  errors.push(`Registry rows without a public component: ${registeredWithoutPublicComponent.join(", ")}`);
}
if (unclassifiedCrossPackageExactNameCollisions.length) {
  errors.push(
    `Unclassified cross-package component collisions: ${unclassifiedCrossPackageExactNameCollisions.join(", ")}`,
  );
}
if (duplicateTestExceptions.length) {
  errors.push(`Duplicate direct-test exceptions: ${duplicateTestExceptions.join(", ")}`);
}
if (staleTestExceptions.length) {
  errors.push(`Stale direct-test exceptions: ${staleTestExceptions.join(", ")}`);
}
if (invalidTestExceptions.length) {
  errors.push(`Invalid direct-test exceptions: ${invalidTestExceptions.join(", ")}`);
}
if (unclassifiedWithoutDirectTest.length) {
  errors.push(`Public components without direct test policy: ${unclassifiedWithoutDirectTest.join(", ")}`);
}
if (previous.rows?.length && previous.rows.length !== rows.length) {
  errors.push(`Stored inventory has ${previous.rows.length} rows; current source has ${rows.length}.`);
}

const registryFamilies = new Map();
for (const row of rows.filter((item) => item.registry)) {
  const current = registryFamilies.get(row.registry.family) ?? 0;
  registryFamilies.set(row.registry.family, current + 1);
}
const familyRows = [...registryFamilies.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([family, count]) => `| ${family} | ${count} |`)
  .join("\n");
const markdown = `# Public Component Inventory\n\nGenerated: ${report.generatedAt}\n\n- Public visual components detected: ${summary.publicVisualComponentCount}\n- @taliya/ui: ${summary.uiComponentCount}\n- @taliya/crm: ${summary.crmComponentCount}\n- CRM registry entries: ${summary.crmRegistryCount}\n- CRM components without registry row: ${summary.unregisteredCrmComponentCount}\n- Registry rows without detected public component: ${summary.registeredWithoutPublicComponentCount}\n- Components without a story reference: ${summary.withoutStoryReferenceCount}\n- Components without a test reference: ${summary.withoutTestReferenceCount}\n- Governed direct-test exceptions: ${summary.directTestExceptionCount}\n- Unclassified components without direct tests: ${summary.unclassifiedWithoutDirectTestCount}\n- Exact cross-package name collisions: ${summary.crossPackageExactNameCollisionCount}\n- Unclassified cross-package name collisions: ${summary.unclassifiedCrossPackageExactNameCollisionCount}\n- Joint passes: ${summary.jointPassCount}/${summary.publicVisualComponentCount}\n\n| CRM registry family | Public components detected |\n| --- | ---: |\n${familyRows}\n\nStory and test references are discovery evidence only. They are not isolated-story or behavior certification.\n`;

if (update) {
  await writeFile(outputFile, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(markdownFile, markdown);
  console.log(
    `Component inventory updated: ui=${summary.uiComponentCount}; crm=${summary.crmComponentCount}; total=${rows.length}.`,
  );
} else if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Component inventory: ${report.status}; joint=${summary.jointPassCount}/${rows.length}; no-story-ref=${summary.withoutStoryReferenceCount}.`,
  );
}
