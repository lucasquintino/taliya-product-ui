import type { Meta } from "@storybook/react-vite";

import { FieldGrid, Input, Panel, Select, Textarea } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FieldGrid> = {
  title: "Primitives / UI / FieldGrid",
  component: FieldGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch3SourceDescription}\n\nFieldGrid is the official responsive form-grid primitive for compact operational forms, modal forms, drawer field groups, and setup field layouts.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="two columns default">
          <Panel compact>
            <FieldGrid>
              <Input label="Nome" defaultValue="Ana Silva" />
              <Select
                label="Responsavel"
                defaultValue="recepcao"
                options={[
                  { value: "recepcao", label: "Recepcao" },
                  { value: "coordenacao", label: "Coordenacao" },
                  { value: "financeiro", label: "Financeiro" }
                ]}
              />
              <Input label="Origem" defaultValue="WhatsApp" />
              <Input label="Prazo" defaultValue="Hoje" />
            </FieldGrid>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="single column">
          <Panel compact>
            <FieldGrid columns={1}>
              <Input label="Titulo" defaultValue="Confirmar reposicao da Ana" />
              <Textarea label="Contexto" defaultValue="Ana pediu reposicao e precisa confirmar horario." />
            </FieldGrid>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="three columns">
          <Panel compact>
            <FieldGrid columns={3}>
              <Input label="Dono" defaultValue="Recepcao" />
              <Select
                label="Status"
                defaultValue="aberta"
                options={[
                  { value: "aberta", label: "Aberta" },
                  { value: "andamento", label: "Em andamento" },
                  { value: "concluida", label: "Concluida" }
                ]}
              />
              <Select
                label="Prioridade"
                defaultValue="media"
                options={[
                  { value: "baixa", label: "Baixa" },
                  { value: "media", label: "Media" },
                  { value: "alta", label: "Alta" }
                ]}
              />
            </FieldGrid>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="four columns compact">
          <Panel compact>
            <FieldGrid columns={4}>
              <Select
                label="Prazo"
                defaultValue="2h"
                options={[
                  { value: "2h", label: "Até 2 horas antes" },
                  { value: "1h", label: "Até 1 hora antes" }
                ]}
              />
              <Select
                label="Próximo passo"
                defaultValue="reposicao"
                options={[
                  { value: "reposicao", label: "Criar reposição" },
                  { value: "equipe", label: "Chamar equipe" }
                ]}
              />
              <Input label="Responsáveis" defaultValue="Recepção, Coordenação" />
              <Textarea label="Template" defaultValue="Mensagem curta para o aluno." density="compact" />
            </FieldGrid>
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
