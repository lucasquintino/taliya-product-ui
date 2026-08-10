import type { Meta } from "@storybook/react-vite";
import { SensitiveTimelinePanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

import { playFirstInteractiveControl } from "./story-play";
const meta: Meta<typeof SensitiveTimelinePanel> = { title: "CRM / Students / SensitiveTimelinePanel", component: SensitiveTimelinePanel, parameters: { layout: "fullscreen" } , play: playFirstInteractiveControl };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><SensitiveTimelinePanel onEventAction={() => undefined} style={{ width: 350 }} /></main></PrimitivePage>;
}
