import type { Meta } from "@storybook/react-vite";
import { GovernanceAuditPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

import { playFirstInteractiveControl } from "./story-play";
const meta: Meta<typeof GovernanceAuditPanel> = { title: "CRM / Timeline / GovernanceAuditPanel", component: GovernanceAuditPanel, parameters: { layout: "fullscreen" } , play: playFirstInteractiveControl };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><div className="sb-source-panel sb-source-panel--batch8-source sb-source-panel--batch8-metrics"><GovernanceAuditPanel onAction={() => undefined} /></div></main></PrimitivePage>;
}
