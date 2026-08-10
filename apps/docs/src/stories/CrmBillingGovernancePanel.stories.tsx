import type { Meta } from "@storybook/react-vite";
import { BillingGovernancePanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

import { playFirstInteractiveControl } from "./story-play";
const meta: Meta<typeof BillingGovernancePanel> = { title: "CRM / Billing / BillingGovernancePanel", component: BillingGovernancePanel, parameters: { layout: "fullscreen" } , play: playFirstInteractiveControl };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><div className="sb-source-panel sb-source-panel--batch8-source sb-source-panel--batch8-metrics"><BillingGovernancePanel onAction={() => undefined} /></div></main></PrimitivePage>;
}
