import type { Meta } from "@storybook/react-vite";
import { GuardrailPolicyPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof GuardrailPolicyPanel> = { title: "CRM / Config / GuardrailPolicyPanel", component: GuardrailPolicyPanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><div className="sb-source-panel sb-source-panel--batch8-source sb-source-panel--batch8-metrics"><GuardrailPolicyPanel onAction={() => undefined} onPolicyChange={() => undefined} /></div></main></PrimitivePage>;
}
