# Architecture Migration Strategy

**Status**: planned; execution blocked by `GATE-SDD-APPROVED`
**Migration kind**: compatibility-first, behavior-preserving modularization
**Primary requirements**: FR-011 through FR-021, FR-036, FR-045, FR-046

## Objective

Reduce ownership, coupling, review, and delivery risk in `@taliya/ui` and `@taliya/crm` without changing public imports, public declarations, behavior, accessibility, styles, or approved visual output. The migration improves internal structure; it is not permission to redesign components or remove exports.

## Non-Negotiable Boundaries

```text
@taliya/tokens
      |
      v
 @taliya/ui
      |
      v
 @taliya/crm
      |
      v
   apps/docs
```

- Reverse package imports are forbidden.
- No package imports from `apps/docs` or `agentes-landing-system`.
- Headless dependencies remain wrapped; consumers import only public Taliya APIs.
- `@taliya/ui` owns reusable primitives and cross-domain presentation behavior.
- `@taliya/crm` owns prop-driven CRM compositions and page families.
- CRM code does not enforce backend, persistence, authentication, authorization, billing, tenant, or agent decisions.
- Story files may compose and exercise official components but cannot own reusable anatomy.

## Measured Starting Point

| File | Lines | Bytes | Architectural meaning |
| --- | ---: | ---: | --- |
| `packages/ui/src/index.tsx` | 5,236 | 169,456 | Root facade and most primitive implementation are conflated |
| `packages/ui/src/styles.css` | 6,013 | 166,836 | Primitive style ownership and package delivery are monolithic |
| `packages/crm/src/index.tsx` | 23,869 | 995,186 | Root facade, shared layout, and many domains are conflated |
| `packages/crm/src/styles.css` | 34,889 | 1,214,942 | Cross-family cascade and delivery surface are monolithic |

The current `crm-module-boundaries` audit correctly reports a pass for the boundaries it checks and explicitly states that the main implementation and stylesheet remain large. A green structural subset is not completion of modularization.

## Target Internal Shape

The exact filenames may be refined during implementation, but ownership must converge on this shape:

```text
packages/ui/src/
  components/<family>/<Component>.tsx
  hooks/<hook>.ts
  utilities/<utility>.ts
  styles/foundations.css
  styles/<family>.css
  public-api.ts
  index.tsx

packages/crm/src/
  shell/
  layouts/
  shared/
  domains/<domain>/components/
  domains/<domain>/page-kits/
  styles/shared.css
  styles/<domain>.css
  component-registry.ts
  standard-page-kit.ts
  public-api.ts
  index.tsx
```

Root entry points remain thin compatibility facades. Internal files are not exported through package wildcard patterns unless an approved subpath contract explicitly exposes them.

## Final Budgets for Handwritten Code

These budgets apply to new handwritten code immediately and become the final state for migrated handwritten production code:

| Dimension | Budget | Enforcement |
| --- | ---: | --- |
| Handwritten module logical lines | 400 maximum; smaller cohesive modules preferred | `G-ARCH` |
| Function cyclomatic complexity | 15 maximum | `G-LINT`/`G-ARCH` |
| Nesting depth | 4 maximum | `G-LINT` |
| Explicit `any` | 0 new occurrences | `G-TYPE`/`G-LINT` |
| Unowned suppressions | 0 | `G-LINT`/`G-GOV` |
| Import cycles | 0 | `G-ARCH` |
| Reverse package imports | 0 | `G-ARCH` |
| Unclassified public exports | 0 | `G-ARCH`/`G-PACK` |

Generated catalogs and machine-produced inventories are classified separately by a versioned generator marker and reproducibility check. A large file is not exempt merely because it contains repetitive data.

## Fingerprinted Ratchet

Historical violations are recorded by stable rule ID, package, normalized path, symbol, and content fingerprint. The ratchet enforces:

1. no new finding;
2. no increase in severity, size, or complexity for an existing finding;
3. a touched finding must improve or be removed according to its migration slice;
4. a removed finding disappears from the baseline and cannot return;
5. path moves preserve identity and cannot launder debt;
6. aggregate counts alone never authorize a baseline update.

Baseline update is an explicit, reviewed action. Check mode is read-only. An active waiver changes the machine-readable status to `risk-accepted` and never to `100% conformant`; a human report may render that value as "accepted risk" without changing the stored status.

## Migration Sequence

### P4 - Public API inventory, AST enforcement, and freeze

**Entry dependency**: P3/T136 is green on the same revision.

- Generate runtime and declaration inventories for every root and existing subpath export.
- Classify each symbol as canonical, compatibility alias, deprecated, or internal debt.
- Add clean-consumer compile/runtime fixtures for existing import paths.
- Freeze the inventory before moving implementation.
- Replace name/snippet heuristics with AST-based package-direction, cycle, ownership, size, complexity, and public-contract checks.
- Establish fingerprinted no-growth ratchets before touching UI or CRM internals.
- Defer removals to a separately approved major-version migration with replacement guidance.

**Exit**: zero unclassified export; public API snapshot and consumer fixture pass on the same revision.

### P5 - `@taliya/ui` and UI CSS modularization

**Entry dependency**: P4/T144 froze the complete public contract. T146, T147, and T148 are serialized because each extracts from `packages/ui/src/index.tsx`; T149 starts only after all three pass.

- Extract utilities and hooks with characterization tests first.
- Move primitives by family behind unchanged root re-exports.
- Split styles by primitive family while preserving the existing root CSS import.
- Assign every UI selector to a foundation or primitive-family owner and verify cascade/order equivalence.
- Introduce optional UI CSS subpaths only after package exports, root-compatibility aggregation, and clean-consumer ordering tests pass.
- Add isolated stories and browser contracts for every touched primitive.
- Verify declarations, callbacks, keyboard/focus behavior, and visual captures after each slice.

**Exit**: handwritten UI modules meet budgets; every UI selector is owned; root imports and CSS remain compatible; optional UI subpaths are measured and consumer-tested; all UI gates pass.

### P6 - `@taliya/crm` and CRM CSS modularization

**Entry dependency**: P5/T151 is green. T153 through T157 are serialized because each extracts from `packages/crm/src/index.tsx`; T158 starts only after T157 passes.

- Extract shared shell/layout infrastructure before leaf domains only when dependency direction is explicit.
- Move one domain family at a time, keeping registry keys and root re-exports stable.
- Replace accidental cross-domain internals with public UI primitives or narrowly owned CRM shared abstractions.
- Keep page kits prop/callback driven and preserve source-image contracts.
- Move CRM styles with their owning shared/domain family while preserving root CSS order and visual output.
- Introduce optional CRM CSS subpaths only after public exports, dependency ordering, and packed-consumer tests pass.
- Run affected unit, browser, responsive, accessibility, and visual gates for every family slice.

**Exit**: handwritten CRM modules meet budgets; every CRM selector is owned; no public/import/registry/behavior/visual regression; no domain cycle; root/subpath CSS and packed consumers remain compatible.

## Safe Slice Protocol

Every module move follows the same sequence:

1. select one owner/symbol family from the frozen inventory;
2. capture characterization, declaration, and public-import evidence;
3. record affected canonical stories and source images;
4. move internals without changing the public facade;
5. run direct tests and negative probes;
6. build static Storybook and compare affected captures;
7. pack and test a clean synthetic consumer when exports/styles change;
8. accept the slice only if all applicable gates pass on the same revision.

Structural and behavioral changes are not mixed in one slice. If characterization reveals an existing defect, the structural move stops; the defect receives a separate behavior-change specification and test.

## SOLID and Clean-Code Interpretation

- **Single responsibility**: one domain/family owner per module and one reason to change.
- **Open/closed**: variants extend typed component contracts rather than fork full markup/styles.
- **Liskov substitution**: wrappers preserve the semantic, accessibility, ref, and event contract of the abstraction they expose.
- **Interface segregation**: props express only the component's presentation/state/callback needs; broad context or backend-shaped objects are rejected.
- **Dependency inversion**: CRM compositions depend on public UI abstractions and callbacks, not implementation files or services.
- **Clean code**: names expose intent, mutations are localized, render remains pure, effects synchronize only external systems, and extracted abstractions must have more than speculative value.

SOLID is enforced through these observable contracts; it is not accepted as an unmeasurable style claim.

## Stop Conditions

Migration stops immediately if:

- a public import, declaration, registry key, CSS entry, runtime fixture, keyboard behavior, or approved capture changes unexpectedly;
- a reverse dependency, cycle, new baseline finding, explicit `any`, or unowned suppression appears;
- stale `dist` or generated evidence participates in a decision;
- the canonical source image or component contract is unavailable;
- a structural slice requires a product behavior decision not present in the SDD;
- any required gate is skipped, stale, non-blocking, or executed on another revision.

No phase in this document may begin before `GATE-SDD-APPROVED` opens and the user explicitly authorizes implementation.
