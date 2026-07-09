# Quickstart: Taliya Product UI Spec Review

This quickstart describes how to review the complete Spec Kit source of truth. Dependencies are not installed and components are not implemented in this phase.

## 1. Read The Source Of Truth

```powershell
Get-Content .\AGENTS.md
Get-Content .\specs\001-product-ui-foundation\spec.md
Get-Content .\specs\001-product-ui-foundation\plan.md
Get-Content .\specs\001-product-ui-foundation\component-matrix.md
Get-Content .\specs\001-product-ui-foundation\component-source-map.md
Get-Content .\specs\001-product-ui-foundation\primitive-ui-matrix.md
Get-Content .\specs\001-product-ui-foundation\image-coverage-map.md
Get-Content .\specs\001-product-ui-foundation\token-values-v0.md
Get-Content .\specs\001-product-ui-foundation\token-system-v1.md
Get-Content .\specs\001-product-ui-foundation\implementation-execution-plan.md
```

## 2. Review The Package Boundaries

```powershell
Get-Content .\specs\001-product-ui-foundation\contracts\package-boundaries.md
```

## 3. Confirm Spec Decisions

Confirm these decisions are approved:

- standalone project;
- pnpm workspace;
- React + TypeScript planned;
- Storybook docs;
- image coverage for every approved CRM screen;
- exact component source extraction for every component;
- exact primitive ownership and extraction for `Primitives / UI`;
- component-level 1:1 cloning from approved images;
- access/subscription, setup, internal, billing/usage, agents/flows, inbox, and support coverage;
- CSS variables tokens with raw, semantic, component/density, connector, chart, focus, and motion layers;
- wrapped headless primitives only where useful;
- no landing dependency;
- no backend/product logic.

## 4. Future Release Gates

After explicit implementation approval, the implemented library must eventually pass these target gates:

```powershell
pnpm lint
pnpm test
pnpm build
pnpm storybook:build
pnpm visual:smoke
```

These commands are future gates, not commands to run during spec review.

## 5. Future Implementation Order

After this spec is approved, implementation must follow `implementation-execution-plan.md`.

```text
Batch 0 source lock -> Batch 1 tokens -> Batches 2-6 P0 primitives -> Batch 7 CRM shell -> Batch 8 P1 primitives -> Batch 9 CRM patterns -> Batch 10 domain components -> Batch 11 image coverage and QA
```

## 6. Review Rule

A component is not ready until it has:

- source package;
- public props;
- variants;
- states;
- accessibility notes;
- Storybook examples;
- source image 1:1 clone notes when extracted from approved images;
- no forbidden dependency direction.

## 7. Stop Rule

After this review, stop for approval. Do not install dependencies, scaffold Storybook config, create source component files, or implement UI until the user explicitly starts the implementation phase.
