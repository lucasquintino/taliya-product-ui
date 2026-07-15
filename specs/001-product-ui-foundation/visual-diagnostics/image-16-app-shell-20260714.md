# Image 16 app-shell diagnostic

Date: 2026-07-14

Source: `16_round-4.1S_app-shell_01_base-web.png` (1450x1085)

Certification mode: `full-source-shell-review`

Status: `Aprovado`

## Scope decision

Image 16 is one composed logged-in shell contract, not a reference sheet of seven independent components. The current map is too granular: `ProductWindowFrame`, `Sidebar`, `Topbar`, `PageHeader` and `GlobalActions` are internal anatomy of `CrmProductShell`, while generic `Panel` does not own the source-specific journeys canvas.

The accepted ownership target is `CrmProductShell` plus one official journeys-canvas owner. `CrmProductShell` must remain the single shell shared by CRM and internal consumers; the Image 16 geometry must be additive and must not change fullscreen, Image 79 or later page-family defaults.

## Source measurements

| Region | Approximate source bounds | Contract |
| --- | --- | --- |
| Window | x42-1407, y88-990 (1365x902) | Browser/app window on gray stage with source radius and shadow |
| Browser chrome | x42-1407, y88-151 (1365x63) | Traffic lights, navigation controls and centered address bar |
| Sidebar | x42-135, y151-990 (93x839) | Brand, primary icon rail and bottom utility controls |
| Topbar | x135-1407, y151-224 (1272x73) | Back action, seven navigation items and global action cluster |
| Page header | x149-328, y232-269 | `Jornadas` title rhythm |
| Main surface | x135-1375, y286-771 (1240x485) | Primary white panel with title, participant stack and three actions |
| Lower surfaces | x135-1375, y779-990 | Two-column continuation panels with action clusters |

## Candidate review

| Candidate | Static evidence | Result | Diagnostic |
| --- | --- | --- | --- |
| `crm-shell-components--product-shell-window-frame` | `tmp/reference-sheet-16-20260714/baseline/product-shell.png` | Fail | Docs harness constrains the shell, the sidebar renders outside the window and top navigation/actions overlap. It is a component demo, not valid source evidence. |
| `crm-image-coverage-image-79-empty-shell--image-79-empty-shell` | `tmp/reference-sheet-16-20260714/baseline/empty-shell.png` | Candidate shell anatomy only | Browser, sidebar and topbar are structurally related, but the stage uses Image 79 dimensions and the journeys canvas is absent. Image 79 remains a separate empty-shell contract. |
| `crm-shell-journeyshellcanvas--source` | `tmp/reference-sheet-16-20260714/final-static/source.png` | Pass | The additive reference frame and official journeys canvas reproduce the complete 1450x1085 contract without changing other shell defaults. |

## Implemented path

1. Added `frame="reference"` to `CrmProductShell`; existing `fullscreen` and `window` behavior remains unchanged.
2. Promoted `JourneyShellCanvas` for the participant strip, action clusters and three source surfaces.
3. Added the anatomy-free `crm-shell-journeyshellcanvas--source` story.
4. Corrected the coverage map to the two composed owners.
5. Built static Storybook and captured at 1450x1085 with Playwright after network, DOM and font stability checks. Three stable DOM probes reported 37 visible buttons and lower surfaces at `615.5x209`.

## Current verdict

`Pass at full-source-shell scope.` The source story contains exactly one `CrmProductShell` and one `JourneyShellCanvas`; window, browser chrome, sidebar, topbar, header, primary surface and lower surfaces fit the canonical viewport without clipping or incoherent overlap.
