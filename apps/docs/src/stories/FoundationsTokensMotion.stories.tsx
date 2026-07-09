import type { Meta } from "@storybook/react-vite";

import { entriesByPrefix, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Motion"
};

export default meta;

export function Default() {
  return (
    <TokenPage title="Motion" description="Duracoes e curvas para hover, press, selecao, drawers, modais e disclosure.">
      <TokenSection title="Motion tokens" description="Movimento deve ser curto e operacional, sem animacao decorativa em excesso.">
        <div className="sb-token-motion-list">
          {entriesByPrefix(["motion.duration."]).map((entry) => (
            <article className="sb-token-motion-row" key={entry.name}>
              <div className="sb-token-motion-track">
                <span style={{ animationDuration: entry.value }} />
              </div>
              <strong>{entry.name}</strong>
              <code>{entry.value}</code>
            </article>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Todos os motion tokens" description="Reduced motion zera duracoes nao essenciais no CSS global.">
        <TokenTable entries={entriesByPrefix(["motion."])} />
      </TokenSection>
    </TokenPage>
  );
}
