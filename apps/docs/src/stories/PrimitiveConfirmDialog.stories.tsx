import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Button, Chip, ConfirmDialog, InlineGroup, List, ListItem, MetaText } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Primitives / UI / ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

type ConfirmVariant = "neutral" | "destructive" | "sensitive" | "summary" | "blocked" | "loading";

export function AllStates() {
  const [variant, setVariant] = useState<ConfirmVariant>("summary");
  const [open, setOpen] = useState(false);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-confirm" number="6" title="Confirmacao">
          <div className="sb-batch5-trigger-row">
            {(["neutral", "destructive", "sensitive", "summary", "blocked", "loading"] as ConfirmVariant[]).map((item) => (
              <SourceItem key={item} label={item}>
                <Button onClick={() => { setVariant(item); setOpen(true); }} size="sm" variant={item === "destructive" ? "destructive" : "secondary"}>
                  Abrir {item}
                </Button>
              </SourceItem>
            ))}
          </div>
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Acao sensivel">
              <ConfirmDialog
                cancelLabel="Nao"
                confirmLabel="Sim"
                description="Deseja continuar com esta acao?"
                inline
                open
                title="Marcar como concluida?"
              />
            </SourceItem>
            <SourceItem label="Destrutiva">
              <ConfirmDialog
                cancelLabel="Cancelar"
                confirmLabel="Excluir"
                description="Excluir este registro? Esta acao nao podera ser desfeita."
                destructive
                inline
                open
                title="Deseja realmente excluir?"
              />
            </SourceItem>
            <SourceItem label="Resumo da acao">
              <ConfirmDialog
                cancelLabel="Cancelar"
                confirmLabel="Confirmar"
                description="Deseja continuar com esta acao?"
                inline
                open
                summary={
                  <List dense divided>
                    <ListItem meta="Barra Faria - Agenda" title="Reposicao" />
                    <ListItem meta="Suporte" title="Gerencia" />
                  </List>
                }
                title="Resumo da acao"
              />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>

      <ConfirmDialog
        blockedReason={variant === "blocked" ? "Sem permissao para concluir este item" : undefined}
        cancelLabel={variant === "neutral" ? "Nao" : "Cancelar"}
        confirmLabel={variant === "destructive" ? "Excluir" : variant === "neutral" ? "Sim" : "Confirmar"}
        description={
          variant === "destructive"
            ? "Excluir este registro? Esta acao nao podera ser desfeita."
            : variant === "sensitive"
              ? "Esta acao altera o atendimento e precisa de confirmacao humana."
            : variant === "blocked"
              ? "A confirmacao esta bloqueada ate uma permissao ser concedida."
              : "Deseja continuar com esta acao?"
        }
        destructive={variant === "destructive"}
        loading={variant === "loading"}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        onOpenChange={setOpen}
        open={open}
        summary={
          variant === "summary" ? (
            <List dense divided>
              <ListItem
                meta={<InlineGroup><MetaText>Responsavel</MetaText><Chip tone="info">Suporte</Chip></InlineGroup>}
                title="Mover para concluidos"
              />
              <ListItem meta="Barra Faria - Agenda" title="Reposicao" />
              <ListItem meta="Alta prioridade" title="Confirmacao sensivel" />
            </List>
          ) : undefined
        }
        tone={variant === "sensitive" ? "sensitive" : undefined}
        title={
          variant === "neutral"
            ? "Marcar como concluida?"
            : variant === "destructive"
              ? "Deseja realmente excluir?"
              : variant === "sensitive"
                ? "Confirmar acao sensivel?"
                : "Resumo da acao"
        }
      />
    </PrimitivePage>
  );
}
