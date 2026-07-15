import type { Meta, StoryObj } from "@storybook/react-vite";
import { EvaluationQualityPanel } from "@taliya/crm";
const meta = { title: "CRM / Agents / EvaluationQualityPanel", component: EvaluationQualityPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof EvaluationQualityPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "423px" } } };
