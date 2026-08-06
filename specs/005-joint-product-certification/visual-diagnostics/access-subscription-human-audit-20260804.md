# Access / Subscription Human Audit - 2026-08-04

## Scope

The Access / Subscription batch covers the seven canonical pre-CRM states:

1. `image-71-shell-base`
2. `image-72-signup`
3. `image-73-signin`
4. `image-74-review-subscription`
5. `image-75-pending-confirmation`
6. `image-76-resolve-subscription`
7. `image-77-confirmed-handoff`

The product contract is account creation and authentication, plan review, safe payment handoff,
confirmation wait, recoverable confirmation failure, and confirmed onboarding handoff. The CRM must
remain unavailable until subscription confirmation succeeds.

## Canonical Composition

- All seven states use the official `AccessShell` and access/subscription components from
  `@taliya/crm`.
- The shell has one canonical geometry: `1528px x 890px` at its reference canvas size.
- Stories provide only neutral capture framing. They do not control shell anatomy, dimensions, color,
  responsive behavior, or per-state visual variants.
- Status titles use semantic headings through the official `StatusSummaryCard` contract. Subscription
  status pages request `headingLevel={1}` through `SubscriptionStatusCard`.

## Human Interaction Review

| State | Verified behavior | Result |
| --- | --- | --- |
| 71 | Help and account actions | Pass |
| 72 | Google, e-mail submission, and sign-in switch | Pass |
| 73 | Submit, password visibility, remember checkbox, forgot password, and create account | Pass |
| 74 | Coupon, payment, and back actions | Pass |
| 75 | Disabled verifying action, reopen payment, and support | Pass |
| 76 | Retry payment, return to plans, and support | Pass |
| 77 | Continue to setup and help | Pass |

The post-build browser pass confirmed that states 75 and 76 expose their titles as level-one headings,
render the same `890px` shell height, have no horizontal overflow, and show no visible Storybook error.

## Responsive Evidence

- Existing deterministic captures cover `390px` and `1024px` for all seven states in
  `evidence/access-responsive-static-20260804`.
- The current human pass covered the desktop Storybook viewport and verified the canonical shell
  geometry directly from the rendered DOM.

## Regression Gates

- `@taliya/tokens`: 5/5 tests passed.
- `@taliya/ui`: 48/48 tests passed.
- `@taliya/crm`: 182/182 tests passed.
- Storybook smoke: 5/5 tests passed.
- Storybook static build: passed.
- Strict story anatomy audit: 0 debt selectors, 27 neutral capture harness selectors.
- Full image page coverage audit: passed.
- `git diff --check`: passed.

## Evidence

- `evidence/access-subscription-final-20260804/01-shell-base.png`
- `evidence/access-subscription-final-20260804/02-signup.png`
- `evidence/access-subscription-final-20260804/03-signin.png`
- `evidence/access-subscription-final-20260804/04-review-subscription.png`
- `evidence/access-subscription-final-20260804/04-review-subscription-top.png`
- `evidence/access-subscription-final-20260804/05-pending-confirmation.png`
- `evidence/access-subscription-final-20260804/05-pending-confirmation-top.png`
- `evidence/access-subscription-final-20260804/06-resolve-subscription.png`
- `evidence/access-subscription-final-20260804/06-resolve-subscription-top.png`
- `evidence/access-subscription-final-20260804/07-confirmed-handoff.png`

## Certification Decision

Codex review: pass for all nine route dimensions across the seven states. Product-owner review remains
pending and must be recorded independently after manual inspection.
