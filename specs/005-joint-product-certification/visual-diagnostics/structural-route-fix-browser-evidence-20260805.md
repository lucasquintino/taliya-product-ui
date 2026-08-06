# Structural Route Fix Browser Evidence

Generated: 2026-08-05

Artifact: `apps/docs/storybook-static` served at `http://127.0.0.1:6224`

Viewport: 1280 x 720

## Results

| Route | Result | Evidence |
| --- | --- | --- |
| Inbox conversation open | Pass | Three-pane grid fits inside the stage; ContextPanel is 244px wide, its client and scroll widths match, and the document has no horizontal overflow. |
| Student profile | Pass | `Ana Paula Martins` is the page `h1`; one `main` landmark; no document overflow; no runtime logs. |
| Class detail with call | Pass | `ClassDrawer` is fixed at top 0 / bottom 720 / right 1265 with 420px width. `Fechar chamada` unmounts it and `Fazer chamada` restores it. |
| Internal tenant detail | Pass | `Studio Vila Mariana` is the page `h1`; one `main` landmark; no document overflow; no runtime logs. |

## Source Corrections

- The official three-pane layout constrains a direct `ContextPanel` to the available right column.
- The class attendance drawer now uses the canonical shell drawer slot.
- Student and tenant detail layouts support a page-level `h1` without nested `main` landmarks.

This evidence is from the rebuilt static Storybook artifact and is separate from product-owner approval. The routes remain pending joint certification until the user reviews them.
