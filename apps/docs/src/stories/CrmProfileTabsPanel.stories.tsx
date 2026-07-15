import type { Meta } from "@storybook/react-vite";
import { ProfileTabsPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ProfileTabsPanel> = { title: "CRM / Students / ProfileTabsPanel", component: ProfileTabsPanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><ProfileTabsPanel onValueChange={() => undefined} style={{ width: 480 }} /></main></PrimitivePage>;
}
