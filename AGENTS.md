# AGENTS.md instructions for C:\Users\lucas\taliya-product-ui

<INSTRUCTIONS>
<!-- SPECKIT START -->
Current feature plan: `specs/001-product-ui-foundation/plan.md`.

This project is the standalone Taliya Product UI library for the future SaaS/CRM. It is not the landing project and must not import from or depend on `agentes-landing-system`.

During the current phase, complete and review the Spec Kit only. Do not install dependencies, scaffold Storybook, create component source files, or implement UI until the user explicitly approves implementation.

Before specification changes or future implementation, read:
- `specs/001-product-ui-foundation/spec.md`
- `specs/001-product-ui-foundation/plan.md`
- `specs/001-product-ui-foundation/tasks.md`
- `specs/001-product-ui-foundation/component-matrix.md`
- `specs/001-product-ui-foundation/component-source-map.md`
- `specs/001-product-ui-foundation/primitive-ui-matrix.md`
- `specs/001-product-ui-foundation/image-coverage-map.md`
- `specs/001-product-ui-foundation/spec-completeness-review.md`
- `specs/001-product-ui-foundation/token-values-v0.md`
- `specs/001-product-ui-foundation/token-system-v1.md`
- `specs/001-product-ui-foundation/implementation-execution-plan.md`
- `specs/001-product-ui-foundation/contracts/component-api-contract.md`
- `specs/001-product-ui-foundation/contracts/package-boundaries.md`
- `specs/001-product-ui-foundation/contracts/consumer-integration-contract.md`
- `specs/001-product-ui-foundation/contracts/token-contract.md`
- `specs/001-product-ui-foundation/contracts/storybook-contract.md`
- `specs/001-product-ui-foundation/contracts/source-assets-contract.md`
- `specs/001-product-ui-foundation/contracts/visual-parity-contract.md`
- `specs/001-product-ui-foundation/contracts/navigation-contract.md`
- `specs/001-product-ui-foundation/contracts/drawer-lifecycle-contract.md`
- `specs/001-product-ui-foundation/contracts/state-taxonomy-contract.md`
- `specs/001-product-ui-foundation/contracts/icon-font-contract.md`

Product UI scope:
- Build reusable UI for the future Taliya SaaS/CRM only.
- Do not build marketing sections, landing heroes, public pricing blocks, SEO components, or the landing widget.
- Do not implement backend, database, API calls, authentication, billing logic, or real agent behavior.
- Components receive prepared data and callbacks through props.
- Storybook/docs are the visual contract for variants, states, density, accessibility, and usage rules.

Architecture rules:
- `packages/tokens` has no dependency on other project packages.
- `packages/ui` may depend on `packages/tokens`.
- `packages/crm` may depend on `packages/tokens` and `packages/ui`.
- `apps/docs` may import all packages; no package may import from `apps/docs`.
- Radix or other headless libraries must be wrapped; consumers should import only Taliya components.
- The public API must not expose implementation dependencies.

Design rules:
- Web-first, light theme first.
- Follow the approved Taliya CRM visual direction from the source audit.
- Approved generated CRM images are canonical 1:1 component clone sources, not inspiration or loose visual references. Future components must reproduce the visible content/anatomy of the approved images identically at component level.
- Source images live in `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508`; future component work must inspect the actual files, not filenames alone.
- `component-source-map.md` is mandatory before implementation; every component must have a primary source, secondary sources, extraction target, variants/states, and decision notes.
- `primitive-ui-matrix.md` is mandatory before expanding `Primitives / UI`; reusable primitives belong to `@taliya/ui`, while `@taliya/crm` owns composed product patterns.
- `token-system-v1.md` is the implementation target for tokens; `token-values-v0.md` is historical extraction input.
- `token-governance-audit.md` and `token-governance-baseline.json` are mandatory token-governance artifacts. Run `corepack pnpm tokens:audit` before accepting any component/token work, and run `corepack pnpm tokens:audit:update` only after intentionally reducing or reclassifying token debt.
- `implementation-execution-plan.md` is the official implementation order after approval; follow its batches and stop conditions.
- Final navigation docs beat older image labels when there is conflict.
- Setup has 9 official blocks: Studio, Equipe, Canais, Planos, Pagamento, Alunos, Turmas, Agenda, Revisao.
- `AgentPanel` must be contextual; do not hardcode all assistant panels as "Agente de Configuracao".
- Separate Financeiro do studio, Billing Taliya, Uso/Cotas, CRM do studio, and internal backoffice.

Mandatory implementation/review protocol:
- Before implementing or reviewing any component batch, use the local `taliya-product-ui-batch` skill and its quality gate.
- Before any visual/component edit, compare the approved source image/crop with the current Storybook render and write a regional diagnostic: exact mismatches, affected anatomy, owner package, reusable-token decision, and smallest probe hypotheses.
- Do not patch from intuition. Use measured probes for visual deltas first when possible, then promote only the winning minimal change into tokens/components.
- Final 1:1 approval requires static Storybook build/capture evidence. Dev Storybook preview is useful for iteration but is not certification.
- Accepted and rejected visual probes must be reflected in the relevant ledger/component notes when they affect parity decisions.
- Never mark a component or batch as complete from tests, build, lint, Storybook smoke, or architecture alone.
- Every touched component must have a component contract before code is accepted: source image file, exact extraction target, anatomy, variants, states, behavior, Storybook path, and visual measurements.
- Every new primitive/helper/slot component must have its own isolated Storybook story. Being used inside a parent story is not enough.
- Every final review must include a component-level pass/fail matrix with: Contract, Story isolated, Reusable architecture, Variants/states, Real behavior, Screenshot compared, 1:1 visual, Status.
- If any row fails a critical column, the component is not approved and the batch is not complete. Do not call it done, ready, complete, finished, 100%, or similar.
- Story-only CSS cannot define reusable component anatomy. Reusable visuals belong in `@taliya/ui` primitives or `@taliya/crm` composed wrappers.
- Components and tokens must both be official. Any standard surface/text/border/status/shadow/spacing value must resolve through `@taliya/tokens`; CRM-specific tokens are allowed only as aliases to foundation tokens or as documented domain-specific exceptions.
- No new component may introduce literal color, surface, border, radius, spacing, density, type, shadow, focus, motion, connector, or chart values without adding/promoting the token first and passing `corepack pnpm tokens:audit`.
<!-- SPECKIT END -->
</INSTRUCTIONS>
