import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Button, ButtonGroup, Input, Modal, Select, SegmentedControl } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Modal> = {
  title: "Primitives / UI / Modal",
  component: Modal,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

const categoryOptions = [
  { value: "suporte", label: "Suporte" },
  { value: "vendas", label: "Vendas" },
  { value: "financeiro", label: "Financeiro" }
];

export function AllStates() {
  const [variant, setVariant] = useState<
    "simple" | "form" | "destructive" | "compact" | "loading" | "blocked" | "disabled"
  >("form");
  const [open, setOpen] = useState(false);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-overlay" number="1" title="Modal">
          <div className="sb-batch5-trigger-row">
            <SourceItem label="Confirmacao simples">
              <Button onClick={() => { setVariant("simple"); setOpen(true); }}>Abrir simples</Button>
            </SourceItem>
            <SourceItem label="Formulario medio">
              <Button onClick={() => { setVariant("form"); setOpen(true); }} variant="primary">Abrir formulario</Button>
            </SourceItem>
            <SourceItem label="Acao destrutiva">
              <Button onClick={() => { setVariant("destructive"); setOpen(true); }} variant="destructive">Abrir destrutivo</Button>
            </SourceItem>
            <SourceItem label="Compact/loading/blocked/disabled">
              <div className="sb-batch5-mini-actions">
                <Button onClick={() => { setVariant("compact"); setOpen(true); }} size="sm">Compact</Button>
                <Button onClick={() => { setVariant("loading"); setOpen(true); }} size="sm">Loading</Button>
                <Button onClick={() => { setVariant("blocked"); setOpen(true); }} size="sm">Blocked</Button>
                <Button onClick={() => { setVariant("disabled"); setOpen(true); }} size="sm">Disabled</Button>
              </div>
            </SourceItem>
          </div>
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Confirmacao simples">
              <Modal
                inline
                description="Deseja salvar as alteracoes realizadas?"
                dismissible={false}
                footer={
                  <ButtonGroup align="end">
                    <Button size="sm" variant="secondary">Cancelar</Button>
                    <Button size="sm" variant="primary">Salvar</Button>
                  </ButtonGroup>
                }
                icon="checkCircle"
                open
                size="sm"
                title="Salvar alteracoes?"
                titleHidden
              />
            </SourceItem>
            <SourceItem label="Formulario medio">
              <Modal
                inline
                footer={
                  <ButtonGroup align="end">
                    <Button size="sm" variant="secondary">Cancelar</Button>
                    <Button size="sm" variant="primary">Salvar</Button>
                  </ButtonGroup>
                }
                open
                title="Novo atendimento"
                variant="form"
              >
                <Input fieldSize="sm" label="Nome do cliente" value="Joao Silva" readOnly trailingIcon="search" />
                <Select fieldSize="sm" label="Categoria" options={categoryOptions} value="suporte" />
              </Modal>
            </SourceItem>
            <SourceItem label="Acao destrutiva">
              <Modal
                alert
                inline
                description="Essa acao nao podera ser desfeita."
                dismissible={false}
                footer={
                  <ButtonGroup align="end">
                    <Button size="sm" variant="secondary">Cancelar</Button>
                    <Button size="sm" variant="destructive">Excluir</Button>
                  </ButtonGroup>
                }
                icon="trash"
                open
                size="sm"
                title="Excluir este atendimento?"
              />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>

      {variant === "simple" || variant === "compact" || variant === "loading" || variant === "blocked" || variant === "disabled" ? (
        <Modal
          description="Deseja salvar as alteracoes realizadas?"
          footer={
            <ButtonGroup align="end">
              <Button onClick={() => setOpen(false)} size="sm" variant="secondary">Cancelar</Button>
              <Button
                blockedReason={variant === "blocked" ? "Aguarde a revisao humana." : undefined}
                disabled={variant === "disabled"}
                loading={variant === "loading"}
                onClick={() => setOpen(false)}
                size="sm"
                variant="primary"
              >
                Salvar
              </Button>
            </ButtonGroup>
          }
          icon="checkCircle"
          onOpenChange={setOpen}
          open={open}
          size="sm"
          title={variant === "compact" ? "Salvar?" : "Salvar alteracoes?"}
          titleHidden={variant !== "compact"}
        />
      ) : null}

      {variant === "form" ? (
        <Modal
          footer={
            <ButtonGroup align="end">
              <Button onClick={() => setOpen(false)} size="sm" variant="secondary">Cancelar</Button>
              <Button onClick={() => setOpen(false)} size="sm" variant="primary">Salvar</Button>
            </ButtonGroup>
          }
          onOpenChange={setOpen}
          open={open}
          title="Novo atendimento"
          variant="form"
        >
          <Input fieldSize="sm" label="Nome do cliente" value="Joao Silva" readOnly trailingIcon="search" />
          <Select fieldSize="sm" label="Categoria" options={categoryOptions} value="suporte" />
          <SegmentedControl
            compact
            label="Prioridade"
            options={[
              { value: "baixa", label: "Baixa" },
              { value: "media", label: "Media" },
              { value: "alta", label: "Alta" }
            ]}
            value="media"
          />
        </Modal>
      ) : null}

      {variant === "destructive" ? (
        <Modal
          alert
          description="Essa acao nao podera ser desfeita."
          footer={
            <ButtonGroup align="end">
              <Button onClick={() => setOpen(false)} size="sm" variant="secondary">Cancelar</Button>
              <Button onClick={() => setOpen(false)} size="sm" variant="destructive">Excluir</Button>
            </ButtonGroup>
          }
          icon="trash"
          onOpenChange={setOpen}
          open={open}
          size="sm"
          title="Excluir este atendimento?"
        />
      ) : null}
    </PrimitivePage>
  );
}
