import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProfileTabsPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta = { title: "CRM / Students / ProfileTabsPanel", parameters: { layout: "fullscreen", docs: { disable: true } } };
export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  render: () => <PrimitivePage><main className="sb-source-page"><ProfileTabsPanel style={{ width: 480 }} items={[{ value: "summary", label: "Resumo", content: null }, { value: "agenda", label: "Agenda", content: null }, { value: "finance", label: "Financeiro", content: null }, { value: "history", label: "Histórico", content: null }, { value: "documents", label: "Documentos", content: null }, { value: "permissions", label: "Permissões", content: null }]} /></main></PrimitivePage>,
  play: async () => undefined
};
