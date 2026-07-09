import type { Meta } from "@storybook/react-vite";

import { allTokens } from "@taliya/tokens";
import { entriesByPrefix, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Focus"
};

export default meta;

export function Default() {
  return (
    <TokenPage title="Focus" description="Tokens de foco para manter acessibilidade visivel em botoes, inputs, tabs, menus e controles densos.">
      <TokenSection title="Focus ring preview" description="Foco deve aparecer em superficies claras e controles selecionados.">
        <div className="sb-token-focus-row">
          <button className="sb-token-focus-demo" type="button">
            Neutral focus
          </button>
          <button
            className="sb-token-focus-demo sb-token-focus-demo--selected"
            style={{ boxShadow: allTokens["focus.ring.shadow"] }}
            type="button"
          >
            Selected focus
          </button>
        </div>
      </TokenSection>

      <TokenSection title="Todos os focus tokens" description="Use estes tokens em qualquer componente interativo novo.">
        <TokenTable entries={entriesByPrefix(["focus."])} />
      </TokenSection>
    </TokenPage>
  );
}
