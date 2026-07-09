import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Badge, Button, IconButton, Input, InlineGroup, MetaText, Popover, Select } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Popover> = {
  title: "Primitives / UI / Popover",
  component: Popover,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

const colorOptions = [
  { value: "azul", label: "Azul" },
  { value: "vermelho", label: "Vermelho" },
  { value: "verde", label: "Verde" }
];

export function AllStates() {
  const [saved, setSaved] = useState(false);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-popover" number="3" title="Popover">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="opcoes">
              <Popover inline open trigger={<IconButton icon="more" label="Mais opcoes" />} width="sm">
                <Button leadingIcon="edit" size="sm" variant="ghost">Editar</Button>
                <Button leadingIcon="copy" size="sm" variant="ghost">Duplicar</Button>
                <Button leadingIcon="arrowRight" size="sm" variant="ghost">Mover</Button>
                <Button leadingIcon="download" size="sm" variant="ghost">Exportar</Button>
                <Button leadingIcon="trash" size="sm" tone="danger" variant="ghost">Excluir</Button>
              </Popover>
            </SourceItem>

            <SourceItem label="com nivel formulario">
              <Popover
                footer={<Button onClick={() => setSaved(true)} size="sm" variant="primary">{saved ? "Salvo" : "Salvar"}</Button>}
                inline
                open
                title="Nome da tag"
                trigger={<Button leadingIcon="tag" size="sm">Editar tag</Button>}
                width="md"
              >
                <Input aria-label="Nome da tag" fieldSize="sm" readOnly value="Urgente" />
                <Select aria-label="Cor" fieldSize="sm" options={colorOptions} value="azul" />
              </Popover>
            </SourceItem>

            <SourceItem label="com detalhes rapidos">
              <Popover
                inline
                open
                title="Atendimento #1048"
                trigger={<IconButton icon="help" label="Ver detalhes" />}
                width="md"
              >
                <div className="sb-batch5-popover-detail">
                  <InlineGroup compact><MetaText>Status</MetaText><Badge tone="success">Ativo</Badge></InlineGroup>
                  <InlineGroup compact><MetaText>Cliente</MetaText><strong>Joao Silva</strong></InlineGroup>
                  <InlineGroup compact><MetaText>Categoria</MetaText><strong>Suporte</strong></InlineGroup>
                  <InlineGroup compact><MetaText>Prioridade</MetaText><MetaText tone="warning">Alta</MetaText></InlineGroup>
                  <InlineGroup compact><MetaText>Responsavel</MetaText><strong>Sara Alves</strong></InlineGroup>
                </div>
              </Popover>
            </SourceItem>

            <SourceItem label="fechado/desabilitado">
              <div className="sb-batch5-mini-actions">
                <Popover trigger={<Button size="sm">Fechado</Button>} title="Fechado" width="sm">
                  <MetaText>Abre por clique ou foco.</MetaText>
                </Popover>
                <Popover open={false} trigger={<Button disabled size="sm">Desabilitado</Button>} title="Bloqueado" width="sm">
                  <MetaText>Trigger desabilitado nao abre.</MetaText>
                </Popover>
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
