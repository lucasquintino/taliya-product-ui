# Image 51B setup agent chat diagnostic - 2026-07-11

Source: `51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png`

Story: `crm-image-coverage-setup--image-51-b-onboarding-agente-configuracao-chat`

## Baseline

- Source/current dimensions: `1086x1448`.
- Canonical owner baseline before source framing: delta `16.55915994288602`; different pixels `5.664382446608264%`.
- The source is an isolated configuration-agent panel.
- The old story rendered a full `SetupPage`, added a second agent inside the center content, and clipped the composition; its lower delta was dominated by large coincident blank regions rather than correct anatomy.

## Accepted reusable changes

- Removed the setup shell and duplicated inner agent, rendering the owner `SetupAgentChat` directly.
- Connected close, menu, quick reply, send, and human-help callbacks through public props.
- Replaced Storybook's generic centered layout with the capture-only `sb-image-coverage-setup-agent-stage`, which reproduces the source's white `1086x1448` canvas and positions the official panel at `x=267`, `y=28`.
- Kept the certified `SetupAgentChat` and `QuickReplyChips` anatomy/tokens unchanged. The stage owns only source framing and is enforced as a capture harness by the strict Storybook anatomy audit.

## Evidence progression

- Owner component before centering: `tmp/visual-audit/image51b-setup-agent-chat-20260711`; delta `17.79158760077192`, different pixels `7.746189575002799%`.
- Centered owner baseline: `tmp/51b-current-after-51a-20260714`; delta `16.55915994288602`, different pixels `5.664382446608264%`.
- Final source-framed owner: `tmp/51b-source-stage-20260714`; delta `8.535718706863513`, different pixels `3.6558967471485404%`, current SHA-256 `837dcf2567f091fe44f5445c99859d419c4823993ea347e10dd4fbcc22399216`.
- Final exact macro geometry: panel `675x1381 @ 267,28`; content rail `613px`; rule `y=182`; info callout `494x106 @ 298,227`; messages `468x209 @ 298,378` and `454x211 @ 298,669`; quick replies `y=952`; composer `613x82 @ 298,1206`; footer rule `y=1317`.
- Final capture is source-sized, populated, nonblank, and passed runtime inspection. Image 78 remains protected by the unchanged certified component contract.

## Verdict

**Semi-approved; explicit fail 1:1.** Component ownership, source canvas, panel placement, dimensions, rails, block sizes, and major vertical axes are correct. Residual differences are typography/font rendering, icon/logo rendering, colors/shadows, and antialiasing. Reopen technical work only for a reusable hypothesis validated against the certified isolated crop and embedded Image 78 use; do not add story-local agent anatomy or styling.
