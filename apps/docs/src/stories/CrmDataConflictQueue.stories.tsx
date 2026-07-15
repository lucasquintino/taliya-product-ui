import type { Meta } from "@storybook/react-vite";
import { DataConflictQueue } from "@taliya/crm";
import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source13SaraAlves from "../assets/source13-sara-alves.png";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DataConflictQueue> = { title: "CRM / Data Quality / DataConflictQueue", component: DataConflictQueue, parameters: { layout: "fullscreen" } };
export default meta;

export function Source() {
  const rows = [
    { id: "cpf", severity: "high" as const, object: "Aluno", description: "CPF duplicado em 2 registros", suggestion: "Revisar e mesclar", owner: "Sam Frank", ownerAvatarSrc: source13JoaoPedro },
    { id: "phone", severity: "medium" as const, object: "Contato", description: "Telefone em formato inválido", suggestion: "Corrigir formato", owner: "Nikki Olaw", ownerAvatarSrc: source13NikkiOlaw },
    { id: "email", severity: "medium" as const, object: "Responsável", description: "E-mail já associado a outro", suggestion: "Confirmar vínculo", owner: "João Silva", ownerAvatarSrc: source13JoaoPedro },
    { id: "birth", severity: "low" as const, object: "Aluno", description: "Data de nascimento ausente", suggestion: "Complementar", owner: "Sara Alves", ownerAvatarSrc: source13SaraAlves }
  ];
  return <PrimitivePage><main className="sb-source-page"><DataConflictQueue onRowSelect={() => undefined} onViewAll={() => undefined} rows={rows} style={{ width: 646 }} /></main></PrimitivePage>;
}
