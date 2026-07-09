# Contract: Storybook / Docs

## Purpose

Storybook is the visual contract for Taliya Product UI components.

It must show:

- variants;
- states;
- density;
- layout constraints;
- accessibility notes;
- realistic fake data for CRM patterns;
- what each component should and should not be used for.
- source-image 1:1 clone evidence for components extracted from approved images.

## Story Groups

Required groups for the current foundation phase:

```text
Foundations/
Primitives / UI
CRM / Shell / Components
CRM / Image Coverage
```

Expanded groups may appear later only when the related components are implemented and source-image 1:1 cloning has been proven. Do not keep generic galleries that make speculative components look approved.

`Primitives / UI` owns primitive stories even when the first extraction happened while building a CRM shell. `CRM / Shell / Components` must show composed shell pieces that consume primitives. Full image reconstructions belong in image coverage stories, not in primitive/component groups.

## Required Stories For P0

Each P0 component needs at least:

- Default;
- Selected/active when applicable;
- Disabled;
- Loading when applicable;
- Error/invalid when applicable;
- Blocked reason when applicable;
- Focus and keyboard behavior when interactive;
- Accessibility notes for labels, roles, focus, and disabled semantics;
- Dense CRM example when applicable.
- Source image filename;
- required token groups from `token-system-v1.md`;
- package owner and import path;
- explicit note when a currently displayed primitive is still temporarily implemented in `@taliya/crm`.

## Image Coverage Stories

Future implementation must include docs compositions for every row marked **Covered** or **Covered/Adjusted** in `image-coverage-map.md`.

These stories are clone proof, not loose demos.

Each image-coverage composition must:

- use only fake data;
- assemble library components rather than one-off screen markup;
- document any intentional divergence from older labels or numbering;
- reference the source image filename;
- follow the component extraction sources defined in `component-source-map.md`;
- show the required shell type: `CrmProductShell`, `AccessShell`, or `SetupShell`; internal/backoffice screens use `CrmProductShell` with internal nav/content props.
- preserve the approved image's visible density, spacing, hierarchy, component anatomy, and state grammar exactly unless a documented contract allows deviation.

## Review Rules

- Stories use fake data only.
- Stories must not call backend/API services.
- Stories must not depend on the landing.
- Screenshots and visual smoke checks are future release gates once components exist.
- A component is not "ready" without docs coverage.
- A component extracted from an approved image is not "ready" if it only feels inspired by the image; it must be visually identical to the approved image at component level.

## Acceptance

- A reviewer can inspect every P0 component without running the future SaaS.
- CRM examples show product-like density, not marketing layouts.
- Docs identify package and import path for each component.
- Approved source images are traceable to docs compositions or documented component story sets.
- Approved source images can be compared against the component stories without discovering any new visual interpretation.
- `Primitives / UI` contains only reusable primitives, not CRM shell composites.
- `CRM / Shell / Components` contains only composed shell pieces, not primitive-only stories.
