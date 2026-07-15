# Image 51K setup payment workspace diagnostic - 2026-07-11

Source: `51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png`

Story: `crm-image-coverage-setup--image-51-k-onboarding-pagamento`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic composition delta: `13.251372865067703`; different pixels: `8.362146550803634%`.
- The old story mixed a package choice, blocked Pix integration, and generic status card; it omitted the payment-method, operation-flow, post-go-live, and footer anatomy.
- Current static guided owner (`tmp/51k-guided-baseline-20260714/report.json`): delta `15.948745947081983`; different pixels `10.265534985178142%`; SHA `f92abaa67b4e0fb858fe21f251d90c01d07e0d5010abc1aba7679e7aa8f04737`; render valid with 1,974 characters.

## Regional diagnostic - 2026-07-14

- **Shell/frame:** source boundaries match the Image 51G wide-center/narrow-agent geometry; current `guided` compresses the operation flow and capabilities into the center while reserving too much width for the generic agent.
- **Vertical fit:** source title begins near the 51G top rhythm and all three action buttons remain visible; current guided render starts lower and clips the page actions below the main panel.
- **Methods:** official owner has the correct three selectable methods, but generic choice-card icon treatment differs from the source Pix/cash/card marks and square checks.
- **Operation flow:** all five semantic stages are present; current connectors and compact labels differ from the source numbered-icon timeline.
- **Post-go-live:** all four capabilities and guidance exist, but current cards are denser and the action competes with the alert.
- **Owner packages:** shell geometry belongs to `SetupPage`; payment anatomy belongs to `SetupPaymentWorkspace`; no story-local CSS is permitted.
- **Smallest probe:** reuse the source-backed `guided-main` public frame on 51K, then capture at source size before any owner-density change.

## Accepted reusable changes

- Promoted `SetupPaymentWorkspace` to `@taliya/crm` as the official owner of the full Pagamento block.
- Added Pix/cash/card selection, five-step operational example, four post-go-live capabilities, guidance, and footer actions.
- Exposed method-selection, learn-more, save, defer, and continue callbacks.
- Replaced story-local generic assembly with the official owner and canonical nine-step shell at step 5/progress 55.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- Final full owner: delta `16.639200255251207`; different pixels: `10.399071536439398%`.
- Final capture is source-sized and passed runtime inspection.
- Source-backed `guided-main` final (`tmp/51k-guided-main-final-20260714/report.json`) improved the current guided owner from `15.948745947081983/10.265534985178142%` to delta `15.308010752414802`, different pixels `10.057126440872736%`, SHA `909eb5d0ea06dd41aff54208f9aebb1b0cdda7bda969c6f449d1e864c623b078`.
- All methods, flow stages, capabilities, guidance and actions are visible; Image 51G remained bit-identical at SHA `fc00ae22530f9e5ebe952c6bb3e24da42653d1a5a50254a9a321994468b86021`.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, domain correctness, content completeness, interactions, source-backed frame and vertical fit are correct. Remaining gaps are contextual agent copy, method icons/checks, exact flow/capability density, colors, typography, shadows and antialiasing. Product review owns acceptance; reopen only through reusable setup/payment contracts validated against the setup sentinels.
