import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, TokenGrid, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Borders"
};

export default meta;

const borderColorEntries = entriesByPrefix(["border.color."]);
const borderEntries = entriesByPrefix(["border."]);

export function Default() {
  return (
    <TokenPage title="Borders" description="Larguras, estilos e cores de borda para paineis, cards, campos, foco e estados.">
      <TokenSection title="Border colors" description="Bordas devem ser sutis por padrao e mais fortes apenas para estado, selecao ou foco.">
        <TokenGrid entries={borderColorEntries} preview="color" />
      </TokenSection>

      <TokenSection title="Todos os border tokens" description="Inclui larguras, estilo dashed e cores semanticas.">
        <TokenTable entries={borderEntries} />
      </TokenSection>
    </TokenPage>
  );
}
