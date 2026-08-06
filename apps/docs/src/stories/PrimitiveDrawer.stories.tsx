import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import {
  Badge,
  Button,
  Chip,
  Drawer,
  DrawerSection,
  FieldGroup,
  InlineGroup,
  Input,
  List,
  ListIcon,
  ListItem,
  MetaText,
  PersonLabel,
  Select,
  SegmentedControl
} from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Drawer> = {
  title: "Primitives / UI / Drawer",
  component: Drawer,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

type DrawerMode = "detail" | "form" | "blocked" | "loading" | "non-dismissible";

const categoryOptions = [
  { value: "suporte", label: "Suporte" },
  { value: "agenda", label: "Agenda" },
  { value: "financeiro", label: "Financeiro" }
];

const priorityOptions = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" }
];

function DetailSections() {
  return (
    <>
      <DrawerSection title="Resumo">
        <List dense divided>
          <ListItem leading={<ListIcon icon="user" tone="neutral" />} title="Prioridade" trailing={<MetaText tone="danger">Alta</MetaText>} />
          <ListItem leading={<ListIcon icon="calendar" tone="neutral" />} title="Prazo" trailing={<MetaText>Hoje, 10:30</MetaText>} />
          <ListItem leading={<ListIcon icon="user" tone="neutral" />} title="Responsavel" trailing={<PersonLabel name="Mariana" />} />
          <ListItem leading={<ListIcon icon="graduation" tone="neutral" />} title="Origem" trailing={<MetaText>Agenda / Reposicoes</MetaText>} />
        </List>
      </DrawerSection>
      <DrawerSection title="Descricao" variant="divided">
        <p>Confirmar se a aluna aceita o horario sugerido para reposicao.</p>
        <InlineGroup compact wrap>
          <Chip showDot tone="info">Quinta, 09:00</Chip>
          <Chip showDot tone="neutral">Reformer Iniciante</Chip>
          <Chip showDot tone="success">1 vaga</Chip>
        </InlineGroup>
      </DrawerSection>
      <DrawerSection title="Checklist" variant="divided">
        <List dense>
          <ListItem leading={<ListIcon icon="circle" tone="neutral" />} title="Confirmar horario com a aluna" />
          <ListItem leading={<ListIcon icon="circle" tone="neutral" />} title="Reservar vaga se houver aceite" />
          <ListItem leading={<ListIcon icon="circle" tone="neutral" />} title="Atualizar status da reposicao" />
        </List>
      </DrawerSection>
      <DrawerSection title="Historico curto" variant="divided">
        <List dense>
          <ListItem meta="09:10" title="Ana pediu reposicao pelo WhatsApp" />
          <ListItem meta="09:14" title="Sistema nao encontrou vaga atual" />
          <ListItem meta="09:20" title="Recepcao assumiu a pendencia" />
        </List>
      </DrawerSection>
    </>
  );
}

function DetailFooter() {
  return (
    <>
      <Button leadingIcon="play" variant="primary">Abrir conversa</Button>
      <Button leadingIcon="check">Concluir</Button>
      <Button leadingIcon="calendar">Reagendar</Button>
      <Button leadingIcon="users">Delegar</Button>
      <Button leadingIcon="link">Abrir origem</Button>
    </>
  );
}

function FormSections() {
  return (
    <>
      <FieldGroup title="Dados do atendimento">
        <Input fieldSize="sm" label="Nome" readOnly trailingIcon="search" value="Joao Silva" />
        <Select fieldSize="sm" label="Categoria" options={categoryOptions} value="suporte" />
        <Select fieldSize="sm" label="Status" options={[{ value: "ativo", label: "Ativo" }, { value: "pausado", label: "Pausado" }]} value="ativo" />
        <SegmentedControl compact label="Prioridade" options={priorityOptions} value="alta" />
      </FieldGroup>
      <DrawerSection title="Responsavel" variant="divided">
        <List dense>
          <ListItem leading={<PersonLabel name="Sara Alves" />} selected title="Sara Alves" trailing={<ListIcon icon="check" tone="neutral" />} />
          <ListItem leading={<PersonLabel name="Nadia Cruz" />} title="Nadia Cruz" />
          <ListItem leading={<PersonLabel name="Joao Costa" />} title="Joao Costa" />
        </List>
      </DrawerSection>
    </>
  );
}

export function AllStates() {
  const [mode, setMode] = useState<DrawerMode>("detail");
  const [open, setOpen] = useState(false);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-drawer" number="2" title="Drawer lateral">
          <div className="sb-batch5-trigger-row">
            {(["detail", "form", "blocked", "loading", "non-dismissible"] as DrawerMode[]).map((item) => (
              <SourceItem key={item} label={item}>
                <Button onClick={() => { setMode(item); setOpen(true); }} size="sm">
                  Abrir {item}
                </Button>
              </SourceItem>
            ))}
          </div>

        </SourcePanel>
      </main>

      <Drawer
        blockedReason={mode === "blocked" ? "Este registro precisa de revisao humana antes da acao." : undefined}
        dismissible={mode !== "non-dismissible"}
        footer={
          mode === "detail" || mode === "non-dismissible" ? (
            <DetailFooter />
          ) : (
            <>
              <Button onClick={() => setOpen(false)} variant="secondary">Cancelar</Button>
              <Button loading={mode === "loading"} onClick={() => setOpen(false)} variant="primary">Salvar</Button>
            </>
          )
        }
        footerLayout={mode === "detail" || mode === "non-dismissible" ? "grid" : "row"}
        headerMeta={mode === "detail" ? <Chip tone="warning">Pendente</Chip> : undefined}
        headerStatus={mode === "form" ? <Badge tone="info">Editar</Badge> : <Badge tone="info">Tarefa</Badge>}
        loading={mode === "loading"}
        onOpenChange={setOpen}
        open={open}
        title={mode === "form" ? "Editar cliente" : "Confirmar reposicao com Ana Paula"}
      >
        {mode === "form" ? <FormSections /> : <DetailSections />}
      </Drawer>
    </PrimitivePage>
  );
}
