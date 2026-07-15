import fs from "node:fs";
import path from "node:path";
import { isNonEmptyString, validatePageKitConfig } from "./consumer-config-validation.mjs";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const check = args.includes("--check");
function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

const consumerRoot = path.resolve(root, optionValue("--consumer", "../taliya-internal"));
const configArg = optionValue("--page-kit-config", "");
const defaultConfigPath = path.join(consumerRoot, "taliya-page-kit.config.json");
const pageKitConfigPath = configArg ? path.resolve(root, configArg) : defaultConfigPath;
const reportLabel = optionValue("--report-label", "");
const outputDir = path.resolve(root, optionValue("--out-dir", specDir));
const persistReports = !check || outputDir !== specDir;

function reportBasename(baseName) {
  if (!reportLabel) return baseName;

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const reportJsonPath = path.join(outputDir, `${reportBasename("consumer-page-kit-audit")}.json`);
const reportMdPath = path.join(outputDir, `${reportBasename("consumer-page-kit-audit")}.md`);
const standardPageKitManifestPath = path.join(specDir, "contracts/standard-page-kit.manifest.json");

const defaultSurfaces = [
  {
    id: "shell",
    file: "components/internal-shell-client.tsx",
    required: [
      { name: "CrmProductShell", package: "@taliya/crm" },
      { name: "Toolbar", package: "@taliya/ui" },
      { name: "Chip", package: "@taliya/ui" }
    ],
    forbiddenFragments: ["app-shell", "internal-workspace", "shell-sidebar", "shell-topbar"]
  },
  {
    id: "cockpit",
    file: "features/internal/cockpit/cockpit-workspace.tsx",
    required: [
      { name: "InternalOverviewDashboard", package: "@taliya/crm" },
      { name: "DashboardGrid", package: "@taliya/crm" },
      { name: "MetricCard", package: "@taliya/crm" },
      { name: "CrmOperationalRow", package: "@taliya/crm" },
      { name: "CrmRecordDrawer", package: "@taliya/crm" },
      { name: "Panel", package: "@taliya/ui" },
      { name: "PanelBody", package: "@taliya/ui" },
      { name: "PanelHeader", package: "@taliya/ui" }
    ],
    forbiddenFragments: ["cockpit-panel", "attention-list", "attention-item", "panel-body"]
  },
  {
    id: "landing",
    file: "features/internal/landing/landing-workspace.tsx",
    required: [
      { name: "PageFilterBar", package: "@taliya/crm" },
      { name: "DashboardGrid", package: "@taliya/crm" },
      { name: "CrmRecordDrawer", package: "@taliya/crm" },
      { name: "DataTable", package: "@taliya/ui" },
      { name: "Panel", package: "@taliya/ui" },
      { name: "PanelBody", package: "@taliya/ui" },
      { name: "PanelHeader", package: "@taliya/ui" },
      { name: "List", package: "@taliya/ui" },
      { name: "ListItem", package: "@taliya/ui" }
    ],
    forbiddenFragments: ["landing-filter-bar", "table-shell", "landing-table", "example-list", "example-item", "funnel-list"]
  },
  {
    id: "leads",
    file: "features/internal/leads/leads-workspace.tsx",
    required: [
      { name: "PageFilterBar", package: "@taliya/crm" },
      { name: "PageQuickFilters", package: "@taliya/crm" },
      { name: "LeadTable", package: "@taliya/crm" },
      { name: "KanbanBoard", package: "@taliya/crm" },
      { name: "CrmRecordDrawer", package: "@taliya/crm" },
      { name: "Button", package: "@taliya/ui" },
      { name: "Modal", package: "@taliya/ui" },
      { name: "FieldGrid", package: "@taliya/ui" },
      { name: "ContentGrid", package: "@taliya/ui" }
    ],
    forbiddenFragments: [
      "filter-bar",
      "quick-queues",
      "lead-table",
      "lead-drawer",
      "lead-open-button",
      "kanban-alerts",
      "internal-lead-kanban-board"
    ]
  },
  {
    id: "route-states",
    file: "app/internal/loading.tsx",
    required: [
      { name: "StatePage", package: "@taliya/ui" },
      { name: "LoadingState", package: "@taliya/ui" }
    ],
    forbiddenFragments: ["internal-state-page", "loading-shell"]
  },
  {
    id: "route-errors",
    file: "app/internal/error.tsx",
    required: [
      { name: "StatePage", package: "@taliya/ui" },
      { name: "ErrorState", package: "@taliya/ui" },
      { name: "Button", package: "@taliya/ui" }
    ],
    forbiddenFragments: ["internal-state-page", "error-text"]
  }
];

const defaultRoutePages = [
  {
    route: "/internal",
    file: "app/internal/page.tsx",
    requiredLocalComponents: [
      { name: "InternalShell", importFrom: "@/components/internal-shell" },
      { name: "CockpitWorkspace", importFrom: "@/features/internal/cockpit/cockpit-workspace" }
    ]
  },
  {
    route: "/internal/landing",
    file: "app/internal/landing/page.tsx",
    requiredLocalComponents: [
      { name: "InternalShell", importFrom: "@/components/internal-shell" },
      { name: "LandingWorkspace", importFrom: "@/features/internal/landing/landing-workspace" }
    ]
  },
  {
    route: "/internal/leads",
    file: "app/internal/leads/page.tsx",
    requiredLocalComponents: [
      { name: "InternalShell", importFrom: "@/components/internal-shell" },
      { name: "LeadsWorkspace", importFrom: "@/features/internal/leads/leads-workspace" }
    ]
  },
  {
    route: "/internal/leads/kanban",
    file: "app/internal/leads/kanban/page.tsx",
    requiredLocalComponents: [
      { name: "InternalShell", importFrom: "@/components/internal-shell" },
      { name: "LeadsWorkspace", importFrom: "@/features/internal/leads/leads-workspace" }
    ]
  }
];

const defaultComponentContracts = [];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readPageKitConfig() {
  if (!exists(pageKitConfigPath)) {
    return {
      source: "default-internal",
      validation: { pass: true, errors: [] },
      surfaces: defaultSurfaces,
      routePages: defaultRoutePages,
      componentContracts: defaultComponentContracts,
      routeCoverage: null
    };
  }

  let config;
  try {
    config = JSON.parse(read(pageKitConfigPath));
  } catch (error) {
    return {
      source: path.relative(root, pageKitConfigPath).replaceAll("\\", "/"),
      validation: { pass: false, errors: [`Invalid JSON: ${error.message}`] },
      surfaces: [],
      routePages: [],
      componentContracts: [],
      routeCoverage: null
    };
  }

  const validation = validatePageKitConfig(config);
  return {
    source: path.relative(root, pageKitConfigPath).replaceAll("\\", "/"),
    validation,
    surfaces: Array.isArray(config.surfaces) ? config.surfaces : defaultSurfaces,
    routePages: Array.isArray(config.routes) ? config.routes : defaultRoutePages,
    componentContracts: Array.isArray(config.componentContracts) ? config.componentContracts : defaultComponentContracts,
    routeCoverage: config.routeCoverage
  };
}

function walkPages(dirPath, files = []) {
  if (!exists(dirPath)) return files;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "tmp") continue;
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkPages(entryPath, files);
      continue;
    }
    if (entry.name === "page.tsx" || entry.name === "page.ts" || entry.name === "page.jsx" || entry.name === "page.js") {
      files.push(entryPath);
    }
  }

  return files;
}

function routeFromPageFile(filePath, coverage) {
  const coverageRoot = path.join(consumerRoot, coverage.root);
  const relativeDir = path.relative(coverageRoot, path.dirname(filePath)).replaceAll("\\", "/");
  const suffix = relativeDir && relativeDir !== "." ? `/${relativeDir}` : "";
  return `${coverage.baseRoute.replace(/\/$/, "")}${suffix}`.replace(/\/+/g, "/");
}

function routeCoverageStatus(routeCoverage, routePages) {
  if (!routeCoverage) {
    return {
      enabled: false,
      root: "",
      baseRoute: "",
      rootExists: false,
      discoveredRoutes: [],
      configuredRoutes: routePages.map((routePage) => routePage.route),
      uncoveredRoutes: [],
      pass: true
    };
  }

  const coverageRoot = path.join(consumerRoot, routeCoverage.root);
  const rootExists = exists(coverageRoot);
  const discoveredRoutes = rootExists ? walkPages(coverageRoot).map((filePath) => routeFromPageFile(filePath, routeCoverage)).sort() : [];
  const configuredRoutes = routePages.map((routePage) => routePage.route).sort();
  const configuredSet = new Set(configuredRoutes);
  const uncoveredRoutes = discoveredRoutes.filter((route) => !configuredSet.has(route));

  return {
    enabled: true,
    root: routeCoverage.root,
    baseRoute: routeCoverage.baseRoute,
    rootExists,
    discoveredRoutes,
    configuredRoutes,
    uncoveredRoutes,
    pass: rootExists && discoveredRoutes.length > 0 && uncoveredRoutes.length === 0
  };
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function packageImportStatus(source, componentName, packageName, usageSource = source) {
  const importPattern = new RegExp(`import\\s+(?:type\\s+)?(?:[\\s\\S]*?)from\\s+["']${packageName.replace("/", "\\/")}["']`, "g");
  const imports = Array.from(source.matchAll(importPattern)).map((match) => match[0]);
  const imported = imports.some((importLine) => new RegExp(`\\b${componentName}\\b`).test(importLine));
  const jsxUsed = new RegExp(`<${componentName}(\\s|>|\\.)`).test(usageSource);

  return {
    componentName,
    packageName,
    imported,
    jsxUsed,
    pass: imported && jsxUsed
  };
}

function localImportStatus(source, componentName, importFrom, usageSource = source) {
  const escapedImport = importFrom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const importPattern = new RegExp(`import\\s+(?:type\\s+)?(?:[\\s\\S]*?)from\\s+["']${escapedImport}["']`, "g");
  const imports = Array.from(source.matchAll(importPattern)).map((match) => match[0]);
  const imported = imports.some((importLine) => new RegExp(`\\b${componentName}\\b`).test(importLine));
  const jsxUsed = new RegExp(`<${componentName}(\\s|>|\.)`).test(usageSource);

  return {
    componentName,
    importFrom,
    imported,
    jsxUsed,
    pass: imported && jsxUsed
  };
}

function defaultExportBodySlice(source) {
  const patterns = [
    /export\s+default\s+async\s+function\s+[A-Za-z0-9_]*\s*\(/,
    /export\s+default\s+function\s+[A-Za-z0-9_]*\s*\(/,
    /export\s+default\s+async\s+function\s*\(/,
    /export\s+default\s+function\s*\(/
  ];
  const match = patterns.map((pattern) => source.match(pattern)).find(Boolean);
  if (!match || match.index === undefined) return null;

  return blockBodySlice(source, match.index, match[0].length);
}

function routeRenderBodySlice(source) {
  const directDefault = defaultExportBodySlice(source);
  if (directDefault) return { source: directDefault, kind: "default-function" };

  const namedDefaultMatch = source.match(/export\s+default\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*;?/);
  if (!namedDefaultMatch) return { source: null, kind: "missing" };

  const componentName = namedDefaultMatch[1];
  const componentSource = functionBodySlice(source, componentName);
  return {
    source: componentSource,
    kind: componentSource ? "default-identifier" : "missing-identifier-body",
    componentName
  };
}

function packageRequirementKey(requirement) {
  return `${requirement.package}:${requirement.name}`;
}

function standardPageKitStatus(surfaces, routePages, componentContracts) {
  const manifest = readJson(standardPageKitManifestPath);
  const allowedKeys = new Set((manifest.components ?? []).map(packageRequirementKey));
  const requirements = [
    ...surfaces.flatMap((surface) => surface.required ?? []),
    ...routePages.flatMap((routePage) => routePage.required ?? routePage.requiredPackageComponents ?? []),
    ...componentContracts.flatMap((contract) => contract.required ?? [])
  ];
  const uniqueRequirements = Array.from(new Set(requirements.map(packageRequirementKey))).sort();
  const outsideManifest = uniqueRequirements.filter((key) => !allowedKeys.has(key));

  return {
    pass: outsideManifest.length === 0,
    manifest: path.relative(root, standardPageKitManifestPath).replaceAll("\\", "/"),
    manifestCount: allowedKeys.size,
    requiredCount: uniqueRequirements.length,
    outsideManifest
  };
}

function functionBodySlice(source, componentName) {
  const patterns = [
    new RegExp(`function\\s+${componentName}\\s*\\(`),
    new RegExp(`(?:const|let|var)\\s+${componentName}\\s*=\\s*(?:\\([^)]*\\)|[^=]+?)\\s*=>`),
    new RegExp(`(?:const|let|var)\\s+${componentName}\\s*=\\s*function\\s*\\(`)
  ];
  const match = patterns.map((pattern) => ({ pattern, match: source.match(pattern) })).find((entry) => entry.match);
  if (!match?.match || match.match.index === undefined) return null;

  return blockBodySlice(source, match.match.index, match.match[0].length);
}

function blockBodySlice(source, declarationStart, declarationLength) {
  const bodySearchStart = bodySearchStartIndex(source, declarationStart, declarationLength);
  const bodyStart = bodySearchStart >= 0 ? source.indexOf("{", bodySearchStart) : -1;
  if (bodyStart < 0) return null;

  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(declarationStart, index + 1);
      }
    }
  }

  return null;
}

function bodySearchStartIndex(source, declarationStart, declarationLength) {
  const declarationEnd = declarationStart + declarationLength;
  const arrowIndex = source.indexOf("=>", declarationStart);
  if (arrowIndex >= 0 && arrowIndex < declarationEnd) {
    return arrowIndex + 2;
  }

  const paramsStart = source.indexOf("(", declarationStart);
  if (paramsStart < 0 || paramsStart >= declarationEnd) {
    return declarationEnd;
  }

  const paramsEnd = matchingDelimiterIndex(source, paramsStart, "(", ")");
  return paramsEnd >= 0 ? paramsEnd + 1 : declarationEnd;
}

function matchingDelimiterIndex(source, start, openChar, closeChar) {
  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function forbiddenFragmentMatches(source, fragments) {
  const matches = [];

  for (const fragment of fragments) {
    let index = source.indexOf(fragment);
    while (index >= 0) {
      matches.push({
        fragment,
        line: lineNumber(source, index)
      });
      index = source.indexOf(fragment, index + fragment.length);
    }
  }

  return matches;
}

function forbiddenTextPatternMatches(source, patterns) {
  const matches = [];

  for (const pattern of patterns) {
    const expression = new RegExp(pattern, "g");
    let match = expression.exec(source);
    while (match) {
      matches.push({
        pattern,
        line: lineNumber(source, match.index),
        match: match[0]
      });
      match = expression.exec(source);
    }
  }

  return matches;
}

function surfaceStatus(surface) {
  const filePath = path.join(consumerRoot, surface.file);
  if (!exists(filePath)) {
    return {
      ...surface,
      exists: false,
      requiredStatus: [],
      forbiddenMatches: [],
      pass: false
    };
  }

  const source = read(filePath);
  const requiredStatus = (surface.required ?? []).map((requirement) =>
    packageImportStatus(source, requirement.name, requirement.package)
  );
  const forbiddenMatches = forbiddenFragmentMatches(source, surface.forbiddenFragments ?? []);
  const forbiddenTextMatches = forbiddenTextPatternMatches(source, surface.forbiddenTextPatterns ?? []);

  return {
    ...surface,
    exists: true,
    requiredStatus,
    forbiddenMatches,
    forbiddenTextMatches,
    pass: requiredStatus.every((row) => row.pass) && forbiddenMatches.length === 0 && forbiddenTextMatches.length === 0
  };
}

function routeStatus(routePage) {
  const filePath = path.join(consumerRoot, routePage.file);
  if (!exists(filePath)) {
    return {
      ...routePage,
      exists: false,
      requiredStatus: [],
      pass: false
    };
  }

  const source = read(filePath);
  const routeRender = routeRenderBodySlice(source);
  const routeSource = routeRender.source;
  const requiredPackageStatus = (routePage.required ?? routePage.requiredPackageComponents ?? []).map((requirement) =>
    packageImportStatus(source, requirement.name, requirement.package, routeSource ?? "")
  );
  const requiredLocalStatus = (routePage.requiredLocalComponents ?? []).map((requirement) =>
    localImportStatus(source, requirement.name, requirement.importFrom, routeSource ?? "")
  );
  const requiredStatus = [...requiredPackageStatus, ...requiredLocalStatus].map((row) => ({
    ...row,
    jsxUsedInRoute: row.jsxUsed
  }));

  return {
    ...routePage,
    exists: true,
    routeComponentFound: Boolean(routeSource),
    routeRenderKind: routeRender.kind,
    routeRenderComponent: routeRender.componentName ?? null,
    requiredStatus,
    pass: Boolean(routeSource) && requiredStatus.every((row) => row.pass)
  };
}

function componentContractStatus(contract) {
  const filePath = path.join(consumerRoot, contract.file);
  if (!exists(filePath)) {
    return {
      ...contract,
      exists: false,
      componentFound: false,
      requiredStatus: [],
      pass: false
    };
  }

  const source = read(filePath);
  const componentSource = functionBodySlice(source, contract.component);
  const requiredStatus = (contract.required ?? []).map((requirement) => {
    const importStatus = packageImportStatus(source, requirement.name, requirement.package);
    const jsxUsedInComponent = componentSource ? new RegExp(`<${requirement.name}(\\s|>|\\.)`).test(componentSource) : false;
    return {
      ...importStatus,
      jsxUsedInComponent,
      pass: importStatus.imported && jsxUsedInComponent
    };
  });

  return {
    ...contract,
    exists: true,
    componentFound: Boolean(componentSource),
    requiredStatus,
    pass: Boolean(componentSource) && requiredStatus.every((row) => row.pass)
  };
}

function routeComponentContractCoverageStatus(routePages, componentContractRows) {
  const contractsById = new Map(componentContractRows.map((contract) => [contract.id, contract]));
  const contractsByComponent = new Map();
  for (const contract of componentContractRows) {
    if (!contractsByComponent.has(contract.component)) contractsByComponent.set(contract.component, []);
    contractsByComponent.get(contract.component).push(contract);
  }

  return routePages.flatMap((routePage) =>
    (routePage.requiredLocalComponents ?? []).map((requirement) => {
      const linkedContract = requirement.componentContractId
        ? contractsById.get(requirement.componentContractId)
        : (contractsByComponent.get(requirement.name) ?? [])[0];
      const reason = requirement.componentContractId
        ? linkedContract
          ? "linked-by-id"
          : "missing-contract-id"
        : linkedContract
          ? "linked-by-component"
          : "missing-component-contract";
      const expectedContractComponent = requirement.componentContractComponent ?? requirement.name;
      const linkedContractComponentMatches = linkedContract?.component === expectedContractComponent;

      return {
        route: routePage.route,
        routeFile: routePage.file,
        componentName: requirement.name,
        importFrom: requirement.importFrom,
        componentContractId: requirement.componentContractId ?? null,
        componentContractComponent: requirement.componentContractComponent ?? null,
        expectedContractComponent,
        linkedContractId: linkedContract?.id ?? null,
        linkedContractComponent: linkedContract?.component ?? null,
        linkedContractComponentMatches,
        linkedContractPass: linkedContract?.pass ?? false,
        reason,
        pass: Boolean(linkedContract?.pass) && linkedContractComponentMatches
      };
    })
  );
}

const pageKitConfig = readPageKitConfig();
const surfaces = pageKitConfig.validation.pass ? pageKitConfig.surfaces : [];
const routePages = pageKitConfig.validation.pass ? pageKitConfig.routePages : [];
const componentContracts = pageKitConfig.validation.pass ? pageKitConfig.componentContracts : [];
const surfaceRows = surfaces.map(surfaceStatus);
const routeRows = routePages.map(routeStatus);
const componentContractRows = componentContracts.map(componentContractStatus);
const routeComponentContractRows = pageKitConfig.validation.pass
  ? routeComponentContractCoverageStatus(routePages, componentContractRows)
  : [];
const routeCoverage = pageKitConfig.validation.pass
  ? routeCoverageStatus(pageKitConfig.routeCoverage, routePages)
  : routeCoverageStatus(null, []);
const standardPageKit = pageKitConfig.validation.pass
  ? standardPageKitStatus(surfaces, routePages, componentContracts)
  : { pass: false, manifest: path.relative(root, standardPageKitManifestPath).replaceAll("\\", "/"), manifestCount: 0, requiredCount: 0, outsideManifest: [] };
const failedSurfaces = surfaceRows.filter((row) => !row.pass);
const failedRoutes = routeRows.filter((row) => !row.pass);
const failedComponentContracts = componentContractRows.filter((row) => !row.pass);
const failedRouteComponentContracts = routeComponentContractRows.filter((row) => !row.pass);

const report = {
  consumerRoot,
  reportLabel: reportLabel || "default",
  configSource: pageKitConfig.source,
  configValidation: pageKitConfig.validation,
  generatedAt: new Date().toISOString(),
  surfaceRows,
  routeRows,
  componentContractRows,
  routeComponentContractRows,
  routeCoverage,
  standardPageKit,
  summary: {
    pass:
      pageKitConfig.validation.pass &&
      failedSurfaces.length === 0 &&
      failedRoutes.length === 0 &&
      failedComponentContracts.length === 0 &&
      failedRouteComponentContracts.length === 0 &&
      routeCoverage.pass &&
      standardPageKit.pass,
    failedConfig: pageKitConfig.validation.errors,
    failedSurfaces: failedSurfaces.map((row) => row.id),
    failedRoutes: failedRoutes.map((row) => row.route),
    failedComponentContracts: failedComponentContracts.map((row) => row.id),
    failedRouteComponentContracts: failedRouteComponentContracts.map((row) => `${row.route}:${row.componentName}`),
    uncoveredRoutes: routeCoverage.uncoveredRoutes,
    outsideStandardPageKit: standardPageKit.outsideManifest
  }
};

if (persistReports) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const markdown = [
  "# Consumer Page Kit Audit",
  "",
  `Consumer: \`${consumerRoot}\``,
  `Config: \`${report.configSource}\``,
  "",
  `Status: ${report.summary.pass ? "Pass" : "Fail"}`,
  "",
  "## Config",
  "",
  `Status: ${report.configValidation.pass ? "Pass" : "Fail"}`,
  "",
  ...(report.configValidation.errors.length
    ? report.configValidation.errors.map((error) => `- ${error}`)
    : ["- Schema valid"]),
  "",
  "## Standard Page Kit Manifest",
  "",
  `Status: ${standardPageKit.pass ? "Pass" : "Fail"}`,
  `Manifest: \`${standardPageKit.manifest}\``,
  `Manifest components: ${standardPageKit.manifestCount}`,
  `Required package components: ${standardPageKit.requiredCount}`,
  `Outside manifest: ${standardPageKit.outsideManifest.map((key) => `\`${key}\``).join(", ") || "None"}`,
  "",
  "## Surfaces",
  "",
  "| Surface | File | Required components | Forbidden fragments/text | Status |",
  "| --- | --- | --- | --- | --- |",
  ...surfaceRows.map((row) => {
    const required = row.requiredStatus
      .map((item) => `${item.pass ? "Pass" : "Fail"} \`${item.componentName}\` import:${item.imported ? "yes" : "no"} jsx:${item.jsxUsed ? "yes" : "no"}`)
      .join("<br />");
    const forbidden = row.forbiddenMatches.length
      ? row.forbiddenMatches.map((match) => `\`${match.fragment}:${match.line}\``).join("<br />")
      : "None";
    const forbiddenText = row.forbiddenTextMatches?.length
      ? `<br />Text: ${row.forbiddenTextMatches.map((match) => `\`${match.pattern}:${match.line}\``).join("<br />")}`
      : row.forbiddenTextPatterns?.length
        ? "<br />Text: None"
        : "";
    return `| \`${row.id}\` | \`${row.file}\` | ${required} | ${forbidden}${forbiddenText} | ${row.pass ? "Pass" : "Fail"} |`;
  }),
  "",
  "## Routes",
  "",
  "| Route | File | Required components | Status |",
  "| --- | --- | --- | --- |",
  ...routeRows.map((row) => {
    const required = row.requiredStatus
      .map((item) => `${item.pass ? "Pass" : "Fail"} \`${item.componentName}\` import:${item.imported ? "yes" : "no"} jsx-in-route:${item.jsxUsedInRoute ? "yes" : "no"}`)
      .join("<br />");
    return `| \`${row.route}\` | \`${row.file}\` found:${row.routeComponentFound ? "yes" : "no"} | ${required || "None"} | ${row.pass ? "Pass" : "Fail"} |`;
  }),
  "",
  "## Component Contracts",
  "",
  "| Contract | File | Component | Required official render roots | Status |",
  "| --- | --- | --- | --- | --- |",
  ...(componentContractRows.length
    ? componentContractRows.map((row) => {
        const required = row.requiredStatus
          .map(
            (item) =>
              `${item.pass ? "Pass" : "Fail"} \`${item.componentName}\` import:${item.imported ? "yes" : "no"} jsx-in-component:${item.jsxUsedInComponent ? "yes" : "no"}`
          )
          .join("<br />");
        return `| \`${row.id}\` | \`${row.file}\` | \`${row.component}\` found:${row.componentFound ? "yes" : "no"} | ${required || "None"} | ${row.pass ? "Pass" : "Fail"} |`;
      })
    : ["| None | None | None | None | Pass |"]),
  "",
  "## Route Component Contract Coverage",
  "",
  "| Route | Local component | Component contract | Status |",
  "| --- | --- | --- | --- |",
  ...(routeComponentContractRows.length
    ? routeComponentContractRows.map(
        (row) =>
          `| \`${row.route}\` | \`${row.componentName}\` from \`${row.importFrom}\` | ${row.linkedContractId ? `\`${row.linkedContractId}\` (${row.reason})` : row.reason} | ${row.pass ? "Pass" : "Fail"} |`
      )
    : ["| None | None | None | Pass |"]),
  "",
  "## Route Coverage",
  "",
  `Status: ${routeCoverage.pass ? "Pass" : "Fail"}`,
  `Enabled: ${routeCoverage.enabled ? "Yes" : "No"}`,
  routeCoverage.enabled ? `Root: \`${routeCoverage.root}\`` : "",
  routeCoverage.enabled ? `Root exists: ${routeCoverage.rootExists ? "Yes" : "No"}` : "",
  routeCoverage.enabled ? `Base route: \`${routeCoverage.baseRoute}\`` : "",
  routeCoverage.enabled ? `Discovered routes: ${routeCoverage.discoveredRoutes.map((route) => `\`${route}\``).join(", ") || "None"}` : "",
  routeCoverage.enabled ? `Uncovered routes: ${routeCoverage.uncoveredRoutes.map((route) => `\`${route}\``).join(", ") || "None"}` : "",
  ""
].join("\n");
if (persistReports) fs.writeFileSync(reportMdPath, markdown);

if (persistReports) console.log(`Consumer page kit audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Consumer page kit: ${report.summary.pass ? "pass" : "fail"}`);

if (check && !report.summary.pass) {
  if (report.summary.failedConfig.length) {
    console.error(`Config errors: ${report.summary.failedConfig.join("; ")}`);
  }
  console.error(`Failed surfaces: ${report.summary.failedSurfaces.join(", ") || "none"}`);
  console.error(`Failed routes: ${report.summary.failedRoutes.join(", ") || "none"}`);
  console.error(`Failed component contracts: ${report.summary.failedComponentContracts.join(", ") || "none"}`);
  console.error(`Failed route component contracts: ${report.summary.failedRouteComponentContracts.join(", ") || "none"}`);
  console.error(`Uncovered routes: ${report.summary.uncoveredRoutes.join(", ") || "none"}`);
  console.error(`Outside standard page kit: ${report.summary.outsideStandardPageKit.join(", ") || "none"}`);
  process.exit(1);
}
