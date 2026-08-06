# Public Component Test Policy

Direct tests are mandatory for every public component that owns callbacks,
keyboard behavior, local interaction state, disabled/loading guards, selection,
sorting, pagination, submission, or consumer-visible transitions.

A component may omit a direct package-test reference only when it is listed in
`component-test-policy.json` as one of these governed exceptions:

- `compatibility-alias`: deprecated facade over a directly tested canonical component.
- `static-presentational`: output-only visual component with official Storybook evidence.
- `structural-composition`: anatomy/slot wrapper whose behavioral children are directly tested.
- `layout-primitive`: semantic or layout primitive with native prop forwarding and no custom interaction state machine.

The joint component audit rejects unclassified missing tests, duplicate or stale
exceptions, missing stories for canonical exceptions, and aliases whose public
API classification no longer matches this policy.
