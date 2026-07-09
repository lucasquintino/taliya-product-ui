# Consumer Integration Audit

Consumer: `C:\Users\lucas\taliya-internal`
Vendor: `vendor/taliya-product-ui`

| Check | Status |
| --- | --- |
| Required packages | Pass |
| Installed package entrypoints | Pass |
| Installed package contract markers | Pass |
| Installed CRM standard page-kit runtime manifest | Pass |
| CSS import order | Pass |
| Tokenized global reset | Pass |
| No forbidden implementation imports | Pass |
| No forbidden Taliya package subpath imports | Pass |
| No active local className hooks | Pass |
| No extra active consumer CSS files | Pass |

## Details

- @taliya/tokens: file:vendor/taliya-product-ui/taliya-tokens-0.0.0.tgz
- @taliya/ui: file:vendor/taliya-product-ui/taliya-ui-0.0.0.tgz
- @taliya/crm: file:vendor/taliya-product-ui/taliya-crm-0.0.0.tgz
- @taliya/tokens source: pass
- @taliya/ui source: pass
- @taliya/crm source: pass
- @taliya/tokens: installed entrypoints ok
- @taliya/tokens version: 0.0.0
- @taliya/tokens missing files: none
- @taliya/tokens missing exports: none
- @taliya/ui: installed entrypoints ok
- @taliya/ui version: 0.0.0
- @taliya/ui missing files: none
- @taliya/ui missing exports: none
- @taliya/crm: installed entrypoints ok
- @taliya/crm version: 0.0.0
- @taliya/crm missing files: none
- @taliya/crm missing exports: none
- crm-product-shell-drawer-size-api: installed contract markers ok
- crm-product-shell-compact-drawer-css: installed contract markers ok
- tokens-compact-checklist-drawer: installed contract markers ok
- Standard page-kit runtime manifest: pass
- Standard page-kit runtime count: 37/37
- Standard page-kit runtime missing names: none
- Required CSS imports are present.
- Required CSS imports are ordered tokens -> ui -> crm.
- No legacy local visual root variables.
- Root body uses official token variables.
- Forbidden import matches: 0
- Forbidden Taliya package subpath import matches: 0
- Active className matches: 0
- Extra active CSS files: 0
