import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, ScalePreview, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Spacing"
};

export default meta;

const spacingEntries = entriesByPrefix(["space."]);
const layoutEntries = entriesByPrefix(["layout."]);

export function Default() {
  return (
    <TokenPage title="Spacing" description="Escala de espacamento usada por layout, paineis, gaps, paddings e composicoes densas.">
      <TokenSection title="Base spacing scale" description="Equivalente tokenizado do bloco 3 da imagem 01.">
        <ScalePreview entries={spacingEntries} kind="spacing" />
      </TokenSection>

      <TokenSection title="Layout spacing aliases" description="Aliases semanticos para sidebar, topbar, drawers e areas de pagina.">
        <TokenTable entries={layoutEntries} />
      </TokenSection>
    </TokenPage>
  );
}
