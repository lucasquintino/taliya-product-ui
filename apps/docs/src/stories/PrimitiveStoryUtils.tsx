import type { ReactNode } from "react";

export const batch2SourceDescription =
  "Fontes canonicas: 01_round-1_visual-dna-tokens_aprovada.png, 07_round-3a_componentes-web-referencia_aprovada.png, 08_round-3b1_inputs-formularios-filtros_aprovada.png, 09_round-3b2_overlays-feedback_aprovada.png, 11_round-3b4_comunicacao-agentes_aprovada.png e 79_round-4.1S_app-shell_01_base-web-sem-conteudo.png. Mapa exato por componente em specs/001-product-ui-foundation/batch-2-component-contract.md.";

export const batch3SourceDescription =
  "Fontes canonicas: 08_round-3b1_inputs-formularios-filtros_aprovada.png, 14_round-3c2_agenda-financeiro-documentos_aprovada.png e 15_round-3c3_agentes-auditoria-relatorios_aprovada.png. Mapa exato por componente em specs/001-product-ui-foundation/batch-3-component-contract.md.";

export const batch4SourceDescription =
  "Fontes canonicas: 07_round-3a_componentes-web-referencia_aprovada.png, 09_round-3b2_overlays-feedback_aprovada.png, 10_round-3b3_visualizacoes-operacionais_aprovada.png e 12_round-3b5_sistema-plano-governanca_aprovada.png. Mapa exato por componente em specs/001-product-ui-foundation/batch-4-component-contract.md.";

export const batch5SourceDescription =
  "Fontes canonicas: 09_round-3b2_overlays-feedback_aprovada.png para overlays e 18_round-4.1A_hoje_02_drawer-tarefa.png.png / 22_round-4.1B_operacao_02_kanban-com-drawer.png para anatomia de drawer.";

export const batch6SourceDescription =
  "Fontes canonicas: 10_round-3b3_visualizacoes-operacionais_aprovada.png para timeline, 11_round-3b4_comunicacao-agentes_aprovada.png para comunicacao/composer, 14_round-3c2_agenda-financeiro-documentos_aprovada.png para calendario, 15_round-3c3_agentes-auditoria-relatorios_aprovada.png para flow/data viz e 07_round-3a_componentes-web-referencia_aprovada.png para conectores. Mapa exato em specs/001-product-ui-foundation/batch-6-component-contract.md.";

export const batch8SourceDescription =
  "Fontes canonicas: 10_round-3b3_visualizacoes-operacionais_aprovada.png, 11_round-3b4_comunicacao-agentes_aprovada.png, 12_round-3b5_sistema-plano-governanca_aprovada.png, 13_round-3c1_objetos-setup-dados_aprovada.png, 14_round-3c2_agenda-financeiro-documentos_aprovada.png e 15_round-3c3_agentes-auditoria-relatorios_aprovada.png. Contrato exato em specs/001-product-ui-foundation/batch-8-component-contract.md.";

export const batch9SourceDescription =
  "Fontes canonicas: 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 37, 47, 48, 49, 50, 51A-51L, 60-69 e 71-78. Contrato exato em specs/001-product-ui-foundation/batch-9-component-contract.md.";

export const batch10SourceDescription =
  "Fontes canonicas: 13, 15, 19, 27, 28, 30, 33, 34, 37-50, 52, 54, 56, 58, 59, 62, 68 e 70. Contrato exato em specs/001-product-ui-foundation/batch-10-component-contract.md.";

export function PrimitivePage({ children }: { children: ReactNode }) {
  return <main className="sb-primitive-page">{children}</main>;
}

export function PrimitiveMatrix({ children }: { children: ReactNode }) {
  return <div className="sb-primitive-matrix">{children}</div>;
}

export function PrimitiveState({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="sb-primitive-state">
      <span>{label}</span>
      <div>{children}</div>
    </section>
  );
}

export function PrimitiveRow({ children }: { children: ReactNode }) {
  return <div className="sb-primitive-row">{children}</div>;
}

export function SourcePanel({
  number,
  title,
  className,
  children
}: {
  number: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={["sb-source-panel", className].filter(Boolean).join(" ")}>
      <header className="sb-source-panel__header">
        <span className="sb-source-panel__number">{number}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function SourceGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={["sb-source-grid", className].filter(Boolean).join(" ")}>{children}</div>;
}

export function SourceItem({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={["sb-source-item", className].filter(Boolean).join(" ")}>
      <span>{label}</span>
      {children}
    </div>
  );
}
