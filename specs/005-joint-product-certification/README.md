# Joint Product Certification

## Objective

Certify `taliya-product-ui` as the official reusable product library through a
joint product, visual, interaction, accessibility, architecture, and consumer
review. A route, component, or structural family is final only after Codex and
the product owner have both reviewed it.

This certification does not treat the 73 approved source images as 73 distinct
product pages. Images are visual targets or states. They must be linked to the
canonical product surface and route before they can be certified.

## Source Precedence

When sources disagree, use this order:

1. Final product navigation and screen contracts in
   `agentes-landing-system/specs/006-crm-operational-core`.
2. Approved per-surface product contracts in that same specification.
3. The 73 covered source-image targets and their assigned Storybook stories.
4. Package architecture, component, token, and consumer contracts in this repo.
5. Existing stories and implementation behavior.

The external product specification is an input to the certification. Product
packages must not import or depend on `agentes-landing-system`.

## Review Units

The certification has four independent inventories:

- product surfaces and routes;
- visual targets and states;
- structural families;
- public components and tokens.

Each visual target must map to one product surface and one primary structural
family. Each public component must have an owner package, contract, isolated
story, behavior evidence, and at least one justified usage or compatibility
reason.

## Review Dimensions

Every page/state review records:

- product purpose;
- required blocks;
- essential actions and their observable outcomes;
- essential loading, empty, error, blocked, permission, and entitlement states;
- canonical desktop, reduced desktop, and mobile behavior;
- keyboard, focus, Escape, overlay, and focus-restoration behavior;
- source-image comparison where applicable;
- official component ownership;
- story-local anatomy or CSS debt;
- duplicate or redundant component use;
- consumer responsibility versus library responsibility;
- Codex decision, product-owner decision, evidence, and findings.

## Status Model

Review dimensions use these statuses:

- `pending`: not reviewed under this certification;
- `pass`: reviewed and accepted by that reviewer;
- `fail`: a reproducible defect exists;
- `blocked`: external evidence or a product decision is required;
- `not-applicable`: the dimension does not apply, with a required reason.

The joint status uses:

- `pending-codex`;
- `pending-product-owner`;
- `needs-fix`;
- `blocked`;
- `joint-pass`.

Existing visual passes in `specs/004-human-route-review` remain valid evidence,
but they do not imply a product-purpose or product-owner pass.

## Defect Severity

- `P0`: prevents use, creates unsafe behavior, or breaks a critical journey;
- `P1`: page does not solve its purpose, required interaction is dead, layout is
  broken, or official architecture is bypassed;
- `P2`: meaningful visual, responsive, accessibility, or consistency defect;
- `P3`: non-blocking improvement or explicitly deferred polish.

No P0 or P1 may remain open at completion. A P2 must be fixed or explicitly
accepted by both reviewers. P3 items may remain only in the final backlog.

## Working Preview

- `6006`: last jointly accepted static Storybook baseline;
- `6007`: current candidate under review.

Static Storybook evidence is required for final acceptance. Development preview
is only an iteration surface.

## Completion Rule

The goal is complete only when all inventories are mapped, every required review
dimension has evidence, all structural families and public components are
certified, all product surfaces have a joint decision, the Internal and future
CRM consumer checks pass from clean package inputs, all final gates pass, and
remaining scope is explicitly classified.
