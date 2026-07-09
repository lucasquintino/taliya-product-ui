import type { Meta } from "@storybook/react-vite";

import { allTokens, statusNames } from "@taliya/tokens";
import { entriesByPrefix, TokenPage, TokenSection, TokenTable } from "./tokenStoryUtils";

const meta: Meta = {
  title: "Foundations / Tokens / Status"
};

export default meta;

export function Default() {
  return (
    <TokenPage title="Status" description="Estados semanticos que alimentam chips, badges, alerts, progresso e estados operacionais.">
      <TokenSection title="Status scale" description="Cor nunca deve ser o unico sinal: componentes devem combinar label, iconografia e contexto.">
        <div className="sb-token-status-grid">
          {statusNames.map((status) => (
            <article
              className="sb-token-status-card"
              key={status}
              style={{
                background: allTokens[`status.${status}.bg`],
                borderColor: allTokens[`status.${status}.border`],
                color: allTokens[`status.${status}.fg`]
              }}
            >
              <strong>{status}</strong>
              <code>fg / bg / border</code>
            </article>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Status, operational state e quota" description="Mapas semanticos para impedir deriva de nomenclatura entre telas.">
        <TokenTable entries={entriesByPrefix(["status.", "operationalState.", "quota."])} />
      </TokenSection>
    </TokenPage>
  );
}
