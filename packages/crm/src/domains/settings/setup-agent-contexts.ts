/** Setup shell source steps and contextual assistant copy. */
export const setupShellSourceSteps = [
  "Studio",
  "Equipe",
  "Canais",
  "Planos",
  "Pagamento",
  "Alunos",
  "Turmas",
  "Agenda",
  "Revisão"
];
export interface SetupAgentQuickReply {
  id: string;
  label: string;
}

export interface SetupAgentContext {
  impact: string;
  messages: readonly string[];
  quickReplies: readonly SetupAgentQuickReply[];
  composerPlaceholder?: string;
}

export type SetupAgentContextId =
  | "shellBase"
  | "consumption"
  | "studio"
  | "team"
  | "channels"
  | "plans"
  | "payment"
  | "students"
  | "classes"
  | "agenda"
  | "review";

export const setupAgentContexts: Record<SetupAgentContextId, SetupAgentContext> = {
  shellBase: {
    impact: "Esta etapa afeta agenda, cobrança e comunicação inicial.",
    messages: [
      "Estamos na etapa Dados do studio. Vou te avisar o que é obrigatório e o que pode ficar para depois.",
      "Use a área central para preencher, importar ou revisar dados. Eu acompanho daqui e explico qualquer dúvida."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "later", label: "Posso deixar para depois?" },
      { id: "agenda", label: "Como isso afeta a agenda?" }
    ]
  },
  consumption: {
    impact: "Esta etapa afeta agenda, cobrança e comunicação inicial.",
    messages: [
      "Estamos na etapa Consumo de aulas. Vou te ajudar a configurar apenas o necessário para começar com segurança.",
      "Use a área central para preencher e, se precisar, me pergunte qualquer dúvida ao lado."
    ],
    quickReplies: [
      { id: "replacement-deadline", label: "O que é prazo de reposição?" },
      { id: "balance-expiration", label: "Como funciona a expiração do saldo?" },
      { id: "after-go-live", label: "Posso alterar depois do go-live?" }
    ]
  },
  studio: {
    impact: "Este bloco define a janela em que o studio pode ter aulas.",
    messages: [
      "Vamos começar pela base do studio. Esses horários ainda não criam aulas; eles só ajudam o Taliya a montar turmas e agenda com segurança.",
      "Se alguma turma cair fora desses horários depois, eu vou te avisar antes de publicar."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "change-later", label: "Posso mudar depois?" },
      { id: "creates-agenda", label: "Isso já cria agenda?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  team: {
    impact: "Este bloco prepara quem terá acesso ao Taliya quando o setup for publicado.",
    messages: [
      "Você pode começar só com o dono do studio. Se adicionar equipe agora, eu deixo os convites preparados para o final do setup.",
      "Nenhum convite será enviado enquanto o setup estiver em rascunho."
    ],
    quickReplies: [
      { id: "invite-now", label: "Preciso convidar equipe agora?" },
      { id: "invite-timing", label: "Quando o convite é enviado?" },
      { id: "roles-later", label: "Posso mudar os papéis depois?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  channels: {
    impact: "Este bloco define os canais que o Taliya pode usar para falar com alunos e equipe.",
    messages: [
      "O CRM pode continuar mesmo se o WhatsApp ainda não estiver conectado.",
      "Para agentes responderem alunos no WhatsApp, o número precisa estar no WhatsApp Business e passar pela conexão oficial.",
      "As redes sociais aqui são só referência do studio. Elas não ativam automações neste setup inicial."
    ],
    quickReplies: [
      { id: "connect-now", label: "Preciso conectar agora?" },
      { id: "personal-number", label: "Meu número é pessoal" },
      { id: "lose-whatsapp", label: "Vou perder meu WhatsApp?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  plans: {
    impact: "Este bloco define como o Taliya entende mensalidades, pacotes e aulas dos alunos.",
    messages: [
      "Plano define saldo, recorrência, validade e reposição.",
      "Horário fixo será configurado depois, em Turmas e Agenda.",
      "Pacote de aulas também pode ter horário fixo; a diferença é que o saldo é fechado."
    ],
    quickReplies: [
      { id: "plan-type", label: "Qual tipo escolher?" },
      { id: "fixed-time", label: "Pacote pode ter horário fixo?" },
      { id: "replacement", label: "Como funciona reposição?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  payment: {
    impact: "Este bloco define quais meios o studio aceita no começo da operação.",
    messages: [
      "Você só escolhe os meios aceitos agora. Nenhum detalhe técnico precisa ser configurado neste setup.",
      "O Taliya já consegue registrar cobranças, baixas e liberação de aulas. A automação financeira vem depois."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "settlement", label: "Como funciona a baixa?" },
      { id: "later", label: "O que fica para depois?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  students: {
    impact: "Este bloco cria a base inicial de alunos ativos.",
    messages: [
      "Você pode misturar planilhas, fotos de caderno, listas coladas e cadastros manuais.",
      "Eu transformo tudo em rascunho e marco o que precisa de revisão antes de publicar.",
      "Horários e turmas serão vinculados nos próximos blocos."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "notebook-photo", label: "Posso importar foto de caderno?" },
      { id: "duplicates", label: "E se tiver duplicidade?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  classes: {
    impact: "Este bloco organiza os horários fixos recorrentes do studio.",
    messages: [
      "Turma ainda não é agenda. A agenda será montada no próximo bloco.",
      "Você pode importar planilhas, fotos da grade, listas coladas ou criar turmas manualmente.",
      "Se algum aluno não for encontrado, eu marco como pendência para você revisar."
    ],
    quickReplies: [
      { id: "class-vs-agenda", label: "Turma é diferente de agenda?" },
      { id: "link-students", label: "Preciso vincular alunos agora?" },
      { id: "schedule-image", label: "E se eu só tiver print da grade?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  agenda: {
    impact: "Este bloco revisa a agenda inicial gerada pelo Taliya.",
    messages: [
      "À esquerda está o controle de como cada turma virou agenda. À direita está a semana completa que será publicada.",
      "Se algo estiver errado na origem, volte para Turmas.",
      "Reposições, encaixes e ajustes avançados ficam para depois do go-live."
    ],
    quickReplies: [
      { id: "publication-blockers", label: "O que bloqueia publicação?" },
      { id: "adjust-later", label: "Posso ajustar depois?" },
      { id: "back-to-classes", label: "Por que voltar para turmas?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  review: {
    impact: "Esta é a revisão final antes de publicar o setup inicial.",
    messages: [
      "Eu organizei a revisão em três partes: publicado agora, pendências e depois do go-live.",
      "Nada será publicado sem sua confirmação. Você ainda pode voltar em qualquer bloco antes de publicar.",
      "Configurações avançadas ficam para depois, sem bloquear o início da operação."
    ],
    quickReplies: [
      { id: "published", label: "O que será publicado?" },
      { id: "blockers", label: "O que bloqueia?" },
      { id: "later", label: "O que fica para depois?" },
      { id: "after", label: "O que acontece depois?" }
    ],
    composerPlaceholder: "Pergunte sobre a revisão..."
  }
};

