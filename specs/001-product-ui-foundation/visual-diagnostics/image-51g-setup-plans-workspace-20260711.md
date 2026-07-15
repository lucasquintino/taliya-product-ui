# Image 51G setup plans workspace diagnostic - 2026-07-11

Source: `51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png`

Story: `crm-image-coverage-setup--image-51-g-onboarding-planos`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous unrelated composition delta: `13.752443615075753`; different pixels: `8.793073641499169%`.
- The old story mixed a setup choice, a Taliya subscription summary, and a generic rule row; it did not represent studio plans.
- Current static guided owner (`tmp/51g-guided-baseline-20260714/report.json`): delta `15.800941980349386`; different pixels: `10.24360727923567%`; SHA `0a41044f68481fe8663fdb82d9cb48fde42a34f00d47f3c111e5fecaeec107a2`.

## Regional diagnostic - 2026-07-14

- **Shell/frame:** the source uses a narrower left step rail and agent rail, leaving a visibly wider center workspace than the current `guided` frame. The current center compresses all three Planos columns.
- **Plan list:** source cards preserve separate title, type, value, replacement, and action rows. The compressed current cards concatenate adjacent text and collapse their vertical rhythm.
- **Editor:** the source exposes the full source controls, including extra type, quantity, replacement deadline, and notice options. The official owner has the correct domain sections but currently omits part of that visible option anatomy.
- **Understanding panel:** source copy is longer and the summary starts below a divider; current copy is shorter and the summary is vertically sparse.
- **Agent rail:** source uses Planos-specific guidance and questions; current shell still shows generic setup copy.
- **Owner packages:** frame geometry and contextual agent copy belong to `@taliya/crm` setup contracts; plan/editor density belongs to `SetupPlansWorkspace`; reusable dimensions must first be promoted through `@taliya/tokens`.
- **Smallest probes:** (1) capture the existing `guided-block` frame on 51G without changing owner anatomy; (2) if it still compresses the source center or regresses sentinels, introduce a source-backed Planos frame variant rather than mutating `guided` globally; (3) only then refine missing Planos controls and panel density.

## Accepted reusable changes

- Promoted `SetupPlansWorkspace` to `@taliya/crm` as the official owner of the full Planos block.
- Added plan list, selected-plan editor, type/quantity/recurrence/validity/replacement controls, Taliya interpretation, and footer actions.
- Exposed plan selection, new-plan, edit/duplicate/remove, save, defer, and continue callbacks.
- Replaced the unrelated story composition with the official owner at canonical step 4 and progress 48.
- Added registry, component-matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- First full owner capture: delta `16.449452506495685`; different pixels: `10.467651231256578%`.
- Compact owner with stable action and summary layout: delta `16.672671044580827`; different pixels: `10.51722691425695%`.
- Final owner with wrapping guard: delta `16.708170623399383`; different pixels: `10.538646151655828%`.
- Existing `guided-block` probe was rejected: delta `16.011480795990558`, worse than the current guided baseline.
- Source-backed `guided-main` frame probe improved delta to `15.477087983701889` and opened the required center workspace without changing sibling variants.
- Complete final owner (`tmp/51g-density-final-20260714/report.json`): delta `16.858818624185815`; different pixels `11.014763384163238%`; SHA `fc00ae22530f9e5ebe952c6bb3e24da42653d1a5a50254a9a321994468b86021`; render valid, 2,631 characters, all controls, alert and actions visible.
- 51D, 51E, 51F, 51L and 78 remained bit-identical in the shared-frame captures; later density selectors are scoped to `SetupPlansWorkspace`.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, complete source controls, callbacks, wide-center frame, three-column anatomy, alert, actions and vertical fit are correct. The higher pixel ratio reflects anatomy absent from the old partial baseline. Remaining gaps are exact agent copy, card/control microdensity, typography, colors, shadows and antialiasing. Product review owns acceptance; reopen technical work only through reusable setup contracts validated against the setup sentinels.
