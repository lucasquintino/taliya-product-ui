# Image 19 Hoje Critical - Regional Diagnostic

Source: `19_round-4.1A_hoje_03_estado-critico-do-dia.png`

Current static story: `crm-image-coverage-hoje--image-19-hoje-estado-critico`

Validated capture before changes:

- dimensions: `1672x941` source/current;
- mean absolute RGB delta: `8.900851388203868`;
- different pixel ratio: `0.0580416842512038`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Checklist | Source first row is complete with a green checked mark; current public row API only renders the incomplete hollow mark | `@taliya/crm` | Add an explicit reusable `completed` row state and semantic success mark to `CrmOperationalRow` |
| Agora | All three critical titles, metadata, counts and the quota event differ from the source | Story data through official CRM components | Add a `critical` data variant to `TodayShell`; do not add story-local anatomy |
| Aulas/Fila/Bloqueios/Tarefas | Counts, statuses, times, owners and affected objects differ | Story data through official CRM components | Supply exact critical-state data while retaining `CrmOperationalPanel/Rows` |
| Aprovações/Dinheiro | Badge counts, risk/quota labels, values and total differ | Story data through official CRM components | Supply exact critical-state data while retaining official components |
| Grid geometry | Content-correct recapture retained the base image 17 grid: lower columns measured approximately `393/316/270/487`, while image 19 requires `412/321/277/461`; source rows are also taller and begin 9px earlier | `@taliya/crm` / `@taliya/tokens` | Add an official `todayCritical` dashboard variant with measured columns, rows and vertical offset; preserve `today` for image 17 |
| Coverage contract | Image map names blocked/error components that are not present in the actual source | Spec contract | Replace with the official Hoje shell/dashboard/operational component family plus critical row state |

## Token Decision

The first pass introduced no literal visual values. The content-correct recapture left a measured structural mismatch, so the second pass promotes dedicated `layout.crm-dashboard.today-critical-*` tokens and an official `DashboardGrid` variant. Existing success/danger/warning/info semantic tokens continue to own state colors.

## First Recapture

- dimensions: `1672x941`;
- visible render: valid, with no Storybook error patterns;
- mean absolute RGB delta: `8.90018783675448`;
- different pixel ratio: `0.05796096486990832`;
- result: failed visual certification; content was corrected, but the image 17 grid contract remained visibly narrower than the image 19 source.

## Acceptance Rule

This pass is not visual approval. After implementation, rebuild static Storybook, recapture image 19 with visible-render validation, compare source/current/diff, and record an explicit pass/fail verdict in the visual ledger.

## Second Recapture And Verdict

- official layout: `DashboardGrid columns="todayCritical"`;
- dimensions: `1672x941`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- mean absolute RGB delta: `8.411559523870055`;
- different pixel ratio: `0.05626585786270332`;
- improvement from first content-correct recapture: mean delta `-0.488628312884425`, different-pixel ratio `-0.001695107007205`;
- verdict: **failed 1:1 visual certification**.

The official critical grid materially improves the lower-row and bottom-row geometry without changing the image 17 base variant. Residual source/current differences remain visible in operational typography, internal row density, and the image 19 top-row split. No automatic threshold is used to approve the image.

## Third Recapture And Final Cycle Verdict

- added only measured top-row checklist width and Agora offset tokens to the official `todayCritical` variant;
- clean capture dimensions: `1672x941`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- mean absolute RGB delta: `8.329100968293597`;
- different pixel ratio: `0.056013530347945026`;
- a separate critical-density/typography experiment produced mean delta `8.572941719335534` and was removed;
- final cycle verdict: **failed 1:1 visual certification, best structural candidate retained**.

The remaining mismatch is no longer a missing critical data state or broad lower-grid error. It is concentrated in shared shell typography/icon rendering and panel micro-density. Those shared contracts must not change from this image alone because image 17 uses the same shell and base operational family.

## 2026-07-14 Cross-image Typography Recheck

The current static build was recaptured at `1672x941` for both Image 17 and Image 19 before any package edit. Computed styles confirmed that the shared dashboard title still used the generic empty-shell `27px/34px` contract. Temporary token probes were then applied to both stories and compared against their own canonical sources:

| Probe | Image 17 mean RGB delta | Image 19 mean RGB delta | Verdict |
| --- | ---: | ---: | --- |
| Current `27/34` title | 7.4375 | 8.3088 | Baseline |
| Dashboard title `36/44` | 7.3678 | 8.2059 | Accepted; improves both images |
| Dashboard title `38/46` | 7.3404 | 8.2847 | Rejected; improves Image 17 but regresses Image 19 |
| Dashboard title `40/48` | 7.3978 | 8.3473 | Rejected; regresses the pair |
| Operational row weight `500` | 7.7685 | 8.6466 | Rejected |
| Operational row `14/18` plus weight `500` | 7.8568 | 8.7474 | Rejected |

The accepted change is intentionally scoped to `CrmProductShell` with `pageHeaderRhythm="dashboard"` through dedicated official tokens. It does not alter the generic empty-shell title or Image 79's isolated title contract. Probe artifacts live in `tmp/image19-probes-20260714`.

The same recheck also replaced the rejected uniform density experiment with measured per-area probes inside `DashboardGrid columns="todayCritical"`. The baseline static render used `43px` dense rows for Fila, Bloqueios and Tarefas, leaving the latter two panels visibly empty below their third row. A regional candidate assigns distinct official heights to checklist, Agora, schedule, queue, action and compact rows; it reduced the Image 19 mean delta from `8.2059` to `7.9337` without touching Image 17. The canonical third Bloqueios row requires wrapped metadata; the accepted compact-title plus wrapped-meta candidate removes the measured `141px/241px` clipping and reduced the probe delta to `7.8867`. Uniform `60px` action rows were rejected because they expanded the grid track and moved the bottom panels.

The first promoted regional capture exposed a one-pixel min-content expansion: `45px` schedule rows made the second dashboard track `246px` and moved the bottom panels from canonical `y=719` to `y=720`. A final `44px` schedule-row probe restores the `245px` track, `y=719` bottom row and the prior two-pixel document overflow. Its mean delta is `7.9045` versus `7.8867`, while its different-pixel ratio is slightly better; canonical panel geometry wins over the lower aggregate mean.

## Final Static Evidence And Decision

- evidence report: `tmp/image19-final-static-20260714/report.json`;
- Image 19 mean RGB delta: `7.904546259620648`;
- Image 19 different-pixel ratio: `4.979241771707793%`;
- Image 19 current SHA-256: `c9b5cb9369fab63a7b5b88acbbdb5f33a3b0d71ed4798581651b3e827cee4f9e`;
- paired Image 17 mean RGB delta: `7.367808348036549`;
- paired Image 17 different-pixel ratio: `4.599606445347259%`;
- paired Image 17 current SHA-256: `51f725618e281d9d02e7d4544ac880824ef654fbce5c0e50c6ea192da93ae617`;
- render validation: populated Storybook roots, zero broken images, deliberate browser-address clipping only, document overflow `[0,2]`;
- Image 19 panel geometry: top `[124,194,436,260]`, `[577,194,1054,260]`; lower `[124,464,412,245]`, `[548,464,321,245]`, `[881,464,277,245]`, `[1170,464,461,245]`; bottom `[124,719,745,196]`, `[881,719,750,196]`.

Decision: **semi-approved official composition baseline, failed 1:1**. The source state, official anatomy, canonical tracks and containment are complete enough for product review, and the accepted shared title change improves both Image 17 and Image 19. The remaining icon/raster typography and optical micro-density differences are visible, so this is not pixel-perfect approval. Further technical work requires a reusable cross-image hypothesis that preserves Image 17.
