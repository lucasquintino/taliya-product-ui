import type { Meta } from "@storybook/react-vite";
import { FallbackControlCard } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FallbackControlCard> = { title: "CRM / Config / FallbackControlCard", component: FallbackControlCard, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><div className="sb-source-panel sb-source-panel--batch8-source sb-source-panel--batch8-metrics"><FallbackControlCard onEnabledChange={() => undefined} /></div></main></PrimitivePage>;
}
