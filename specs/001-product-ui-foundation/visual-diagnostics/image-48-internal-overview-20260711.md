# Image 48 internal overview diagnostic - 2026-07-11

Source: `48_round-4.1K_internal_01_visao-operacional.png.png`

Story: `crm-image-coverage-internal--image-48-internal-visao-operacional`

## Assessment

- Source/current dimensions: `1672x941`.
- Baseline mean RGB delta: `17.081359627936617`; different pixels: `9.839756138486493%`.
- Final compiled-static mean RGB delta: `14.67255875777745`; different pixels: `8.862670273403536%`.
- The story is composed by official `InternalShell`, `InternalOverviewDashboard`, and `SupportTicketDrawer variant="internal"` contracts.
- Connected header commands, search, filters, six dashboard card actions, activity, copilot, drawer commands, and close behavior.
- No story-local dashboard/card/drawer anatomy or CSS was introduced.

## Official family contract

- `InternalShell` forwards `browserUrl`, `contentLayout="internal-overview"`, `pageHeaderRhythm="internal-overview"`, `drawerPlacement="floating"`, regions and callbacks to the shared `CrmProductShell variant="internal"` instead of duplicating shell anatomy.
- `InternalOverviewDashboard` owns the asymmetric `325/339/367` dashboard tracks, source-like card rows, prepared column/cell rendering, filter band, activity panel and copilot panel.
- `SupportTicketDrawer variant="internal"` owns the `443x760` internal ticket rail while preserving the default Support variant.
- Official tokens own the `1672x941` content insets, `71px` header rhythm, `443x760` floating drawer boundary, card tracks and `184px` bottom row.

## Evidence

- Baseline: `tmp/image48-baseline-after-support-20260714/report.json`.
- Final: `tmp/image48-internal-route-final-static-20260714/report.json`; current SHA-256 `5c69336013d31fab6c59adf54d4524a443aa9b7fe8a4bfe89c69046a3178e067`.
- Support regression sentinel: `tmp/image47-regression-after-internal-final-20260714/report.json`; Image 47 remained bit-identical at SHA-256 `595e41fdfdb0f26489b138e2f8425ae64cce6e5262d461085e6f0b64a02f92b4`, delta `14.399206048556591` and `8.302421897246064%` different pixels.
- CRM package verification: `146/146` tests, typecheck and build passed after adding public forwarding and variant assertions.

## Verdict

**Fail 1:1; semi-approved technical baseline.** The official family now owns the source geometry and full page anatomy, with the residual concentrated in typography, icons/avatar rendering, micro-density and antialiasing. This story proves reusable Internal-family composition only. Real `taliya-internal` package/runtime consumption remains a separate gate and cannot be inferred from Storybook coverage.
