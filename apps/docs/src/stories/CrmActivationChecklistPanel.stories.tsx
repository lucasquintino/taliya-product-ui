import type { Meta } from "@storybook/react-vite";
import { ActivationChecklistPanel } from "@taliya/crm";
import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source13SaraAlves from "../assets/source13-sara-alves.png";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ActivationChecklistPanel> = { title: "CRM / Setup / ActivationChecklistPanel", component: ActivationChecklistPanel, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  const items = [
    { id: "source", title: "Conectar fonte de dados", owner: "Sam Frank", ownerAvatarSrc: source13JoaoPedro, actionLabel: "Revisar", state: "complete" as const },
    { id: "consent", title: "Revisar consentimento", owner: "Nikki Olaw", ownerAvatarSrc: source13NikkiOlaw, actionLabel: "Abrir", state: "incomplete" as const },
    { id: "owners", title: "Validar responsáveis", owner: "João Silva", ownerAvatarSrc: source13JoaoPedro, actionLabel: "Validar", state: "warning" as const },
    { id: "publish", title: "Publicar perfis", owner: "Sara Alves", ownerAvatarSrc: source13SaraAlves, actionLabel: "Bloqueado", state: "blocked" as const, disabled: true }
  ];
  return <PrimitivePage><main className="sb-source-page"><ActivationChecklistPanel items={items} onItemAction={() => undefined} onItemMenu={() => undefined} onItemToggle={() => undefined} style={{ width: 400 }} /></main></PrimitivePage>;
}
