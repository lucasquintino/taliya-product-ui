# Domain Drawer Geometry Diagnostic

Date: 2026-08-04

## Observation

The static shell render uses the canonical fixed-right, full-viewport, 420 px
drawer rule and passes browser geometry checks. Several domain drawer root
classes still declare historical width and height tokens underneath that shell
override. Those declarations do not currently win inside `CrmProductShell`, but
they preserve hidden geometry variants in isolated and embedded contexts.

## Ownership

- Geometry owner: `@taliya/ui` `Drawer` and `@taliya/crm` `CrmDrawerFrame`.
- Domain owners: task, case, student, class, payment, replacement, lead, agent,
  usage, support, and tenant drawer content wrappers.
- Shell owner: `CrmProductShell` positioning, viewport anchoring, content reserve,
  and mobile full-width behavior.

## Smallest Correction

1. Make `CrmDrawerFrame` use the official dynamic viewport height and medium
   drawer width directly.
2. Remove root width/height declarations from domain drawer classes that inherit
   the frame.
3. Keep inner content measurements and non-drawer right-rail layout rules intact.
4. Extend `drawer-lifecycle:audit` to reject future domain-root geometry.
5. Rebuild tarballs and prove the clean Internal consumer against the result.

This is a contract consolidation, not a source-image restyling. The shell result
must remain pixel-equivalent in geometry after the change.
