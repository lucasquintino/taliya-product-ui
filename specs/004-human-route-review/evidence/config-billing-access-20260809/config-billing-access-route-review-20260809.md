# Config, Billing, Usage, Access and Empty route review - 2026-08-09

## Scope

Human-style review of the remaining 18 route stories in isolated Storybook frames. The review covered route purpose, required blocks, visual composition, desktop/mobile runtime metrics, accessibility names, official component ownership, state coverage, and the route play flows.

## Result

- Configurations: images 60, 61, 62, 63 and 64 passed. Hub navigation, permissions, payments, agenda exceptions, notification-role selection and alert toggles were exercised.
- Billing: images 65, 66 and 67 passed. Subscription, invoices and add-ons routes rendered and completed their play flows.
- Usage: images 68 and 69 passed. Overview, ledger, support-agent lifecycle, extract navigation and usage detail interactions rendered and completed.
- Access/Subscription: images 71 through 77 passed. Base shell, signup, signin, subscription review, pending confirmation, payment recovery and confirmed setup handoff rendered and completed their play flows.
- Empty shell: image 79 passed. Navigation, search and retry controls rendered and completed their state interactions.

## Fix recorded during review

The image 64 play test previously clicked the role `Card` container. The official interaction is the nested role-selection button, so the story now targets that button and validates the `frontdesk` role callback and `class-problem` alert toggle.

## Evidence

- Static Storybook runtime report: `specs/005-joint-product-certification/visual-diagnostics/joint-story-runtime-audit-20260809-final.json`
- Story sources: `apps/docs/src/stories/ImageCoverageSettings.stories.tsx`, `apps/docs/src/stories/ImageCoverageBilling.stories.tsx`, `apps/docs/src/stories/ImageCoverageUsage.stories.tsx`, `apps/docs/src/stories/ImageCoverageAccessSubscription.stories.tsx`, `apps/docs/src/stories/Image79EmptyShell.stories.tsx`
- Fresh isolated Storybook play runs: 18/18 routes with no browser console errors after the image 64 fix.

## Boundary

This route review does not claim 1:1 parity with the previously supplied image set. The active acceptance scope is canonical route purpose and official library composition.
