import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const releaseCandidateInProgress = process.env.TALIYA_RELEASE_CANDIDATE_IN_PROGRESS === "1";
const readinessInProgress = process.env.TALIYA_READINESS_IN_PROGRESS === "1";
const aggregateGateInProgress = releaseCandidateInProgress || readinessInProgress;

function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(root, relativePath), "utf8"));
}

function pass(value) {
  return Boolean(value);
}

const publicApi = readJson("specs/001-product-ui-foundation/public-api-audit.json");
const componentArchitecture = readJson("specs/001-product-ui-foundation/component-architecture-audit.json");
const packageArtifacts = readJson("specs/001-product-ui-foundation/package-artifacts-audit.json");
const packageBoundaries = readJson("specs/001-product-ui-foundation/package-boundaries-audit.json");
const consumerPackageSync = readJson("specs/001-product-ui-foundation/consumer-package-sync-audit.json");
const consumerVendorVersioning = readJson("specs/001-product-ui-foundation/consumer-vendor-versioning-audit.json");
const consumerIntegration = readJson("specs/001-product-ui-foundation/consumer-integration-audit.json");
const consumerPageKit = readJson("specs/001-product-ui-foundation/consumer-page-kit-audit.json");
const consumerRuntime = readJson("specs/001-product-ui-foundation/consumer-runtime-audit.json");
const consumerConfigVersioning = readJson("specs/001-product-ui-foundation/consumer-config-versioning-audit.json");
const consumerBootstrap = readJson("specs/001-product-ui-foundation/consumer-bootstrap-audit.json");
const futureConsumerFixture = readJson("specs/001-product-ui-foundation/future-consumer-fixture-audit.json");
const futureConsumerDiscovery = readJson("specs/001-product-ui-foundation/future-consumer-discovery-audit.json");
const futureConsumerAdoption = readJson("specs/001-product-ui-foundation/future-consumer-adoption-audit.json");
const certificationScope = readJson("specs/001-product-ui-foundation/certification-scope-decision-audit.json");
const libraryReadinessGate = readJson("specs/001-product-ui-foundation/library-readiness-gate.json");
const visualCertificationBacklog = existsSync(resolve(root, "specs/001-product-ui-foundation/visual-certification-backlog-audit.json"))
  ? readJson("specs/001-product-ui-foundation/visual-certification-backlog-audit.json")
  : null;
const visualCertificationPlan = existsSync(resolve(root, "specs/001-product-ui-foundation/visual-certification-plan-audit.json"))
  ? readJson("specs/001-product-ui-foundation/visual-certification-plan-audit.json")
  : null;
const referenceSheetCoverage = existsSync(resolve(root, "specs/001-product-ui-foundation/reference-sheet-coverage-audit.json"))
  ? readJson("specs/001-product-ui-foundation/reference-sheet-coverage-audit.json")
  : null;
const sourceAssetsReconciliation = existsSync(resolve(root, "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json"))
  ? readJson("specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json")
  : null;
const releaseCandidate = existsSync(resolve(root, "specs/001-product-ui-foundation/release-candidate-audit.json"))
  ? readJson("specs/001-product-ui-foundation/release-candidate-audit.json")
  : null;
const libraryAcceptance = existsSync(resolve(root, "specs/001-product-ui-foundation/library-acceptance-audit.json"))
  ? readJson("specs/001-product-ui-foundation/library-acceptance-audit.json")
  : null;
const libraryConsumptionStatus = existsSync(resolve(root, "specs/001-product-ui-foundation/library-consumption-status.json"))
  ? readJson("specs/001-product-ui-foundation/library-consumption-status.json")
  : null;
const crmRealReadiness = existsSync(resolve(root, "specs/001-product-ui-foundation/crm-real-readiness-audit.json"))
  ? readJson("specs/001-product-ui-foundation/crm-real-readiness-audit.json")
  : null;
const officialLibraryReadiness = existsSync(resolve(root, "specs/001-product-ui-foundation/official-library-readiness-audit.json"))
  ? readJson("specs/001-product-ui-foundation/official-library-readiness-audit.json")
  : null;
const releaseChannel = existsSync(resolve(root, "specs/001-product-ui-foundation/release-channel-audit.json"))
  ? readJson("specs/001-product-ui-foundation/release-channel-audit.json")
  : null;
const releasePolicy = existsSync(resolve(root, "specs/001-product-ui-foundation/release-policy-audit.json"))
  ? readJson("specs/001-product-ui-foundation/release-policy-audit.json")
  : null;
const localReleaseManifest = existsSync(resolve(root, "specs/001-product-ui-foundation/local-release-manifest-audit.json"))
  ? readJson("specs/001-product-ui-foundation/local-release-manifest-audit.json")
  : null;
const tokenBaseline = readJson("specs/001-product-ui-foundation/token-governance-baseline.json");

const tokenCssDebt = Object.entries(tokenBaseline.cssScans).some(([file, scan]) =>
  file !== "apps/docs/src/storybook.css" && (
    scan.hex > 0 || scan.rgba > 0 || scan.gradient > 0 || scan.literalSizing > 0 || scan.literalShadow > 0
  )
);
const tokenStoryDebt =
  tokenBaseline.storyScan.hex > 0 ||
  tokenBaseline.storyScan.rgba > 0 ||
  tokenBaseline.storyScan.gradient > 0 ||
  tokenBaseline.storyScan.literalSizing > 0 ||
  tokenBaseline.storyScan.literalShadow > 0;
const tokenAliasDebt = (tokenBaseline.tokenSummary["alias obrigatorio"] ?? 0) > 0;
const storybookProductAnatomyDebt = (tokenBaseline.storybookAnatomy?.anatomySelectorCount ?? 1) > 0;
const tokenGovernancePass = !tokenCssDebt && !tokenStoryDebt && !tokenAliasDebt && !storybookProductAnatomyDebt;

const trueGoal = {
  statement:
    "Transformar taliya-product-ui em uma biblioteca oficial, reutilizavel e instalavel, com @taliya/tokens, @taliya/ui e @taliya/crm, capaz de alimentar os stories/imagens do CRM Taliya, o taliya-internal hoje e o futuro CRM Taliya depois, sem reimplementar shell, filtros, tabela, drawer, kanban, cards ou padroes visuais localmente.",
  acceptanceCriteria: [
    "Packages @taliya/tokens, @taliya/ui, and @taliya/crm are standalone, bounded, installable, documented, and audited.",
    "The public page kit exposes official shell, filters, quick filters, table, drawer, kanban/cards, panels, state primitives, and runtime discovery metadata.",
    "taliya-internal consumes the official packages/page kit for its covered routes instead of local visual clones.",
    "A new consumer can bootstrap official configs and starter files that render the same official roots.",
    "The real future CRM consumer runs the same adoption gates when it exists.",
    "Approved CRM source images are certified through source-backed static Storybook capture, or product acceptance explicitly scopes that parity work out of completion."
  ],
  notSufficient: [
    "Passing build/lint/tests without consumer adoption evidence.",
    "A synthetic future-consumer fixture alone, if the acceptance bar requires the real future CRM app.",
    "Component stories that are close visually but not certified 1:1 against approved source images.",
    "Consumer pages that reimplement shell/filter/table/drawer/kanban/card visuals locally."
  ]
};

const componentArchitecturePass =
  componentArchitecture.storyArchitecture.invalidTitleCount === 0 &&
  componentArchitecture.storyArchitecture.legacyBatchTitleCount === 0 &&
  componentArchitecture.crmPrimitiveReuse.primitiveReuseClassification.refactor === 0 &&
  componentArchitecture.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive === 0;
const internalReadinessConfigPath = resolve(root, "../taliya-internal/taliya-readiness.config.json");
const internalReadinessConfig = existsSync(internalReadinessConfigPath) ? JSON.parse(readFileSync(internalReadinessConfigPath, "utf8")) : null;
const internalReadinessConfigPass =
  libraryReadinessGate.reportLabel === "default" &&
  libraryReadinessGate.readinessConfig === internalReadinessConfigPath &&
  internalReadinessConfig?.vendor === "vendor/taliya-product-ui" &&
  internalReadinessConfig?.pageKitConfig === "taliya-page-kit.config.json" &&
  Array.isArray(internalReadinessConfig?.commands) &&
  ["typecheck", "lint", "test", "build"].every((command) => internalReadinessConfig.commands.includes(command));
const consumerPackageSourcePinningPass =
  pass(consumerIntegration.packageStatus?.pass) &&
  Array.isArray(consumerIntegration.packageStatus?.sourceRows) &&
  consumerIntegration.packageStatus.sourceRows.length === 3 &&
  consumerIntegration.packageStatus.sourceRows.every((row) => row.pass);
const consumerInstalledContractMarkersPass =
  pass(consumerIntegration.installedPackageContractStatus?.pass) &&
  Array.isArray(consumerIntegration.installedPackageContractStatus?.rows) &&
  consumerIntegration.installedPackageContractStatus.rows.length > 0 &&
  consumerIntegration.installedPackageContractStatus.rows.every((row) => row.pass);
const consumerInstalledContractMarkerIds = (consumerIntegration.installedPackageContractStatus?.rows ?? []).map((row) => row.id);
const consumerPageKitWrapperContractsPass =
  pass(consumerPageKit.summary?.pass) &&
  Array.isArray(consumerPageKit.componentContractRows) &&
  consumerPageKit.componentContractRows.length > 0 &&
  consumerPageKit.componentContractRows.every((row) => row.pass);
const consumerPageKitRouteWorkspaceRows = (consumerPageKit.routeRows ?? []).map((row) => {
  const localRows = row.requiredStatus?.filter((statusRow) => typeof statusRow.importFrom === "string") ?? [];
  const hasShell = localRows.some((statusRow) => statusRow.componentName === "InternalShell" && statusRow.pass);
  const workspaceRows = localRows.filter((statusRow) => statusRow.componentName !== "InternalShell");
  return {
    route: row.route,
    hasShell,
    workspaceComponents: workspaceRows.map((statusRow) => statusRow.componentName),
    pass: row.pass && hasShell && workspaceRows.length > 0 && workspaceRows.every((statusRow) => statusRow.pass)
  };
});
const consumerPageKitRouteWorkspacesPass =
  pass(consumerPageKit.summary?.pass) &&
  consumerPageKitRouteWorkspaceRows.length > 0 &&
  consumerPageKitRouteWorkspaceRows.every((row) => row.pass);
const packageArtifactsPublishablePass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every((row) => row.sourcePublishable && row.packedPublishable);
const packageArtifactsCssSideEffectsPass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every((row) => row.sourceCssSideEffects && row.packedCssSideEffects);
const packageArtifactsPeerDependenciesPass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every(
    (row) =>
      (row.requiredPeerDependencies?.length ?? 0) === 0 ||
      (row.sourcePeerDependencies &&
        row.packedPeerDependencies &&
        (row.sourceMisplacedPeerDependencies?.length ?? 0) === 0 &&
        (row.packedMisplacedPeerDependencies?.length ?? 0) === 0)
  );
const packageArtifactsReadmePass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every(
    (row) =>
      row.sourceReadmeExists &&
      row.packedReadmeReadable &&
      (row.sourceReadmeMissingSnippets?.length ?? 0) === 0 &&
      (row.packedReadmeMissingSnippets?.length ?? 0) === 0
  );
const packageArtifactsWorkspaceDependencyPass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every(
    (row) =>
      (row.packedWorkspaceDependencies?.length ?? 0) === 0 &&
      (row.requiredPackedLocalDependencies ?? []).every((dependencyRow) => dependencyRow.pass)
  );
const packageArtifactsFilesFieldPass =
  pass(packageArtifacts.summary?.pass) &&
  Array.isArray(packageArtifacts.packageRows) &&
  packageArtifacts.packageRows.length === 3 &&
  packageArtifacts.packageRows.every(
    (row) =>
      row.sourceFilesFieldMatches &&
      row.packedFilesFieldMatches &&
      (row.forbiddenFiles?.length ?? 0) === 0
  );
const futureConsumerFixtureSmokePass =
  futureConsumerFixture.status === "pass" &&
  (futureConsumerFixture.assertions?.smoke?.status === "pass") &&
  (futureConsumerFixture.assertions?.smoke?.manifestCount ?? 0) === publicApi.requiredCount &&
  futureConsumerFixture.assertions?.smoke?.subpathManifestMatches === true &&
  ["@taliya/tokens", "@taliya/tokens/tokens.css", "@taliya/ui", "@taliya/ui/styles.css", "@taliya/crm", "@taliya/crm/standard-page-kit", "@taliya/crm/styles.css"].every((specifier) =>
    (futureConsumerFixture.assertions?.smoke?.resolvedExports ?? []).includes(specifier)
  );
const futureConsumerFixtureStarterPass =
  futureConsumerFixture.assertions?.starterFiles?.generatedByBootstrap === true &&
  futureConsumerFixture.assertions?.starterFiles?.pass === true &&
  ["components/crm-shell-client.tsx", "features/crm/work-list/work-list-page.tsx", "features/crm/kanban/kanban-page.tsx", "app/crm/page.tsx", "app/crm/kanban/page.tsx"].every((file) =>
    (futureConsumerFixture.assertions?.starterFiles?.rows ?? []).some((row) => row.file === file && row.pass)
  );
const consumerBootstrapStarterPass =
  consumerBootstrap.status === "pass" &&
  consumerBootstrap.starterFiles?.pass === true &&
  ["components/crm-shell-client.tsx", "features/crm/work-list/work-list-page.tsx", "features/crm/kanban/kanban-page.tsx", "app/crm/page.tsx", "app/crm/kanban/page.tsx"].every((file) =>
    (consumerBootstrap.starterFiles?.rows ?? []).some((row) => row.file === file && row.pass)
  );
const realFutureCrmAdoptionExecuted =
  futureConsumerAdoption.futureCrmCandidateCount > 0 &&
  futureConsumerAdoption.adoptedCandidateCount === futureConsumerAdoption.futureCrmCandidateCount;
const readinessGateRows = Array.isArray(libraryReadinessGate.rows) ? libraryReadinessGate.rows : [];
const visualCertificationPlanGate = readinessGateRows.find((row) => row.id === "visual-certification-plan");
const visualCertificationPlanNegativeProbeGate = readinessGateRows.find((row) => row.id === "visual-certification-plan-negative-probe");
const referenceSheetCoverageGate = readinessGateRows.find((row) => row.id === "reference-sheet-coverage");
const referenceSheetCoverageMissingStoryProbeGate = readinessGateRows.find((row) => row.id === "reference-sheet-coverage-missing-story-probe");
const futureConsumerDiscoveryGate = readinessGateRows.find((row) => row.id === "future-consumer-discovery");
const futureConsumerDiscoveryNegativeProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-discovery-negative-probe");
const futureConsumerDiscoveryPartialProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-discovery-partial-probe");
const futureConsumerDiscoveryPositiveProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-discovery-positive-probe");
const futureConsumerAdoptionGate = readinessGateRows.find((row) => row.id === "future-consumer-adoption");
const futureConsumerAdoptionPositiveProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-adoption-positive-probe");
const futureConsumerAdoptionMismatchProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-adoption-mismatch-probe");
const futureConsumerAdoptionNegativeProbeGate = readinessGateRows.find((row) => row.id === "future-consumer-adoption-negative-probe");
const futureCrmAdoptionHandoffGate = readinessGateRows.find((row) => row.id === "future-crm-adoption-handoff");
const consumerPackageSyncNegativeProbeGate = readinessGateRows.find((row) => row.id === "consumer-package-sync-negative-probe");
const certificationScopeGate = readinessGateRows.find((row) => row.id === "certification-scope");
const certificationScopePositiveProbeGate = readinessGateRows.find((row) => row.id === "certification-scope-positive-probe");
const certificationScopeNegativeProbeGate = readinessGateRows.find((row) => row.id === "certification-scope-negative-probe");
const readinessGatePass = (row) => readinessInProgress || row?.status === "pass";
const visualCertificationPlanGatePass = readinessGatePass(visualCertificationPlanGate);
const visualCertificationPlanNegativeProbePass = readinessGatePass(visualCertificationPlanNegativeProbeGate);
const referenceSheetCoverageGatePass = readinessGatePass(referenceSheetCoverageGate);
const referenceSheetCoverageMissingStoryProbePass = readinessGatePass(referenceSheetCoverageMissingStoryProbeGate);
const futureConsumerDiscoveryGatePass = readinessGatePass(futureConsumerDiscoveryGate);
const futureConsumerDiscoveryNegativeProbePass = readinessGatePass(futureConsumerDiscoveryNegativeProbeGate);
const futureConsumerDiscoveryPartialProbePass = readinessGatePass(futureConsumerDiscoveryPartialProbeGate);
const futureConsumerDiscoveryPositiveProbePass = readinessGatePass(futureConsumerDiscoveryPositiveProbeGate);
const futureConsumerAdoptionGatePass = readinessGatePass(futureConsumerAdoptionGate);
const futureConsumerAdoptionPositiveProbePass = readinessGatePass(futureConsumerAdoptionPositiveProbeGate);
const futureConsumerAdoptionMismatchProbePass = readinessGatePass(futureConsumerAdoptionMismatchProbeGate);
const futureConsumerAdoptionNegativeProbePass = readinessGatePass(futureConsumerAdoptionNegativeProbeGate);
const futureCrmAdoptionHandoffGatePass = readinessGatePass(futureCrmAdoptionHandoffGate);
const consumerPackageSyncNegativeProbePass = readinessGatePass(consumerPackageSyncNegativeProbeGate);
const certificationScopeGatePass = readinessGatePass(certificationScopeGate);
const certificationScopePositiveProbePass = readinessGatePass(certificationScopePositiveProbeGate);
const certificationScopeNegativeProbePass = readinessGatePass(certificationScopeNegativeProbeGate);
const scopedCompletionAccepted =
  certificationScope.status === "pass" &&
  certificationScope.scopedCompletionAccepted === true;
const futureConsumerAdoptionAuditPass =
  futureConsumerAdoption.status === "pass" &&
  futureConsumerAdoption.adoptedCandidateCount === futureConsumerAdoption.futureCrmCandidateCount;
const futureConsumerAdoptionProcessPass =
  consumerBootstrapStarterPass &&
  futureConsumerFixtureStarterPass &&
  futureConsumerFixtureSmokePass &&
  futureConsumerDiscoveryGatePass &&
  futureConsumerDiscoveryNegativeProbePass &&
  futureConsumerDiscoveryPartialProbePass &&
  futureConsumerDiscoveryPositiveProbePass &&
  futureConsumerAdoptionGatePass &&
  futureConsumerAdoptionPositiveProbePass &&
  futureConsumerAdoptionMismatchProbePass &&
  futureConsumerAdoptionNegativeProbePass &&
  futureCrmAdoptionHandoffGatePass &&
  futureConsumerAdoptionAuditPass;
const releaseCandidateRows = Array.isArray(releaseCandidate?.rows) ? releaseCandidate.rows : [];
const requiredReleaseCandidateGateIds = [
  "typecheck",
  "lint",
  "test",
  "build",
  "readiness",
  "storybook-anatomy",
  "storybook-anatomy-override-probe",
  "domain-wrappers",
  "domain-wrappers-direct-drawer-probe",
  "future-consumer-discovery",
  "future-consumer-discovery-negative-probe",
  "future-consumer-discovery-partial-probe",
  "future-consumer-discovery-positive-probe",
  "future-consumer-adoption",
  "future-consumer-adoption-positive-probe",
  "future-consumer-adoption-mismatch-probe",
  "future-consumer-adoption-negative-probe",
  "future-crm-adoption-handoff",
  "consumer-starter-templates-route-contract-probe",
  "consumer-package-sync-negative-probe",
  "consumer-installed-contract-markers",
  "consumer-page-kit-shell-only-route-probe",
  "consumer-page-kit-wrapper-contract-probe",
  "consumer-page-kit-route-wrapper-contract-probe",
  "consumer-page-kit-mismatched-route-contract-probe",
  "consumer-page-kit-default-identifier-route-probe",
  "consumer-page-kit-uncovered-route-probe",
  "consumer-page-kit-path-traversal-probe",
  "consumer-readiness-config-path-traversal-probe",
  "certification-scope",
  "certification-scope-positive-probe",
  "certification-scope-negative-probe",
  "visual-certification-backlog-update",
  "visual-certification-backlog",
  "remaining-page-coverage-update",
  "remaining-page-coverage",
  "remaining-page-coverage-family-contract-probe",
  "kanban-family-update",
  "kanban-family",
  "kanban-family-negative-probe",
  "dashboard-family-update",
  "dashboard-family",
  "dashboard-family-negative-probe",
  "source-assets-update",
  "source-assets",
  "source-assets-reconciliation-update",
  "source-assets-reconciliation",
  "source-assets-reconciliation-nested-exclusion-probe",
  "full-image-page-coverage-update",
  "full-image-page-coverage",
  "full-image-page-coverage-missing-story-probe",
  "full-image-page-coverage-missing-source-marker-probe",
  "full-image-page-coverage-misplaced-source-marker-probe",
  "full-image-page-coverage-nonofficial-import-probe",
  "full-image-page-coverage-unmapped-map-target-probe",
  "reference-sheet-coverage-update",
  "reference-sheet-coverage",
  "reference-sheet-coverage-missing-story-probe",
  "visual-certification-plan",
  "visual-certification-plan-negative-probe",
  "visual-certification-plan-missing-artifact-probe",
  "visual-product-review-update",
  "visual-product-review",
  "visual-certification-capture",
  "visual-certification-capture-source-contract-probe",
  "audit-checks-read-only-probe",
  "readiness-refresh-update",
  "readiness-refresh",
  "goal-completion-update",
  "library-acceptance-update",
  "library-acceptance",
  "library-acceptance-positive-probe",
  "library-acceptance-negative-probe",
  "goal-completion-refresh",
  "library-consumption-status-update",
  "library-consumption-status",
  "library-consumption-status-positive-probe",
  "library-consumption-status-global-complete-probe",
  "library-consumption-status-stale-release-probe",
  "library-consumption-status-stale-readiness-probe",
  "library-consumption-status-negative-probe",
  "crm-real-readiness-update",
  "crm-real-readiness",
  "crm-real-readiness-stale-remaining-page-coverage-probe",
  "local-release-manifest-update",
  "local-release-manifest",
  "consumer-dependencies-sync-check",
  "consumer-dependencies-sync-stale-manifest-probe",
  "consumer-package-install-plan",
  "consumer-package-install-missing-vendor-probe",
  "consumer-lockfile",
  "consumer-lockfile-stale-probe",
  "consumer-refresh",
  "consumer-vendor-sync-check",
  "consumer-vendor-sync-stale-manifest-probe",
  "release-policy-update",
  "release-policy",
  "release-policy-negative-probe",
  "release-channel-update",
  "release-channel",
  "official-library-readiness-update",
  "official-library-readiness",
  "goal-completion"
];
const rawMissingReleaseCandidateGateIds = requiredReleaseCandidateGateIds.filter(
  (id) => !releaseCandidateRows.some((row) => row.id === id && row.status === "pass")
);
const missingReleaseCandidateGateIds = aggregateGateInProgress ? [] : rawMissingReleaseCandidateGateIds;
const releaseCandidateRequiredGatesPass =
  aggregateGateInProgress || (releaseCandidate?.status === "pass" && missingReleaseCandidateGateIds.length === 0);
const libraryAcceptancePass =
  libraryAcceptance?.status === "pass-current-internal-library" &&
  libraryAcceptance.currentInternalLibraryAccepted === true &&
  typeof libraryAcceptance.globalGoalComplete === "boolean";
const expectedLibraryConsumptionGlobalGoalComplete = libraryAcceptance?.globalGoalComplete === true;
const expectedLibraryConsumptionStatus = expectedLibraryConsumptionGlobalGoalComplete
  ? "pass-global-goal"
  : "pass-current-internal-library";
const libraryConsumptionStatusPass =
  aggregateGateInProgress ||
  libraryConsumptionStatus?.status === expectedLibraryConsumptionStatus &&
  libraryConsumptionStatus.currentInternalLibraryAccepted === true &&
  libraryConsumptionStatus.currentInternalConsumptionPass === true &&
  libraryConsumptionStatus.publicPageKitPass === true &&
  libraryConsumptionStatus.technicalReleaseCandidatePass === true &&
  libraryConsumptionStatus.aggregateReadinessPass === true &&
  libraryConsumptionStatus.futureCrmProcessPass === true &&
  libraryConsumptionStatus.futureCrmRealAdoptionExecuted === realFutureCrmAdoptionExecuted &&
  libraryConsumptionStatus.globalGoalComplete === expectedLibraryConsumptionGlobalGoalComplete;
const crmRealReadinessPass =
  aggregateGateInProgress ||
  crmRealReadiness?.status === (realFutureCrmAdoptionExecuted ? "pass-global-crm-ready" : "pass-ready-to-start-crm-real") &&
  crmRealReadiness.currentInternalReady === true &&
  crmRealReadiness.crmRealCanStart === true &&
  crmRealReadiness.realFutureCrmAdoptionExecuted === realFutureCrmAdoptionExecuted &&
  crmRealReadiness.globalGoalComplete === expectedLibraryConsumptionGlobalGoalComplete;
const officialLibraryReadinessPass =
  aggregateGateInProgress ||
  officialLibraryReadiness?.status === (realFutureCrmAdoptionExecuted ? "pass-official-library-global" : "pass-official-library-current-scope") &&
  officialLibraryReadiness.officialConsumerReady === true &&
  officialLibraryReadiness.currentInternalReady === true &&
  officialLibraryReadiness.crmRealCanStart === true &&
  officialLibraryReadiness.realFutureCrmAdoptionExecuted === realFutureCrmAdoptionExecuted &&
  officialLibraryReadiness.globalGoalComplete === expectedLibraryConsumptionGlobalGoalComplete;
const releaseChannelPass =
  aggregateGateInProgress ||
  (releaseChannel?.status === "pass-local-release-channel" || releaseChannel?.status === "pass-registry-release-channel") &&
  releaseChannel.localTarballChannelReady === true &&
  (releaseChannel.releasePolicyStatus === "pass-current-local-policy" || releaseChannel.releasePolicyStatus === "pass-registry-policy") &&
  releaseChannel.consumerPackageSyncStatus === "pass" &&
  releaseChannel.consumerVendorVersioningStatus === "pass" &&
  releaseChannel.consumerConfigVersioningStatus === "pass";
const releasePolicyPass =
  aggregateGateInProgress ||
  (releasePolicy?.status === "pass-current-local-policy" || releasePolicy?.status === "pass-registry-policy") &&
  releasePolicy.contractPass === true &&
  releasePolicy.currentChannel === "local-tarball" &&
  Array.isArray(releasePolicy.packageVersions) &&
  releasePolicy.packageVersions.length === 3;
const localReleaseManifestPass =
  aggregateGateInProgress ||
  localReleaseManifest?.status === "pass" &&
  localReleaseManifest.manifestShapePass === true &&
  localReleaseManifest.packageCount === 3 &&
  Array.isArray(localReleaseManifest.rows) &&
  localReleaseManifest.rows.every((row) => row.pass);
const consumerPackageInstalledFilesPass =
  consumerPackageSync.status === "pass" &&
  Array.isArray(consumerPackageSync.installedRows) &&
  consumerPackageSync.installedRows.length > 0 &&
  consumerPackageSync.installedRows.every((row) => row.pass);
const fullFinalGateBundleExecuted = releaseCandidateRequiredGatesPass && releaseCandidate?.status === "pass";

const requirements = [
  {
    requirement: "Standalone package structure for tokens, primitives, and CRM compositions",
    status: pass(packageBoundaries.summary.pass) ? "proven" : "failed",
    evidence: ["package-boundaries:audit", "packages/tokens", "packages/ui", "packages/crm"]
  },
  {
    requirement: "Installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented local package artifacts",
    status:
      pass(packageArtifacts.summary.pass) &&
      packageArtifactsPublishablePass &&
      packageArtifactsCssSideEffectsPass &&
      packageArtifactsPeerDependenciesPass &&
      packageArtifactsReadmePass &&
      packageArtifactsWorkspaceDependencyPass &&
      packageArtifactsFilesFieldPass &&
      pass(consumerIntegration.installedPackageStatus.pass) &&
      consumerPackageSync.status === "pass" &&
      consumerPackageInstalledFilesPass &&
      consumerPackageSyncNegativeProbePass &&
      consumerVendorVersioning.status === "pass"
        ? "proven"
        : "failed",
    evidence: [
      "package-artifacts:audit sourcePublishable/packedPublishable",
      "package-artifacts:audit sourceCssSideEffects/packedCssSideEffects",
      "package-artifacts:audit required React peerDependencies",
      "package-artifacts:audit no packed workspace:* dependencies",
      "package-artifacts:audit required packed local dependency versions",
      "package-artifacts:audit package files field and forbidden tarball files",
      "package-artifacts:audit required README snippets",
      "consumer-package-sync:audit",
      "consumer-package-sync:audit installed public files match package outputs",
      consumerPackageSyncNegativeProbePass
        ? "library-readiness-gate consumer-package-sync-negative-probe pass"
        : "library-readiness-gate consumer-package-sync-negative-probe missing/fail",
      "consumer-vendor-versioning:audit",
      "consumer:audit installedPackageStatus"
    ]
  },
  {
    requirement: "Public page kit exported, story-covered, and documented",
    status: pass(publicApi.summary.pass) ? "proven-for-current-kit" : "failed",
    evidence: [`public-api:audit ${publicApi.passCount}/${publicApi.requiredCount} pass`]
  },
  {
    requirement: "Runtime standard page-kit manifest is available to consumers",
    status:
      pass(publicApi.summary.runtimeManifestExportPresent) &&
      pass(publicApi.summary.runtimeManifestExactParity) &&
      (publicApi.summary.runtimeManifestMissingRows?.length ?? 0) === 0 &&
      (publicApi.summary.runtimeManifestExtraRows?.length ?? 0) === 0 &&
      pass(consumerIntegration.standardPageKitRuntimeStatus?.pass) &&
      pass(consumerIntegration.standardPageKitRuntimeStatus?.exactParity) &&
      consumerIntegration.standardPageKitRuntimeStatus?.count === publicApi.requiredCount &&
      futureConsumerFixtureSmokePass
        ? "proven-for-current-internal-and-fixtures"
        : "failed",
    evidence: [
      "contracts/standard-page-kit.manifest.json",
      "public-api:audit runtimeManifestExportPresent",
      "public-api:audit runtimeManifestExactParity",
      `consumer:audit standardPageKitRuntimeStatus exact ${consumerIntegration.standardPageKitRuntimeStatus?.count ?? 0}/${publicApi.requiredCount}`,
      "future-consumer-fixture:audit smoke resolved JS/CSS exports including @taliya/crm/standard-page-kit and manifest count"
    ]
  },
  {
    requirement: "Component architecture supports reuse",
    status: componentArchitecturePass ? "proven-for-current-scope" : "failed",
    evidence: [
      `components:audit ${componentArchitecture.storyArchitecture.total} valid stories`,
      "primitiveReuseClassification refactor=0 missingPrimitive=0"
    ]
  },
  {
    requirement: "Token governance and no new visual debt",
    status: tokenGovernancePass ? "proven-for-current-token-css-surface" : "failed",
    evidence: ["tokens:audit", "token-governance-audit.md literalSizing=0 aliasObrigatorio=0"]
  },
  {
    requirement: "Taliya Internal declares and installs official packages",
    status: consumerPackageSourcePinningPass && pass(consumerIntegration.installedPackageStatus.pass) && consumerInstalledContractMarkersPass
      ? "proven-for-current-internal"
      : "failed",
    evidence: [
      "consumer:audit packageStatus pass",
      "consumer:audit packageStatus sourceRows pinned to vendor/taliya-product-ui",
      "consumer:audit installedPackageStatus pass",
      "consumer:audit installedPackageContractStatus pass",
      `installed markers: ${consumerInstalledContractMarkerIds.join(", ")}`
    ]
  },
  {
    requirement: "Taliya Internal avoids active local visual clones",
    status:
      pass(consumerIntegration.activeClassNameStatus.pass) &&
      pass(consumerIntegration.activeCssStatus.pass) &&
      pass(consumerIntegration.forbiddenImportStatus.pass) &&
      pass(consumerIntegration.forbiddenTaliyaSubpathImportStatus?.pass)
        ? "proven-for-current-internal"
        : "failed",
    evidence: [
      "consumer:audit activeClassNameStatus pass",
      "consumer:audit activeCssStatus pass",
      "consumer:audit forbiddenImportStatus pass",
      "consumer:audit forbiddenTaliyaSubpathImportStatus pass"
    ]
  },
  {
    requirement: "Taliya Internal uses official shell, filters, tables, kanban, drawers, panels, and state primitives",
    status: pass(consumerPageKit.summary.pass) && consumerPageKitWrapperContractsPass ? "proven-for-current-internal" : "failed",
    evidence: [
      "consumer-page-kit:audit pass",
      `page-kit config ${consumerPageKit.configSource ?? "default-internal"}`,
      "requiredStatus imported=true jsxUsed=true",
      "componentContractRows prove wrapper-level official render roots"
    ]
  },
  {
    requirement: "Taliya Internal route pages are fully covered by the official page-kit adoption map",
    status:
      pass(consumerPageKit.routeCoverage?.pass) &&
      pass(consumerPageKit.routeCoverage?.rootExists) &&
      (consumerPageKit.routeCoverage?.discoveredRoutes?.length ?? 0) > 0 &&
      (consumerPageKit.summary?.uncoveredRoutes?.length ?? 0) === 0 &&
      consumerPageKitRouteWorkspacesPass
        ? "proven-for-current-internal"
        : "failed",
    evidence: [
      "consumer-page-kit:audit routeCoverage pass",
      `routeCoverage root ${consumerPageKit.routeCoverage?.root ?? "none"}`,
      `discoveredRoutes ${(consumerPageKit.routeCoverage?.discoveredRoutes ?? []).join(", ") || "none"}`,
      "uncoveredRoutes=0",
      "each route requires InternalShell plus a local workspace component",
      `routeWorkspaces ${consumerPageKitRouteWorkspaceRows.map((row) => `${row.route}:${row.workspaceComponents.join("+") || "none"}:${row.pass ? "pass" : "fail"}`).join(", ")}`
    ]
  },
  {
    requirement: "Taliya Internal owns the same consumer readiness config model future CRM will use",
    status: internalReadinessConfigPass ? "proven-for-current-internal" : "failed",
    evidence: [
      "C:/Users/lucas/taliya-internal/taliya-readiness.config.json",
      "library-readiness-gate.json readinessConfig",
      "consumer-readiness-config.example.json"
    ]
  },
  {
    requirement: "Taliya Internal consumer readiness configs are versioned in the consumer repository",
    status:
      consumerConfigVersioning.status === "pass" &&
      consumerConfigVersioning.configRows?.every((row) => row.exists && row.jsonValid && row.tracked)
        ? "proven-for-current-internal"
        : "failed",
    evidence: [
      "consumer-config-versioning:audit",
      "consumer-config-versioning-audit.md",
      "taliya-readiness.config.json tracked",
      "taliya-page-kit.config.json tracked"
    ]
  },
  {
    requirement: "Internal runtime still works after migration",
    status: consumerRuntime.status === "pass" ? "proven-for-current-internal" : "failed",
    evidence: ["consumer-runtime:audit", "consumer-runtime-audit.md", "batch-9-status-ledger.md", "batch-11-status-ledger.md"]
  },
  {
    requirement: "Technical release candidate gate passes",
    status: releaseCandidateRequiredGatesPass ? "proven-for-current-scope" : "not-run",
    evidence: [
      "release-candidate:audit",
      "release-candidate-audit.md",
      `required gates pass: ${requiredReleaseCandidateGateIds.join(", ")}`,
      aggregateGateInProgress
        ? "release-candidate self-report check deferred while aggregate gate is in progress"
        : "release-candidate self-report check active",
      missingReleaseCandidateGateIds.length
        ? `missing/failing release gates: ${missingReleaseCandidateGateIds.join(", ")}`
        : "missing/failing release gates: none"
    ]
  },
  {
    requirement: "Current Internal/library acceptance gate passes with separate global-completion status",
    status: libraryAcceptancePass ? "proven-for-current-internal" : "not-run",
    evidence: [
      "library-acceptance:audit",
      "library-acceptance-audit.md",
      `library acceptance status: ${libraryAcceptance?.status ?? "not-run"}`,
      `currentInternalLibraryAccepted=${libraryAcceptance?.currentInternalLibraryAccepted ?? "unknown"}`,
      `globalGoalComplete=${libraryAcceptance?.globalGoalComplete ?? "unknown"}`,
      `globalGoalStatus=${libraryAcceptance?.globalGoalStatus ?? "unknown"}`
    ]
  },
  {
    requirement: "Library consumption status handoff is current and coherent",
    status: libraryConsumptionStatusPass ? "proven-for-current-internal" : "failed",
    evidence: [
      "library-consumption-status:audit",
      "library-consumption-status.md",
      `status=${libraryConsumptionStatus?.status ?? "missing"}`,
      `currentInternalLibraryAccepted=${libraryConsumptionStatus?.currentInternalLibraryAccepted ?? "unknown"}`,
      `currentInternalConsumptionPass=${libraryConsumptionStatus?.currentInternalConsumptionPass ?? "unknown"}`,
      `publicPageKitPass=${libraryConsumptionStatus?.publicPageKitPass ?? "unknown"}`,
      `technicalReleaseCandidatePass=${libraryConsumptionStatus?.technicalReleaseCandidatePass ?? "unknown"}`,
      `aggregateReadinessPass=${libraryConsumptionStatus?.aggregateReadinessPass ?? "unknown"}`,
      `futureCrmProcessPass=${libraryConsumptionStatus?.futureCrmProcessPass ?? "unknown"}`,
      `futureCrmRealAdoptionExecuted=${libraryConsumptionStatus?.futureCrmRealAdoptionExecuted ?? "unknown"}`,
      `globalGoalComplete=${libraryConsumptionStatus?.globalGoalComplete ?? "unknown"}`
    ]
  },
  {
    requirement: "CRM real readiness handoff proves the library can start the real CRM",
    status: crmRealReadinessPass ? "proven-for-current-scope" : "failed",
    evidence: [
      "crm-real-readiness:audit",
      "crm-real-readiness-audit.md",
      `status=${crmRealReadiness?.status ?? "not-run"}`,
      `currentInternalReady=${crmRealReadiness?.currentInternalReady ?? "unknown"}`,
      `crmRealCanStart=${crmRealReadiness?.crmRealCanStart ?? "unknown"}`,
      `realFutureCrmAdoptionExecuted=${crmRealReadiness?.realFutureCrmAdoptionExecuted ?? "unknown"}`,
      `globalGoalComplete=${crmRealReadiness?.globalGoalComplete ?? "unknown"}`,
      `standardPageKitComponents=${crmRealReadiness?.counts?.standardPageKitComponents ?? "unknown"}`,
      `domainDrawerFamilies=${crmRealReadiness?.counts?.domainDrawerFamilies ?? "unknown"}`
    ]
  },
  {
    requirement: "Official library readiness handoff proves the packages can be consumed as the reusable UI source",
    status: officialLibraryReadinessPass ? "proven-for-current-scope" : "failed",
    evidence: [
      "official-library-readiness:audit",
      "official-library-readiness-audit.md",
      `status=${officialLibraryReadiness?.status ?? "not-run"}`,
      `officialConsumerReady=${officialLibraryReadiness?.officialConsumerReady ?? "unknown"}`,
      `currentInternalReady=${officialLibraryReadiness?.currentInternalReady ?? "unknown"}`,
      `crmRealCanStart=${officialLibraryReadiness?.crmRealCanStart ?? "unknown"}`,
      `realFutureCrmAdoptionExecuted=${officialLibraryReadiness?.realFutureCrmAdoptionExecuted ?? "unknown"}`,
      `releaseCandidateGates=${officialLibraryReadiness?.releaseCandidateGateCount ?? "unknown"}`,
      `registryManualItems=${officialLibraryReadiness?.registryManualItems?.length ?? "unknown"}`
    ]
  },
  {
    requirement: "Release policy contract makes local tarball and future registry channels explicit",
    status: releasePolicyPass ? "proven-for-current-scope" : "failed",
    evidence: [
      "release-policy:audit",
      "release-policy-audit.md",
      "contracts/release-policy.json",
      "contracts/release-policy.md",
      "release-policy:audit:negative-probe",
      `status=${releasePolicy?.status ?? "not-run"}`,
      `currentChannel=${releasePolicy?.currentChannel ?? "unknown"}`,
      `registryReady=${releasePolicy?.registryReady ?? "unknown"}`,
      `registryBlockers=${releasePolicy?.registryBlockers?.length ?? "unknown"}`
    ]
  },
  {
    requirement: "Release channel handoff proves the local install channel is reliable for consumers",
    status: releaseChannelPass ? "proven-for-current-scope" : "failed",
    evidence: [
      "release-channel:audit",
      "release-channel-audit.md",
      `status=${releaseChannel?.status ?? "not-run"}`,
      `localTarballChannelReady=${releaseChannel?.localTarballChannelReady ?? "unknown"}`,
      `registryReady=${releaseChannel?.registryReady ?? "unknown"}`,
      `releasePolicyStatus=${releaseChannel?.releasePolicyStatus ?? "unknown"}`,
      `currentVersion=${releaseChannel?.currentVersion ?? "unknown"}`,
      `consumerPackageSyncStatus=${releaseChannel?.consumerPackageSyncStatus ?? "unknown"}`,
      `consumerVendorVersioningStatus=${releaseChannel?.consumerVendorVersioningStatus ?? "unknown"}`,
      `consumerConfigVersioningStatus=${releaseChannel?.consumerConfigVersioningStatus ?? "unknown"}`,
      `registryBlockers=${releaseChannel?.registryBlockers?.length ?? "unknown"}`
    ]
  },
  {
    requirement: "Local release manifest gives consumers a stable install artifact index",
    status: localReleaseManifestPass ? "proven-for-current-scope" : "failed",
    evidence: [
      "local-release-manifest:audit",
      "local-release-manifest-audit.md",
      "dist-packages/taliya-product-ui-local-manifest.json",
      `status=${localReleaseManifest?.status ?? "not-run"}`,
      `manifestShapePass=${localReleaseManifest?.manifestShapePass ?? "unknown"}`,
      `packageCount=${localReleaseManifest?.packageCount ?? "unknown"}`
    ]
  },
  {
    requirement: "Future CRM can adopt the same library",
    status: futureConsumerAdoptionProcessPass ? "process-proven-adoption-not-executed" : "failed",
    evidence: [
      "consumer-integration-contract.md",
      "consumer-adoption-playbook.md",
      "consumer-readiness-config.example.json",
      "consumer-page-kit-config.example.json",
      "consumer-bootstrap:audit starterFiles pass",
      "future-consumer-fixture:audit bootstrap starterFiles pass",
      "future-consumer-fixture:audit installed render/export smoke including @taliya/crm/standard-page-kit",
      futureConsumerDiscoveryGatePass
        ? "library-readiness-gate future-consumer-discovery pass"
        : "library-readiness-gate future-consumer-discovery missing/fail",
      futureConsumerDiscoveryNegativeProbePass
        ? "library-readiness-gate future-consumer-discovery-negative-probe pass"
        : "library-readiness-gate future-consumer-discovery-negative-probe missing/fail",
      futureConsumerDiscoveryPartialProbePass
        ? "library-readiness-gate future-consumer-discovery-partial-probe pass"
        : "library-readiness-gate future-consumer-discovery-partial-probe missing/fail",
      futureConsumerDiscoveryPositiveProbePass
        ? "library-readiness-gate future-consumer-discovery-positive-probe pass"
        : "library-readiness-gate future-consumer-discovery-positive-probe missing/fail",
      futureConsumerAdoptionGatePass
        ? "library-readiness-gate future-consumer-adoption pass"
        : "library-readiness-gate future-consumer-adoption missing/fail",
      futureConsumerAdoptionPositiveProbePass
        ? "library-readiness-gate future-consumer-adoption-positive-probe pass"
        : "library-readiness-gate future-consumer-adoption-positive-probe missing/fail",
      futureConsumerAdoptionMismatchProbePass
        ? "library-readiness-gate future-consumer-adoption-mismatch-probe pass"
        : "library-readiness-gate future-consumer-adoption-mismatch-probe missing/fail",
      futureConsumerAdoptionNegativeProbePass
        ? "library-readiness-gate future-consumer-adoption-negative-probe pass"
        : "library-readiness-gate future-consumer-adoption-negative-probe missing/fail",
      futureCrmAdoptionHandoffGatePass
        ? "library-readiness-gate future-crm-adoption-handoff pass"
        : "library-readiness-gate future-crm-adoption-handoff missing/fail",
      "future-crm-adoption-handoff.md",
      "future-crm-adoption-handoff:audit validates candidate discovery, bootstrap, labeled readiness evidence, and non-completion rule",
      `future-consumer-discovery:audit candidates=${futureConsumerDiscovery.futureCrmCandidateCount}`,
      "future-consumer-discovery:audit:negative-probe rejects missing scan roots",
      "future-consumer-discovery:audit:partial-probe rejects weak CRM-looking directories without the full consumer contract",
      "future-consumer-discovery:audit:positive-probe accepts CRM directories with the full consumer contract",
      `future-consumer-adoption:audit status=${futureConsumerAdoption.status}`,
      `future-consumer-adoption:audit adopted=${futureConsumerAdoption.adoptedCandidateCount}/${futureConsumerAdoption.futureCrmCandidateCount}`,
      "future-consumer-adoption:audit:positive-probe accepts candidates with matching labeled readiness evidence",
      "future-consumer-adoption:audit:mismatch-probe rejects readiness evidence for a different consumer root",
      "future-consumer-adoption:audit:negative-probe rejects candidates without matching readiness evidence",
      "bootstrap-consumer-configs.mjs --starter-files dry-run checked by readiness:audit"
    ]
  },
  {
    requirement: "Approved source-image visual parity",
    status:
      visualCertificationBacklog?.visualCertificationStatus === "complete"
        ? "proven-globally"
        : scopedCompletionAccepted
          ? "scoped-out-by-product-acceptance"
          : "not-proven-globally",
    evidence: [
      "visual-parity-contract.md",
      certificationScopeGatePass
        ? "library-readiness-gate certification-scope pass"
        : "library-readiness-gate certification-scope missing/fail",
      certificationScopePositiveProbePass
        ? "library-readiness-gate certification-scope-positive-probe pass"
        : "library-readiness-gate certification-scope-positive-probe missing/fail",
      certificationScopeNegativeProbePass
        ? "library-readiness-gate certification-scope-negative-probe pass"
        : "library-readiness-gate certification-scope-negative-probe missing/fail",
      `certification-scope:audit scope=${certificationScope.scope}`,
      `certification-scope:audit scopedCompletionAccepted=${certificationScope.scopedCompletionAccepted}`,
      `certification-scope:audit exampleValid=${(certificationScope.exampleValidationErrors ?? []).length === 0}`,
      "certification-scope:audit:positive-probe accepts valid scoped-completion decisions",
      "certification-scope:audit:negative-probe rejects invalid scoped-completion decisions",
      "batch ledgers",
      "visual-certification-backlog:audit",
      sourceAssetsReconciliation
        ? `sourceReconciliation=${sourceAssetsReconciliation.status} canonical=${sourceAssetsReconciliation.canonicalTopLevelImageCount}/${sourceAssetsReconciliation.expectedCanonicalImageCount} rosterKnown=${sourceAssetsReconciliation.canonicalRoster?.knownNameCount ?? "unknown"} rosterUnresolved=${sourceAssetsReconciliation.canonicalRoster?.unresolvedCount ?? "unknown"} recursive=${sourceAssetsReconciliation.recursiveImageCount} nestedDerivatives=${sourceAssetsReconciliation.nestedDerivativeImageCount} archiveExact=${sourceAssetsReconciliation.archive?.exactFolderMatch}`
        : "source assets reconciliation audit not yet generated",
      "reference-sheet-coverage:audit",
      referenceSheetCoverageGatePass
        ? "library-readiness-gate reference-sheet-coverage pass"
        : "library-readiness-gate reference-sheet-coverage missing/fail",
      referenceSheetCoverageMissingStoryProbePass
        ? "library-readiness-gate reference-sheet-coverage-missing-story-probe pass"
        : "library-readiness-gate reference-sheet-coverage-missing-story-probe missing/fail",
      referenceSheetCoverage
        ? `referenceSheets=${referenceSheetCoverage.mappedReferenceImageCount}/${referenceSheetCoverage.referenceImageCount} components=${referenceSheetCoverage.resolvedComponentCount} missing=${referenceSheetCoverage.missingComponentCount} ambiguous=${referenceSheetCoverage.ambiguousComponentCount ?? 0} nonOfficial=${referenceSheetCoverage.nonOfficialComponentCount ?? 0}`
        : "reference sheet coverage audit not yet generated",
      "visual-certification-plan:audit",
      visualCertificationPlanGatePass
        ? "library-readiness-gate visual-certification-plan pass"
        : "library-readiness-gate visual-certification-plan missing/fail",
      visualCertificationPlanNegativeProbePass
        ? "library-readiness-gate visual-certification-plan-negative-probe pass"
        : "library-readiness-gate visual-certification-plan-negative-probe missing/fail",
      visualCertificationBacklog
        ? `incomplete=${visualCertificationBacklog.summary.globallyIncompleteCount} mapConflicts=${visualCertificationBacklog.summary.imageMapCertificationConflictCount ?? 0} blockerMentions=${visualCertificationBacklog.summary.blockerMentionCount}`
        : "visual backlog audit not yet generated",
      visualCertificationPlan
        ? `planActionable=${visualCertificationPlan.summary.actionableCount}/${visualCertificationPlan.summary.pendingCount} technicalCycles=${visualCertificationPlan.summary.technicalCertificationCycleCount ?? 0} productReviewDecisions=${visualCertificationPlan.summary.productReviewDecisionCount ?? 0} missingPlanData=${visualCertificationPlan.summary.blockedByMissingPlanDataCount} currentEvidenceAssertions=${visualCertificationPlan.summary.currentEvidenceAssertionCount ?? 0} assertionCoverage=${visualCertificationPlan.summary.currentEvidenceAssertionCoverageCount ?? 0}/${visualCertificationPlan.summary.pendingCount} missingAssertions=${visualCertificationPlan.summary.currentEvidenceMissingAssertionCount ?? 0}`
        : "visual certification plan audit not yet generated"
    ]
  }
];

const readinessFailed = requirements.some((item) => item.status === "failed");
const audit = {
  generatedAt: new Date().toISOString(),
  date: new Date().toISOString().slice(0, 10),
  goal:
    "Transformar o taliya-product-ui em uma biblioteca reutilizavel para Taliya Internal e futuro CRM, migrando internal para consumir componentes oficiais de shell, filtros, tabela e drawer com padronizacao visual e comportamental.",
  trueGoal,
  verdict: readinessFailed ? "readiness-regression" : "not-complete-globally",
  summary: {
    currentInternalReadiness: readinessFailed ? "regressed" : "proven",
    futureCrmAdoption: realFutureCrmAdoptionExecuted ? "executed" : "not-executed",
    globalSourceImageParity:
      visualCertificationBacklog?.visualCertificationStatus === "complete"
        ? "proven"
        : scopedCompletionAccepted
          ? "scoped-out-by-product-acceptance"
          : "not-proven"
  },
  requirements,
  blockingGlobalCompletion: [
    "future CRM consumer has not run adoption gates",
    futureConsumerDiscovery.futureCrmCandidateCount === 0
      ? "no real future CRM consumer app was found in local sibling directories"
      : "future CRM candidate exists but has not run adoption gates",
    ...(scopedCompletionAccepted
      ? []
      : [
          visualCertificationBacklog
            ? `global 1:1 visual parity is not complete: incompleteRows=${visualCertificationBacklog.summary.globallyIncompleteCount}, imageMapCertificationConflicts=${visualCertificationBacklog.summary.imageMapCertificationConflictCount ?? 0}, blockerMentions=${visualCertificationBacklog.summary.blockerMentionCount}`
            : "global 1:1 visual parity for every approved source image is not claimed"
        ])
  ],
  completedOverall: [
    "Created and guarded the standalone package boundary for @taliya/tokens, @taliya/ui, and @taliya/crm.",
    "Made local package artifacts installable/publishable for the current local distribution model, including CSS side effects, peer dependency, README, package-files, and no workspace-dependency checks.",
    "Exposed and audited the current official CRM page kit, including runtime standardPageKitManifest and @taliya/crm/standard-page-kit.",
    "Migrated current taliya-internal covered routes to official package/page-kit components, with route coverage and clone-avoidance audits.",
    "Added consumer-owned readiness/page-kit config contracts and versioning checks.",
    "Added bootstrap and starter-template flow for a future consumer, including official shell, work-list, filter, quick-filter, table, kanban/card, and drawer starter files.",
    "Added synthetic installed future-consumer fixture proving tarball install, public JS/CSS export resolution, runtime manifest parity, and SSR smoke for official components.",
    "Added visual-certification backlog tracking so image parity gaps are explicit and cannot be hidden by technical gates.",
    "Added a visual-certification plan audit so incomplete image rows have source/story/evidence/blocker/next-action data before a certification cycle starts.",
    "Added visual-certification current-evidence assertions and a negative-probe gate so stale visual evidence and pending rows without assertions fail readiness.",
    "Added certification-scope decision auditing so any product decision to accept current Internal/library readiness instead of full image parity must be explicit and validated.",
    "Added certification-scope positive probe so valid scoped-completion decisions are recognized without activating the project decision.",
    "Added certification-scope negative probe so invalid scoped-completion decisions fail readiness and release-candidate gates.",
    "Added aggregate readiness and technical release-candidate gates for the current scoped package/Internal/future-fixture evidence.",
    "Added a current Internal/library acceptance gate so product can distinguish reusable-library acceptance from global future-CRM and 1:1 visual completion.",
    "Hardened goal-completion evidence so the release-candidate gate must include typecheck, lint, test, build, readiness, future-consumer discovery, future-consumer discovery negative probe, future-consumer discovery partial-candidate probe, future-consumer discovery positive probe, future-consumer adoption, future-consumer adoption positive probe, future-consumer adoption mismatch probe, future-consumer adoption negative probe, future CRM adoption handoff, Internal contract markers, visual backlog, visual plan, stale-evidence negative probe, current Internal/library acceptance, acceptance valid-evidence probe, acceptance false-positive probe, and goal-completion checks.",
    "Promoted future CRM discovery into readiness and release-candidate gates so stale discovery reports cannot silently support goal evidence.",
    "Added a future-consumer discovery negative probe so a missing scan root cannot be accepted as zero future CRM candidates.",
    "Added a future-consumer discovery partial-candidate probe so weak CRM-looking directories cannot be accepted as real future CRM candidates without the full consumer contract.",
    "Added a future-consumer discovery positive probe so a CRM directory with the full consumer contract is accepted as a real future CRM candidate.",
    "Added a future-consumer adoption audit so any discovered real future CRM candidate must have matching labeled readiness evidence before adoption can be considered executed.",
    "Added a future-consumer adoption positive probe so a discovered future CRM candidate with matching labeled readiness evidence is accepted.",
    "Added a future-consumer adoption mismatch probe so readiness evidence for a different consumer root is rejected.",
    "Added a future-consumer adoption negative probe so candidates without matching readiness evidence are rejected by readiness and release-candidate gates.",
    "Added an audited future CRM adoption handoff so candidate discovery, bootstrap, labeled readiness evidence, and non-completion rules are a reusable process artifact.",
    "Added consumer package installed-file hash checks and a negative probe so fresh vendor tarballs with stale installed node_modules package files fail readiness and release-candidate evidence.",
    "Added a compact library consumption status handoff and wired it into release-candidate and goal-completion evidence so current Internal acceptance, official kit consumption, future CRM process readiness, and global non-completion remain easy to verify.",
    "Added compact library consumption positive, global-complete, stale-release, stale-readiness, and negative probes so valid handoff evidence is accepted, future complete evidence reports pass-global-goal, stale release-candidate/readiness evidence is rejected, and false-positive Internal consumption evidence is rejected.",
    "Added a CRM real readiness handoff that consolidates package, Internal, standard page-kit, dynamic page/drawer, consumer bootstrap, installed future-consumer fixture, future adoption process, and visual-scope evidence into one executable answer.",
    "Added an official library readiness handoff that consolidates package metadata, package gates, public API, token/component governance, Internal consumption, CRM real readiness, release-candidate evidence, and registry manual items into one executable answer.",
    "Added a versioned release policy contract and audit so the current local tarball channel, future registry blockers, and consumer dependency migration decisions are explicit.",
    "Added a release policy negative probe so incomplete release-policy contracts fail before they can support release/readiness evidence.",
    "Added a release channel handoff that proves the current local tarball/vendor install channel is reliable for consumers while keeping registry publication blockers explicit.",
    "Added a local release manifest so consumers have a stable install artifact index with package names, versions, tarballs, hashes, sizes, and install order.",
    "Added consumer config path-scope validation and page-kit/readiness-config path-traversal probes so versioned consumer configs cannot prove adoption using files outside the consumer root."
  ],
  remainingOverall: [
    "Run the adoption flow against the real future CRM app once it exists or is connected locally.",
    ...(scopedCompletionAccepted
      ? [
          "Keep the visual-certification queue as continuous product-quality work, separate from current Internal/library acceptance."
        ]
      : [
          "Finish source-backed 1:1 visual certification for the remaining approved image rows, or record an explicit product decision that current Internal/library readiness is the accepted scope.",
          "Execute the technical visual-certification queue separately from semi-approved rows that require product review/acceptance decisions."
        ]),
    "Keep promoting any missing future page/card variants into official @taliya/ui or @taliya/crm components instead of consumer-local implementations.",
    ...(fullFinalGateBundleExecuted
      ? []
      : ["Run the full final gate bundle after the chosen acceptance scope is explicit."])
  ]
};

const statusRows = requirements
  .map(
    (item) =>
      `| ${item.requirement} | ${item.evidence.map((entry) => `\`${entry}\``).join(", ")} | ${item.status} | ${
        item.status === "failed"
          ? "Blocks readiness"
          : item.status.includes("not-") || item.status.includes("not-executed")
            ? "Blocks global completion"
            : "Satisfied for current scope"
      } |`
  )
  .join("\n");

const md = `# Goal Completion Audit

Date: ${audit.date}

Goal under audit: transform \`taliya-product-ui\` into a reusable library for \`taliya-internal\` and the future Taliya CRM, with Internal consuming official shell, filters, table, drawer, and standardized visual/behavioral components.

Verdict: ${audit.verdict}. Current evidence ${
  readinessFailed
    ? "has a readiness regression that must be fixed before acceptance."
    : "proves reusable-library readiness for the current `taliya-internal` scope and establishes the process/gates for future CRM adoption. It does not prove a future CRM app has adopted the library, and it does not certify every approved source image as 1:1 visually complete."
}

## Meta Real

${audit.trueGoal.statement}

Acceptance criteria:

${audit.trueGoal.acceptanceCriteria.map((item) => `- ${item}`).join("\n")}

Not sufficient:

${audit.trueGoal.notSufficient.map((item) => `- ${item}`).join("\n")}

## Requirement Matrix

| Requirement | Current evidence | Status | Completion impact |
| --- | --- | --- | --- |
${statusRows}

## Evidence Files

- \`specs/001-product-ui-foundation/library-readiness-audit.md\`
- \`specs/001-product-ui-foundation/library-readiness-gate.md\`
- \`specs/001-product-ui-foundation/library-acceptance-audit.md\`
- \`specs/001-product-ui-foundation/library-consumption-status.md\`
- \`specs/001-product-ui-foundation/crm-real-readiness-audit.md\`
- \`specs/001-product-ui-foundation/official-library-readiness-audit.md\`
- \`specs/001-product-ui-foundation/release-policy-audit.md\`
- \`specs/001-product-ui-foundation/contracts/release-policy.md\`
- \`specs/001-product-ui-foundation/release-channel-audit.md\`
- \`specs/001-product-ui-foundation/local-release-manifest-audit.md\`
- \`dist-packages/taliya-product-ui-local-manifest.json\`
- \`specs/001-product-ui-foundation/consumer-integration-audit.md\`
- \`specs/001-product-ui-foundation/consumer-package-sync-audit.md\`
- \`specs/001-product-ui-foundation/consumer-vendor-versioning-audit.md\`
- \`specs/001-product-ui-foundation/consumer-page-kit-audit.md\`
- \`specs/001-product-ui-foundation/consumer-runtime-audit.md\`
- \`specs/001-product-ui-foundation/consumer-config-versioning-audit.md\`
- \`specs/001-product-ui-foundation/consumer-bootstrap-audit.md\`
- \`specs/001-product-ui-foundation/future-consumer-fixture-audit.md\`
- \`specs/001-product-ui-foundation/future-consumer-discovery-audit.md\`
- \`specs/001-product-ui-foundation/visual-certification-backlog-audit.md\`
- \`specs/001-product-ui-foundation/visual-certification-plan-audit.md\`
- \`specs/001-product-ui-foundation/certification-scope-decision-audit.md\`
- \`specs/001-product-ui-foundation/contracts/certification-scope-decision.example.json\`
- \`specs/001-product-ui-foundation/release-candidate-audit.md\`
- \`C:/Users/lucas/taliya-internal/taliya-readiness.config.json\`
- \`specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json\`
- \`specs/001-product-ui-foundation/public-api-audit.md\`
- \`specs/001-product-ui-foundation/package-boundaries-audit.md\`
- \`specs/001-product-ui-foundation/package-artifacts-audit.md\`
- \`specs/001-product-ui-foundation/component-architecture-audit.md\`
- \`specs/001-product-ui-foundation/token-governance-audit.md\`
- \`specs/001-product-ui-foundation/consumer-adoption-playbook.md\`
- \`specs/001-product-ui-foundation/batch-9-status-ledger.md\`
- \`specs/001-product-ui-foundation/batch-11-status-ledger.md\`

## Current Completion State

Completed overall:

${audit.completedOverall.map((item) => `- ${item}`).join("\n")}

Remaining overall:

${audit.remainingOverall.map((item) => `- ${item}`).join("\n")}

The current state is strong enough to say:

- \`taliya-product-ui\` is packaged as a reusable local library for the current Internal scope.
- \`@taliya/crm\` exposes \`standardPageKitManifest\` at runtime, and the current consumer audit imports it successfully with ${consumerIntegration.standardPageKitRuntimeStatus?.count ?? 0}/${publicApi.requiredCount} manifest entries.
- \`taliya-internal\` currently consumes official shell/filter/table/drawer/page-kit components.
- \`taliya-internal\` dependency sources are pinned to the configured \`vendor/taliya-product-ui\` tarballs.
- \`taliya-internal\` vendor tarballs and installed \`node_modules/@taliya/*\` public files match current package outputs.
- \`taliya-internal\` installed packages expose required contract markers: ${consumerInstalledContractMarkerIds.map((id) => `\`${id}\``).join(", ")}.
- \`taliya-internal\` wrapper contracts prove local table/kanban adapters render official package components inside their own bodies.
- \`taliya-internal\` owns the same readiness config shape intended for future CRM consumers.
- \`taliya-internal\` has its readiness/page-kit configs tracked by the consumer repository.
- \`taliya-internal\` has synced vendor tarballs tracked by the consumer repository.
- Future CRM config bootstrap is executable against a temporary git fixture and generates official starter files for shell, work-list, filter, quick-filter, table, kanban/card, and drawer roots.
- Local tarballs install, bootstrap official starter files, resolve public JS/CSS exports, server-render official shell/filter/table/kanban/drawer components, and pass consumer audits in a synthetic future CRM fixture.
- Readiness runs future CRM discovery with status \`${futureConsumerDiscoveryGate?.status ?? "missing"}\`.
- Readiness runs future CRM discovery negative probe with status \`${futureConsumerDiscoveryNegativeProbeGate?.status ?? "missing"}\`.
- Future CRM discovery currently reports ${futureConsumerDiscovery.futureCrmCandidateCount} real local candidate(s).
- Readiness runs future CRM adoption evidence with status \`${futureConsumerAdoptionGate?.status ?? "missing"}\`, currently adopted ${futureConsumerAdoption.adoptedCandidateCount}/${futureConsumerAdoption.futureCrmCandidateCount} discovered candidate(s).
- Readiness runs future CRM adoption negative probe with status \`${futureConsumerAdoptionNegativeProbeGate?.status ?? "missing"}\`.
- Technical release-candidate gate status is \`${releaseCandidate?.status ?? "not-run"}\`.
- Technical release-candidate required gates are ${releaseCandidateRequiredGatesPass ? "present and passing" : `missing/failing: ${missingReleaseCandidateGateIds.join(", ") || "unknown"}`}.
- Current Internal/library acceptance gate status is \`${libraryAcceptance?.status ?? "not-run"}\`, with current Internal/library accepted: \`${libraryAcceptance?.currentInternalLibraryAccepted ?? "unknown"}\` and global goal complete: \`${libraryAcceptance?.globalGoalComplete ?? "unknown"}\`.
- Library consumption status is \`${libraryConsumptionStatus?.status ?? "not-run"}\`, with current Internal consumption: \`${libraryConsumptionStatus?.currentInternalConsumptionPass ?? "unknown"}\`, future CRM real adoption executed: \`${libraryConsumptionStatus?.futureCrmRealAdoptionExecuted ?? "unknown"}\`, and global goal complete: \`${libraryConsumptionStatus?.globalGoalComplete ?? "unknown"}\`.
- CRM real readiness is \`${crmRealReadiness?.status ?? "not-run"}\`, with CRM real can start: \`${crmRealReadiness?.crmRealCanStart ?? "unknown"}\`, dynamic drawer families checked: \`${crmRealReadiness?.counts?.domainDrawerFamilies ?? "unknown"}\`, and real future CRM adoption executed: \`${crmRealReadiness?.realFutureCrmAdoptionExecuted ?? "unknown"}\`.
- Official library readiness is \`${officialLibraryReadiness?.status ?? "not-run"}\`, with official consumer ready: \`${officialLibraryReadiness?.officialConsumerReady ?? "unknown"}\`, package version: \`${officialLibraryReadiness?.currentVersion ?? "unknown"}\`, release-candidate gates: \`${officialLibraryReadiness?.releaseCandidateGateCount ?? "unknown"}\`, and registry manual items: \`${officialLibraryReadiness?.registryManualItems?.length ?? "unknown"}\`.
- Release policy readiness is \`${releasePolicy?.status ?? "not-run"}\`, with current channel: \`${releasePolicy?.currentChannel ?? "unknown"}\`, registry ready: \`${releasePolicy?.registryReady ?? "unknown"}\`, and registry blockers: \`${releasePolicy?.registryBlockers?.length ?? "unknown"}\`.
- Release channel readiness is \`${releaseChannel?.status ?? "not-run"}\`, with local tarball channel ready: \`${releaseChannel?.localTarballChannelReady ?? "unknown"}\`, registry ready: \`${releaseChannel?.registryReady ?? "unknown"}\`, and registry blockers: \`${releaseChannel?.registryBlockers?.length ?? "unknown"}\`.
- Local release manifest status is \`${localReleaseManifest?.status ?? "not-run"}\`, with manifest shape pass: \`${localReleaseManifest?.manifestShapePass ?? "unknown"}\` and package count: \`${localReleaseManifest?.packageCount ?? "unknown"}\`.
- Certification scope decision status is \`${certificationScope.status}\` with scoped completion accepted: \`${certificationScope.scopedCompletionAccepted}\`.
- Certification scope decision example is valid: \`${(certificationScope.exampleValidationErrors ?? []).length === 0}\`.
- Certification scope positive probe status is \`${certificationScopePositiveProbeGate?.status ?? "missing"}\`.
- Certification scope negative probe status is \`${certificationScopeNegativeProbeGate?.status ?? "missing"}\`.
- The adoption process is documented and guarded by executable audits.
- Token governance has no CSS literal visual debt and no high-priority mandatory alias rows.
- Visual certification planning has ${visualCertificationPlan?.summary.currentEvidenceAssertionCoverageCount ?? 0}/${visualCertificationPlan?.summary.pendingCount ?? 0} pending rows covered by current evidence assertions, and the readiness gate runs the stale-evidence negative probe with status \`${visualCertificationPlanNegativeProbeGate?.status ?? "missing"}\`.

The current state is not strong enough to say:

- every approved CRM image is visually certified 1:1;
- a future CRM app has adopted the library;
- the persistent goal is globally complete without caveats.

## Next Completion Options

1. If the acceptance bar is "current Internal reusable-library readiness", the next step is to run one full final gate bundle and ask for explicit product acceptance of the scoped definition.
2. If the acceptance bar includes future CRM adoption, create or connect the future CRM consumer, run \`corepack pnpm consumer-configs:bootstrap -- --consumer <path> --write --starter-files\` when the app needs the initial official route skeleton, commit the generated configs in that app, then run \`node scripts/audit-library-readiness.mjs --check --consumer <path>\`.
3. If the acceptance bar includes full image parity, continue source-backed Storybook static capture and component-level pass/fail certification for the remaining approved images.
`;

if (!checkMode) {
  writeFileSync(resolve(specDir, "goal-completion-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(resolve(specDir, "goal-completion-audit.md"), md);
}

if (readinessFailed) {
  console.error("Goal completion audit found a readiness regression.");
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/goal-completion-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/goal-completion-audit.json");
}
