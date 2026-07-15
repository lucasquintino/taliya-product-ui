import type { Meta } from "@storybook/react-vite";
import { ConsentPreferencesPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ConsentPreferencesPanel> = { title: "CRM / Students / ConsentPreferencesPanel", component: ConsentPreferencesPanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><ConsentPreferencesPanel onPreferenceChange={() => undefined} onViewHistory={() => undefined} style={{ width: 350 }} /></main></PrimitivePage>;
}
