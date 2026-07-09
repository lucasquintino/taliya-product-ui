import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TodayShell } from "./ImageCoverageToday.stories";

describe("ImageCoverageToday stories", () => {
  it("keeps Hoje active in the top nav without preselecting a sidebar item", () => {
    const markup = renderToStaticMarkup(<TodayShell />);
    const agendaButton = markup.match(/<button aria-label="Agenda"[\s\S]*?<\/button>/)?.[0] ?? "";

    expect(markup).toMatch(/tl-nav-pill--active[\s\S]*?<span>Hoje<\/span>/);
    expect(agendaButton).not.toContain('aria-current="page"');
    expect(agendaButton).not.toContain('aria-pressed="true"');
    expect(agendaButton).not.toContain("tl-icon-button--selected");
    expect(markup).toContain('aria-label="Configuracoes"');
    expect(markup).toContain('aria-label="Modo noite"');
    expect(markup).toContain('aria-label="Modo dia"');
  });

  it("keeps the Image 17 fold focused on the dashboard and reserves history for Image 20", () => {
    const baseMarkup = renderToStaticMarkup(<TodayShell />);
    const historyMarkup = renderToStaticMarkup(<TodayShell historyOnly />);

    expect(baseMarkup).not.toContain("Histórico de hoje");
    expect(historyMarkup).toContain("Histórico de hoje");
  });
});
