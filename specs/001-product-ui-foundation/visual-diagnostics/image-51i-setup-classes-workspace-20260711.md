# Image 51I setup classes workspace diagnostic - 2026-07-11

Source: `51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png`

Story: `crm-image-coverage-setup--image-51-i-onboarding-turmas`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous story-local table delta: `13.732228388815725`; different pixels: `8.782459360651654%`.
- The old story defined the complete table in Storybook and rendered three unrelated class cards, while omitting intake, sources, and summary anatomy.

## Accepted reusable changes

- Promoted `SetupClassesWorkspace` to `@taliya/crm` as the official owner of the full Turmas block.
- Moved class-source intake, added sources, summary metrics, five-row official worklist, row actions, and footer actions into the package.
- Removed the story-local `ClassesTable` function and its exclusive imports.
- Exposed source, class selection, row-action, save, defer, and continue callbacks.
- Applied the documented nine-block reinterpretation at step 7/progress 77.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.

## Evidence progression

- Final full owner: delta `14.691350272115416`; different pixels: `9.417981481575642%`.
- Final capture is source-sized and passed runtime inspection.
- Compiled-static baseline before density refinement: delta `14.193799607462285`; different pixels `9.334084171882706%`; current SHA-256 `8eb3c1c80066603d93ec166e015f1a561b8b6372ca796f1c4847f48d379feff6`; runtime-valid with `2164` body-text characters.
- Regional inspection confirms the `guided` top/main axis remains closer vertically, while summary growth clips two prepared-class rows, the caption and all footer actions. The source uses approximately `66px` source cards in this five-option panel, unlike the `75px` Image 51H student cards.
- Final density evidence: `tmp/51i-density-final-20260714/report.json`; delta `14.313404756214757`; different pixels `9.406731615048634%`; current SHA-256 `66fe219b69c852349ae1cacf8509824366aec45cd0572b04300f26452d33f05c`; runtime-valid render with `2166` body-text characters.
- The official `285px` summary, `66px` source cards and `315px` worklist band now render all five classes, the post-row caption and the source-aligned right action group above the global bottom bar. Image 51H remained bit-identical at `138e55cd99392c303729f67d7abf985e4dacf2a8847c3a8410e83a505102d850`.

## Guided-wide follow-up - 2026-07-15

- Source geometry shared with Image 51J showed a `207px` step rail, approximately `1062px` center and narrower agent rail; the earlier `guided` frame allocated `986px` center and `415px` agent.
- Added the official `SetupPage frameVariant="guided-wide"` contract with `207px 1062px 338px` columns, `15px` gap, source insets and the shared `79/770/65px` vertical rhythm. Image 51I now selects this public frame without local shell CSS.
- Final evidence `tmp/51i-guided-wide-20260715/report.json`: delta `13.625395969878323`; different pixels `9.042668137835652%`; SHA-256 `9164c630d7f0a18682cbdf58f93fe754cd50aa73b04e6ea223ce8a72bdbfaae4`; runtime-valid render with `2166` body-text characters.
- This supersedes `tmp/51i-density-final-20260714/report.json` as the final Image 51I evidence. Image 51H remained bit-identical at `138e55cd99392c303729f67d7abf985e4dacf2a8847c3a8410e83a505102d850`; shared 51G, 51K, 51L and 78 sentinels were also unchanged by the new scoped frame.

## Verdict

**Semi-approved; Fail 1:1.** Ownership, domain correctness, content completeness, interactions and first-viewport capacity are correct. Remaining gaps are the nine-block sequence, contextual agent copy, exact table micro-density, primary action tone, typography, icons, shadows and antialiasing. Reopen only through official setup/worklist components or tokens and cross-check Images 51A-51L and 78.
