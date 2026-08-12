---
name: taliya-product-ui-batch
description: Implement or review Taliya Product UI component-library batches with mandatory 1:1 visual fidelity from approved images. Use whenever working in the Taliya Product UI repository on batch execution, component primitives, Storybook stories, tokens, CRM shell/components, or quality review; especially when the user says batch, 100%, 1:1, clone, fidelidade, primitives, components, Storybook, design system, or Taliya Product UI.
---

# Taliya Product UI Batch

## Purpose

Provide a repeatable, evidence-first protocol for implementing and reviewing Taliya Product UI component batches.

## Non-Negotiable Standard

Treat `100%` as:

1. Clone the approved image visually, not just "inspired by it".
2. Split the UI into reusable primitives/components from smallest to composed.
3. Implement real interactive controls, not static mock markup.
4. Cover variants, states, responsive behavior, accessibility, and Storybook stories.
5. Compare rendered output against the source image before claiming done.

Never close a batch as complete only because tests, build, or smoke passed. Those are required gates, not approval.

## Mandatory Completion Lock

This protocol is mandatory for every component implementation or review. Do not rely on memory, general frontend judgment, or prior conversation approval.

## Mandatory Source Diagnostic Before Edits

Before any visual/component edit, run a concrete diagnostic against the approved image. Do not start by adjusting CSS, tokens, or component structure from intuition.

For each source image or crop:

1. open the approved source image/crop and the current rendered Storybook output;
2. split the target into visual regions/anatomy, such as shell, header, content, footer, controls, icons, cards, rows, dividers, empty areas, and state blocks;
3. record the exact visible differences per region: geometry, width, height, padding, gap, radius, border, shadow, background, typography, icon size, alignment, copy density, hover/focus/active state, and overflow;
4. map each difference to its owner: `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`, or story composition;
5. identify whether the value is local or reusable. Reusable values must be promoted to tokens before being used by components;
6. define the smallest hypotheses to test before patching the official implementation.

For visual iteration, use temporary probes first when possible: CSS custom-property overrides, measured local experiments, or isolated story variants. Compare probe output against the approved source before promoting changes. Promote only the smallest winning probe into official tokens/components, and update token source, generated CSS, tests, specs, and ledger together.

Token governance is mandatory:

- Components and tokens must both be official. A component is not acceptable if it is visually official but depends on local literal color, surface, border, spacing, radius, shadow, typography, focus, motion, connector, or chart values.
- Standard CRM surface/text/border/status/shadow values must be aliases to foundation tokens in `@taliya/tokens`. CRM-specific raw values are allowed only for documented domain exceptions such as brand/channel/provider colors, chart series, source-image-only statuses, or exact certified component geometry.
- Run `corepack pnpm tokens:audit` before accepting any token/component/batch work. If intentional token normalization changes the debt baseline, run `corepack pnpm tokens:audit:update` and review `specs/001-product-ui-foundation/token-governance-audit.md` before continuing.
- Do not introduce new literal visual debt. The audit baseline may stay equal or go down; it must not increase.

For certification, use a static Storybook build/capture. A dev Storybook preview is acceptable for quick inspection, but it is not enough for final approval.

Every accepted and rejected probe that affects visual parity must be summarized in the ledger or component notes so the next pass does not repeat the same experiment.

## Mandatory Execution Ledger

Before any Batch 9 implementation, review, or certification work, open and update:

```text
specs/001-product-ui-foundation/batch-9-status-ledger.md
```

The ledger is the operational source of truth for current work. Do not start coding a Batch 9 component unless its ledger row identifies:

- current status;
- primary approved source image;
- exact source crop path or a `needs crop` blocker;
- Storybook path;
- last blocker;
- next action.

Every work session must update the relevant ledger row before the final response. If a component is interrupted mid-certification, mark it `Em ajuste`, record the blocker, and record the next action. Never leave the user to infer progress from scattered evidence folders.

## One Component Cycle

Process exactly one component at a time unless the user explicitly asks for a planning-only audit. A component cycle is:

1. confirm ledger row and contract;
2. open approved source image;
3. create or verify the exact source crop before code changes;
4. record measurements and required tokens;
5. add/adjust tokens first;
6. implement/refactor the smallest reusable component layer needed;
7. update the isolated Storybook story;
8. run focused tests/typecheck needed for the touched packages;
9. capture Storybook screenshots and measurement manifest;
10. compare against the source crop;
11. update specs and ledger.

Do not start the next component while the current component has any P0/P1 visual, behavior, architecture, or state blocker.

## Fast Feedback Rule

For component-level iteration, prefer the smallest useful validation loop:

- token tests when tokens change;
- package tests for touched packages;
- `corepack pnpm typecheck` for public API/story changes;
- Storybook screenshot/manifest capture for visual work.

Run full `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`, and `corepack pnpm visual:smoke` at component approval, component-family approval, or batch closure. Do not spend a full build cycle after every tiny visual tweak unless the change affects shared build/runtime behavior.

## Stop-On-First-P1 Rule

If screenshot review finds any of the following, stop broad validation and fix the component before running larger gates:

- wrong component dimensions;
- clipped text/icon/control;
- missing source column/action/state;
- overflow;
- component built as a one-off instead of using approved primitives;
- local CSS value that should be a token;
- hover/focus/disabled behavior drifting from the approved primitive contract.

Before editing a component, write or verify its component contract:

- exact approved source image file;
- exact visible extraction target inside that image;
- smallest primitives used or created;
- composed component anatomy;
- variants;
- states;
- required interactions;
- Storybook path;
- visual measurements to match: dimensions, padding, radius, spacing, typography, color, border, shadow, icon size.

If a new primitive, helper, slot component, or visual subcomponent is created, it must have its own isolated Storybook story before any parent component or batch can be marked ready.

After implementation or review, produce a component-level pass/fail matrix. A batch is complete only when every component row passes every critical column:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

If any row is not a clean pass, the final status is **not complete**. Do not call it "done", "complete", "finished", "ready", "100%", or equivalent.

Completion is forbidden when:

- a component exists only inside another story;
- a story is a gallery that hides missing component stories;
- the implementation is visually close but not identical to the approved source;
- behavior works but visual fidelity fails;
- visual fidelity works only because of story-only CSS that should live in `@taliya/ui` or `@taliya/crm`;
- tests/build pass but screenshot comparison has unresolved P0/P1 gaps.

## Required Inputs

Before implementing or reviewing a batch:

- Read the current Spec Kit files for the feature under `specs/001-product-ui-foundation`.
- Open the approved source image(s) for the batch with `view_image`.
- Inspect existing `@taliya/ui`, `@taliya/crm`, token files, and Storybook stories.
- Read `references/batch-quality-gate.md` every time before final approval.

## Workflow

1. Map the source image into component anatomy:
   - primitives;
   - composed components;
   - variants;
   - states;
   - measurements: height, width, radius, spacing, icon size, borders, shadows, typography, colors.

2. Implement from smallest to largest:
   - tokens first when needed;
   - primitives second;
   - composed UI third;
   - CRM/domain wrappers last.

3. Create isolated Storybook stories:
   - one story file per component;
   - `Primitives / UI / [Component] / All States` for reusable primitives;
   - composed CRM stories only under the CRM namespace;
   - include all states from the image plus required operational states.

4. Validate behavior:
   - keyboard;
   - focus;
   - disabled/blocked;
   - loading;
   - selected/active;
   - error/success/warning;
   - clear/remove/open/close interactions where applicable.

5. Perform visual review before final response:
   - capture Storybook screenshots with Playwright/browser;
   - compare against approved source image(s);
   - inspect desktop and relevant compact/mobile widths;
   - record any visual mismatch as a blocking issue.

6. Only mark complete when all gates pass:
   - tests;
   - typecheck;
   - lint;
   - build;
   - Storybook smoke;
   - visual 1:1 review;
   - no known P0/P1 visual, UX, accessibility, or behavior gaps.

## Failure Rule

If any component is functional but not visually faithful, say it is **not complete**. Do not use phrases like "good enough", "V1", "base", or "initial foundation" for batch closure.

## Final Response Rule

When finishing a batch, report:

- components completed;
- source images used;
- states and interactions covered;
- validation commands run;
- visual fidelity result;
- remaining gaps, if any.

If there are remaining gaps, do not call the batch complete.
