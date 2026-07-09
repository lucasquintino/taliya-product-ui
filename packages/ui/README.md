# @taliya/ui

Primitives React do Taliya Product UI.

Inclui:

- Button;
- ButtonGroup;
- IconButton;
- Input;
- Select;
- Toggle;
- Chip;
- Badge;
- Card;
- Panel;
- PanelHeader;
- PanelBody;
- DataTable;
- TablePagination;
- Drawer;
- Modal;
- Tabs;
- Stack;
- Toolbar;
- FieldGrid;
- ContentGrid;
- StatePage;
- LoadingState;
- ErrorState;
- EmptyState;
- InlineGroup;
- List;
- ListItem;
- KeyValueRow.

Aliases e bases de composicao:

- `DropdownMenu` e o primitive canonico de menu; `ActionMenu` continua como alias semantico para menus de acao.
- `FilterBar`, `DataTable`, `Drawer`, `MetricTile` e `StatusSummaryCard` sao primitives neutros. Quando a tela precisar do comportamento visual de pagina CRM, use os wrappers de `@taliya/crm`: `PageFilterBar`, tabelas de dominio, `CrmRecordDrawer`, `MetricCard` e `StatusCard`.

Este pacote pode depender de `@taliya/tokens`, mas nao conhece dominio CRM.

`react` e `react-dom` sao peer dependencies do consumidor. Nao instale uma segunda copia de React dentro deste pacote.

Importe o CSS junto com os tokens no app consumidor:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
```
