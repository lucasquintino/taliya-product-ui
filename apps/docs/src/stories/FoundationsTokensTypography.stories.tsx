import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, TokenPage, TokenSection, TokenTable, TypographyPreview } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Typography"
};

export default meta;

const typeEntries = entriesByPrefix(["type."]);

export function Default() {
  return (
    <TokenPage
      title="Typography"
      description="Escala tipografica do CRM: display para pranchas, titulos para produto e texto denso para operacao diaria."
    >
      <TokenSection title="Base type scale" description="Equivalente tokenizado do bloco 2 da imagem 01.">
        <TypographyPreview entries={typeEntries} />
      </TokenSection>

      <TokenSection title="Todos os tokens de tipo" description="Fonte, tamanho, line-height e peso disponiveis para os proximos componentes.">
        <TokenTable entries={typeEntries} />
      </TokenSection>
    </TokenPage>
  );
}
