import type { Meta } from "@storybook/react-vite";

import { Textarea } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Textarea> = {
  title: "Primitives / UI / Textarea",
  component: Textarea,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--textarea" number="2" title="Textarea">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Padrao">
              <Textarea aria-label="Padrao" placeholder="Digite sua mensagem..." />
            </SourceItem>
            <SourceItem label="Foco">
              <Textarea aria-label="Foco" className="is-focus-visible" defaultValue={"Digite sua\nmensagem..."} />
            </SourceItem>
            <SourceItem label="Preenchido">
              <Textarea aria-label="Preenchido" defaultValue={"Resumo do atendimento\ncom o cliente. Detalhes\nimportantes registrados."} />
            </SourceItem>
            <SourceItem label="Compacto">
              <Textarea aria-label="Compacto" defaultValue="Preview curto da mensagem." density="compact" />
            </SourceItem>
            <SourceItem label="Erro">
              <Textarea aria-label="Erro" defaultValue={"Resumo do atendimento\ncom o cliente."} error="Campo obrigatorio." />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="2B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Helper">
              <Textarea aria-label="Helper" helperText="Use ate 240 caracteres." placeholder="Digite sua mensagem..." />
            </SourceItem>
            <SourceItem label="Read-only">
              <Textarea aria-label="Read-only" defaultValue={"Resumo bloqueado\npara revisao."} readOnly />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <Textarea aria-label="Bloqueado" blockedReason="Sem permissao para editar." defaultValue="Texto protegido." />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <Textarea aria-label="Desabilitado" defaultValue="Mensagem indisponivel." disabled />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
