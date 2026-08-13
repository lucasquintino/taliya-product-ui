# Public API Compatibility Contract

**Contract ID**: PUBLIC-API-001
**Packages**: @taliya/tokens, @taliya/ui, @taliya/crm
**Implementation status**: ENFORCED; public API inventory and compatibility gates passed in release certification `31725704038`

## Purpose

Permit internal modularization without silently breaking consumers. Existing exports are treated as contracts until they are inventoried and deliberately classified.

## Inventory Record

Every public runtime and type symbol must record:

| Field | Rule |
|---|---|
| symbolId | Stable package plus export path plus exported name |
| package | Owning Taliya package |
| exportPath | Root or explicitly supported subpath |
| exportName | Exact consumer-visible name |
| runtimeKind | value, type, style, or side-effect |
| declarationFingerprint | SHA-256 of normalized public declaration/export |
| runtimeFingerprint | SHA-256 of normalized runtime export inventory when applicable |
| classification | canonical, compatibility-alias, deprecated, or internal-debt |
| owner | Package/domain owner |
| replacement | Required for deprecated or compatibility aliases when one exists |
| deprecationVersion | Required for deprecated symbols |
| plannedRemovalVersion | Explicit major version if removal is planned |
| evidence | Type fixture, runtime fixture, or packed-consumer assertion |

Line numbers and physical workspace paths are not identity fields.

## Compatibility Invariants

1. Root imports that work before a structural-only change continue to typecheck and load afterward.
2. Public declaration signatures remain assignable for supported usage; a textually different but compatible declaration is not automatically a break.
3. Runtime export names, style entry points, and required side effects remain available.
4. Internal files may move only behind stable public barrels and package export maps.
5. Headless-library implementation details are not exposed as a required consumer dependency.
6. New public subpaths require an explicit contract, export-map entry, test fixture, owner, and semver decision.
7. An accidental historical export is classified as internal-debt but remains compatible until a separately approved major migration.
8. Deprecation includes a public replacement and migration guidance; deprecation is not permission for immediate removal.
9. A compatibility alias resolves to the same supported behavior and cannot diverge silently.
10. Type-only and runtime exports are inventoried separately so declaration success cannot hide a missing runtime value.

## Allowed Change Classes

| Change | Default semver decision | Required evidence |
|---|---|---|
| Internal module move behind unchanged public export | patch | Declaration inventory, runtime fixture, behavior and visual equivalence |
| Additive optional prop or export | minor | Public contract review, type/runtime fixture, story/test coverage |
| Deprecation with retained behavior | minor | Replacement, migration note, alias equivalence |
| Signature narrowing, export removal, required prop, style-entry removal | major | Explicit migration Spec Kit and consumer impact approval |
| Undocumented behavior or accessibility break | breaking regardless of type compatibility | Behavior, browser, accessibility, and visual evidence |

Version selection does not authorize publishing.

## Gate Algorithm

The future compatibility gate must:

1. build a clean baseline public inventory from the approved comparison revision;
2. build a candidate inventory from current source, never from stale sibling output;
3. normalize declarations and exports without timestamps or physical paths;
4. join baseline and candidate records by symbolId;
5. fail missing or incompatibly changed symbols unless an approved major migration covers them;
6. flag new symbols lacking classification, owner, contract, and tests;
7. pack the candidate packages and install them in a clean synthetic consumer;
8. typecheck public import fixtures and execute runtime import/style assertions;
9. emit added, compatible, deprecated, breaking, and unresolved sets with fingerprints;
10. preserve non-zero status through every aggregate wrapper.

## Required Consumer Fixtures

- root imports for tokens, UI, and CRM;
- supported CSS/style entry points;
- representative type-only imports;
- overlay and form composition;
- table and responsive composition;
- compatibility alias imports;
- tree-shaking or side-effect verification for approved scenarios.

Fixtures consume packed tarballs. Workspace aliases, private internal paths, and direct source imports are prohibited.

## Controlled Negative Probes

The gate must fail when:

- a root export is removed;
- a runtime value becomes type-only;
- a style entry point disappears;
- a public prop becomes required or narrower;
- a new export lacks classification;
- a consumer fixture imports an internal path;
- a stale dist inventory differs from source and is incorrectly selected;
- the tested tarball hash differs from the candidate artifact hash.

## Evidence

The compatibility report records baseline revision, candidate revision, source-tree fingerprints, policy version, inventory hashes, package tarball hashes, fixture version, tool versions, decision, and stable failure codes.

## Final Acceptance

Internal modularization is acceptable only when every existing supported import and behavior remains compatible, or when a separately approved major migration explicitly owns the break. Until the Spec Kit 006 SDD is approved, this contract authorizes no source movement or API change.
