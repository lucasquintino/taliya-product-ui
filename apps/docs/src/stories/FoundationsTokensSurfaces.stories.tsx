import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, TokenGrid, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Surfaces"
};

export default meta;

const surfaceEntries = entriesByPrefix(["surface."]);

export function Default() {
  return (
    <TokenPage
      title="Surfaces"
      description="Superficies do produto: canvas cinza, paineis translucidos, cards, controles, campos, overlays e estados."
    >
      <TokenSection title="Surface scale" description="A camada visual do CRM e formada por cinza frio + brancos translucidos.">
        <TokenGrid entries={surfaceEntries} preview="color" />
      </TokenSection>

      <TokenSection title="Todos os surface tokens" description="Componentes devem consumir estes aliases em vez de valores soltos.">
        <TokenTable entries={surfaceEntries} />
      </TokenSection>
    </TokenPage>
  );
}
