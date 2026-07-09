import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Badge, Button, Chip, DataTable, FilterBar, FilterChip, Icon, IconButton, InlineGroup, MetaText, PersonLabel, SearchInput, StatusDot, TablePagination } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";
import image79Avatar from "../assets/image79-avatar.png";

type CaseRow = {
  id: string;
  code: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  updated: string;
  owner: string;
  ownerAvatar?: string;
  priorityTone: "danger" | "warning" | "success";
};

const rows: CaseRow[] = [
  { id: "cs-1041", code: "#CS-1041", subject: "Restricao senha de acesso", status: "Em andamento", priority: "Alta", category: "Conta", updated: "28/04/2024 10:24", owner: "Sam Frank", ownerAvatar: image79Avatar, priorityTone: "danger" },
  { id: "cs-1043", code: "#CS-1043", subject: "Falha no envio de e-mail", status: "Em revisao", priority: "Alta", category: "Sistema", updated: "27/04/2024 16:18", owner: "Nikol Clev", ownerAvatar: image79Avatar, priorityTone: "danger" },
  { id: "cs-1039", code: "#CS-1039", subject: "Solicitacao de relatorio", status: "Aguardando cliente", priority: "Media", category: "Relatorio", updated: "27/04/2024 14:32", owner: "Sam Frank", ownerAvatar: image79Avatar, priorityTone: "warning" },
  { id: "cs-1036", code: "#CS-1036", subject: "Integracao com ERP", status: "Em andamento", priority: "Alta", category: "Integracao", updated: "26/04/2024 11:33", owner: "Nikol Clev", ownerAvatar: image79Avatar, priorityTone: "danger" },
  { id: "cs-1032", code: "#CS-1032", subject: "Acesso negado ao sistema", status: "Resolvido", priority: "Baixa", category: "Acesso", updated: "24/04/2024 09:02", owner: "Sam Frank", ownerAvatar: image79Avatar, priorityTone: "success" }
];

const meta: Meta<typeof DataTable> = {
  title: "Primitives / UI / DataTable",
  component: DataTable,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [selected, setSelected] = useState(["cs-1041"]);
  const [page, setPage] = useState(1);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-table" number="1" title="Tabela completa">
          <div className="sb-batch4-data-shell">
            <div className="sb-batch4-table-toolbar">
              <SearchInput onFilter={() => undefined} placeholder="Buscar por cliente, assunto, ID..." />
              <InlineGroup className="sb-batch4-table-active-filters">
                <FilterChip removable>Status: Em andamento</FilterChip>
                <FilterChip removable>Prioridade: Alta</FilterChip>
                <FilterChip removable>Responsavel: Sam Frank</FilterChip>
                <Button leadingIcon="filter" size="sm" variant="secondary">Filtros</Button>
                <IconButton icon="plus" label="Adicionar caso" />
              </InlineGroup>
            </div>
            <FilterBar>
              <FilterChip>Status: Todos</FilterChip>
              <FilterChip>Prioridade: Todas</FilterChip>
              <FilterChip>Responsavel: Todas</FilterChip>
              <FilterChip>Categoria: Todas</FilterChip>
              <Button size="sm" variant="ghost">Limpar filtros</Button>
              <Chip showDot={false}>128 resultados</Chip>
            </FilterBar>
            <DataTable
              columns={[
                { key: "code", header: "ID" },
                {
                  key: "subject",
                  header: "Assunto",
                  sortable: true,
                  render: (row) => (
                    <InlineGroup>
                      <Icon name="star" size={14} />
                      <strong>{row.subject}</strong>
                    </InlineGroup>
                  )
                },
                { key: "status", header: "Status", render: (row) => <Chip tone={row.status === "Resolvido" ? "success" : "info"}>{row.status}</Chip> },
                { key: "priority", header: "Prioridade", render: (row) => <InlineGroup><StatusDot status={row.priorityTone} /><MetaText>{row.priority}</MetaText></InlineGroup> },
                { key: "category", header: "Categoria", render: (row) => <Badge tone="info">{row.category}</Badge> },
                { key: "updated", header: "Atualizacao" },
                {
                  key: "owner",
                  header: "Responsavel",
                  render: (row) => (
                    <PersonLabel avatarSrc={row.ownerAvatar} name={row.owner} />
                  )
                }
              ]}
              onRowSelect={(rowId, isSelected) => setSelected((current) => (isSelected ? [...current, rowId] : current.filter((id) => id !== rowId)))}
              onRowClick={(row) => setSelected([row.id])}
              rowActions={() => <IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />}
              rows={rows}
              selectable
              selectedRowIds={selected}
            />
            <TablePagination
              itemsPerPageValue={10}
              label="1-10 de 128"
              nextDisabled={page === 13}
              onNext={() => setPage((current) => Math.min(13, current + 1))}
              onPageChange={setPage}
              onPrevious={() => setPage((current) => Math.max(1, current - 1))}
              page={page}
              pageCount={13}
              previousDisabled={page === 1}
            />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
