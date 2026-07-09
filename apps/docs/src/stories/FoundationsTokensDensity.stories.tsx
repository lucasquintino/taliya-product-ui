import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, ScalePreview, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Density"
};

export default meta;

const densityEntries = entriesByPrefix(["density."]);
const controlEntries = entriesByPrefix(["control."]);

export function Default() {
  return (
    <TokenPage title="Density" description="Dimensoes base e anatomia reutilizavel dos primitives: controles, rows, forms, overlays, charts, calendario, flow e timeline.">
      <TokenSection title="Density scale" description="A densidade sustenta CRM operacional: legivel, compacto e previsivel.">
        <ScalePreview entries={densityEntries} kind="density" />
      </TokenSection>

      <TokenSection title="Control and primitive anatomy tokens" description="Valores extraidos das imagens aprovadas que primitives e componentes devem consumir antes de qualquer batch novo.">
        <TokenTable entries={controlEntries} />
      </TokenSection>
    </TokenPage>
  );
}
