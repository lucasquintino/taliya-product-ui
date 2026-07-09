import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, TokenGrid, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Elevation"
};

export default meta;

const shadowEntries = entriesByPrefix(["shadow."]);

export function Default() {
  return (
    <TokenPage title="Elevation" description="Sombras e elevacao para cards, paineis, overlays, frames e controles flutuantes.">
      <TokenSection title="Base shadows / elevation" description="Equivalente tokenizado do bloco 5 da imagem 01.">
        <TokenGrid entries={shadowEntries} preview="shadow" />
      </TokenSection>

      <TokenSection title="Valores de sombra" description="Os valores legados continuam presentes como aliases enquanto migramos os componentes.">
        <TokenTable entries={shadowEntries} />
      </TokenSection>
    </TokenPage>
  );
}
