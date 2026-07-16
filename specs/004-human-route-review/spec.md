# Feature Specification: Human Route Review

## Objective

Review every official product route as a user would experience it, at the approved source viewport and responsive desktop/mobile viewports, with real browser interaction and evidence per route.

## Acceptance

- All 73 covered routes have canonical, reduced-desktop, mobile, interaction, and source-comparison decisions.
- Every expected interaction is executed or explicitly classified as not applicable.
- Visual pass requires no incoherent overlap, clipping, overflow, broken media, blank render, or unreadable control text.
- Interaction pass requires observable state change, navigation, drawer/modal lifecycle, form behavior, or other route-specific outcome.
- Source comparison distinguishes canonical parity from responsive adaptation.
- Defects are fixed in official packages and rechecked across affected families.
- Automated coverage is supporting evidence, never a substitute for browser-observed review.
