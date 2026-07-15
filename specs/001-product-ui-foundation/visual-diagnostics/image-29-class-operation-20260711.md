# Image 29 class operation diagnostic - 2026-07-11

Source: `29_round-4.1F_aula_01_detalhe-com-chamada.png.png`

Story: `crm-image-coverage-agenda--image-29-aula-detalhe-com-chamada`

## Baseline

- Source and current render: `1487x1058`.
- Mean RGB delta: `15.48`.
- Different-pixel ratio: `8.00%`.
- The operational class summary, expected roster, replacements, observations, and history were assembled with story-local panel and list anatomy.
- The generic right-panel contract placed the attendance drawer below the source position and clipped the fifth student and footer actions.
- Page actions continued behind the elevated drawer because the shell header did not reserve the class-operation rail.

## Accepted reusable changes

- Added official package component `ClassOperationalDetail`, with typed facts, roster, replacements, notes, history, actions, and `onAction` callback.
- Added official `CrmRightPanelPage rightPanelVariant="class-operation"` and tokenized its width, height, main/rail columns, gap, panel offset, header reserve, and shell content inset.
- Added a source-compatible full-height `ClassDrawer` composition with all five attendance rows and complete footer actions.
- Added the Agenda-family navigation contract and stacked page-header rhythm through existing shell APIs.
- Removed the story-local panel, list, and roster anatomy; the story now supplies domain data and composes official CRM components.

## Evidence progression

- Baseline: mean RGB delta `15.48`, different pixels `8.00%`.
- First package-owned operational composition: `tmp/visual-audit/image29-official-class-operation-20260711`, delta `13.585159388084678`, different pixels `7.851346833235234%`.
- Full-height elevated rail: `tmp/visual-audit/image29-elevated-panel-20260711`, delta `14.04869189772822`, different pixels `8.269272574028473%`. The numerical regression was retained because it restored the fifth student and complete drawer height.
- Header-reserved final candidate: `tmp/visual-audit/image29-header-reserve-20260711`, delta `14.697664361877715`, different pixels `8.342242726185224%`.
- The final capture is source-sized, populated, and passed runtime render inspection with zero render errors.
- Fresh compiled-static baseline after the Image 28 cycle: `tmp/image29-baseline-after-image28-20260714/report.json`, source/current `1487x1058`, delta `14.704762425371916`, different pixels `8.345103054449209%`, current SHA-256 `00b6fa1252d73bf8eca4bc05ef16822a867ca4c4615c3061018c72d28d7252d9`; bit-identical to the earlier paired regression evidence.

## Active source-density probe

- Exact mismatches: the drawer begins about `19px` below the canonical top and adds an eyebrow plus roster heading absent from the source; its custom summary omits `1 falta avisada`. The expected-students panel spends about `100px` before its roster versus roughly `58px` in the source because default heading/paragraph margins stack. Source portraits for Felipe and Juliana are available but not passed to either official roster.
- Affected anatomy: `class-operation` panel placement, prepared `ClassDrawer` state, `ClassOperationalDetail` roster data contract, and package-owned expected-roster header rhythm.
- Owner package: `@taliya/crm`; source portrait imports remain prepared Storybook data.
- Reusable-token decision: adjust only `layout.crm-right-panel.class-operation-panel-offset-y`; reuse existing spacing tokens for heading/paragraph margins and add no literal visual value.
- Smallest probe: remove only absent optional drawer labels, use the default five-state summary, pass prepared roster students through a new `ClassOperationalDetail.students` prop, tighten official student-header margins, prevent the class title from wrapping, and move the class-operation rail from `-156px` to `-175px`. Keep columns, drawer dimensions, roster row dimensions, footer, and all other variants unchanged.
- Mixed probe evidence: `tmp/image29-source-density-probe-20260714/report.json`, delta `12.744471409218054`, different pixels `7.579043582503944%`. Content/density changes align the title, expected roster, portraits, five-state attendance summary, and main history substantially better. The `-175px` rail offset is rejected, however: the shell clips the first `19px` of the transformed drawer and partially hides its title. The final candidate restores the governed `-156px` offset while retaining the package/data improvements.
- Accepted final compiled-static candidate: `tmp/image29-final-static-20260714/report.json`, source/current `1487x1058`, delta `14.545354848086907`, different pixels `8.26475961165641%`, current SHA-256 `973cdbba8596d95604bdb7cff5ce9a6a8b18973c735b06217ec61983fa2eeab1`, valid populated render with zero runtime errors. It improves the safe baseline while keeping the complete drawer header visible.
- Cross-story regression: `tmp/image26-regression-after-image29-20260714/report.json` is bit-identical to the accepted Image 26 baseline, SHA-256 `76e87edbfbd6d68d3471aaf94ff1c8427d52d66f2c9c085bc4c512bf305aaa16`, delta `14.342271171006177`, different pixels `8.440867189646226%`.
- Added isolated Storybook coverage at `CRM / Layout / Official Compositions / Class Operation Detail`; the image story provides only prepared roster portraits/state and official component props.

## Verdict

**Fail 1:1; semi-approved technical baseline.** The class-operation family owns the page anatomy, one-line title, prepared roster portraits, compact expected-roster heading, complete five-state attendance summary, and source-critical drawer/footer geometry. Remaining differences include the safe drawer top staying about `19px` below the source, main/rail typography, summary and side-card microdensity, shell/frame rendering, and history fit. Further refinement must happen in package-owned `ClassOperationalDetail`, `ClassDrawer`, and clipping-aware `class-operation` layout contracts with cross-story evidence; no operational anatomy should return to the image-coverage story.
