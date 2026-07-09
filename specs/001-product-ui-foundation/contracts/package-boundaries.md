# Contract: Package Boundaries

## Dependency Direction

```text
@taliya/tokens -> @taliya/ui -> @taliya/crm -> apps/docs
```

Allowed:

- `@taliya/ui` imports `@taliya/tokens`.
- `@taliya/crm` imports `@taliya/tokens` and `@taliya/ui`.
- `apps/docs` imports all packages.

Forbidden:

- `@taliya/tokens` imports any internal package.
- `@taliya/ui` imports `@taliya/crm`.
- Any package imports from `apps/docs`.
- Any package imports from the landing project.
- Any package imports from future SaaS app code.

## Public API Rules

- Consumers import from Taliya package entrypoints.
- Consumers do not import underlying headless primitives.
- Components expose named props and typed event callbacks.
- Internal implementation dependencies remain private.
- Public compatibility aliases and CRM-vs-primitive specializations must be documented in `contracts/public-api-surface.manifest.json`.
- New consumer-facing pages should use canonical standard page-kit components and documented specializations instead of historical aliases.
- Distributed package metadata for `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` must remain publishable; these package manifests must not set `private: true`.
- Distributed package metadata must preserve CSS side effects, such as `sideEffects: ["**/*.css"]`, so consumer bundlers do not tree-shake official token/UI/CRM styles when importing the package CSS entrypoints.
- `@taliya/ui` and `@taliya/crm` must keep `react` and `react-dom` in `peerDependencies`, not regular `dependencies`, so consumers do not install duplicate React runtimes through the UI library.
- Source package manifests may use `workspace:*` for local Taliya package links inside this monorepo, but packed tarball metadata must never expose `workspace:*` to consumers. Packed `@taliya/ui` must depend on the concrete `@taliya/tokens` package version, and packed `@taliya/crm` must depend on the concrete `@taliya/tokens` and `@taliya/ui` versions.
- Package `files` metadata must stay narrow: publish `dist` plus the official CSS entrypoint only (`src/tokens.css` for tokens, `src/styles.css` for UI/CRM). Tarballs must not include stories, tests, app docs, specs, references, temporary visual evidence, broad source folders, or consumer-only files.
- Consumer apps follow `consumer-integration-contract.md` for package installation, CSS order, page kit usage, local CSS limits, and verification gates.

## Package Ownership

| Package | Owns | Does Not Own |
| --- | --- | --- |
| `@taliya/tokens` | CSS variables, token exports, status semantics | components, domain labels |
| `@taliya/ui` | `Primitives / UI`, primitive stories, primitives, overlays, domain-neutral controls, domain-neutral states | CRM navigation, shell composition, agent modes, billing meanings, CRM labels |
| `@taliya/crm` | `CRM / Shell / Components`, product patterns, CRM compositions, shell/navigation assemblies, domain state presentation | backend, data fetching, real auth/billing/agent logic, redefining primitive visual states |
| `apps/docs` | visual examples and guidelines | source package APIs |

## Primitive Ownership

`Primitives / UI` in Storybook maps to `@taliya/ui`. If a primitive is first extracted while cloning a CRM shell image, its final ownership is still `@taliya/ui` unless it contains CRM-specific domain meaning.

Temporary `Crm*` bridge components are allowed only while extraction is in progress. Before the implemented library is considered complete, each bridge must either move to `@taliya/ui` or become a thin `@taliya/crm` wrapper around a canonical `@taliya/ui` primitive.

`CRM / Shell / Components` must consume primitives rather than duplicate their visuals. Examples include shell sidebar buttons using `IconButton`, topbar navigation using `NavPill`, profile controls using `Avatar`, and empty shell surfaces using shared `Panel`/`Surface` tokens.

No shell-only primitive variants are allowed. The shell must use the same primitive contracts available to every future Taliya SaaS surface. CRM CSS can handle composition, layout, alignment, and spacing, but cannot redefine primitive-owned hover, focus, active, selected, alert, disabled, border, shadow, color, or size rules.

## Acceptance

- No circular dependency exists.
- All package exports are documented.
- Forbidden imports are caught by `corepack pnpm package-boundaries:audit` before release.
- Canonical/alias/specialization ambiguity is caught by `corepack pnpm public-api-surface:audit` before release.
- `Primitives / UI` contains reusable primitives only.
- `CRM / Shell / Components` contains composed shell pieces only.

Run the executable package boundary gate from the repository root:

```text
corepack pnpm package-boundaries:audit
```

The gate writes:

```text
specs/001-product-ui-foundation/package-boundaries-audit.md
specs/001-product-ui-foundation/package-boundaries-audit.json
```
