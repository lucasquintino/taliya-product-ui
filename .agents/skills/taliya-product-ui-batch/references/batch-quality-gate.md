# Batch Quality Gate

Use this checklist before saying a Taliya Product UI batch is complete.

## Mandatory Component Pass/Fail Gate

Before any final response that could imply completion, fill a component-level pass/fail matrix:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Every component, primitive, helper, slot component, and composed component touched in the batch needs its own row.
- Every new reusable primitive needs its own isolated Storybook story.
- Parent stories do not count as proof for child primitives.
- "Works", "renders", "passes tests", and "looks close" are not completion criteria.
- A single failed critical column means the component is **not approved**.
- A single unapproved component means the batch is **not complete**.
- Final response must say **not complete** when any row fails.

## Operational Ledger Gate

For Batch 9 work, the corresponding row in:

```text
specs/001-product-ui-foundation/batch-9-status-ledger.md
```

must be updated before the final response.

The row must include:

- status: `Aprovado`, `Em ajuste`, `Implementado sem certificacao`, or `Nao iniciado`;
- source image;
- exact source crop path;
- Storybook path;
- evidence folder;
- last blocker;
- next action.

If the component is not approved, do not leave `last blocker` or `next action` blank.

## Source Fidelity

- Approved source image opened with `view_image`.
- Exact source crop is created or verified before code edits.
- Source crop path is documented in the component contract or ledger.
- Source-versus-render regional diagnostic is written before the first visual patch.
- Diagnostic identifies each region's exact mismatch: geometry, spacing, typography, color, border, shadow, icon treatment, state, and overflow.
- Each mismatch is assigned to its owner: token, primitive, CRM component, or story composition.
- Reusable visual values are promoted to `@taliya/tokens` before component code depends on them.
- Temporary probes are compared against the approved source before token/component promotion.
- Rejected probes are recorded when they explain why a visible path was not chosen.
- Rendered Storybook screenshot captured.
- Measurement manifest captured with component dimensions, relevant child dimensions, controls, and overflow.
- Visual comparison performed against source image, not memory.
- Final visual certification uses a static Storybook build/capture, not only the dev server.
- Component dimensions match: height, width, padding, radius, icon size.
- Colors match: background, text, muted text, borders, selected state, error, disabled, focus.
- Shadows/elevation match the approved image.
- Typography matches: size, weight, line-height, label placement.
- Spacing matches: component gaps, panel padding, row density, chip spacing.
- No visible overlap, clipping, unwanted wrapping, or layout shift.
- Component-level hover/focus/active screenshots are captured when those states are visually meaningful.

## Fast Failure Rules

Stop immediately and fix before running broad gates if:

- the component screenshot does not match the source crop dimensions;
- any table column, action, icon, row, chip, control, or footer present in the source is missing;
- any visible control is clipped or outside the component box;
- horizontal or vertical overflow is non-zero for the component root;
- the rendered component only looks correct because of story-only CSS that belongs in the package;
- a reusable visual value is hardcoded instead of promoted to `@taliya/tokens`.

## Component Architecture

- Smallest primitives exist separately.
- Composed components use primitives instead of duplicating markup/styles.
- Stories are organized by namespace:
  - `Primitives / UI / [Component] / All States` for reusable primitives.
  - CRM-specific wrappers under `CRM / ...`.
- No batch story hides multiple components as one unstructured mock.
- No domain/backend/API/data logic inside reusable UI primitives.

## States And Variants

- Default.
- Hover.
- Focus-visible.
- Active/pressed where applicable.
- Selected/current.
- Filled/value.
- Empty/placeholder.
- Loading.
- Disabled.
- Read-only.
- Blocked.
- Error/invalid.
- Success/valid.
- Warning.
- Compact and dense variants where shown.
- Open/closed for menus/selects/popovers.
- Removable/clearable where shown.

## Behavior

- Buttons are real buttons.
- Inputs are real inputs.
- Toggles use switch semantics.
- Checkboxes support checked, unchecked, indeterminate.
- Select/dropdown opens, closes, selects, supports keyboard where applicable.
- Clear/remove/filter/open actions call handlers.
- Focus returns/flows logically.
- Escape/outside close works for overlays/menus when applicable.

## Accessibility

- Accessible names exist for icon-only controls.
- Labels and descriptions are associated with fields.
- Error text is exposed through `aria-describedby`.
- Focus ring is visible and not clipped.
- Disabled/blocked state is semantically represented.
- Contrast is acceptable for text, borders, errors, selected state, and disabled state.

## Verification Commands

For focused component iteration, run the smallest useful set first:

```powershell
corepack pnpm --filter @taliya/tokens test
corepack pnpm --filter @taliya/ui test
corepack pnpm --filter @taliya/crm test
corepack pnpm typecheck
```

Run only the package tests relevant to touched code when iterating quickly.

For component approval, component-family approval, or batch closure, run and pass:

```powershell
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm build
```

Then run a browser/Playwright Storybook smoke that:

- opens each new `All States` story;
- confirms it renders non-empty;
- checks no horizontal overflow;
- checks real interactions for interactive components;
- captures screenshots for visual comparison.

## Completion Decision

Complete only if every relevant checklist item passes.

If a component passes code tests but fails visual fidelity, the batch is not complete.

If a story shows states but not the approved layout/proportions, the batch is not complete.

If any known P0/P1 mismatch remains, the final answer must say the batch is not complete and list the blockers.
