# Feature Specification: Readiness And Evidence Portability

**Status**: Approved for implementation

## Objective

Make package, source-image, Storybook, consumer, and readiness evidence reproducible on a clean machine so no stale artifact or report can support an official-library claim.

## Requirements

- **FR-001**: Source-image location MUST be configurable without editing source files.
- **FR-002**: The 101-file source corpus MUST have a versioned manifest containing filename, SHA-256, dimensions, and classification.
- **FR-003**: Consumer fixture audits MUST package fresh artifacts from the current source/build instead of trusting an existing `dist-packages` directory.
- **FR-004**: Package evidence MUST trace source, packed, vendored, and installed files.
- **FR-005**: A failed upstream readiness report MUST invalidate every downstream acceptance, release, consumption, and completion report.
- **FR-006**: `--check` MUST not modify versioned reports or baselines.
- **FR-007**: Token and visual-debt audits MUST include package CSS, Storybook CSS, and inline story styles.
- **FR-008**: Storybook coverage audits MUST distinguish a missing static build from a source-contract regression.
- **FR-009**: Every report MUST identify its source commit and input evidence hashes.
- **FR-010**: Windows, macOS, and CI paths MUST resolve through the same configuration contract.

## Success Criteria

- A clean clone can build, pack, install a synthetic consumer, and validate public JS/CSS exports.
- Re-running a check leaves `git status --short` unchanged.
- Replacing a current report with stale evidence causes downstream checks to fail.
- The source corpus reports exactly 101 classified files.
- Storybook-only reusable anatomy is visible as audit debt.

## Out Of Scope

- Visual correction of individual CRM families.
- Registry publication.
- Real future CRM adoption.
