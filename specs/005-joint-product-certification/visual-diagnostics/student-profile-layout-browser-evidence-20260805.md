# Student Profile Layout Browser Evidence

Date: 2026-08-05  
Artifact: `apps/docs/storybook-static`  
Route: `crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional`  
Viewport: 2560 x 1440

## Result

Image 28 is a student detail page in the official `right-panel` family. It does not mount a drawer: its detail affordance is the persistent `StudentProfileActionRail`. The regression was that the family layout retained a fixed 1,289px width from the reference composition, leaving most of the shell empty on a wide viewport.

The official token contract now uses a full-width layout with `minmax(0, 1fr) 377px` columns. Browser evidence after rebuilding Storybook:

- Main profile content: `2048px` wide.
- Action rail: `377px` wide.
- Layout: `2436px` wide at `x=96`, ending at `x=2532` within the shell.
- Root and body horizontal overflow: `0`.
- Drawer roots mounted: `0`, as expected for this route.

The page now occupies the available horizontal space without introducing an inline or contained drawer variant.

At the narrow breakpoint, the shared `student-profile` layout now switches to one flexible column instead of keeping the fixed 377px rail beside the main content:

- Viewport: `390x844`.
- Layout: `366px` wide at `x=12`, with `grid-template-columns: 366px`.
- Main profile content: `366px` wide.
- Action rail: `366px` wide and stacked below the main content.
- Document and body horizontal overflow: `0`.

## Source Boundary

The fix is in the shared responsive contract used by `@taliya/crm`; no story-local markup or CSS was added. The list route keeps the canonical global drawer contract separately, while this profile route keeps its persistent action rail.
