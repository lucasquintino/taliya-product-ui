# Feature Specification: Official Story Anatomy

**Status**: Approved for implementation

## Objective

Make image-coverage stories pure consumers of official Taliya page families and compositions. Storybook may frame a capture, but it must not own reusable product anatomy.

## Requirements

- Story-local CSS may set viewport size, overflow, scale, and capture positioning only.
- Shell, filter, table, kanban, dashboard, profile, access, setup, and drawer anatomy must live in `@taliya/crm` or `@taliya/ui`.
- Stories must vary data, props, callbacks, state, and domain content rather than reconstructing layouts.
- Official components added for image coverage must be general enough for Internal or future CRM consumption.
- The strict Storybook anatomy audit must reach zero reusable-anatomy selectors.

## External Stop Condition

Pixel parity is certified against the source image assigned to each covered route. Structural promotion and rendered-layout QA may continue independently for routes still awaiting human visual acceptance.
