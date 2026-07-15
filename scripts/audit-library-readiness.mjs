import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { validatePageKitConfig, validateReadinessConfig } from "./consumer-config-validation.mjs";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = process.argv.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function hasOption(name) {
  return args.some((arg) => arg === name || arg.startsWith(`${name}=`));
}

function optionalArg(name) {
  const value = optionValue(name, "");
  return value ? [name, value] : [];
}

const consumerArg = optionValue("--consumer", "../taliya-internal");
const consumerRoot = resolve(root, consumerArg);
const defaultConsumerRoot = resolve(root, "../taliya-internal");

function readJsonFile(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid ${label} JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function readReadinessConfig() {
  const explicitConfig = optionValue("--readiness-config", "");
  const configPath = explicitConfig ? resolve(root, explicitConfig) : resolve(consumerRoot, "taliya-readiness.config.json");
  if (!explicitConfig && !existsSync(configPath)) {
    return {
      source: "",
      values: {}
    };
  }

  if (!existsSync(configPath)) {
    console.error(`Readiness config not found: ${configPath}`);
    process.exit(1);
  }

  try {
    const parsed = readJsonFile(configPath, "readiness config");
    const errors = validateReadinessConfig(parsed);
    if (errors.length > 0) {
      console.error(`Invalid readiness config: ${errors.join("; ")}`);
      process.exit(1);
    }

    return {
      source: configPath,
      values: parsed
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function commandsValue(value) {
  if (Array.isArray(value)) return value.join(",");
  return value ?? "";
}

function packageRequirementKey(requirement) {
  return `${requirement.package}:${requirement.name}`;
}

function collectPageKitPackageRequirements(pageKitConfig) {
  const surfaceRequirements = Array.isArray(pageKitConfig.surfaces)
    ? pageKitConfig.surfaces.flatMap((surface) => (Array.isArray(surface.required) ? surface.required : []))
    : [];
  const routeRequirements = Array.isArray(pageKitConfig.routes)
    ? pageKitConfig.routes.flatMap((route) => {
        const required = route.required ?? route.requiredPackageComponents ?? [];
        return Array.isArray(required) ? required : [];
      })
    : [];

  return [...surfaceRequirements, ...routeRequirements].filter((requirement) =>
    requirement && typeof requirement === "object" && typeof requirement.name === "string" && typeof requirement.package === "string"
  );
}

function publicApiRequirementKeys() {
  const publicApi = readJsonFile(resolve(specDir, "public-api-audit.json"), "public API audit");
  return new Set((publicApi.rows ?? []).filter((row) => row.pass).map((row) => `${row.package}:${row.name}`));
}

function rootRelativeFromConsumer(value) {
  if (!value) return "";
  const absolute = resolve(consumerRoot, value);
  return absolute;
}

const readinessConfig = readReadinessConfig();
const configValues = readinessConfig.values;
const distributionChannel = configValues.distribution?.channel ?? "vendor-local-tarballs";
const usesRegistryDistribution = distributionChannel === "npm-registry";
const reportLabel = hasOption("--report-label") ? optionValue("--report-label", "") : configValues.reportLabel ?? "";
const isDefaultInternalScope = consumerRoot === defaultConsumerRoot && !reportLabel;
const consumerArgs = optionalArg("--consumer");
const reportLabelArgs = reportLabel ? ["--report-label", reportLabel] : [];
const effectivePageKitConfig = hasOption("--page-kit-config")
  ? optionValue("--page-kit-config", "")
  : rootRelativeFromConsumer(configValues.pageKitConfig);
const effectiveVendor = hasOption("--vendor") ? optionValue("--vendor", "") : configValues.vendor ?? "";
const effectiveCommands = hasOption("--commands") ? optionValue("--commands", "") : commandsValue(configValues.commands);
const effectiveReadinessConfig = hasOption("--readiness-config") ? optionValue("--readiness-config", "") : "";
const pageKitArgs = effectivePageKitConfig ? ["--page-kit-config", effectivePageKitConfig] : [];
const vendorArgs = effectiveVendor ? ["--vendor", effectiveVendor] : [];
const runtimeCommandArgs = effectiveCommands ? ["--commands", effectiveCommands] : [];
const readinessConfigArgs = effectiveReadinessConfig ? ["--readiness-config", effectiveReadinessConfig] : [];

function withConsumerArgs(scriptPath, extraArgs = []) {
  return [process.execPath, scriptPath, "--check", ...consumerArgs, ...extraArgs, ...reportLabelArgs];
}

function normalizedReportLabel() {
  if (!reportLabel) return "";

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return normalized;
}

function reportBasename(baseName) {
  const normalized = normalizedReportLabel();
  return normalized ? `${baseName}-${normalized}` : baseName;
}

const reportBaseName = reportBasename("library-readiness-gate");
const reportJsonPath = resolve(specDir, `${reportBaseName}.json`);
const reportMdPath = resolve(specDir, `${reportBaseName}.md`);

const gates = [
  {
    id: "tokens",
    command: [process.execPath, "scripts/audit-design-tokens.mjs", "--check"],
    commandText: "corepack pnpm tokens:audit",
    proves: "official token governance has no new visual debt"
  },
  {
    id: "storybook-anatomy",
    command: [process.execPath, "scripts/audit-storybook-anatomy.mjs", "--check", "--strict"],
    commandText: "corepack pnpm storybook-anatomy:audit:strict",
    proves: "Storybook owns no product anatomy or official component appearance while fixture geometry remains explicitly classified"
  },
  {
    id: "storybook-anatomy-override-probe",
    command: [process.execPath, "scripts/probe-storybook-anatomy-official-override.mjs"],
    commandText: "corepack pnpm storybook-anatomy:audit:override-probe",
    proves: "an official component appearance or anatomy override in Storybook CSS fails strict ownership"
  },
  {
    id: "components",
    command: [process.execPath, "scripts/audit-component-architecture.mjs", "--check"],
    commandText: "corepack pnpm components:audit",
    proves: "Storybook/component architecture has valid namespaces and no unresolved primitive reuse rows"
  },
  {
    id: "domain-wrappers",
    command: [process.execPath, "scripts/audit-domain-wrappers.mjs", "--check"],
    commandText: "corepack pnpm domain-wrappers:audit",
    proves: "retained CRM domain wrappers add explicit domain mapping or anatomy instead of empty pass-through wrappers"
  },
  {
    id: "domain-wrappers-direct-drawer-probe",
    command: [process.execPath, "scripts/probe-domain-wrapper-direct-drawer.mjs"],
    commandText: "corepack pnpm domain-wrappers:audit:direct-drawer-probe",
    proves: "direct <aside> drawer contracts fail instead of returning as hidden drawer-unification debt"
  },
  {
    id: "public-api",
    command: [process.execPath, "scripts/audit-public-api.mjs", "--check"],
    commandText: "corepack pnpm public-api:audit",
    proves: "standard page kit is exported, story-covered, and documented"
  },
  {
    id: "public-api-surface",
    command: [process.execPath, "scripts/audit-public-api-surface.mjs", "--check"],
    commandText: "corepack pnpm public-api-surface:audit",
    proves: "public API aliases, canonical page-kit components, and CRM specializations are documented and export-valid"
  },
  {
    id: "package-boundaries",
    command: [process.execPath, "scripts/audit-package-boundaries.mjs", "--check"],
    commandText: "corepack pnpm package-boundaries:audit",
    proves: "standalone package dependency direction remains valid"
  },
  {
    id: "package-artifacts",
    command: [process.execPath, "scripts/audit-package-artifacts.mjs", "--check"],
    commandText: "corepack pnpm package-artifacts:audit",
    proves: "local tarballs contain installable, publishable, CSS-side-effect-safe, React-peer-safe, workspace-free, locally versioned, package-files-restricted, and README-documented JS, type, CSS, and package metadata entrypoints"
  },
  {
    id: "release-policy",
    command: [process.execPath, "scripts/audit-release-policy.mjs", "--check"],
    commandText: "corepack pnpm release-policy:audit",
    proves: "local tarball release policy and future registry blockers are versioned and auditable"
  },
  {
    id: "release-policy-negative-probe",
    command: [process.execPath, "scripts/probe-release-policy-invalid-contract.mjs"],
    commandText: "corepack pnpm release-policy:audit:negative-probe",
    proves: "invalid release policy contracts fail instead of being accepted as release evidence"
  },
  {
    id: "consumer-starter-templates",
    command: [process.execPath, "scripts/audit-consumer-starter-templates.mjs", "--check"],
    commandText: "corepack pnpm consumer-starter-templates:audit",
    proves: "official future CRM starter templates match the consumer page-kit config example"
  },
  {
    id: "consumer-starter-templates-route-contract-probe",
    command: [process.execPath, "scripts/probe-consumer-starter-templates-route-contract.mjs"],
    commandText: "corepack pnpm consumer-starter-templates:audit:route-contract-probe",
    proves: "future CRM starter route-local componentContractId links must reference existing component contracts"
  },
  {
    id: "consumer-bootstrap",
    command: [process.execPath, "scripts/audit-consumer-bootstrap.mjs", "--check"],
    commandText: "corepack pnpm consumer-bootstrap:audit",
    proves: "future consumer configs and a minimal page-kit route can be bootstrapped and audited from official templates"
  },
  {
    id: "future-consumer-fixture",
    command: [process.execPath, "scripts/audit-future-consumer-fixture.mjs", "--check"],
    commandText: "corepack pnpm future-consumer-fixture:audit",
    proves: "an installed synthetic future CRM consumer can resolve public JS/CSS exports, resolve @taliya/crm/standard-page-kit, server-render official shell/filter/table/drawer components, and pass package, page-kit, config, sync, and runtime audits"
  },
  {
    id: "future-consumer-discovery",
    command: [process.execPath, "scripts/audit-future-consumer-discovery.mjs", "--check"],
    commandText: "corepack pnpm future-consumer-discovery:audit",
    proves: "local sibling directories are scanned for a real future CRM consumer before goal evidence is evaluated"
  },
  {
    id: "future-consumer-discovery-negative-probe",
    command: [process.execPath, "scripts/probe-future-consumer-discovery-missing-scan-root.mjs"],
    commandText: "corepack pnpm future-consumer-discovery:audit:negative-probe",
    proves: "a missing future CRM scan root fails discovery instead of being accepted as zero candidates"
  },
  {
    id: "future-consumer-discovery-partial-probe",
    command: [process.execPath, "scripts/probe-future-consumer-discovery-partial-candidate.mjs"],
    commandText: "corepack pnpm future-consumer-discovery:audit:partial-probe",
    proves: "partial future CRM evidence is not accepted as a real future CRM candidate"
  },
  {
    id: "future-consumer-discovery-positive-probe",
    command: [process.execPath, "scripts/probe-future-consumer-discovery-valid-candidate.mjs"],
    commandText: "corepack pnpm future-consumer-discovery:audit:positive-probe",
    proves: "a future CRM directory with the full consumer contract is accepted as a real future CRM candidate"
  },
  {
    id: "future-consumer-adoption",
    command: [process.execPath, "scripts/audit-future-consumer-adoption.mjs", "--check"],
    commandText: "corepack pnpm future-consumer-adoption:audit",
    proves: "discovered real future CRM candidates must have matching labeled readiness evidence before adoption is considered executed"
  },
  {
    id: "future-consumer-adoption-positive-probe",
    command: [process.execPath, "scripts/probe-future-consumer-adoption-valid-evidence.mjs"],
    commandText: "corepack pnpm future-consumer-adoption:audit:positive-probe",
    proves: "a discovered future CRM candidate with matching labeled readiness evidence is accepted"
  },
  {
    id: "future-consumer-adoption-mismatch-probe",
    command: [process.execPath, "scripts/probe-future-consumer-adoption-mismatched-evidence.mjs"],
    commandText: "corepack pnpm future-consumer-adoption:audit:mismatch-probe",
    proves: "a discovered future CRM candidate cannot be adopted with readiness evidence for a different consumer root"
  },
  {
    id: "future-consumer-adoption-negative-probe",
    command: [process.execPath, "scripts/probe-future-consumer-adoption-missing-evidence.mjs"],
    commandText: "corepack pnpm future-consumer-adoption:audit:negative-probe",
    proves: "a discovered future CRM candidate without matching labeled readiness evidence fails the adoption audit"
  },
  {
    id: "future-crm-adoption-handoff",
    command: [process.execPath, "scripts/audit-future-crm-adoption-handoff.mjs", "--check"],
    commandText: "corepack pnpm future-crm-adoption-handoff:audit",
    proves: "future CRM adoption has a single audited handoff for candidate discovery, bootstrap, labeled evidence, and non-completion rules"
  },
  {
    id: "registry-consumer-migration-probe",
    command: [process.execPath, "scripts/probe-registry-consumer-migration.mjs"],
    commandText: "corepack pnpm registry-consumer:migrate:probe",
    proves: "registry migration requires per-package publication evidence, applies official ranges, and restores consumer manifests when npm install fails"
  },
  ...(!usesRegistryDistribution ? [{
    id: "consumer-dependencies-sync",
    command: withConsumerArgs("scripts/sync-consumer-dependencies.mjs", vendorArgs),
    commandText: reportLabel ? `consumer dependency sync check (${reportLabel})` : "corepack pnpm consumer-dependencies:sync:check",
    proves: "target consumer package.json @taliya/* dependencies match the local release manifest tarball names"
  }] : []),
  ...(isDefaultInternalScope && !usesRegistryDistribution ? [{
    id: "consumer-dependencies-sync-stale-manifest-probe",
    command: [process.execPath, "scripts/probe-consumer-dependencies-stale-manifest.mjs"],
    commandText: "corepack pnpm consumer-dependencies:sync:stale-manifest-probe",
    proves: "stale consumer package.json tarball dependencies fail the manifest-driven dependency sync check"
  }] : []),
  ...(!usesRegistryDistribution ? [{
    id: "consumer-package-install-plan",
    command: withConsumerArgs("scripts/install-consumer-packages.mjs", vendorArgs),
    commandText: reportLabel ? `consumer package install plan (${reportLabel})` : "corepack pnpm consumer-packages:install-plan",
    proves: "target consumer can reinstall the manifest-derived local package tarballs from its vendor directory"
  }] : []),
  ...(isDefaultInternalScope && !usesRegistryDistribution ? [{
    id: "consumer-package-install-missing-vendor-probe",
    command: [process.execPath, "scripts/probe-consumer-package-install-missing-vendor.mjs"],
    commandText: "corepack pnpm consumer-packages:install:missing-vendor-probe",
    proves: "a consumer package install plan fails when manifest-derived vendor tarballs are missing"
  }] : []),
  ...(!usesRegistryDistribution ? [{
    id: "consumer-lockfile",
    command: withConsumerArgs("scripts/audit-consumer-lockfile.mjs", vendorArgs),
    commandText: reportLabel ? `consumer lockfile audit (${reportLabel})` : "corepack pnpm consumer-lockfile:audit",
    proves: "target consumer package-lock.json local Taliya package entries match the local release manifest"
  }] : []),
  ...(isDefaultInternalScope && !usesRegistryDistribution ? [{
    id: "consumer-lockfile-stale-probe",
    command: [process.execPath, "scripts/probe-consumer-lockfile-stale.mjs"],
    commandText: "corepack pnpm consumer-lockfile:audit:stale-probe",
    proves: "stale package-lock resolved tarballs fail the consumer lockfile audit"
  }] : []),
  ...(!usesRegistryDistribution ? [{
    id: "consumer-refresh",
    command: withConsumerArgs("scripts/refresh-consumer-packages.mjs", vendorArgs),
    commandText: reportLabel ? `consumer refresh audit (${reportLabel})` : "corepack pnpm consumer-refresh:audit",
    proves: "target consumer can run the manifest-driven package refresh flow end-to-end in check mode"
  }] : []),
  {
    id: "consumer-integration",
    command: withConsumerArgs("scripts/audit-consumer-integration.mjs", vendorArgs),
    commandText: reportLabel ? `consumer integration audit (${reportLabel})` : "corepack pnpm consumer:audit",
    proves: "target consumer installs public packages and avoids local visual clones"
  },
  ...(!usesRegistryDistribution ? [{
    id: "consumer-package-sync",
    command: withConsumerArgs("scripts/audit-consumer-package-sync.mjs", vendorArgs),
    commandText: reportLabel ? `consumer package sync audit (${reportLabel})` : "corepack pnpm consumer-package-sync:audit",
    proves: "target consumer vendor tarballs and installed public package files match the latest local package artifacts"
  }] : []),
  ...(isDefaultInternalScope && !usesRegistryDistribution ? [{
    id: "consumer-package-sync-negative-probe",
    command: [process.execPath, "scripts/probe-consumer-package-sync-stale-installed.mjs"],
    commandText: "corepack pnpm consumer-package-sync:audit:negative-probe",
    proves: "a consumer with fresh vendor tarballs but stale installed package files fails package sync"
  }] : []),
  ...(!usesRegistryDistribution ? [{
    id: "consumer-vendor-versioning",
    command: withConsumerArgs("scripts/audit-consumer-vendor-versioning.mjs", vendorArgs),
    commandText: reportLabel ? `consumer vendor versioning audit (${reportLabel})` : "corepack pnpm consumer-vendor-versioning:audit",
    proves: "target consumer vendor tarballs are synced and tracked in the consumer repository"
  }] : []),
  ...(usesRegistryDistribution ? [{
    id: "registry-consumer-adoption",
    command: withConsumerArgs("scripts/audit-registry-consumer-adoption.mjs"),
    commandText: reportLabel ? `registry consumer adoption audit (${reportLabel})` : "corepack pnpm registry-consumer-adoption:audit",
    proves: "target consumer dependencies, lockfile, installed packages, and readiness config use the published npm release"
  }] : []),
  {
    id: "consumer-page-kit",
    command: withConsumerArgs("scripts/audit-consumer-page-kit.mjs", pageKitArgs),
    commandText: reportLabel ? `consumer page-kit audit (${reportLabel})` : "corepack pnpm consumer-page-kit:audit",
    proves: "target consumer imports and renders official page-kit components"
  },
  ...(isDefaultInternalScope ? [{
    id: "consumer-page-kit-shell-only-route-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-shell-only-route.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:shell-only-route-probe",
    proves: "a route that renders only InternalShell without its workspace fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-wrapper-contract-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-wrapper-contract.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe",
    proves: "a wrapper that renders official roots only in an unused helper fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-route-wrapper-contract-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-route-wrapper-contract.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe",
    proves: "a route-local workspace without a component contract fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-mismatched-route-contract-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-mismatched-route-contract.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe",
    proves: "a route-local component linked to a component contract for another wrapper fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-default-identifier-route-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-default-identifier-route.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe",
    proves: "a route that exports a named component as default can satisfy the page-kit audit"
  },
  {
    id: "consumer-page-kit-uncovered-route-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-uncovered-route.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:uncovered-route-probe",
    proves: "a discovered Internal route that is missing from page-kit config fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-path-traversal-probe",
    command: [process.execPath, "scripts/probe-consumer-page-kit-config-path-traversal.mjs"],
    commandText: "corepack pnpm consumer-page-kit:audit:path-traversal-probe",
    proves: "consumer page-kit config paths outside the consumer root fail schema validation"
  }] : []),
  {
    id: "consumer-runtime",
    command: withConsumerArgs("scripts/audit-consumer-runtime.mjs", runtimeCommandArgs),
    commandText: reportLabel ? `consumer runtime audit (${reportLabel})` : "corepack pnpm consumer-runtime:audit",
    proves: "target consumer runtime scripts pass with installed packages"
  },
  {
    id: "consumer-config-versioning",
    command: withConsumerArgs("scripts/audit-consumer-config-versioning.mjs", [...readinessConfigArgs, ...pageKitArgs]),
    commandText: reportLabel ? `consumer config versioning audit (${reportLabel})` : "corepack pnpm consumer-config-versioning:audit",
    proves: "target consumer owns versioned readiness and page-kit config files"
  },
  ...(isDefaultInternalScope ? [{
    id: "consumer-readiness-config-path-traversal-probe",
    command: [process.execPath, "scripts/probe-consumer-readiness-config-path-traversal.mjs"],
    commandText: "corepack pnpm consumer-readiness-config:audit:path-traversal-probe",
    proves: "consumer readiness config paths outside the consumer root fail schema validation"
  }] : []),
  {
    id: "local-readiness-runbook",
    commandText: "runbook backlink check",
    proves: "local package refresh, consumer validation procedure, future CRM discovery, config bootstrap dry-run, versioned config check, valid consumer config examples, standard page-kit manifest, and page-kit example public API coverage",
    check: () => {
      const runbookPath = resolve(specDir, "local-readiness-runbook.md");
      const libraryReadinessPath = resolve(specDir, "library-readiness-audit.md");
      const readinessConfigExamplePath = resolve(specDir, "contracts/consumer-readiness-config.example.json");
      const pageKitConfigExamplePath = resolve(specDir, "contracts/consumer-page-kit-config.example.json");
      const standardPageKitManifestPath = resolve(specDir, "contracts/standard-page-kit.manifest.json");
      const visualParityContractPath = resolve(specDir, "contracts/visual-parity-contract.md");
      const sourceAssetsContractPath = resolve(specDir, "contracts/source-assets-contract.md");
      const requiredLinks = [
        "README.md",
        "specs/001-product-ui-foundation/contracts/consumer-integration-contract.md",
        "specs/001-product-ui-foundation/consumer-adoption-playbook.md",
        "specs/001-product-ui-foundation/library-readiness-audit.md",
        "specs/001-product-ui-foundation/library-readiness-audit.json"
      ];
      const requiredRunbookSnippets = [
        "corepack pnpm readiness:audit",
        "corepack pnpm pack:local",
        "corepack pnpm consumer-configs:bootstrap",
        "--starter-files",
        "corepack pnpm consumer-config-versioning:audit",
        "corepack pnpm consumer-readiness-config:audit:path-traversal-probe",
        "corepack pnpm future-consumer-discovery:audit",
        "corepack pnpm future-consumer-discovery:audit:negative-probe",
        "corepack pnpm future-consumer-discovery:audit:partial-probe",
        "corepack pnpm future-consumer-discovery:audit:positive-probe",
        "corepack pnpm future-consumer-adoption:audit",
        "corepack pnpm future-consumer-adoption:audit:positive-probe",
        "corepack pnpm future-consumer-adoption:audit:mismatch-probe",
        "corepack pnpm future-consumer-adoption:audit:negative-probe",
        "corepack pnpm future-crm-adoption-handoff:audit",
        "corepack pnpm certification-scope:audit",
        "corepack pnpm certification-scope:audit:positive-probe",
        "corepack pnpm certification-scope:audit:negative-probe",
        "corepack pnpm visual-certification-backlog:audit",
        "corepack pnpm source-assets:reconcile",
        "corepack pnpm source-assets:reconcile:nested-exclusion-probe",
        "corepack pnpm reference-sheet-coverage:audit",
        "corepack pnpm reference-sheet-coverage:audit:missing-story-probe",
        "corepack pnpm visual-certification-plan:audit:negative-probe",
        "corepack pnpm visual-certification-plan:audit:missing-artifact-probe",
        "corepack pnpm visual-product-review:audit",
        "corepack pnpm library-acceptance:audit",
        "corepack pnpm library-acceptance:audit:positive-probe",
        "corepack pnpm library-acceptance:audit:negative-probe",
        "corepack pnpm library-consumption-status:audit",
        "corepack pnpm library-consumption-status:audit:positive-probe",
        "corepack pnpm library-consumption-status:audit:global-complete-probe",
        "corepack pnpm library-consumption-status:audit:stale-release-probe",
        "corepack pnpm library-consumption-status:audit:stale-readiness-probe",
        "corepack pnpm library-consumption-status:audit:negative-probe",
        "corepack pnpm crm-real-readiness:audit",
        "corepack pnpm official-library-readiness:audit",
        "corepack pnpm release-policy:audit",
        "corepack pnpm release-policy:audit:negative-probe",
        "corepack pnpm release-channel:audit",
        "corepack pnpm local-release-manifest:audit",
        "corepack pnpm consumer-dependencies:sync:check",
        "corepack pnpm consumer-dependencies:sync:stale-manifest-probe",
        "corepack pnpm consumer-packages:install-plan",
        "corepack pnpm consumer-packages:install:missing-vendor-probe",
        "corepack pnpm consumer-lockfile:audit",
        "corepack pnpm consumer-lockfile:audit:stale-probe",
        "corepack pnpm consumer-refresh:audit",
        "corepack pnpm consumer-refresh:apply",
        "corepack pnpm full-image-page-coverage:audit",
        "corepack pnpm full-image-page-coverage:audit:missing-story-probe",
        "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe",
        "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe",
        "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe",
        "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe",
        "corepack pnpm consumer-starter-templates:audit:route-contract-probe",
        "corepack pnpm consumer-page-kit:audit:shell-only-route-probe",
        "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe",
        "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe",
        "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe",
        "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe",
        "corepack pnpm consumer-page-kit:audit:uncovered-route-probe",
        "corepack pnpm consumer-page-kit:audit:path-traversal-probe",
        "corepack pnpm consumer-vendor:sync:check",
        "corepack pnpm consumer-vendor:sync:stale-manifest-probe",
        "dist-packages/taliya-product-ui-local-manifest.json",
        "standard-page-kit.manifest.json",
        "consumer-starter-files",
        "@taliya/crm/standard-page-kit",
        "taliya-readiness.config.json",
        "--report-label future-crm",
        "What This Does Not Prove"
      ];
      const requiredReadmeSnippets = [
        "corepack pnpm consumer-page-kit:audit",
        "corepack pnpm consumer-page-kit:audit:shell-only-route-probe",
        "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe",
        "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe",
        "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe",
        "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe",
        "corepack pnpm consumer-page-kit:audit:uncovered-route-probe",
        "corepack pnpm consumer-page-kit:audit:path-traversal-probe",
        "corepack pnpm consumer-readiness-config:audit:path-traversal-probe",
        "corepack pnpm full-image-page-coverage:audit",
        "corepack pnpm full-image-page-coverage:audit:missing-story-probe",
        "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe",
        "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe",
        "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe",
        "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe",
        "toda rota encontrada em `routeCoverage.root` precisa estar declarada em `routes`"
      ];
      const requiredConsumerDocSnippets = [
        {
          path: "specs/001-product-ui-foundation/consumer-adoption-playbook.md",
          snippets: ["@taliya/crm/standard-page-kit", "standardPageKitManifest", "corepack pnpm library-acceptance:audit", "corepack pnpm library-acceptance:audit:positive-probe", "corepack pnpm library-acceptance:audit:negative-probe", "corepack pnpm library-consumption-status:audit", "corepack pnpm library-consumption-status:audit:positive-probe", "corepack pnpm library-consumption-status:audit:global-complete-probe", "corepack pnpm library-consumption-status:audit:stale-release-probe", "corepack pnpm library-consumption-status:audit:stale-readiness-probe", "corepack pnpm library-consumption-status:audit:negative-probe", "corepack pnpm crm-real-readiness:audit", "corepack pnpm official-library-readiness:audit", "corepack pnpm release-policy:audit", "corepack pnpm release-policy:audit:negative-probe", "corepack pnpm release-channel:audit", "corepack pnpm local-release-manifest:audit", "corepack pnpm consumer-dependencies:sync:check", "corepack pnpm consumer-dependencies:sync:stale-manifest-probe", "corepack pnpm consumer-packages:install-plan", "corepack pnpm consumer-packages:install:missing-vendor-probe", "corepack pnpm consumer-lockfile:audit", "corepack pnpm consumer-lockfile:audit:stale-probe", "corepack pnpm consumer-refresh:audit", "corepack pnpm consumer-refresh:apply", "corepack pnpm full-image-page-coverage:audit", "corepack pnpm full-image-page-coverage:audit:missing-story-probe", "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe", "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe", "corepack pnpm consumer-starter-templates:audit:route-contract-probe", "corepack pnpm consumer-page-kit:audit:shell-only-route-probe", "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe", "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe", "corepack pnpm consumer-page-kit:audit:uncovered-route-probe", "corepack pnpm consumer-page-kit:audit:path-traversal-probe", "corepack pnpm consumer-readiness-config:audit:path-traversal-probe", "corepack pnpm consumer-vendor:sync:check", "corepack pnpm consumer-vendor:sync:stale-manifest-probe", "dist-packages/taliya-product-ui-local-manifest.json", "specs/001-product-ui-foundation/contracts/release-policy.md", "specs/001-product-ui-foundation/future-crm-adoption-handoff.md"]
        },
        {
          path: "specs/001-product-ui-foundation/contracts/consumer-integration-contract.md",
          snippets: ["@taliya/crm/standard-page-kit", "official CRM page-kit manifest subpath", "consumer-starter-files", "--starter-files", "corepack pnpm full-image-page-coverage:audit", "corepack pnpm full-image-page-coverage:audit:missing-story-probe", "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe", "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe", "corepack pnpm consumer-starter-templates:audit:route-contract-probe", "corepack pnpm consumer-page-kit:audit:shell-only-route-probe", "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe", "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe", "corepack pnpm consumer-page-kit:audit:uncovered-route-probe", "corepack pnpm consumer-page-kit:audit:path-traversal-probe", "corepack pnpm consumer-readiness-config:audit:path-traversal-probe", "specs/001-product-ui-foundation/future-crm-adoption-handoff.md", "vendor/taliya-product-ui/taliya-product-ui-local-manifest.json"]
        },
        {
          path: "specs/001-product-ui-foundation/local-readiness-runbook.md",
          snippets: ["@taliya/crm/standard-page-kit", "subpath manifest diverges", "specs/001-product-ui-foundation/future-crm-adoption-handoff.md", "corepack pnpm future-crm-adoption-handoff:audit", "corepack pnpm official-library-readiness:audit", "corepack pnpm release-policy:audit", "corepack pnpm release-policy:audit:negative-probe", "corepack pnpm release-channel:audit", "corepack pnpm local-release-manifest:audit", "corepack pnpm consumer-dependencies:sync:check", "corepack pnpm consumer-dependencies:sync:stale-manifest-probe", "corepack pnpm consumer-packages:install-plan", "corepack pnpm consumer-packages:install:missing-vendor-probe", "corepack pnpm consumer-lockfile:audit", "corepack pnpm consumer-lockfile:audit:stale-probe", "corepack pnpm consumer-refresh:audit", "corepack pnpm consumer-refresh:apply", "corepack pnpm full-image-page-coverage:audit", "corepack pnpm full-image-page-coverage:audit:missing-story-probe", "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe", "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe", "corepack pnpm consumer-starter-templates:audit:route-contract-probe", "corepack pnpm consumer-page-kit:audit:shell-only-route-probe", "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe", "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe", "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe", "corepack pnpm consumer-page-kit:audit:uncovered-route-probe", "corepack pnpm consumer-page-kit:audit:path-traversal-probe", "corepack pnpm consumer-readiness-config:audit:path-traversal-probe", "corepack pnpm consumer-vendor:sync:check", "corepack pnpm consumer-vendor:sync:stale-manifest-probe", "dist-packages/taliya-product-ui-local-manifest.json", "specs/001-product-ui-foundation/contracts/release-policy.md"]
        },
        {
          path: "specs/001-product-ui-foundation/future-crm-adoption-handoff.md",
          snippets: ["corepack pnpm full-image-page-coverage:audit", "corepack pnpm full-image-page-coverage:audit:missing-story-probe", "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe", "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe", "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe"]
        }
      ];
      const requiredCertificationContractSnippets = [
        {
          path: visualParityContractPath,
          snippets: [
            "Certification Scope Semantics",
            "Component/crop certification",
            "Full-image certification",
            "visual-certification-backlog:audit",
            "certification-scope-decision.json",
            "certification-scope-decision.example.json",
            "certification-scope:audit"
          ]
        },
        {
          path: sourceAssetsContractPath,
          snippets: [
            "Certification Evidence Rule",
            "crop/component evidence",
            "full-image evidence",
            "The current full-image status is the ledger status",
            "Corpus Reconciliation Rule",
            "corepack pnpm source-assets:reconcile",
            "corepack pnpm source-assets:reconcile:nested-exclusion-probe"
          ]
        }
      ];

      if (!existsSync(runbookPath)) {
        throw new Error("Missing specs/001-product-ui-foundation/local-readiness-runbook.md");
      }
      if (!existsSync(libraryReadinessPath)) {
        throw new Error("Missing specs/001-product-ui-foundation/library-readiness-audit.md");
      }
      if (!existsSync(readinessConfigExamplePath)) {
        throw new Error("Missing specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json");
      }
      if (!existsSync(pageKitConfigExamplePath)) {
        throw new Error("Missing specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json");
      }
      if (!existsSync(standardPageKitManifestPath)) {
        throw new Error("Missing specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json");
      }
      if (!existsSync(visualParityContractPath)) {
        throw new Error("Missing specs/001-product-ui-foundation/contracts/visual-parity-contract.md");
      }
      if (!existsSync(sourceAssetsContractPath)) {
        throw new Error("Missing specs/001-product-ui-foundation/contracts/source-assets-contract.md");
      }

      const readinessConfigExample = readJsonFile(readinessConfigExamplePath, "consumer readiness config example");
      const readinessConfigExampleErrors = validateReadinessConfig(readinessConfigExample);
      if (readinessConfigExampleErrors.length > 0) {
        throw new Error(`Invalid consumer readiness config example: ${readinessConfigExampleErrors.join("; ")}`);
      }
      const pageKitConfigExample = readJsonFile(pageKitConfigExamplePath, "consumer page-kit config example");
      const pageKitConfigExampleValidation = validatePageKitConfig(pageKitConfigExample);
      if (!pageKitConfigExampleValidation.pass) {
        throw new Error(`Invalid consumer page-kit config example: ${pageKitConfigExampleValidation.errors.join("; ")}`);
      }
      const publicApiKeys = publicApiRequirementKeys();
      const publicApi = readJsonFile(resolve(specDir, "public-api-audit.json"), "public API audit");
      const publicApiCountSnippet = `${publicApi.passCount}/${publicApi.requiredCount}`;
      const componentArchitecture = readJsonFile(resolve(specDir, "component-architecture-audit.json"), "component architecture audit");
      const visualCertificationBacklog = readJsonFile(resolve(specDir, "visual-certification-backlog-audit.json"), "visual certification backlog audit");
      const backlogSummary = visualCertificationBacklog.summary ?? {};
      const certificationCounts = backlogSummary.certificationCounts ?? {};
      const libraryReadiness = readFileSync(libraryReadinessPath, "utf8");
      if (!libraryReadiness.includes(publicApiCountSnippet)) {
        throw new Error(`Library readiness audit is missing current public API count ${publicApiCountSnippet}`);
      }
      if (/\b\d+\/\d+ standard kit items\b/.test(libraryReadiness) && !libraryReadiness.includes(`${publicApiCountSnippet} standard kit items`)) {
        throw new Error(`Library readiness audit has stale standard kit item count; expected ${publicApiCountSnippet}`);
      }
      if (/\bmap \d+ kit items\b/.test(libraryReadiness) && !libraryReadiness.includes(`map ${publicApi.requiredCount} kit items`)) {
        throw new Error(`Library readiness audit has stale future CRM kit map count; expected ${publicApi.requiredCount}`);
      }
      const storyCount = componentArchitecture.storyArchitecture?.total;
      if (
        typeof storyCount === "number" &&
        !libraryReadiness.includes(`${storyCount} stories`) &&
        !libraryReadiness.includes(`${storyCount} component stories`)
      ) {
        throw new Error(`Library readiness audit is missing current component story count ${storyCount}`);
      }
      const visualBacklogSnippet = `${certificationCounts.approved ?? 0} approved component/image rows, ${certificationCounts.semiApproved ?? 0} semi-approved image rows, ${certificationCounts.visualReview ?? 0} image rows in visual review, ${certificationCounts.ignored ?? 0} ignored image row, and ${backlogSummary.globallyIncompleteCount ?? 0} incomplete component/image certification rows`;
      if (!libraryReadiness.includes(visualBacklogSnippet)) {
        throw new Error(`Library readiness audit has stale visual certification summary; expected: ${visualBacklogSnippet}`);
      }
      const remainingBacklogSnippet = `currently records ${backlogSummary.globallyIncompleteCount ?? 0} component/image certification rows`;
      if (!libraryReadiness.includes(remainingBacklogSnippet)) {
        throw new Error(`Library readiness audit has stale remaining backlog count; expected ${remainingBacklogSnippet}`);
      }
      const standardPageKitManifest = readJsonFile(standardPageKitManifestPath, "standard page kit manifest");
      if (
        standardPageKitManifest?.version !== 1 ||
        !Array.isArray(standardPageKitManifest?.components) ||
        standardPageKitManifest.components.length === 0
      ) {
        throw new Error("Invalid standard page kit manifest: expected version 1 with a non-empty components array");
      }
      const manifestMissingPublicApiRequirements = standardPageKitManifest.components
        .map(packageRequirementKey)
        .filter((key) => !publicApiKeys.has(key));
      if (manifestMissingPublicApiRequirements.length > 0) {
        throw new Error(`Standard page kit manifest references components outside public API audit: ${manifestMissingPublicApiRequirements.join(", ")}`);
      }
      const missingPublicApiRequirements = collectPageKitPackageRequirements(pageKitConfigExample)
        .map(packageRequirementKey)
        .filter((key) => !publicApiKeys.has(key));
      if (missingPublicApiRequirements.length > 0) {
        throw new Error(`Consumer page-kit config example references components outside public API audit: ${missingPublicApiRequirements.join(", ")}`);
      }

      const bootstrapResult = spawnSync(process.execPath, [
        "scripts/bootstrap-consumer-configs.mjs",
        "--consumer",
        "../future-crm-app",
        "--starter-files",
        "--report-label",
        "future-crm"
      ], {
        cwd: root,
        encoding: "utf8"
      });
      if (bootstrapResult.status !== 0) {
        throw new Error(`Consumer config bootstrap dry run failed: ${(bootstrapResult.stderr ?? bootstrapResult.stdout ?? "").trim()}`);
      }

      const runbook = readFileSync(runbookPath, "utf8");
      const missingSnippets = requiredRunbookSnippets.filter((snippet) => !runbook.includes(snippet));
      if (missingSnippets.length > 0) {
        throw new Error(`Runbook is missing required snippets: ${missingSnippets.join(", ")}`);
      }
      const readme = readFileSync(resolve(root, "README.md"), "utf8");
      const missingReadmeSnippets = requiredReadmeSnippets.filter((snippet) => !readme.includes(snippet));
      if (missingReadmeSnippets.length > 0) {
        throw new Error(`README is missing required consumer page-kit snippets: ${missingReadmeSnippets.join(", ")}`);
      }
      const missingConsumerDocSnippets = requiredConsumerDocSnippets.flatMap((doc) => {
        const content = readFileSync(resolve(root, doc.path), "utf8");
        return doc.snippets
          .filter((snippet) => !content.includes(snippet))
          .map((snippet) => `${doc.path}: ${snippet}`);
      });
      if (missingConsumerDocSnippets.length > 0) {
        throw new Error(`Consumer adoption docs are missing required snippets: ${missingConsumerDocSnippets.join(", ")}`);
      }
      const missingCertificationSnippets = requiredCertificationContractSnippets.flatMap((doc) => {
        const content = readFileSync(doc.path, "utf8");
        return doc.snippets
          .filter((snippet) => !content.includes(snippet))
          .map((snippet) => `${doc.path}: ${snippet}`);
      });
      if (missingCertificationSnippets.length > 0) {
        throw new Error(`Certification contracts are missing required snippets: ${missingCertificationSnippets.join(", ")}`);
      }

      const missingLinks = requiredLinks.filter((relativePath) => {
        const content = readFileSync(resolve(root, relativePath), "utf8");
        return !content.includes("specs/001-product-ui-foundation/local-readiness-runbook.md");
      });
      if (missingLinks.length > 0) {
        throw new Error(`Runbook is not linked from: ${missingLinks.join(", ")}`);
      }

      return `Runbook exists and is linked from ${requiredLinks.length} evidence files. Consumer readiness/page-kit examples, certification-scope contracts, and standard page-kit manifest are valid, bootstrap dry run passes, and manifest/example components are in the public API audit.`;
    }
  },
  {
    id: "certification-scope",
    command: [process.execPath, "scripts/audit-certification-scope-decision.mjs", "--check"],
    commandText: "corepack pnpm certification-scope:audit",
    proves: "product-scoped visual certification acceptance is explicit and validated when present"
  },
  {
    id: "certification-scope-positive-probe",
    command: [process.execPath, "scripts/probe-certification-scope-valid-decision.mjs"],
    commandText: "corepack pnpm certification-scope:audit:positive-probe",
    proves: "valid product-scoped visual certification acceptance is recognized as scoped completion"
  },
  {
    id: "certification-scope-negative-probe",
    command: [process.execPath, "scripts/probe-certification-scope-invalid-decision.mjs"],
    commandText: "corepack pnpm certification-scope:audit:negative-probe",
    proves: "invalid product-scoped visual certification acceptance fails the certification scope audit"
  },
  {
    id: "visual-certification-backlog",
    command: [process.execPath, "scripts/audit-visual-certification-backlog.mjs", "--check"],
    commandText: "corepack pnpm visual-certification-backlog:audit",
    proves: "current source-image certification backlog and image-coverage-map certification conflicts are regenerated from Batch 9/11 ledgers before goal evidence is checked"
  },
  {
    id: "remaining-page-coverage",
    command: [process.execPath, "scripts/audit-remaining-page-coverage.mjs", "--check"],
    commandText: "corepack pnpm remaining-page-coverage:audit",
    proves: "all remaining page/image stories exist as individual static Storybook entries using official library page-composition components"
  },
  {
    id: "remaining-page-coverage-family-contract-probe",
    command: [process.execPath, "scripts/probe-remaining-page-coverage-family-contract.mjs"],
    commandText: "corepack pnpm remaining-page-coverage:audit:family-contract-probe",
    proves: "remaining page coverage rejects owner pages that stop using their official page-family contracts"
  },
  {
    id: "kanban-family",
    command: [process.execPath, "scripts/audit-kanban-family.mjs", "--check"],
    commandText: "corepack pnpm kanban-family:audit",
    proves: "Operacao, Vendas, and Financeiro kanban pages use CrmKanbanPage, official filters, columns, card variants, and domain slots instead of story-local board anatomy"
  },
  {
    id: "kanban-family-negative-probe",
    command: [process.execPath, "scripts/probe-kanban-family-regression.mjs"],
    commandText: "corepack pnpm kanban-family:audit:negative-probe",
    proves: "kanban family audit rejects owner pages that stop using CrmKanbanPage"
  },
  {
    id: "dashboard-family",
    command: [process.execPath, "scripts/audit-dashboard-family.mjs", "--check"],
    commandText: "corepack pnpm dashboard-family:audit",
    proves: "Dashboard, right-panel, and setup image coverage pages use official page-family wrappers instead of story-local shell/grid anatomy"
  },
  {
    id: "dashboard-family-negative-probe",
    command: [process.execPath, "scripts/probe-dashboard-family-regression.mjs"],
    commandText: "corepack pnpm dashboard-family:audit:negative-probe",
    proves: "dashboard family audit rejects owner pages that stop using CrmRightPanelPage"
  },
  {
    id: "source-assets",
    command: [process.execPath, "scripts/audit-source-assets.mjs", "--check"],
    commandText: "corepack pnpm source-assets:audit",
    proves: "the configured canonical source corpus matches the versioned 101-image filename, hash, dimension, and coverage manifest"
  },
  {
    id: "source-assets-reconciliation",
    command: [process.execPath, "scripts/audit-source-assets-reconciliation.mjs", "--check"],
    commandText: "corepack pnpm source-assets:reconcile",
    proves: "folder, ZIP, image map, canonical top-level count, hashes, duplicates, and nested derivative classifications reconcile without promoting auxiliary images"
  },
  {
    id: "source-assets-reconciliation-nested-exclusion-probe",
    command: [process.execPath, "scripts/probe-source-assets-reconciliation-nested-exclusion.mjs"],
    commandText: "corepack pnpm source-assets:reconcile:nested-exclusion-probe",
    proves: "recursive demo/review/onboarding derivatives cannot satisfy the canonical source-image count"
  },
  {
    id: "full-image-page-coverage",
    command: [process.execPath, "scripts/audit-full-image-page-coverage.mjs", "--check"],
    commandText: "corepack pnpm full-image-page-coverage:audit",
    proves: "every product page/source image target has a dedicated static Storybook image-coverage story with an exact source-image marker and official package imports"
  },
  {
    id: "full-image-page-coverage-missing-story-probe",
    command: [process.execPath, "scripts/probe-full-image-page-coverage-missing-story.mjs"],
    commandText: "corepack pnpm full-image-page-coverage:audit:missing-story-probe",
    proves: "a product page/source image target missing from the static Storybook index fails full image/page coverage"
  },
  {
    id: "full-image-page-coverage-missing-source-marker-probe",
    command: [process.execPath, "scripts/probe-full-image-page-coverage-missing-source-marker.mjs"],
    commandText: "corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe",
    proves: "a product page/source image story without its exact source-image marker fails full image/page coverage"
  },
  {
    id: "full-image-page-coverage-misplaced-source-marker-probe",
    command: [process.execPath, "scripts/probe-full-image-page-coverage-misplaced-source-marker.mjs"],
    commandText: "corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe",
    proves: "a product page/source image marker placed in the wrong story export fails full image/page coverage"
  },
  {
    id: "full-image-page-coverage-nonofficial-import-probe",
    command: [process.execPath, "scripts/probe-full-image-page-coverage-nonofficial-import.mjs"],
    commandText: "corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe",
    proves: "a product page/source image story that stops importing official @taliya packages fails full image/page coverage"
  },
  {
    id: "full-image-page-coverage-unmapped-map-target-probe",
    command: [process.execPath, "scripts/probe-full-image-page-coverage-unmapped-map-target.mjs"],
    commandText: "corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe",
    proves: "a Covered product page/source image added to the image coverage map without a Storybook mapping fails full image/page coverage"
  },
  {
    id: "reference-sheet-coverage",
    command: [process.execPath, "scripts/audit-reference-sheet-coverage.mjs", "--check"],
    commandText: "corepack pnpm reference-sheet-coverage:audit",
    proves: "all 11 active component reference sheets map every named component uniquely to an official isolated Storybook story with matching canonical source hashes"
  },
  {
    id: "reference-sheet-coverage-missing-story-probe",
    command: [process.execPath, "scripts/probe-reference-sheet-coverage-missing-story.mjs"],
    commandText: "corepack pnpm reference-sheet-coverage:audit:missing-story-probe",
    proves: "reference-sheet coverage rejects a missing required official component story"
  },
  {
    id: "visual-certification-plan",
    command: [process.execPath, "scripts/audit-visual-certification-plan.mjs", "--check"],
    commandText: "corepack pnpm visual-certification-plan:audit",
    proves: "every incomplete image-certification row has source, story, evidence, blocker, next-action, and current evidence assertion data for the next certification cycle"
  },
  {
    id: "visual-certification-plan-negative-probe",
    command: [process.execPath, "scripts/probe-visual-certification-plan-stale-ledger.mjs"],
    commandText: "corepack pnpm visual-certification-plan:audit:negative-probe",
    proves: "stale visual evidence and pending rows without current evidence assertions fail the visual certification plan audit"
  },
  {
    id: "visual-certification-plan-missing-artifact-probe",
    command: [process.execPath, "scripts/probe-visual-certification-plan-missing-artifact.mjs"],
    commandText: "corepack pnpm visual-certification-plan:audit:missing-artifact-probe",
    proves: "ledger evidence paths that no longer exist fail the visual certification plan audit"
  },
  {
    id: "visual-product-review",
    command: [process.execPath, "scripts/audit-visual-product-review.mjs", "--check"],
    commandText: "corepack pnpm visual-product-review:audit",
    proves: "every product-review decision row has current source, render, diff, metrics, blocker, and next-action evidence without automatic approval"
  },
  {
    id: "visual-certification-capture",
    command: [process.execPath, "scripts/capture-visual-certification-batch.mjs", "--check"],
    commandText: "corepack pnpm visual-certification-capture:check",
    proves: "every pending image with a Storybook target has current source-sized screenshot and pixel-diff evidence without automatic visual approval"
  },
  {
    id: "visual-certification-capture-source-contract-probe",
    command: [process.execPath, "scripts/probe-visual-certification-capture-source-contract.mjs"],
    commandText: "corepack pnpm visual-certification-capture:source-contract-probe",
    proves: "visual capture evidence ignores volatile manifest metadata but fails when an official source image hash changes"
  },
  {
    id: "audit-checks-read-only-probe",
    command: [process.execPath, "scripts/probe-audit-checks-read-only.mjs"],
    commandText: "corepack pnpm audit-checks:read-only-probe",
    proves: "all audit --check entrypoints leave tracked and untracked repository state unchanged"
  },
  ...(isDefaultInternalScope ? [{
    id: "goal-completion",
    command: [process.execPath, "scripts/audit-goal-completion.mjs", "--check"],
    commandText: "corepack pnpm goal-completion:audit",
    proves: "goal-level readiness has no current-scope regression"
  }] : [{
    id: "custom-consumer-scope",
    commandText: "custom consumer scope check",
    proves: "non-default consumer readiness avoids overwriting Internal goal-completion evidence",
    check: () => `Custom consumer scope: ${consumerRoot}. Goal completion audit remains reserved for the default Internal readiness run.`
  }])
];

function runGate(gate) {
  const startedAt = Date.now();
  if (typeof gate.check === "function") {
    try {
      const stdout = gate.check();
      return {
        ...gate,
        status: "pass",
        exitCode: 0,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr: ""
      };
    } catch (error) {
      return {
        ...gate,
        status: "fail",
        exitCode: 1,
        durationMs: Date.now() - startedAt,
        stdout: "",
        stderr: error instanceof Error ? error.message : String(error)
      };
    }
  }

  const result = spawnSync(gate.command[0], gate.command.slice(1), {
    cwd: root,
    encoding: "utf8",
    env: gate.id === "goal-completion"
      ? { ...process.env, TALIYA_READINESS_IN_PROGRESS: "1" }
      : process.env
  });
  const durationMs = Date.now() - startedAt;
  const spawnError = result.error ? `${result.error.name}: ${result.error.message}` : "";

  return {
    ...gate,
    commandText: gate.commandText,
    status: result.status === 0 && !spawnError ? "pass" : "fail",
    exitCode: result.status,
    durationMs,
    stdout: (result.stdout ?? "").trim(),
    stderr: [spawnError, result.stderr ?? ""].filter(Boolean).join("\n").trim()
  };
}

const rows = [];
for (const gate of gates) {
  const row = runGate(gate);
  rows.push(row);
  if (checkMode && row.status === "fail") break;
}

const failed = rows.filter((row) => row.status === "fail");
const report = {
  generatedAt: new Date().toISOString(),
  status: failed.length === 0 && rows.length === gates.length ? "pass" : "fail",
  checkMode,
  consumerRoot,
  reportLabel: reportLabel || "default",
  distributionChannel,
  readinessConfig: readinessConfig.source || "none",
  rows: rows.map(({ command, ...row }) => row),
  skipped: gates.slice(rows.length).map((gate) => ({ id: gate.id, commandText: gate.commandText, proves: gate.proves }))
};

if (!checkMode) writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const markdownRows = report.rows
  .map((row) => `| \`${row.id}\` | \`${row.commandText}\` | ${row.status} | ${row.exitCode ?? "n/a"} | ${row.durationMs} | ${row.proves} |`)
  .join("\n");
const skippedRows = report.skipped.length
  ? report.skipped.map((row) => `| \`${row.id}\` | \`${row.commandText}\` | ${row.proves} |`).join("\n")
  : "| None | None | None |";

if (!checkMode) writeFileSync(
  reportMdPath,
  `# Library Readiness Gate

Generated: ${report.generatedAt}

Status: ${report.status}

This gate aggregates the executable checks that prove current reusable-library readiness for \`taliya-product-ui\` and a target consumer. It is not source-image 1:1 certification.

Consumer: \`${report.consumerRoot}\`

Report label: \`${report.reportLabel}\`

Distribution channel: \`${report.distributionChannel}\`

Readiness config: \`${report.readinessConfig}\`

## Gate Results

| Gate | Command | Status | Exit code | Duration ms | Proves |
| --- | --- | --- | ---: | ---: | --- |
${markdownRows}

## Skipped

| Gate | Command | Proves |
| --- | --- | --- |
${skippedRows}
`
);

console.log(`Library readiness gate: ${report.status}`);
if (!checkMode) {
  console.log(`Wrote specs/001-product-ui-foundation/${reportBaseName}.md`);
  console.log(`Wrote specs/001-product-ui-foundation/${reportBaseName}.json`);
}

if (checkMode && report.status !== "pass") {
  const failedIds = failed.map((row) => row.id).join(", ") || "incomplete gate run";
  console.error(`Failed readiness gates: ${failedIds}`);
  process.exit(1);
}
