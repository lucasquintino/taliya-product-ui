# Image 28 student profile diagnostic - 2026-07-11

Source: `28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png`

Story: `crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `18.68`.
- Different-pixel ratio: `12.33%`.
- The shell rendered a page title/subtitle above `StudentHeader`, duplicating the canonical student header and pushing the dashboard down.
- `RightPanelLayout` used the global fixed `1390x738` contract; the source profile body is approximately `1289x907`, so the rail overflowed horizontally and lower profile sections were clipped.
- `StudentProfileOverviewGrid` and `StudentProfileActionRail` were empty wrappers; domain anatomy for agenda, finance, pending items, notes, timeline, relationship rail, and quick actions lived in the story.
- `ProfileTabs` used its larger `58px` treatment while the source tab bar is approximately `47px` high.

## Accepted reusable changes

- Added official `CrmRightPanelPage rightPanelVariant="student-profile"`.
- Tokenized student-profile width, height, main/rail columns, gap, and shell content inset.
- The wrapper now owns `contentLayout="student-profile"`; the story disables only the duplicate shell page header through `regions={{ pageHeader: false }}` while preserving browser chrome, sidebar, topbar, navigation, and global actions.
- Added `ProfileTabs density="compact"` with source-derived height, tab height, gap, and active-tab width tokens.
- Tokenized the student-profile stack gap at `9px`.
- Promoted complete default domain content into `StudentProfileOverviewGrid` and `StudentProfileActionRail`, preserving `children` overrides and adding typed `onAction` callbacks.
- Removed story-local `Panel`, `List`, `ListItem`, `Chip`, `Icon`, and `ButtonGroup` profile anatomy. Visible section headings are real headings in package components rather than inert `title` attributes.
- Accepted for the current measured cycle: `density="compact"` on both package-owned profile compositions. It composes official compact panels and dense divided lists, joins the first four relationship sections into a continuous rail, and keeps quick actions separate while preserving the standard default and `children` overrides.

## Evidence progression

- Student-profile layout and duplicate-header removal: `tmp/visual-audit/image28-student-profile-layout-20260711`, delta `17.89878420818792`, different pixels `0.12273294974715872`.
- Official profile content inset: `tmp/visual-audit/image28-profile-inset-20260711`, delta `16.717933586344195`, different pixels `0.11730919894590112`.
- Compact profile tabs and stack rhythm: `tmp/visual-audit/image28-profile-compact-tabs-20260711`, delta `16.30549238762892`, different pixels `0.1164042866009381`.
- Package-owned profile overview and relationship rail: `tmp/visual-audit/image28-official-composition-20260711`, delta `15.657445845161421`, different pixels `0.11188862773826602`.
- All focused captures are source-sized and passed runtime render inspection.
- Current compiled static baseline before the profile-density cycle: `tmp/image28-regression-after-student-table-20260714/report.json`, delta `15.717387332159852`, different pixels `0.11217669892046438`, current SHA-256 `08cb80d367cccfa9d777fa0aa46e7b9ecd45d4014bf16f21b9c589089f6bfdc0`.
- Rejected first compact-density capture: `tmp/image28-compact-density-static-20260714/report.json`, delta `16.796684701321695`, different pixels `0.11997497023900369`. The lists became denser but badge children remained a third content line; the accepted follow-up moves badges to the official `ListItem.action` slot only in compact mode.
- Rejected compact badge-slot follow-up as a final candidate: `tmp/image28-final-static-20260714/report.json`, delta `16.99503432265329`, different pixels `0.12123218155733952`. The rail reached the source-derived total height, but it still started beside `StudentHeader`, around `183px` before the canonical rail. This clipped header actions and the fifth summary card while leaving an artificial blank area below the rail.

## Active spanning-header probe

- Exact mismatch: the canonical `StudentHeader` spans the profile workspace; `ProfileTabs` begins in the left column and the relationship rail begins beside the tabs. The current two-column layout starts the rail beside `StudentHeader`.
- Affected anatomy: `RightPanelLayout` grid ownership and `CrmRightPanelPage` composition contract. The profile compositions themselves remain package-owned and the compact rail height is retained for this probe.
- Owner package: `@taliya/crm`.
- Reusable API decision: add an optional `contentHeader` region to `RightPanelLayout` and `CrmRightPanelPage`. It spans both columns without changing the default two-region contract when omitted.
- Smallest probe: move only `StudentHeader` from the profile main stack into `contentHeader`; keep compact `ProfileTabs`, `StudentProfileOverviewGrid`, and `StudentProfileActionRail` unchanged. Expected result: full-width student actions and summary width, with the rail shifted down to the canonical tabs origin and ending near the canonical viewport bottom.
- Accepted result: `tmp/image28-spanning-header-static-20260714/report.json`, source/current `1448x1086`, mean RGB delta `14.517499847379506`, different pixels `11.126415555080736%`, current SHA-256 `eb959513676334ffee33c02e0644928711b1a8d9f1fc09c6bac0f1769b8e0ca2`, valid populated render with zero runtime errors. This beats both the pre-cycle baseline (`15.7174 / 11.2177%`) and the previous historical best (`15.6574 / 11.1889%`).
- The accepted composition adds isolated Storybook coverage at `CRM / Layout / Page Family Components / Right Panel Spanning Header` and keeps the image-coverage story limited to official package components and prepared props.

## Verdict

**Fail 1:1; semi-approved technical baseline.** Structural overflow, misplaced right rail, clipped header actions, duplicate header, tab density, and story-local product anatomy are resolved through official package APIs. Remaining gaps are main-card height and fit, the clipped fifth summary tile, exact typography and icon rhythm, timeline presentation, and shell/frame micro-offsets. Future refinement belongs in package-owned `StudentSummary`, `StudentProfileOverviewGrid`, and `StudentProfileActionRail` contracts and must be validated against isolated stories; no profile anatomy should return to the image-coverage story.
