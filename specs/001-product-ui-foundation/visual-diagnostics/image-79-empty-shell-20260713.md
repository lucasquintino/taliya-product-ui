# Image 79 empty shell diagnostic

Date: 2026-07-13

Source: `79_round-4.1S_app-shell_01_base-web-sem-conteudo.png` (1160x868)

Story: `crm-image-coverage-image-79-empty-shell--image-79-empty-shell`

## Baseline

- Aggregate render is valid, nonblank and source-sized at 1160x868.
- Baseline full-page metrics: mean RGB delta `14.815965159701255`; changed-pixel ratio `12.90272922294613%`.
- The official stage and browser window already match the source footprint around x=34/y=71 at 1092x722.
- The image story contains no local markup or CSS. It renders `CrmEmptyShell` directly, so all corrections belong to the official package owner.

## Regional mismatch

| Region | Source | Current render | Owner decision |
| --- | --- | --- | --- |
| Browser frame | Window around x=34/y=71 with a 1092x722 footprint | Outer footprint is already aligned | Preserve `CrmEmptyShellWindow` geometry. |
| Top navigation | Compact regular-weight labels fit between the back control and global actions; `Jornadas` is centered around x=685 | Labels are wider/bolder, `Jornadas` drifts right and `Relatorios` collides with global actions | Add empty-shell-specific typography/control tokens and tighten the dedicated nav geometry. |
| Page title | Compact `Jornadas` at about x=119/y=190 | Same origin, but visibly larger and heavier | Correct the dedicated title type tokens and use its own weight token. |
| Sidebar | Ten primary controls followed by moon and sun controls inside the 665px body | Ten primary controls render, while the sole settings utility is clipped below the window | Restore canonical moon/sun defaults and make the fixed-window sidebar fill its body instead of using `100vh`. |
| Sidebar rhythm | Compact circular controls with the utility pair anchored near the bottom | Controls are larger and consume the available height | Add dedicated empty-shell control size/icon tokens without changing reusable `IconButton` defaults. |
| Main surface | Light neutral canvas and subtle divider | Broad surface is structurally aligned, with residual color/texture differences | Preserve official canvas anatomy; tune only governed empty-shell colors if regional evidence supports it. |

## Contract

- Package owner: `CrmEmptyShell`, composed from `CrmEmptyShellWindow`, `CrmShellSidebar`, `CrmEmptyShellTopbar`, `CrmEmptyShellPageHeader` and `CrmEmptyShellCanvas`.
- Primitive owners remain `IconButton`, `NavPill`, `Avatar`, `Icon` and browser-chrome primitives.
- The canonical default utility taxonomy is `Modo noite` and `Modo dia`; consumers may still replace it through `utilityItems`.
- Story responsibility remains limited to the avatar fixture and source metadata.
- No story-local selectors, compensating wrapper or duplicate shell anatomy may be introduced.

## Probe hypotheses

1. Replacing the fixed-window sidebar's viewport-derived height with `100%` will keep the utility controls inside the 665px body.
2. Source-derived moon/sun utility defaults will restore the missing canonical controls and preserve callback behavior.
3. Compact regular-weight nav typography and source-derived positioning will remove the topbar collision without changing shared primitive defaults.
4. A dedicated 26px/32px title token at weight 700 will better match the source while preserving semantic heading anatomy.

Final status must remain `Fail 1:1` unless static source-size evidence proves otherwise.

## Accepted implementation

- Restored `Modo noite` and `Modo dia` as the canonical utility defaults while preserving the replaceable `utilityItems` API and callback path.
- Corrected the fixed-window sidebar to fill its 665px parent instead of deriving height from `100vh`; all twelve controls now remain inside the frame.
- Promoted source-derived sidebar offsets/gaps, top-nav typography/position/active width, title typography and empty-shell surface colors to public typed/CSS tokens.
- Preserved the shared 40px `IconButton`, browser-frame geometry and story composition; no story-local selector or wrapper was added.
- Updated the CRM contract test to require both canonical utility controls.

## Static source-size evidence

- Render: valid, nonblank, no runtime errors and exact 1160x868 dimensions.
- Baseline: mean RGB delta `14.815965159701255`; changed pixels `12.90272922294613%`.
- First structural candidate: mean RGB delta `13.701302041951374`; changed pixels `12.383302876211663%`.
- Final source-derived candidate: mean RGB delta `4.55163707028974`; changed pixels `1.1066860003178134%`.
- Outer window remains around x=34/y=71 at 1092x722; primary controls align around y=204..592 and utilities around y=700/745.
- Residual differences are concentrated in font/icon antialiasing, avatar rasterization, browser chrome details and frame shadow/border pixels.

## Verdict

`Fail 1:1`, retained as the architecture-correct near-parity candidate. Further refinement must target official browser chrome, icon/font rendering, avatar or shadow tokens and must not reintroduce story-owned anatomy.

## 2026-07-14 Border And Shadow Refinement

Temporary source-sized probes in `tmp/image79-probes-20260714` tested title weights, stage font smoothing, frame-border colors and a narrow range of official window shadows. Lower title weights `600` and `500` both regressed the baseline, so the existing `700` contract was retained. Font antialiasing improved both aggregate metrics. Measured source/current edge pixels supported the image-specific `#ECEBEF` frame border.

The previous `0 36px 74px rgba(20, 22, 28, 0.26)` shadow was materially darker than the canonical outside-window pixels. Removing the shadow won the aggregate metric but failed the visible source anatomy, so it was rejected. The retained `0 34px 72px rgba(20, 22, 28, 0.06)` shadow preserves the visible frame lift and matches the measured near-window darkening more closely.

Final evidence comes from the rebuilt static Storybook, without injected CSS:

- report: `tmp/image79-final-static-20260714/report.json`;
- source/current dimensions: `1160x868`;
- mean RGB delta: `2.877827546480216`, improved from `4.55163707028974`;
- different-pixel ratio: `1.0070713491180676%`, improved from `1.1066860003178134%`;
- current SHA-256: `12b694395745d29899a6a32c6593b319a85a1cb556e868a8c6dee7355ea4ee6b`;
- diff SHA-256: `4cd4db0384890ab284b274170d6cd9ae90d4cf24846beb282f0dd77d4e412b41`;
- render: populated Storybook root, nonblank, zero runtime errors.

Final decision: **semi-approved official composition baseline, failed 1:1**. Remaining differences are source raster texture, browser glyphs, icons, avatar and font antialiasing rather than missing or story-local anatomy. Product review is required for acceptance; further technical work needs a reusable cross-story hypothesis.
