# File Actions Behavior Diagnostic

Date: 2026-08-04

Scope: `FileUpload` and `AttachmentList` in `@taliya/ui`.

## Contract

- Canonical source: `14_round-3c2_agenda-financeiro-documentos_aprovada.png`.
- `FileUpload` is UI-only and the consumer owns file handling.
- `AttachmentList` owns attachment display and action anatomy while consumers
  own removal behavior.

## Initial Failure

- `FileUpload` always renders an enabled `Button` with labels such as
  `Selecionar`, `Revisar`, or `Trocar`, but exposes no callback or disabled prop
  for that action.
- `AttachmentList removable` renders one enabled remove `IconButton` per item,
  but exposes no remove callback and passes no item identity to a consumer.
- Both controls are focusable and look actionable, yet clicking them has no
  observable effect. This is a functional/accessibility failure, not a visual
  mismatch.

## Ownership And Smallest Change

- Owner package: `@taliya/ui`.
- Token/CSS decision: no token, class, dimension, or visual change.
- Add optional `onAction` and `actionDisabled` props to `FileUpload` and wire
  them to the existing button.
- Add optional `onRemove(item)` to `AttachmentList` and wire it to each existing
  remove button.
- Preserve current markup and backwards compatibility; consumers that do not
  pass callbacks keep the same render.
- Add direct package tests and Storybook interaction assertions before closing
  the finding.

## Resolution Evidence

- `FileUpload` now exposes optional `onAction` and `actionDisabled` props and
  delegates them to the existing action button.
- `AttachmentList` now exposes optional `onRemove(item)` and preserves item
  identity for every remove action.
- Direct UI package tests pass as part of the 48-test suite.
- The final static Storybook build completed successfully on 2026-08-04.
- Both official stories run `play` assertions against the callbacks.
- Browser DOM inspection confirmed the uploading action is disabled, all other
  expected upload actions are enabled, and removable attachments expose one
  accessible action per item.
- Browser clicks were repeated manually against the final static build.
- Visual evidence:
  - `evidence/11-file-upload-action-after-20260804.png`
  - `evidence/12-attachment-list-remove-after-20260804.png`

Status: resolved without token, class, dimension, or visual-anatomy changes.
