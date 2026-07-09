import { KanbanBoard, KanbanCard, KanbanColumn, PageQuickFilters } from "@taliya/crm";

const columns = [
  {
    id: "new",
    title: "Novo",
    cards: [{ id: "first", title: "Primeiro atendimento" }]
  },
  {
    id: "active",
    title: "Em andamento",
    cards: []
  }
];

export function KanbanPage() {
  return (
    <KanbanBoard rail={<PageQuickFilters title="Filtros" items={[]} />}>
      {columns.map((column) => (
        <KanbanColumn key={column.id} title={column.title} count={column.cards.length}>
          {column.cards.map((card) => (
            <KanbanCard key={card.id} title={card.title} />
          ))}
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
