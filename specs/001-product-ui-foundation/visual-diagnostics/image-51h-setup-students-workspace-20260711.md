# Image 51H setup students workspace diagnostic - 2026-07-11

Source: `51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png`

Story: `crm-image-coverage-setup--image-51-h-onboarding-alunos`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic composition delta: `12.386912358666931`; different pixels: `7.85876269264602%`.
- The old story rendered one source card, an unrelated import-progress panel, and generic duplicate status; it omitted most of the source, summary, table, and action anatomy.

## Accepted reusable changes

- Promoted `SetupStudentsWorkspace` to `@taliya/crm` as the official owner of the full Alunos/import anatomy.
- Added four intake methods, added-source list, base summary, five-row official worklist, row actions, and footer actions.
- Exposed source, student selection, row-action, save, defer, and continue callbacks.
- Replaced story-local generic assembly with the official owner under the documented nine-block reinterpretation at step 6/progress 66.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- Final full owner: delta `13.829378295511749`; different pixels: `8.673265740914939%`.
- Final capture is source-sized and passed runtime inspection.
- Static guided baseline before the density refinement: delta `13.335723347350116`; different pixels: `8.699261195206158%`; current SHA-256 `0d9609d0562f5155734e3176906a03af3908ed3b653ae587263816a46a3c8577`.
- Regional inspection: the official summary stretched from approximately `y=185` to `y=593`, while the source summary ends around `y=466`. That excess height clipped two worklist rows and all footer actions from the setup main viewport.
- The `guided` shell is retained: the canonical image uses the historical eight-block sequence, while the current product contract intentionally renders the documented nine-block sequence with Pagamento at step 5.
- Final density evidence: `tmp/51h-density-final2-20260714/report.json`; delta `13.998094090409097`; different pixels `9.060273861157579%`; current SHA-256 `138e55cd99392c303729f67d7abf985e4dacf2a8847c3a8410e83a505102d850`; runtime-valid render with `2144` body-text characters.
- The official `285px` summary and `315px` worklist bands now keep the three panels separated from the table while rendering all five students, the post-row operational caption, and all three footer actions above the global bottom bar.
- Post-change sentinels: 51G remained bit-identical at `fc00ae22530f9e5ebe952c6bb3e24da42653d1a5a50254a9a321994468b86021`; 51K at `909eb5d0ea06dd41aff54208f9aebb1b0cdda7bda969c6f449d1e864c623b078`; 51L at `4ccb815a2c7be1f54ed0eb327b017ace95390084c25207e35c096a88731f0990`; and 78 at `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`. Neighbor 51I also rendered valid (`8eb3c1c80066603d93ec166e015f1a561b8b6372ca796f1c4847f48d379feff6`).

## Verdict

**Semi-approved; Fail 1:1.** Ownership, domain correctness, content completeness, interactions and first-viewport capacity are correct. Remaining gaps are the intentional nine-block sequence, shell/contextual-agent framing, exact summary/table density, row-action variants, primary action tone, colors, typography, icons, shadows and antialiasing. Reopen only through official setup/worklist components or tokens and cross-check Images 51A-51L and 78.
