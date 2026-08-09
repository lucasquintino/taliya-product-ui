# Setup route review - 2026-08-09

## Scope

- Routes reviewed: 13 Setup/Onboarding stories.
- Desktop evidence: `desktop/` in this folder.
- Responsive evidence: `specs/005-joint-product-certification/visual-diagnostics/joint-story-runtime-audit-20260808-final.json` at 1440px and 390px.
- Interaction evidence: Storybook play flows executed through the live Storybook preview.
- Image 1:1 comparison was excluded from this route-only pass, per the current certification scope.

## Result

Passed: 51A, 51B, 51C, 51D, 51E, 51F, 51G, 51H, 51I, 51J, 51K, 51L, 78.

All 13 routes pass. The 51H and 51I play flows now cover two distinct row actions, explicit row selection, draft save, and the setup-agent quick reply. The previous failures were incorrect test expectations, not duplicate component callbacks.

The 51A play contract was corrected from the numeric step value `2` to the public semantic ID `equipe`, matching `SetupStepper` and its package test.
