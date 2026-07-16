# Contract: Source Assets

## Purpose

Approved CRM images are source assets for component extraction and 1:1 component cloning. Future implementation must inspect the actual image files, not only filenames or written descriptions.

## Canonical Source Directory

The approved generated CRM images were originally stored at:

```text
D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508
```

This directory is the canonical source for the image audit used by:

- `image-coverage-map.md`;
- `component-matrix.md`;
- `component-source-map.md`;
- `token-values-v0.md`;
- `token-system-v1.md`;
- `primitive-ui-matrix.md`;
- `visual-parity-contract.md`;
- future Storybook component 1:1 clone review.

The machine-local path MUST be resolved through `taliya-source-assets.config.json`. Set
`TALIYA_CRM_SOURCE_IMAGES_DIR` or pass `--source-images <path>` when the original Windows
path is unavailable. Scripts and tests MUST NOT add another hardcoded absolute path.

## Source Asset Rules

- Do not regenerate approved source images.
- Do not replace approved source images with new generated images.
- Do not infer visual details from memory when the image file is available.
- Do not implement from filenames alone.
- Do not hardcode full screens from the images.
- Do inspect the real image files when implementing components extracted from them.
- Do preserve filenames when referencing source images in docs/stories.
- Do distinguish crop/component certification from full-image certification when citing source evidence.
- Do not use a certified crop as proof that the complete approved image is certified 1:1.

## Certification Evidence Rule

Approved source images can produce multiple evidence scopes:

- crop/component evidence for a reusable component extracted from part of the image;
- full-image evidence for an image-coverage Storybook composition that recreates the entire approved image.

The current full-image status is the ledger status, not the most optimistic wording in `image-coverage-map.md`. If `image-coverage-map.md` cites a certified crop while the full image remains semi-approved or in visual review, the map row must say that explicitly.

## Missing Source Image Rule

If a future implementation task needs an approved image and the file is not present in the canonical directory:

1. stop the implementation task;
2. report the missing filename;
3. do not approximate from memory;
4. resume only after the source image is restored or explicitly superseded.

## Route Corpus Reconciliation Rule

Readiness is defined by the covered product routes in `image-coverage-map.md`, not by a fixed total of files in the delivered directory. Every eligible route row MUST have a matching top-level source image. Top-level design-system boards, historical references, duplicates, and other support images remain inventoried for traceability but do not block route readiness.

Nested demo frames, review contact sheets, standardized onboarding copies, and browser-framed derivatives are auxiliary outputs. They MUST NOT satisfy a missing top-level route source image.

Run:

```text
corepack pnpm source-assets:reconcile:update
corepack pnpm source-assets:reconcile
corepack pnpm source-assets:reconcile:nested-exclusion-probe
```

The reconciliation audit MUST compare the source folder and sibling ZIP by relative path, byte length, and SHA-256; classify every nested image; and compare top-level names with the covered route targets in `image-coverage-map.md`. It MUST fail while a route source image is absent or a nested derivative is being used as its substitute.

## Reference Copy Rule

Future docs may copy approved images into a repo-local reference folder only for visual review if needed. If copied, the copy must:

- preserve the original filename;
- be marked as reference-only;
- never be imported by production component packages;
- never become a product runtime asset.

## Token Extraction Rule

Future token implementation must use `token-system-v1.md` as the implementation target. `token-values-v0.md` remains historical extraction input and may be refined only by comparing against the approved source images and documenting the adjustment. Token changes must preserve the approved visual direction and improve 1:1 component cloning, not introduce a new style.

## Acceptance

A reviewer can trace any implemented component back to:

- the source image filename;
- the source image directory;
- the extracted component row in `component-matrix.md`;
- the exact extraction row in `component-source-map.md`;
- the 1:1 clone rule in `visual-parity-contract.md`;
- the docs/story that demonstrates the component.
