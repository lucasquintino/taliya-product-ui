import type { Meta } from "@storybook/react-vite";

import { Button, FieldGrid, FieldGroup, Input, Select, Textarea, Toggle } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FieldGroup> = {
  title: "Primitives / UI / FieldGroup",
  component: FieldGroup,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--compact-form" number="10" title="Formulario compacto">
          <FieldGroup className="sb-source-field-group-flat" inline>
            <div className="sb-source-compact-form">
              <Input label="Nome do cliente" defaultValue="Joao Silva" trailingIcon="user" />
              <Select
                label="Categoria"
                defaultValue="suporte"
                options={[
                  { value: "suporte", label: "Suporte" },
                  { value: "vendas", label: "Vendas" },
                  { value: "financeiro", label: "Financeiro" }
                ]}
              />
              <Textarea label="Descricao" defaultValue={"Solicitacao de acesso ao sistema para\nnovo colaborador da equipe."} />
              <div className="sb-source-inline-field">
                <span>Ativo</span>
                <Toggle aria-label="Ativo" pressed />
              </div>
              <Button size="sm" variant="secondary">Cancelar</Button>
              <Button size="sm" variant="primary">Salvar alteracoes</Button>
            </div>
          </FieldGroup>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="10B" title="Agrupamento reutilizavel">
          <FieldGroup title="Regras de acesso" description="Campos agrupados para configuracoes, filtros e setup.">
            <FieldGrid>
              <Input label="Responsavel" defaultValue="Joao Silva" />
              <Select
                label="Nivel"
                defaultValue="operacao"
                options={[
                  { value: "operacao", label: "Operacao" },
                  { value: "gestao", label: "Gestao" }
                ]}
              />
              <Textarea label="Observacao" helperText="Estado composto a partir dos primitives oficiais." />
            </FieldGrid>
          </FieldGroup>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
