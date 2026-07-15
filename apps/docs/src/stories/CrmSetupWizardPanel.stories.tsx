import type { Meta } from "@storybook/react-vite";
import { SetupWizardPanel } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof SetupWizardPanel> = { title: "CRM / Setup / SetupWizardPanel", component: SetupWizardPanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  return <PrimitivePage><main className="sb-source-page"><SetupWizardPanel onStepSelect={() => undefined} style={{ width: 558 }} /></main></PrimitivePage>;
}
