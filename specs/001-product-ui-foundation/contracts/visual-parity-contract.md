# Contract: 1:1 Component Cloning From Approved Images

## Purpose

Approved generated CRM images are canonical component clone sources, not visual references, moodboards, or loose inspiration.

Future component implementation must extract each visible component from the approved images and reproduce it as a reusable, interactive component with 1:1 visual fidelity.

Use `source-assets-contract.md` for the canonical source directory and missing-image rules.

Use `component-source-map.md` for the exact component-to-source extraction rows.

## Rule

The quality bar is:

```text
identical visible component result as the approved image, decomposed into reusable components
```

Not acceptable:

- redesigning from scratch;
- using the images only as moodboard;
- treating the images as a loose visual reference;
- approximating the style with generic dashboard components;
- improving, simplifying, polishing, or restyling the approved component by taste;
- replacing approved visual density, spacing, hierarchy, radius, borders, shadows, or status grammar with a new interpretation;
- creating one-off screen markup that bypasses the component library.
- implementing from filenames without inspecting the actual source image files.
- marking a component or batch complete because tests, build, lint, architecture, or Storybook smoke passed without component-level 1:1 visual approval.

## What Must Be Cloned At Component Level

For every component extracted from approved images, future implementation must clone:

- exact visible size and proportions;
- exact internal element order;
- exact padding, gap, alignment, and relative placement;
- visible text hierarchy and copy patterns;
- component anatomy and slot order;
- relative spacing and density;
- radius, borders, shadows, dividers, and surfaces;
- typography scale and weight;
- icon size, placement, and button shape;
- chip/badge/status grammar;
- table/list row structure;
- drawer/header/footer anatomy;
- card/panel composition;
- empty/loading/error/blocked state presentation;
- assistant/agent panel visual behavior;
- setup/access/subscription/internal shell differences.

The result may use semantic HTML, accessible roles, and component props internally, but the visible output must remain identical to the approved component source.

## Allowed Intentional Deviations

Visible deviations are allowed only when explicitly documented in the relevant contract:

- final navigation labels and route families from `navigation-contract.md` beat old image labels;
- the official 9-block setup order beats old setup numbering;
- accessibility fixes may improve semantics, focus, and labels only when they do not change the approved visible component identity;
- fake data may replace names, IDs, amounts, and messages while preserving structure, length, density, and tone;
- historical, duplicate, rejected, or superseded images are not 1:1 clone targets.

Any other difference means the component is not accepted.

## Component-First Application

This contract does not mean implementing full image screens first.

The implementation order remains:

```text
tokens -> primitives -> component variants -> CRM patterns -> domain components -> review compositions
```

Image coverage compositions are proof that the component set can recreate the approved screens. They are not a license to hardcode screens.

## Certification Scope Semantics

Certification must always state its scope.

- **Component/crop certification** means one extracted component, crop, primitive, panel, row, card, drawer, or control has passed source comparison. It does not certify the full source image that contains it.
- **Full-image certification** means the complete image-coverage composition for that approved image has passed static Storybook capture and source comparison, including shell, page layout, surrounding components, scroll state, footer/header rhythm, and responsive frame assumptions.
- **Semi-approved** means the image coverage story uses official reusable components, has stable smoke/overflow evidence, and is acceptable for product review, but is not certified 1:1.

`image-coverage-map.md` may mention crop-level certified evidence in the role/notes column, but it must not mark an image as `Covered/Certified` unless the current image ledger row is full-image approved. Current full-image approval status belongs to the Batch 9/11 ledgers and is audited by `visual-certification-backlog:audit`.

If a map row implies full-image certification while the ledger still says semi-approved, visual review, or adjusting, that is an evidence-integrity regression and must fail readiness before any release or goal acceptance.

Product may explicitly accept current Internal/library readiness without full-image 1:1 completion only through `specs/001-product-ui-foundation/certification-scope-decision.json`, validated by `corepack pnpm certification-scope:audit`. Use `specs/001-product-ui-foundation/contracts/certification-scope-decision.example.json` as the validated template for that decision. When the active decision file is absent, invalid, or not accepted, full-image 1:1 certification remains required for global completion.

## Mandatory Pre-Implementation Visual Diagnostic

Before changing any token, primitive, composed component, or image-coverage story for visual parity, the implementer must produce a concrete source-versus-render diagnostic.

The diagnostic must:

- open the approved image or exact crop and the current Storybook render;
- split the target into regions/anatomy, such as shell, header, body, footer, controls, icons, rows, cards, dividers, empty space, and state blocks;
- list exact visible mismatches by region: size, position, padding, gap, radius, border, shadow, color, typography, icon scale, alignment, hover/focus/active/disabled state, and overflow;
- assign each mismatch to its owner: `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`, or story composition;
- identify which visual values are reusable and therefore must become tokens before component code relies on them;
- define the smallest hypotheses/probes to test before official implementation changes.

Temporary probes are allowed only as measurement tools. A probe may be promoted only after comparison against the approved source shows it improves 1:1 parity without increasing drift elsewhere. When promoted, the implementation must update token source, token CSS output, tests, specs, and the relevant ledger/component notes together.

Final approval requires a static Storybook build/capture and source comparison. A dev-server preview can guide iteration but cannot certify 1:1 visual completion.

## Storybook Requirements

Future Storybook stories must:

- cite the source image filenames used for the component;
- follow the primary and secondary sources in `component-source-map.md`;
- give every reusable primitive, helper, slot component, and composed component its own isolated Storybook story;
- treat parent/composition stories as additional proof only, never as the only proof for child primitives;
- show the component in the same density and state seen in the image;
- include clone notes when a component combines evidence from multiple images;
- document every intentional deviation;
- avoid generic placeholder layouts that do not match the approved screenshots.

## Mandatory Pass/Fail Matrix

Before any component or batch can be called complete, implementation review must produce a component-level pass/fail matrix:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Rules:

- Every touched component needs a row.
- Every new primitive/helper/slot component needs a row and its own isolated story.
- A parent story cannot pass a child component.
- Any failed critical column means the component is not accepted.
- Any unaccepted component means the batch is not complete.

## Acceptance

A reviewer should be able to compare an approved image with the relevant Storybook component stories and say:

- the component anatomy is identical;
- the spacing and density are identical;
- the hierarchy and copy pattern are identical;
- the state presentation is identical;
- the component remains real, interactive, reusable code rather than an image or hardcoded screen;
- any difference is explicitly justified by a contract.
