# Data Model: Product UI Foundation

This is a conceptual model for the component library and docs. It is not a database model.

## Entities

### Package

Represents a distributable library boundary.

Fields:

- `name`: `@taliya/tokens`, `@taliya/ui`, or `@taliya/crm`
- `purpose`
- `allowedDependencies`
- `forbiddenDependencies`
- `publicApiRules`

Validation:

- `tokens` must not depend on internal packages.
- `ui` must not import `crm`.
- `crm` must not import from `apps/docs`.

### Token

Represents a reusable design value.

Fields:

- `name`
- `category`: color, typography, spacing, radius, shadow, border, focus, motion, density, status
- `value`
- `usage`
- `semanticRole`

Validation:

- Tokens should be semantic where possible.
- Status tokens must not rely on color alone.

### Primitive Component

Represents a domain-neutral reusable component.

Fields:

- `name`
- `package`: `@taliya/ui`
- `variants`
- `states`
- `accessibilityRequirements`
- `publicProps`
- `stories`

Validation:

- Must not include CRM-specific labels or business meaning.
- Must document disabled, loading, focus, and error behavior when interactive.

### CRM Pattern

Represents a product-level reusable component composed from primitives.

Fields:

- `name`
- `package`: `@taliya/crm`
- `domainFamily`
- `sourceScreens`
- `variants`
- `states`
- `requiredSlots`
- `callbacks`

Validation:

- Must accept data through props.
- Must not fetch, mutate, bill, authenticate, or route by itself.

### Component State

Represents visual/interaction state.

Fields:

- `name`
- `category`: interaction, data, permission, quota, plan, integration, sensitive, async
- `requiredCopy`
- `requiredIcon`
- `allowedActions`

Validation:

- Blocking states must explain why and what the safe next step is.
- Sensitive states must not be hidden when relevant.

### Story

Represents one visual docs example.

Fields:

- `component`
- `variant`
- `state`
- `viewport`
- `density`
- `notes`

Validation:

- P0 components need stories for default and major states.
- CRM patterns need realistic but fake data.

### Approved Image Reference

Represents a generated CRM image that acts as visual source material for component extraction.

Fields:

- `filename`
- `status`: covered, covered-adjusted, duplicate, historical, rejected, superseded
- `targetComponents`
- `cloneRequirements`
- `allowedDeviations`

Validation:

- Covered and covered-adjusted images must map to reusable components.
- Historical, duplicate, rejected, and superseded images must explain why they are not 1:1 clone targets.
- Covered images must be treated as 1:1 component clone sources, not inspiration.

### Visual Parity Requirement

Represents the fidelity rule for a component extracted from approved images.

Fields:

- `sourceImages`
- `component`
- `anatomy`
- `spacingDensity`
- `typography`
- `surfaceTreatment`
- `statePresentation`
- `allowedDeviationReason`

Validation:

- A future component cannot be marked ready if it only approximates the source image.
- Deviations require a documented reason from navigation, setup, accessibility, fake-data replacement, or source image status.

### Component Matrix Entry

Represents one row in the component backlog.

Fields:

- `family`
- `component`
- `package`
- `priority`
- `sourceEvidence`
- `variants`
- `states`
- `risks`
- `notes`

Validation:

- P0 entries must be implementation prerequisites for P1/P2.
- Domain-specific entries should not appear before supporting primitives.

### Component Source Map Entry

Represents the exact source extraction contract for one component.

Fields:

- `component`
- `primarySource`
- `secondarySources`
- `extractExactly`
- `variantStateSources`
- `decisionNotes`

Validation:

- Every component in `component-matrix.md` must have exactly one matching source map row.
- Primary source must point to an approved image, board, explicit contract, or future-only source for deferred mobile work.
- Source map rows must not authorize one-off screen implementation.
- If source references conflict, decision notes must name the winning contract or source.
