# Visual Backlog Definition

Date: 2026-07-01

Active scoped decision: `specs/001-product-ui-foundation/certification-scope-decision.json`

## Definition

The visual backlog is the source-backed certification queue for Taliya Product UI screens and image-derived components.

It is not a generic bug list and it is not a design wish list. A row belongs to the visual backlog only when it blocks or qualifies the claim that `taliya-product-ui` is an official reusable UI library for Taliya CRM/Internal.

The backlog answers one question:

> Which approved source images or image-derived component compositions still need product acceptance or 1:1 visual certification before the library can be considered globally complete?

## Relationship To The Real Goal

The real goal is:

> Transform `taliya-product-ui` into an official, reusable, installable library with `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm`, capable of powering CRM image stories, current `taliya-internal`, and the future Taliya CRM without reimplementing shell, filters, table, drawer, kanban, cards, or visual patterns locally.

The visual backlog was one of two remaining global-completion tracks:

1. Visual certification/product acceptance for approved images.
2. Adoption gates against the real future CRM consumer when that app exists or is connected.

Current product decision scopes item 1 out of the current library-readiness completion bar. Remaining source-image parity work still stays tracked here, but it is no longer a blocker for current Internal/library readiness as long as the backlog rows have no active P0/P1 component, overflow, clipping, missing-content, local-clone, or behavior blocker.

The future CRM real-adoption track remains separate and is not satisfied by this visual-scope decision.

## Authoritative Inputs

The visual backlog is generated from these sources:

- `specs/001-product-ui-foundation/batch-9-status-ledger.md`
- `specs/001-product-ui-foundation/batch-11-status-ledger.md`
- `specs/001-product-ui-foundation/visual-certification-backlog-audit.md`
- `specs/001-product-ui-foundation/visual-certification-plan-audit.md`
- approved source images under `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508`
- static Storybook captures under `tmp/visual-audit`

The ledgers are the source of truth for row status. The generated audits are the source of truth for current counts and queue readiness.

## Backlog Row Types

### Product Review Decision

Use this type when a screen is semi-approved as a composition baseline.

Criteria:

- It renders with official reusable components.
- Shell/content/text are present.
- There is no smoke or overflow blocker.
- It is not certified 1:1.
- The next action is a product decision: accept the composition as good enough for the product scope, or reject it and return it to technical certification.

### Technical Certification Cycle

Use this type when a screen or component needs source-backed visual review.

Criteria:

- Source image exists.
- Storybook story exists.
- Current evidence exists or can be captured.
- Known blockers and next action are documented.
- Any fix must happen through official tokens/components/stories, not local visual clones.

## Status Meanings

### Aprovado

The row has passed the required visual/product standard for the current scope.

For 1:1 certification, approval requires:

- approved source opened and cited;
- static Storybook capture;
- regional comparison recorded;
- no P0/P1 clipping, overflow, missing content, wrong anatomy, or local visual clone;
- component-level pass matrix where critical columns pass.

### Semi-aprovada

The row is acceptable as a product composition baseline but is not 1:1 certified.

This status is allowed only when the row is explicitly treated as a product-review decision, not as hidden technical completion.

### Em revisao visual

The row has official implementation and evidence, but final source/product acceptance or strict 1:1 certification is still open.

This is the normal status for technical backlog rows that are usable but not globally approved.

### Em ajuste

The row has an active P0/P1 technical blocker or a known rejected state that needs implementation work before review can continue.

### Implementado sem certificacao

Use only for process, architecture, package, or consumer-adoption rows that are not image/component certification rows.

This status must not be used to hide incomplete source-image parity.

### Ignorado

The row is intentionally out of scope by product decision.

## Exit Criteria

A visual backlog row leaves the backlog when one of these is true:

1. It is marked `Aprovado` with source-backed evidence and pass matrix.
2. It is accepted through an explicit scoped product decision, and the certification-scope audit records that choice.
3. It is marked `Ignorado` with the reason documented.

A row must not leave the backlog just because:

- tests pass;
- Storybook builds;
- the screen looks close;
- the current Internal accepts it;
- a synthetic future consumer fixture passes;
- a broad readiness gate passes.

## Current Snapshot

Generated evidence on 2026-07-01 shows:

- Component/image rows approved: 80
- Product-review decision rows: 6
- Technical certification cycle rows: 11
- Pending image rows total: 17
- Rows missing plan data: 0
- Pending rows with current evidence assertion: 17/17

## Current Queue

Product review decision rows:

1. Image 72 signup
2. Image 73 signin
3. Image 74 review subscription
4. Image 75 pending confirmation
5. Image 76 resolve subscription
6. Image 77 confirmed handoff

Technical certification cycle rows:

1. Image 17 Hoje base
2. Image 18 Hoje drawer tarefa
3. Image 20 Historico de hoje
4. Image 21 Operacao kanban geral
5. Image 22 Operacao kanban com drawer
6. Image 23 Tarefas lista detalhe
7. Image 24 Checklists lista execucao detalhe
8. Image 25 Aprovacoes lista decisao detalhe
9. Image 27 Alunos lista perfil resumido
10. Image 30 Financeiro visao geral filas
11. Image 31 Reposicoes fluxo encaixe

## Priority Rule

Default priority follows the generated visual certification plan.

Override priority only when:

- a shared component used by current Internal is affected;
- a known P0/P1 regression appears in static Storybook;
- a future CRM consumer needs a page pattern now;
- product explicitly chooses a row for final acceptance.

When in doubt, prefer rows that validate reusable foundations:

1. Shell/top navigation/sidebar.
2. PageFilterBar and PageQuickFilters.
3. DataTable/table variants.
4. Drawer frame and domain drawers.
5. Kanban/cards.
6. Page-specific panels/cards.

## Work Protocol

For a technical row:

1. Open the approved source image.
2. Capture or inspect the current static Storybook render.
3. Write a regional diagnostic.
4. Identify owner: `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`, or story composition.
5. Use measured probes before permanent changes when possible.
6. Promote only the smallest winning change into official tokens/components/stories.
7. Update the ledger and, when needed, current-evidence assertions.
8. Run focused gates.
9. Keep the row in `Em revisao visual` unless final approval criteria are satisfied.

For a product-review row:

1. Present current evidence and screenshots.
2. Ask for product acceptance or rejection.
3. If accepted, record the scoped decision.
4. If rejected, convert the row into a technical certification cycle with concrete blockers.

## Guardrails

- Do not solve backlog rows with story-only CSS when the visual anatomy belongs to a reusable component.
- Do not shrink or fork shared components for one image unless the product decision explicitly creates a documented density/variant mode.
- Do not mark rows approved from dev Storybook only; final certification evidence requires static Storybook capture.
- Do not use current Internal acceptance as proof of global image parity.
- Do not use the synthetic future consumer fixture as proof of real future CRM adoption.

## Required Gates

For visual backlog integrity:

```bash
corepack pnpm visual-certification-backlog:audit
corepack pnpm visual-certification-plan:audit
corepack pnpm visual-certification-plan:audit:negative-probe
corepack pnpm visual-certification-plan:audit:missing-artifact-probe
```

For current Internal/library acceptance:

```bash
corepack pnpm consumer:audit
corepack pnpm consumer-page-kit:audit
corepack pnpm library-acceptance:audit
```

For global completion evidence:

```bash
corepack pnpm readiness:audit
corepack pnpm goal-completion:audit
```

## Completion Interpretation

If the visual backlog is not empty, the current library-readiness scope can still be accepted only when there is an explicit scoped product decision that accepts the current visual-certification state.

If `library-acceptance:audit` returns `pass-current-internal-library`, the current Internal scope is accepted, but that is not the same as global completion.

As of 2026-07-01, the active scoped product decision accepts current Internal/library readiness without requiring 1:1 certification of every remaining approved CRM image. The global goal can still remain incomplete if the real future CRM adoption gate has not executed.
