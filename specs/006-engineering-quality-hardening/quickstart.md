# Quickstart: Validate the SDD Without Product Changes

**Feature**: `006-engineering-quality-hardening`
**Purpose**: reproduce the complete planning validation and stop at the human-decision boundary.
**Current lifecycle**: `APPROVED`
**Current review marker**: `APPROVED_BY_USER`
**Current authorization**: `APPROVED_FOR_IMPLEMENTATION` for `T101-T176`

## Preconditions and stop rule

- Run from the repository root on the existing checkout.
- Do not install or upgrade dependencies.
- Do not run a product-stage Spec Kit command or workflow.
- Do not change `packages/**`, `apps/**`, `scripts/**`, build/test configuration, baselines, generated reports, artifacts, package versions, or publication state.
- Do not generate source-tree or artifact-manifest hashes while concurrent SDD edits are still being integrated.
- A green automated run can produce a readiness candidate; only the explicit approval envelope in `approval.md` opens the product-work gate.

## 1. Confirm the repository and active feature

```powershell
git status --short --branch
git rev-parse HEAD
Get-Content -Raw .\.specify\feature.json
Get-Content -Raw .\.specify\memory\constitution.md
Get-Content -Raw .\specs\006-engineering-quality-hardening\approval.md
```

Expected for the validated readiness candidate:

- the active feature directory is `specs/006-engineering-quality-hardening`;
- Constitution is version `1.0.0` or later without a weaker replacement;
- lifecycle, review marker, and authorization are `APPROVED / APPROVED_BY_USER / APPROVED_FOR_IMPLEMENTATION` after the exact envelope is validated.

## 2. Check the local Spec Kit installation

The current Windows console requires UTF-8 for the installed CLI:

```powershell
$env:PYTHONUTF8 = '1'
$env:PYTHONIOENCODING = 'utf-8'
specify version
specify check
```

Do not run `specify init --force`: the repository contains customized Constitution, template, and workflow files. Repository-owned integration resources must be reconciled through the approved backlog after the gate opens.

## 3. Verify the complete SDD artifact set

```powershell
$sddRoot = '.\specs\006-engineering-quality-hardening'
$required = @(
  'spec.md',
  'research.md',
  'data-model.md',
  'plan.md',
  'tasks.md',
  'quickstart.md',
  'current-state-audit.md',
  'source-of-truth-reconciliation.md',
  'architecture-migration.md',
  'test-strategy.md',
  'security-strategy.md',
  'performance-strategy.md',
  'ci-gate-matrix.md',
  'definition-of-done.md',
  'traceability-matrix.md',
  'risk-register.md',
  'approval.md',
  'readiness-manifest.json',
  'checklists\requirements.md',
  'checklists\sdd-readiness.md',
  'checklists\implementation-readiness.md',
  'contracts\sdd-lifecycle-contract.md',
  'contracts\quality-policy.schema.json',
  'contracts\gate-run.schema.json',
  'contracts\evidence-provenance.schema.json',
  'contracts\waiver.schema.json',
  'contracts\release-certification.schema.json',
  'contracts\public-api-compatibility-contract.md',
  'contracts\architecture-ratchet-contract.md'
)

$missing = @($required | Where-Object { -not (Test-Path -LiteralPath (Join-Path $sddRoot $_)) })
if ($missing.Count -gt 0) {
  throw "Missing SDD artifacts: $($missing -join ', ')"
}
```

This confirms existence only. Section 10 verifies every readiness-manifest entry and aggregate hash against the stable candidate.

## 4. Reject placeholders and validate schemas plus controlled fixtures

```powershell
$placeholderPattern = '\[NEEDS CLARIFICATION[^\]]*\]|\[FEATURE\]|\[###-feature-name\]|\[DATE\]|ACTION REQUIRED|REMOVE IF UNUSED'
$placeholders = rg -n --glob '!quickstart.md' $placeholderPattern $sddRoot
if ($LASTEXITCODE -eq 0) { throw "Unresolved placeholders:`n$placeholders" }
if ($LASTEXITCODE -gt 1) { throw 'Placeholder scan failed' }

$schemaValidator = @'
import json
import pathlib
import sys

from jsonschema.validators import validator_for

root = pathlib.Path(sys.argv[1]).resolve()
contracts = root / "contracts"
schemas = {}

for path in sorted(contracts.glob("*.schema.json")):
    schema = json.loads(path.read_text(encoding="utf-8"))
    validator = validator_for(schema)
    validator.check_schema(schema)
    schemas[path.resolve()] = validator(schema)

examples = contracts / "examples"
manifest_path = examples / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
fixtures = manifest.get("fixtures", [])
if manifest.get("schemaVersion") != "1.0.0" or not fixtures:
    raise SystemExit(f"{manifest_path}: invalid or empty controlled-fixture manifest")

fixture_ids = [fixture.get("id") for fixture in fixtures]
if any(not fixture_id for fixture_id in fixture_ids) or len(fixture_ids) != len(set(fixture_ids)):
    raise SystemExit(f"{manifest_path}: fixture ids must be non-empty and unique")

listed_files = set()
coverage = {path.name: {True: 0, False: 0} for path in schemas}

def apply_mutation(instance, mutation):
    pointer = mutation.get("jsonPointer", "")
    if not pointer.startswith("/"):
        raise SystemExit(f"invalid mutation pointer: {pointer!r}")
    current = instance
    segments = [segment.replace("~1", "/").replace("~0", "~") for segment in pointer[1:].split("/")]
    for segment in segments[:-1]:
        current = current[int(segment)] if isinstance(current, list) else current[segment]
    leaf = segments[-1]
    if isinstance(current, list):
        current[int(leaf)] = mutation["value"]
    else:
        current[leaf] = mutation["value"]

for fixture in fixtures:
    required = {"id", "schema", "expectedValid"}
    missing = required.difference(fixture)
    if missing:
        raise SystemExit(f"{manifest_path}: fixture {fixture.get('id')} misses {sorted(missing)}")
    if type(fixture["expectedValid"]) is not bool:
        raise SystemExit(f"{fixture['id']}: expectedValid must be boolean")

    schema_path = (contracts / fixture["schema"]).resolve()
    if schema_path not in schemas:
        raise SystemExit(f"{fixture['id']}: unknown schema {schema_path}")
    schema_document = json.loads(schema_path.read_text(encoding="utf-8"))

    has_file = "file" in fixture
    has_embedded = "embeddedExample" in fixture
    if has_file == has_embedded:
        raise SystemExit(f"{fixture['id']}: declare exactly one of file or embeddedExample")
    if has_file:
        instance_path = (examples / fixture["file"]).resolve()
        if instance_path.parent != examples.resolve() or instance_path == manifest_path.resolve():
            raise SystemExit(f"{fixture['id']}: fixture path escapes the examples directory")
        listed_files.add(instance_path.name)
        instance = json.loads(instance_path.read_text(encoding="utf-8"))
    else:
        index = fixture["embeddedExample"]
        embedded = schema_document.get("examples", [])
        if type(index) is not int or index < 0 or index >= len(embedded):
            raise SystemExit(f"{fixture['id']}: unknown embedded example {index}")
        instance = json.loads(json.dumps(embedded[index]))

    if "mutation" in fixture:
        apply_mutation(instance, fixture["mutation"])

    errors = sorted(schemas[schema_path].iter_errors(instance), key=lambda error: list(error.path))
    expected_valid = fixture["expectedValid"]
    coverage[schema_path.name][expected_valid] += 1
    if expected_valid and errors:
        raise SystemExit(f"{fixture['id']}: positive fixture was rejected: {errors[0].message}")
    if not expected_valid:
        if not fixture.get("expectedFailureCode"):
            raise SystemExit(f"{fixture['id']}: negative fixture has no stable expectedFailureCode")
        if not errors:
            raise SystemExit(f"{fixture['id']}: negative fixture was accepted")

actual_files = {path.name for path in examples.glob("*.json") if path.name != "manifest.json"}
if listed_files != actual_files:
    raise SystemExit(
        f"controlled fixture file mismatch; unlisted={sorted(actual_files-listed_files)} "
        f"missing={sorted(listed_files-actual_files)}"
    )
for schema_name, counts in coverage.items():
    if counts[True] < 1 or counts[False] < 1:
        raise SystemExit(f"{schema_name}: requires at least one positive and one negative controlled fixture")

print(f"Validated {len(schemas)} schemas and {len(fixtures)} controlled fixtures")
'@

$schemaValidator | python - $sddRoot
if ($LASTEXITCODE -ne 0) { throw 'Schema or controlled-fixture validation failed' }
```

Controlled examples are registered in `contracts/examples/manifest.json`. Every schema must have at least one positive and one negative case; every negative case carries a stable `expectedFailureCode`, every example file must be registered, and derived mutation probes are validated against an embedded positive example.

## 5. Verify exact FR, SC, research, task, and traceability sets

```powershell
function Assert-ExactSet {
  param(
    [Parameter(Mandatory = $true)][string]$Label,
    [Parameter(Mandatory = $true)][string[]]$Actual,
    [Parameter(Mandatory = $true)][string[]]$Expected
  )

  $actualItems = @($Actual)
  $duplicates = @($actualItems | Group-Object | Where-Object { $_.Count -ne 1 } | ForEach-Object { $_.Name })
  $actualUnique = @($actualItems | Sort-Object -Unique)
  $delta = @(Compare-Object -ReferenceObject $Expected -DifferenceObject $actualUnique)
  if ($duplicates.Count -gt 0 -or $delta.Count -gt 0) {
    throw "$Label is not exact. Duplicates: $($duplicates -join ', '); delta: $($delta | Out-String)"
  }
}

$spec = Get-Content "$sddRoot\spec.md" -Raw
$research = Get-Content "$sddRoot\research.md" -Raw
$tasks = Get-Content "$sddRoot\tasks.md" -Raw
$trace = Get-Content "$sddRoot\traceability-matrix.md" -Raw

$expectedFr = @(1..48 | ForEach-Object { 'FR-{0:D3}' -f $_ })
$expectedSc = @(1..18 | ForEach-Object { 'SC-{0:D3}' -f $_ })
$expectedResearch = @(1..14 | ForEach-Object { 'R-{0:D3}' -f $_ })
$expectedTasks = @(101..176 | ForEach-Object { 'T{0:D3}' -f $_ })

$frDefinitions = @([regex]::Matches($spec, '(?m)^- \*\*(?<id>FR-\d{3})\*\*:') | ForEach-Object { $_.Groups['id'].Value })
$scDefinitions = @([regex]::Matches($spec, '(?m)^- \*\*(?<id>SC-\d{3})\*\*:') | ForEach-Object { $_.Groups['id'].Value })
$researchDefinitions = @([regex]::Matches($research, '(?m)^### (?<id>R-\d{3})\s+-') | ForEach-Object { $_.Groups['id'].Value })
$taskDefinitions = @([regex]::Matches($tasks, '(?m)^- \[(?<state>[ xX])\] (?<id>T\d{3})\b'))
$taskIds = @($taskDefinitions | ForEach-Object { $_.Groups['id'].Value })

Assert-ExactSet 'Functional requirement definitions' $frDefinitions $expectedFr
Assert-ExactSet 'Success criterion definitions' $scDefinitions $expectedSc
Assert-ExactSet 'Research decision definitions' $researchDefinitions $expectedResearch
Assert-ExactSet 'Implementation task definitions' $taskIds $expectedTasks

$checkedTasks = @($taskDefinitions | Where-Object { $_.Groups['state'].Value -ne ' ' } | ForEach-Object { $_.Groups['id'].Value })
if ($checkedTasks.Count -gt 0) { throw "Every future task must remain unchecked: $($checkedTasks -join ', ')" }

$traceFrRows = @([regex]::Matches($trace, '(?m)^\| (?<id>FR-\d{3}) \|') | ForEach-Object { $_.Groups['id'].Value })
$traceScRows = @([regex]::Matches($trace, '(?m)^\| (?<id>SC-\d{3}) \|') | ForEach-Object { $_.Groups['id'].Value })
Assert-ExactSet 'FR traceability rows' $traceFrRows $expectedFr
Assert-ExactSet 'SC traceability rows' $traceScRows $expectedSc

$traceResearchRefs = @([regex]::Matches($trace, '(?<![A-Z])R-\d{3}') | ForEach-Object { $_.Value } | Sort-Object -Unique)
$traceTaskRefs = @([regex]::Matches($trace, 'T\d{3}') | ForEach-Object { $_.Value } | Sort-Object -Unique)
$unknownResearchRefs = @($traceResearchRefs | Where-Object { $_ -notin $expectedResearch })
$unknownTaskRefs = @($traceTaskRefs | Where-Object { $_ -notin $expectedTasks })
if ($unknownResearchRefs.Count -gt 0 -or $unknownTaskRefs.Count -gt 0) {
  throw "Unknown traceability references. Research: $($unknownResearchRefs -join ', '); tasks: $($unknownTaskRefs -join ', ')"
}

$taskRefs = @([regex]::Matches($tasks, 'T\d{3}') | ForEach-Object { $_.Value } | Sort-Object -Unique)
$unknownTaskBacklogRefs = @($taskRefs | Where-Object { $_ -notin $expectedTasks })
if ($unknownTaskBacklogRefs.Count -gt 0) {
  throw "Unknown task reference in tasks.md: $($unknownTaskBacklogRefs -join ', ')"
}
```

The anchored definition and row patterns make duplicates fail; merely mentioning an ID elsewhere cannot satisfy the set.

## 6. Verify canonical change-profile and gate inventories

```powershell
$gateMatrix = Get-Content "$sddRoot\ci-gate-matrix.md" -Raw
$expectedProfiles = @(
  'sdd-only', 'governance', 'documentation-only', 'tokens', 'ui-component',
  'crm-component', 'storybook-docs', 'dependency-build', 'workflow-release', 'full'
) | Sort-Object
$expectedGates = @(
  'GATE-SDD-APPROVED', 'G-GOV', 'G-TYPE', 'G-LINT', 'G-UNIT', 'G-COV', 'G-ARCH',
  'G-TOKENS', 'G-STORY-BUILD', 'G-STORY-TEST', 'G-A11Y', 'G-E2E-PR', 'G-E2E-RELEASE',
  'G-VISUAL', 'G-SEC-RUNTIME', 'G-SEC-TOOLCHAIN', 'G-SEC-SAST', 'G-SEC-SECRETS',
  'G-PERF', 'G-PACK', 'G-CONSUMER', 'G-PROVENANCE', 'G-RELEASE'
) | Sort-Object

$gateSection = [regex]::Match($gateMatrix, '(?s)## Canonical Gate Inventory(?<body>.*?)## Stage Matrix').Groups['body'].Value
$profileSection = [regex]::Match($gateMatrix, '(?s)## Change Profiles(?<body>.*?)## Aggregation Contract').Groups['body'].Value
$actualGates = @([regex]::Matches($gateSection, '(?m)^\| `(?<id>G(?:ATE-SDD-APPROVED|-[A-Z0-9-]+))` \|') | ForEach-Object { $_.Groups['id'].Value })
$actualProfiles = @([regex]::Matches($profileSection, '(?m)^\| `(?<id>[a-z][a-z0-9-]+)` \|') | ForEach-Object { $_.Groups['id'].Value })

Assert-ExactSet 'Canonical gates' $actualGates $expectedGates
Assert-ExactSet 'Canonical change profiles' $actualProfiles $expectedProfiles
```

## 7. Verify workflow and registry are planning-only and synchronized

```powershell
$workflowPath = '.\.specify\workflows\speckit\workflow.yml'
$registryPath = '.\.specify\workflows\workflow-registry.json'
$workflow = Get-Content -LiteralPath $workflowPath -Raw
$registryRaw = Get-Content -LiteralPath $registryPath -Raw
$registry = $registryRaw | ConvertFrom-Json

if ($workflow -match '(?im)^\s*(?:-\s*)?id:\s*implement\s*$|^\s*command:\s*speckit[.]implement\s*$') {
  throw 'The planning workflow must not declare a product execution step or command'
}

$registrySummary = @(
  $registry.workflows.speckit.name,
  $registry.workflows.speckit.description
) -join ' '
if ($registrySummary -match '(?i)speckit[.]implement|(?:runs|steps?|phases?|cycle).*\bimplement\b') {
  throw 'The registry must not describe product execution as part of the planning cycle'
}

$expectedCommands = @(
  'speckit.specify', 'speckit.clarify', 'speckit.plan',
  'speckit.tasks', 'speckit.checklist', 'speckit.analyze'
)
$actualCommands = @([regex]::Matches($workflow, '(?m)^\s+command:\s*(?<id>speckit[.][a-z-]+)\s*$') | ForEach-Object { $_.Groups['id'].Value })
if (($actualCommands -join '|') -ne ($expectedCommands -join '|')) {
  throw "Unexpected planning command sequence: $($actualCommands -join ', ')"
}

$workflowVersionMatch = [regex]::Match($workflow, '(?m)^\s+version:\s*"(?<version>[^"]+)"\s*$')
if (-not $workflowVersionMatch.Success) { throw 'Workflow version is missing' }
$workflowVersion = $workflowVersionMatch.Groups['version'].Value
if ($workflowVersion -ne '2.0.0' -or $registry.workflows.speckit.version -ne $workflowVersion) {
  throw "Workflow/registry version mismatch: workflow=$workflowVersion registry=$($registry.workflows.speckit.version)"
}
if ($registry.workflows.speckit.name -ne 'Full SDD Planning Cycle') {
  throw 'Registry does not identify the v2 planning-only cycle'
}
```

This check is semantic: it rejects a product execution step/command or a registry that includes product execution in the cycle. Normative stop and approval wording remains valid because the v2 cycle ends at the review gate.

## 8. Verify local Markdown links

```powershell
$markdownFiles = @(
  Get-ChildItem -LiteralPath $sddRoot -Recurse -File -Filter '*.md'
  Get-Item -LiteralPath '.\README.md'
  Get-Item -LiteralPath '.\AGENTS.md'
)
$brokenLinks = New-Object System.Collections.Generic.List[string]
$linkPattern = '(?m)!?\[[^\]]*\]\((?<target><[^>]+>|[^)\s]+)(?:\s+["''][^"'']*["''])?\)'

foreach ($file in $markdownFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  foreach ($match in [regex]::Matches($content, $linkPattern)) {
    $target = $match.Groups['target'].Value.Trim('<', '>')
    if ($target -match '^(?:https?|mailto|tel):' -or $target.StartsWith('#')) { continue }
    $pathPart = [uri]::UnescapeDataString(($target -split '#', 2)[0])
    if ([string]::IsNullOrWhiteSpace($pathPart)) { continue }
    $candidate = Join-Path $file.DirectoryName $pathPart
    if (-not (Test-Path -LiteralPath $candidate)) {
      $brokenLinks.Add("$($file.FullName) -> $target")
    }
  }
}

if ($brokenLinks.Count -gt 0) {
  throw "Broken local Markdown links:`n$($brokenLinks -join "`n")"
}
```

## 9. Verify whitespace and the complete Git scope, including untracked files

```powershell
git diff --check
if ($LASTEXITCODE -ne 0) { throw 'git diff --check failed' }

$statusLines = @(git status --porcelain=v1 --untracked-files=all)
if ($LASTEXITCODE -ne 0) { throw 'git status failed' }
$allowedExact = @('AGENTS.md', 'README.md')
$allowedPrefixes = @('.specify/', 'specs/006-engineering-quality-hardening/')
$forbiddenPaths = New-Object System.Collections.Generic.List[string]

foreach ($line in $statusLines) {
  if ($line.Length -lt 4) { throw "Malformed porcelain status line: $line" }
  $statusPath = $line.Substring(3).Trim('"').Replace('\', '/')
  $candidatePaths = @($statusPath)
  if ($statusPath -match ' -> ') { $candidatePaths = @($statusPath -split ' -> ') }

  foreach ($candidatePath in $candidatePaths) {
    $allowed = $candidatePath -in $allowedExact
    if (-not $allowed) {
      $allowed = @($allowedPrefixes | Where-Object { $candidatePath.StartsWith($_, [System.StringComparison]::Ordinal) }).Count -gt 0
    }
    if (-not $allowed) { $forbiddenPaths.Add($candidatePath) }
  }
}

if ($forbiddenPaths.Count -gt 0) {
  throw "Forbidden path in SDD-only status (tracked or untracked):`n$($forbiddenPaths | Sort-Object -Unique | Out-String)"
}
```

`git status --porcelain --untracked-files=all` is authoritative for this scope check. A diff-only file list is insufficient because it omits untracked files.

## 10. Validate the deterministic readiness manifest

```powershell
$manifestValidator = @'
import datetime
import hashlib
import json
import pathlib
import re
import subprocess
import sys

repo = pathlib.Path.cwd().resolve()
sdd = (repo / sys.argv[1]).resolve()
manifest_path = sdd / "readiness-manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

if manifest.get("schemaVersion") != "1.0.0":
    raise SystemExit("readiness manifest schemaVersion must be 1.0.0")
if manifest.get("featureId") != "006-engineering-quality-hardening":
    raise SystemExit("readiness manifest featureId mismatch")
if manifest.get("lifecycle") != "READY_FOR_APPROVAL":
    raise SystemExit("readiness manifest must describe READY_FOR_APPROVAL")
if manifest.get("contentNormalization") != "utf8-lf":
    raise SystemExit("unsupported readiness artifact normalization")
if manifest.get("sourceTreeNormalization") != "utf8-text-lf;binary-raw":
    raise SystemExit("unsupported source-tree normalization")

for forbidden in ("approvedRevision", "approvedAt", "reviewer", "approvalStatement", "authorizationToken"):
    if forbidden in json.dumps(manifest, sort_keys=True):
        raise SystemExit(f"pre-decision readiness manifest contains approval-only field {forbidden}")

generated_at = manifest.get("generatedAt", "")
try:
    datetime.datetime.fromisoformat(generated_at.replace("Z", "+00:00"))
except ValueError as error:
    raise SystemExit(f"invalid readiness generatedAt: {error}")

fixed = {
    ".specify/feature.json",
    ".specify/memory/constitution.md",
    ".specify/templates/checklist-template.md",
    ".specify/templates/plan-template.md",
    ".specify/templates/spec-template.md",
    ".specify/templates/tasks-template.md",
    ".specify/workflows/speckit/workflow.yml",
    ".specify/workflows/workflow-registry.json",
    ".specify/integrations/codex.manifest.json",
    "AGENTS.md",
    "README.md",
}
codex_manifest = repo / ".specify" / "integrations" / "codex.manifest.json"
if codex_manifest.exists():
    fixed.update(json.loads(codex_manifest.read_text(encoding="utf-8")).get("files", {}).keys())
excluded = {
    "specs/006-engineering-quality-hardening/approval.md",
    "specs/006-engineering-quality-hardening/readiness-manifest.json",
}
required = fixed | {
    path.relative_to(repo).as_posix()
    for path in sdd.rglob("*")
    if path.is_file() and path.relative_to(repo).as_posix() not in excluded
}

path_pattern = re.compile(r"^(?!/)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|/)\.\.(?:/|$))(?!.*//)[A-Za-z0-9._@-]+(?:/[A-Za-z0-9._@-]+)*$")
entries = manifest.get("artifacts", [])
entry_paths = [entry.get("path") for entry in entries]
if len(entry_paths) != len(set(entry_paths)) or set(entry_paths) != required:
    raise SystemExit(
        f"readiness artifact set mismatch; missing={sorted(required-set(entry_paths))} "
        f"extra={sorted(set(entry_paths)-required)}"
    )

def normalized_artifact(path):
    text = path.read_text(encoding="utf-8")
    return text.replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")

artifact_rows = []
for entry in sorted(entries, key=lambda item: item["path"]):
    relative = entry["path"]
    if not path_pattern.fullmatch(relative):
        raise SystemExit(f"invalid readiness artifact path: {relative}")
    payload = normalized_artifact(repo / relative)
    digest = hashlib.sha256(payload).hexdigest()
    if entry.get("sha256") != digest or entry.get("sizeBytes") != len(payload):
        raise SystemExit(f"stale readiness artifact entry: {relative}")
    artifact_rows.append(f"{relative}\0{digest}\0{len(payload)}\n")

artifact_hash = hashlib.sha256("".join(artifact_rows).encode("utf-8")).hexdigest()
if manifest.get("artifactCount") != len(entries) or manifest.get("artifactManifestHash") != artifact_hash:
    raise SystemExit("readiness artifact aggregate hash/count mismatch")

git_files = subprocess.run(
    ["git", "ls-files", "-co", "--exclude-standard", "-z"],
    check=True,
    stdout=subprocess.PIPE,
).stdout.decode("utf-8").split("\0")
source_paths = sorted(path for path in git_files if path and path.replace("\\", "/") not in excluded and (repo / path).exists())
source_rows = []
for relative in source_paths:
    relative = relative.replace("\\", "/")
    raw = (repo / relative).read_bytes()
    try:
        payload = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")
    except UnicodeDecodeError:
        payload = raw
    digest = hashlib.sha256(payload).hexdigest()
    source_rows.append(f"{relative}\0{digest}\0{len(payload)}\n")

source_hash = hashlib.sha256("".join(source_rows).encode("utf-8")).hexdigest()
base_revision = subprocess.run(
    ["git", "rev-parse", "HEAD"], check=True, text=True, stdout=subprocess.PIPE
).stdout.strip()
if manifest.get("candidateBaseRevision") != base_revision:
    raise SystemExit("readiness candidate base revision mismatch")
if manifest.get("sourceTreeFileCount") != len(source_paths) or manifest.get("sourceTreeHash") != source_hash:
    raise SystemExit("readiness source-tree hash/count mismatch")

print(
    f"Validated readiness manifest: {len(entries)} artifacts, "
    f"{len(source_paths)} source-tree files, base {base_revision}"
)
'@

$manifestValidator | python - 'specs/006-engineering-quality-hardening'
if ($LASTEXITCODE -ne 0) { throw 'Readiness-manifest validation failed' }
```

The decision envelope `approval.md` and `readiness-manifest.json` itself are intentionally excluded from the signed content set. All other active SDD files plus the governing Constitution, templates, workflow, registry, root instructions, and README are included. The source-tree hash covers every tracked or authorized untracked non-ignored file, using normalized UTF-8 text and raw bytes for binary files.

## 11. Final validation and status boundary

After all sections pass and the manifest matches, the valid pre-decision status is:

```text
SDD LIFECYCLE: READY_FOR_APPROVAL
SDD REVIEW: READY_FOR_USER_APPROVAL
IMPLEMENTATION AUTHORIZATION: AWAITING_USER_APPROVAL
PRODUCT IMPLEMENTATION: BLOCKED
```

This status records that the planning package is complete, internally consistent, and fingerprinted. It is the stop boundary at which the user can approve or reject the SDD.

Only a later explicit user decision bound to that exact revision, manifest, and task range may record lifecycle state `APPROVED` together with authorization token `APPROVED_FOR_IMPLEMENTATION`. Any material edit after hashing returns the package to `REVIEW / CHANGES_IN_PROGRESS / BLOCKED`.

## Future gate entry points

These commands are planned contracts, not current proof and not commands to run during this SDD-only phase:

```text
pnpm quality:pr
pnpm quality:nightly
pnpm quality:release
```

Their future delivery must follow `ci-gate-matrix.md`, emit the contract schemas, propagate every required failure, and remain read-only in check mode.
