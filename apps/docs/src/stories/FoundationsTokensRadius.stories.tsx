import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, ScalePreview, TokenGrid, TokenPage, TokenSection } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Radius"
};

export default meta;

const radiusEntries = entriesByPrefix(["radius."]);

export function Default() {
  return (
    <TokenPage title="Radius" description="Escala de arredondamento para badges, controles, cards, paineis, frames e circulos.">
      <TokenSection title="Base radius scale" description="Equivalente tokenizado do bloco 4 da imagem 01.">
        <ScalePreview entries={radiusEntries} kind="radius" />
      </TokenSection>

      <TokenSection title="Todos os radius tokens" description="Use o menor raio que preserve a gramatica aprovada da interface.">
        <TokenGrid entries={radiusEntries} preview="radius" />
      </TokenSection>
    </TokenPage>
  );
}
