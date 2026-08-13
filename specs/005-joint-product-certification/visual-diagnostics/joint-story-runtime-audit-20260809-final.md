# Joint Story Runtime Audit

Generated: 2026-08-09T01:28:48.816Z

This is a DOM smoke audit of the static Storybook. It is evidence for initial render health, horizontal containment, and accessible names on visible interactive controls. It is not a WCAG conformance audit, keyboard journey approval, visual 1:1 approval, or product-owner approval.

## Coverage

- Stories: 635
- Viewports: desktop 1440x900 and mobile 390x844
- Storybook: http://127.0.0.1:6224
- Render errors: 0
- Unnamed visible interactive controls: 0
- Stories with horizontal overflow: 0
- Overflow checks: 0
- Overall smoke status: pass

## Accessibility smoke

The current rebuilt Storybook has zero visible interactive controls without an accessible name in the audited DOM states. The scan checks buttons, links, inputs, textareas, selects, and common ARIA interactive roles. It does not check contrast, focus order, keyboard traps, announcements, or every dynamic state.

## Responsive findings



The complete list and both viewport metrics remain in the JSON report. These overflows are not automatically classified as defects: source-sized reference components may intentionally preserve a wide canvas, while page-family components must be corrected or explicitly documented by their official responsive contract.

## Next action

Classify the 0 affected stories by structural family, fix only official package contracts where the overflow is not intentional, then rerun this audit. Keep the component accessibility dimension pending until keyboard and dynamic-state evidence is recorded.
