import type { Meta } from "@storybook/react-vite";

import { groupCountRows, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Overview"
};

export default meta;

export function Default() {
  return (
    <TokenPage
      title="Token Overview"
      description="Mapa geral dos fundamentos visuais do Taliya Product UI. Esta area documenta valores; componentes reais vivem em Primitives, Components e CRM."
    >
      <TokenSection title="Categorias oficiais" description="Cada item abaixo possui uma pagina propria em Foundations / Tokens.">
        <TokenTable entries={groupCountRows()} />
      </TokenSection>

      <TokenSection title="Fronteira da categoria" description="O que fica aqui e o que deve ir para componentes.">
        <div className="sb-token-rule-grid">
          <article>
            <h3>Fica em tokens</h3>
            <p>Cor, tipografia, espacamento, radius, elevation, borda, superficie, status, foco, motion, densidade e anatomia reutilizavel de primitives.</p>
          </article>
          <article>
            <h3>Sai de tokens</h3>
            <p>Circular icon buttons, cards, panels, avatars, badges, connector lines e usage examples. Esses itens viram primitives ou componentes compostos.</p>
          </article>
          <article>
            <h3>Fonte visual</h3>
            <p>A prancha 01 guia os fundamentos base. As demais imagens expandem estados, conectores, charts e densidades para cobrir o CRM real.</p>
          </article>
          <article>
            <h3>Regra de batch</h3>
            <p>Nenhum componente novo entra sem antes extrair tokens e contrato visual da imagem aprovada correspondente.</p>
          </article>
        </div>
      </TokenSection>
    </TokenPage>
  );
}
