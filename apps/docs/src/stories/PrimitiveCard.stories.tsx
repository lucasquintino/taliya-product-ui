import type { Meta } from "@storybook/react-vite";

import { Avatar, Badge, Card, Icon, IconButton, InlineGroup, List, ListItem, MetaText } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";
import image79Avatar from "../assets/image79-avatar.png";

const meta: Meta<typeof Card> = {
  title: "Primitives / UI / Card",
  component: Card,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-mini-card" number="6" title="Mini card de status">
          <div className="sb-batch4-mini-card-grid">
            <Card compact pattern="mini">
              <strong>Proximo passo</strong>
              <MetaText>2 em breve</MetaText>
            </Card>
            <Card compact pattern="mini" tone="inverse">
              <strong>Em andamento</strong>
              <MetaText>3 casos</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>12</strong>
              <MetaText>Resolvidos</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>Verificacao</strong>
              <MetaText>1 pendente</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>Comunicacao</strong>
              <MetaText>5 nao lidas</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>Verificacao</strong>
              <MetaText>1 pendente</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>Notificacao</strong>
              <MetaText>3 enviadas</MetaText>
            </Card>
            <Card compact pattern="mini">
              <strong>Satisfacao</strong>
              <MetaText>4 feedbacks</MetaText>
            </Card>
          </div>
        </SourcePanel>

        <SourcePanel className="sb-source-panel--batch4-summary-card" number="7" title="Cards de resumo operacional">
          <div className="sb-batch4-card-grid">
            <Card pattern="summary" tone="inverse">
              <Icon name="inbox" />
              <MetaText>Casos abertos</MetaText>
              <strong>128</strong>
              <MetaText tone="success">+12 hoje</MetaText>
            </Card>
            <Card pattern="summary">
              <Icon name="clock" />
              <MetaText>Em atraso</MetaText>
              <strong>23</strong>
              <MetaText tone="danger">+5 hoje</MetaText>
            </Card>
            <Card pattern="summary" selected>
              <Icon name="calendar" />
              <MetaText>Hoje</MetaText>
              <strong>36</strong>
              <MetaText tone="success">+8 vs ontem</MetaText>
            </Card>
            <Card pattern="summary">
              <Icon name="user" />
              <MetaText>Aguardando cliente</MetaText>
              <strong>18</strong>
              <MetaText tone="warning">-3 vs ontem</MetaText>
            </Card>
            <Card pattern="summary">
              <Icon name="shield" />
              <MetaText>SLA em risco</MetaText>
              <strong>7</strong>
              <MetaText tone="danger">+2 vs ontem</MetaText>
            </Card>
            <Card pattern="summary">
              <Icon name="check" />
              <MetaText>Resolvidas</MetaText>
              <strong>54</strong>
              <MetaText tone="success">+11 hoje</MetaText>
            </Card>
          </div>
        </SourcePanel>

        <SourcePanel className="sb-source-panel--batch4-card" number="5" title="Card de fluxo">
          <div className="sb-batch4-card-variants">
            <Card compact pattern="flow">
              <List dense>
                <ListItem leading={<Icon name="check" />} meta="ao usuario" title="Atribuir atendimento" trailing={<IconButton icon="calendar" label="Agendar atendimento" size="sm" />} />
                <ListItem leading={<Icon name="check" />} meta="do cliente" title="Registrar solicitacao" trailing={<IconButton icon="calendar" label="Agendar solicitacao" size="sm" />} />
              </List>
            </Card>
            <Card compact pattern="flow">
              <List dense>
                <ListItem leading={<Avatar name="Niki Olson" size="xs" src={image79Avatar} />} meta="da necessidade" title="Identificar categoria" trailing={<Icon name="check" />} />
                <ListItem leading={<Avatar name="Sam Frank" size="xs" />} title="Validar prioridade" trailing={<IconButton icon="calendar" label="Agendar prioridade" size="sm" />} />
                <ListItem leading={<Avatar name="Niki Olson" size="xs" src={image79Avatar} />} title="Entender impacto" trailing={<Icon name="check" />} />
                <ListItem leading={<Avatar name="Sara Alves" size="xs" src={image79Avatar} />} title="Alocar responsavel" trailing={<IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />} />
              </List>
            </Card>
            <Card compact pattern="flow">
              <Avatar name="Niki Olson" size="md" src={image79Avatar} />
              <strong>Comunicar cliente sobre o andamento</strong>
              <IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />
            </Card>
            <Card compact pattern="flow" selected>
              <Avatar name="Sam Frank" size="sm" />
              <strong>Estimar proximo passo</strong>
              <InlineGroup>
                <Badge tone="success">OK</Badge>
                <Icon name="check" />
              </InlineGroup>
            </Card>
            <Card compact interactive pattern="flow">
              <IconButton icon="plus" label="Adicionar dependencia" />
              <strong>Verificar dependencias</strong>
            </Card>
          </div>
        </SourcePanel>

        <SourcePanel className="sb-source-panel--batch4-mini-card" number="6+" title="Estados adicionais">
          <div className="sb-batch4-mini-card-grid sb-batch4-mini-card-grid--states">
            <Card compact interactive pattern="mini">
              <strong>Interativo</strong>
              <MetaText>Hover/foco</MetaText>
            </Card>
            <Card compact pattern="mini" selected>
              <strong>Selecionado</strong>
              <MetaText>Atual</MetaText>
            </Card>
            <Card compact pattern="mini" tone="danger">
              <strong>Atencao</strong>
              <MetaText tone="danger">Revisar</MetaText>
            </Card>
            <Card compact pattern="mini" disabled>
              <strong>Bloqueado</strong>
              <MetaText>Sem permissao</MetaText>
            </Card>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
