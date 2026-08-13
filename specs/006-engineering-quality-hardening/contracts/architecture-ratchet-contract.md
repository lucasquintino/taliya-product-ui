# Architecture Ratchet Contract

**Contract ID**: ARCH-RATCHET-001
**Scope**: Handwritten source, generated artifacts, package boundaries, dependency edges, module budgets, and historical findings
**Implementation status**: ENFORCED; architecture/code-standard ratchets passed in release certification `31725704038`

## Objective

Allow progressive modularization while preventing new debt, debt growth, reintroduced findings, and debt laundering through renames or aggregate counts.

## Immutable Package Direction

The allowed package dependency direction is:

tokens -> ui -> crm -> docs

Normative rules:

- tokens depends on no other project package;
- ui may depend on tokens;
- crm may depend on tokens and ui;
- docs may consume all packages;
- no package imports from docs;
- consumers use public Taliya exports;
- Radix or another headless implementation is wrapped and not exposed as the consumer contract;
- crm owns composed domain patterns, while ui owns reusable primitives.

## Finding Identity

A finding fingerprint is SHA-256 over a canonical tuple:

1. rule ID;
2. normalized repository-relative path or identity-preserving move ID;
3. owning package and domain;
4. stable symbol selector when available;
5. normalized semantic violation signature;
6. source classification: handwritten, generated, or third-party.

The fingerprint excludes line numbers, timestamps, absolute workspace paths, operating-system separators, newline style, report ordering, and volatile tool text.

## Finding States

| Prior state | Current scan | Decision |
|---|---|---|
| active | same fingerprint present | Existing debt; allowed only within its unchanged bound |
| active | absent | Mark removed and shrink baseline |
| removed | same semantic finding present | Regression; fail |
| absent | new fingerprint present | New debt; fail |
| active | moved with explicit move map and unchanged signature | Preserve identity; no baseline growth |
| active | renamed or changed merely to evade match | Debt laundering; fail |

Baseline update is an explicit review action, never part of check mode.

## Budget Classes

Budgets are versioned in the quality policy and distinguish:

- handwritten production modules;
- generated catalogs or machine-generated declarations;
- test and story files;
- stylesheets;
- public barrels;
- configuration and scripts.

Each applicable class may define:

- maximum physical and logical lines;
- maximum cyclomatic/cognitive complexity;
- maximum exported symbol count;
- maximum dependency fan-in/fan-out;
- maximum component/Hook responsibility count;
- forbidden import edges;
- cycle count;
- explicit-any and suppression count;
- CSS selector, specificity, and literal-token debt.

Generated status must be provable from a declared generator and source input. Labeling a handwritten file as generated is invalid.

## Touched-Scope Rule

A change touching a file or symbol with historical debt must:

1. introduce no new finding;
2. increase no existing metric;
3. preserve no removed finding;
4. avoid broadening the affected scope;
5. reduce the debt when the approved task phase says reduction is required.

Structural-only moves preserve behavior, public API, accessibility, styles, and canonical visual output. A behavior change requires a separate approved requirement and evidence path.

## Final-Zero Rule

Ratchets allow an ordered migration but do not define final certification. Final project certification requires:

- zero unresolved handwritten-code architecture baseline finding;
- zero package-boundary violation;
- zero import cycle;
- zero unowned suppression or new explicit any;
- no active or expired waiver;
- no contradictory or stale architecture report.

Generated-file exceptions remain classified and reproducible; they cannot contain handwritten product logic.

## Gate Behavior

The future architecture gate must:

1. derive the effective policy and touched scope;
2. scan current source semantics, not ignored stale build output;
3. normalize paths and newline style across supported operating systems;
4. calculate individual fingerprints and current metrics;
5. compare against active and removed baseline records;
6. detect new, grown, moved, removed, reintroduced, and unknown findings;
7. verify package edges and cycles from source imports and package manifests;
8. verify public abstraction use and package ownership;
9. leave tracked files unchanged in check mode;
10. fail non-zero for every blocking result and emit normalized evidence.

## Controlled Negative Probes

The gate must fail when:

- crm is imported by ui or tokens;
- docs is imported by any package;
- an internal file is imported through a private path;
- an import cycle is introduced;
- a handwritten file exceeds an applicable budget;
- an explicit any or suppression is added without ownership;
- a finding is renamed or moved without an identity-preserving move record;
- a removed finding is reintroduced;
- an aggregate count remains equal while one old finding disappears and one new finding appears;
- check mode modifies a baseline or report.

## Baseline Review Record

An intentional update records:

- prior and new policy versions;
- old and new baseline hashes;
- added, removed, moved, and reclassified fingerprints;
- approving reviewer and rationale;
- related task and risk;
- proof that no new debt was accepted accidentally.

Increasing or reclassifying debt requires a separately approved design decision and cannot yield 100% conformant status.

## Stop Rule

This contract specifies future enforcement. It does not authorize modifying source files, architecture baselines, package exports, or generated artifacts before explicit approval of the complete Spec Kit 006 SDD.
