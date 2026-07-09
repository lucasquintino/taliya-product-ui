import type { Meta } from "@storybook/react-vite";

import { allTokens } from "@taliya/tokens";
import { entriesByPrefix, TokenGrid, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Color"
};

export default meta;

const image01Palette = [
  {
    name: "image-01.black",
    value: allTokens["raw.black.900"],
    usage: "Texto principal, preenchimento selecionado e icones fortes.",
    source: "01_round-1_visual-dna-tokens_aprovada"
  },
  {
    name: "image-01.gray",
    value: allTokens["raw.gray.100"],
    usage: "Cinza extraido da prancha 01 para canvas/fundo aprovado.",
    source: "01_round-1_visual-dna-tokens_aprovada"
  },
  {
    name: "image-01.blue",
    value: allTokens["raw.blue.400"],
    usage: "Azul base da marca e acentos funcionais suaves.",
    source: "01_round-1_visual-dna-tokens_aprovada"
  },
  {
    name: "image-01.red",
    value: allTokens["raw.red.400"],
    usage: "Vermelho base para risco, erro e excecao suave.",
    source: "01_round-1_visual-dna-tokens_aprovada"
  },
  {
    name: "image-01.white",
    value: allTokens["raw.white"],
    usage: "Superficies elevadas, paineis e controles claros.",
    source: "01_round-1_visual-dna-tokens_aprovada"
  }
];

const semanticColorUsage = [
  { name: "color.text.primary", value: allTokens["color.text.primary"], usage: "Headings, labels fortes e conteudo principal." },
  { name: "color.text.secondary", value: allTokens["color.text.secondary"], usage: "Body, metadados relevantes e labels secundarios." },
  { name: "color.text.muted", value: allTokens["color.text.muted"], usage: "Captions, timestamps e informacao auxiliar." },
  { name: "color.text.disabled", value: allTokens["color.text.disabled"], usage: "Texto indisponivel ou controle desativado." },
  { name: "color.text.inverse", value: allTokens["color.text.inverse"], usage: "Texto sobre controles selecionados pretos." }
];

export function Default() {
  return (
    <TokenPage
      title="Color"
      description="Paleta extraida da prancha 01, expansoes canonicas para produto e aliases semanticos usados pela biblioteca."
    >
      <TokenSection title="Base color palette da imagem 01" description="Esta secao preserva a leitura visual da prancha aprovada.">
        <TokenGrid entries={image01Palette} preview="color" />
      </TokenSection>

      <TokenSection title="Raw tokens canonicos" description="Valores oficiais consumidos por tokens semanticos e componentes.">
        <TokenGrid entries={entriesByPrefix(["raw."])} preview="color" />
      </TokenSection>

      <TokenSection title="Texto, marca e acentos semanticos" description="Use estes nomes no produto em vez de escolher cores por hex.">
        <TokenGrid entries={[...semanticColorUsage, ...entriesByPrefix(["color.logo-dot.", "color.accent."])]} preview="color" />
      </TokenSection>

      <TokenSection title="CRM clone colors" description="Tokens extraidos das imagens aprovadas para shell, browser chrome e detalhes especificos de dominio.">
        <TokenGrid entries={entriesByPrefix(["color.crm-empty-shell.", "color.crm-browser.", "color.crm-finance.", "color.crm-sales."])} preview="color" />
      </TokenSection>

      <TokenSection title="CRM billing, access, subscription and usage colors" description="Cores especificas de componentes certificados nas imagens 65-77 e usage/cotas da imagem 68.">
        <TokenGrid entries={entriesByPrefix(["color.crm-subscription.", "color.crm-plan-summary.", "color.crm-checkout-payment-card.", "color.crm-invoice-table.", "color.crm-addon-card.", "color.crm-quota-progress.", "color.crm-usage-ledger."])} preview="color" />
      </TokenSection>

      <TokenSection title="CRM config and approval colors" description="Cores extraidas dos componentes certificados de configuracoes, permissoes, regras e aprovacoes.">
        <TokenGrid entries={entriesByPrefix(["color.crm-settings-hub-card.", "color.crm-settings-section.", "color.crm-conversation-list.", "color.crm-permission-matrix.", "color.crm-integration-status-row.", "color.crm-unsaved-changes-bar.", "color.crm-rule-row.", "color.crm-impact-summary.", "color.crm-before-after-diff.", "color.crm-approval-panel."])} preview="color" />
      </TokenSection>

      <TokenSection title="Status, conectores e charts como valores de cor" description="Aqui aparecem apenas os valores. Componentes de badge, linha e grafico ficam fora de tokens.">
        <TokenTable entries={entriesByPrefix(["status.", "connector.", "chart."])} />
      </TokenSection>
    </TokenPage>
  );
}
