import type { Meta } from "@storybook/react-vite";
import { BillingGovernancePanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof BillingGovernancePanel> = { title: "CRM / Billing / BillingGovernancePanel", component: BillingGovernancePanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><div className="sb-source-panel sb-source-panel--batch8-source sb-source-panel--batch8-metrics"><BillingGovernancePanel onAction={() => undefined} /></div></main></PrimitivePage>;
}
