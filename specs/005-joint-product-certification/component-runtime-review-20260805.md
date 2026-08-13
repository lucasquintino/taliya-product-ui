# Component Runtime Review

Generated: 2026-08-09T00:01:41.193Z

This review records only dimensions supported by repository-wide, component-keyed evidence. It does not certify visual comparison, responsive behavior, accessibility, variants/states, or isolated visual fidelity.

## Real behavior

- Status: 367/367 pass.
- Evidence: packages/ui/src/index.test.tsx; packages/crm/src/index.test.tsx; specs/005-joint-product-certification/component-test-policy.json
- Direct test references: 331.
- Classified static/layout/compatibility exceptions: 36; every exception is present exactly once in the policy.

## Duplicate review

- Status: pass for 367/367 components.
- Evidence: specs/005-joint-product-certification/component-inventory.json; specs/001-product-ui-foundation/component-architecture-audit.json; specs/001-product-ui-foundation/public-api-audit.json; specs/001-product-ui-foundation/public-api-surface-audit.json
- Unclassified cross-package collisions: 0.
- Unregistered CRM exports: 0.
- Orphan registry entries: 0.
- Primitive refactor debt: 0.
- Missing primitive debt: 0.

## Isolated story coverage

- Status: 100 named components have an official isolated reference-sheet story.
- Evidence: specs/001-product-ui-foundation/reference-sheet-coverage-audit.json; apps/docs/storybook-static/index.json
- Components without a reference-sheet isolated story remain pending; composed page stories are not promoted automatically.

## Variants and states

- Status: 187/367 components have direct stories with explicit state/variant evidence.
- Evidence: apps/docs/src/stories official direct component stories with explicit args/state exports
- Components without direct state evidence remain pending.

## Remaining component dimensions

- responsiveLayout
- accessibility
- visualComparison
