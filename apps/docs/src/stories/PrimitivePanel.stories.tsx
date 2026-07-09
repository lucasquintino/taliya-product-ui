import type { Meta } from "@storybook/react-vite";

import {
  Avatar,
  Button,
  Card,
  Chip,
  ConnectorLine,
  IconButton,
  InlineGroup,
  List,
  ListIcon,
  ListItem,
  MetaText,
  Panel,
  PanelHeader
} from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";
import image79Avatar from "../assets/image79-avatar.png";

const meta: Meta<typeof Panel> = {
  title: "Primitives / UI / Panel",
  component: Panel,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-panel" number="7" title="Painel grande / canvas">
          <Panel className="sb-batch4-panel-canvas">
            <PanelHeader
              action={
                <div className="sb-batch4-panel-actions">
                  <Chip tone="info">3 etapas</Chip>
                  <IconButton icon="plus" label="Adicionar" size="sm" />
                  <IconButton icon="upload" label="Exportar" size="sm" />
                  <IconButton icon="calendar" label="Agendar" size="sm" />
                </div>
              }
              description="Header oficial com titulo, descricao, status e acoes"
              title="Nova jornada de atendimento"
            />
            <Panel compact>
              <PanelHeader compact meta={<Chip tone="success">Padrao</Chip>} title="PanelHeader compacto" />
              <List dense>
                <ListItem meta="slot reutilizavel" title="Titulo e meta ficam alinhados ao sistema" />
                <ListItem meta="sem CSS local de header" title="Status visual usa Chip oficial" trailing={<Chip tone="warning">2</Chip>} />
              </List>
            </Panel>
            <Panel minHeight="md">
              <PanelHeader compact meta={<Chip tone="info">260px</Chip>} title="Altura minima oficial" />
              <List dense>
                <ListItem meta="minHeight='md'" title="Painel operacional com altura estavel" />
                <ListItem meta="sem CSS local" title="Usado em grids de cockpit e paineis recorrentes" />
              </List>
            </Panel>
            <div className="sb-batch4-panel-header">
              <MetaText>Controles independentes tambem podem ficar em layouts customizados</MetaText>
              <div className="sb-batch4-panel-actions">
                <IconButton icon="plus" label="Adicionar" size="sm" />
                <IconButton icon="upload" label="Exportar" size="sm" />
                <IconButton icon="calendar" label="Agendar" size="sm" />
              </div>
            </div>
            <div className="sb-batch4-panel-row">
              <ConnectorLine className="sb-batch4-panel-connector sb-batch4-panel-connector--left-blue" variant="elbow" />
              <ConnectorLine className="sb-batch4-panel-connector sb-batch4-panel-connector--middle-blue" />
              <ConnectorLine className="sb-batch4-panel-connector sb-batch4-panel-connector--middle-red" tone="danger" variant="elbow" />
              <ConnectorLine className="sb-batch4-panel-connector sb-batch4-panel-connector--right-blue" variant="elbow" />
              <Card compact>
                <List dense>
                  <ListItem leading={<Avatar name="Niki Olson" size="xs" src={image79Avatar} />} meta="ao usuario" title="Atribuir atendimento" trailing={<IconButton icon="calendar" label="Agendar atribuicao" size="sm" />} />
                  <ListItem leading={<Avatar name="Sam Frank" size="xs" />} meta="do cliente" title="Registrar solicitacao" trailing={<IconButton icon="calendar" label="Agendar solicitacao" size="sm" />} />
                </List>
              </Card>
              <Card compact selected>
                <List dense>
                  <ListItem leading={<Avatar name="Sara Alves" size="xs" src={image79Avatar} />} meta="da necessidade" title="Identificar categoria" trailing={<InlineGroup><MetaText tone="success">ok</MetaText></InlineGroup>} />
                  <ListItem leading={<Avatar name="Nikol Clev" size="xs" />} title="Validar prioridade" trailing={<IconButton icon="calendar" label="Agendar prioridade" size="sm" />} />
                  <ListItem leading={<Avatar name="Maria Claro" size="xs" src={image79Avatar} />} title="Entender impacto" trailing={<InlineGroup><MetaText tone="success">ok</MetaText></InlineGroup>} />
                </List>
              </Card>
              <Card compact>
                <List dense>
                  <ListItem leading={<ListIcon icon="plus" tone="neutral" />} title="Verificar dependencias" trailing={<IconButton icon="calendar" label="Agendar dependencia" size="sm" />} />
                  <ListItem leading={<ListIcon icon="plus" tone="neutral" />} title="Definir acao" trailing={<IconButton icon="calendar" label="Agendar acao" size="sm" />} />
                  <ListItem leading={<Avatar name="Niki Olson" size="xs" src={image79Avatar} />} title="Comunicar cliente" trailing={<IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />} />
                </List>
              </Card>
            </div>
            <div className="sb-batch4-panel-header">
              <MetaText>Painel com surface, toolbar e cards internos</MetaText>
              <Button size="sm" variant="primary">Continuar</Button>
            </div>
          </Panel>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
