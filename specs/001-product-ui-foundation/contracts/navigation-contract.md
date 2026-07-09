# Contract: Navigation

## Rule

Final navigation docs win over older image labels.

Older topbars in approved images remain clone sources for visible anatomy, spacing, and control treatment, but they are not route truth.

## Sidebar Families

The web SaaS sidebar must support these canonical families:

1. Hoje;
2. Inbox;
3. Alunos;
4. Agenda;
5. Vendas;
6. Financeiro;
7. Retencao;
8. Operacao;
9. Agentes;
10. Uso e cotas;
11. Relatorios;
12. Configuracoes.

## Topbar Rules

| Family | Topbar / Internal Navigation |
| --- | --- |
| Hoje | light filters only: Hoje, Esta semana, Criticos, Minha fila |
| Inbox | conversation filters/chips only |
| Alunos | list page uses Alunos; profile uses internal tabs |
| Agenda | Agenda, Grade, Turmas, Aulas, Reposicoes |
| Vendas | Pipeline, Interessados, Experimentais, Matriculas |
| Financeiro | Visao geral, Kanban, Movimentacoes |
| Retencao | Riscos, Cancelamentos, Reativacoes, Reclamacoes |
| Operacao | Jornadas, Tarefas, Checklists, Aprovacoes |
| Agentes | Agentes, Fluxos, Simulacoes, Execucoes |
| Uso e cotas | Visao geral, Extrato |
| Relatorios | Relatorios, Dinheiro na Mesa |
| Configuracoes | Studio, Equipe, Permissoes, Agenda, Pagamentos/Financeiro, Canais, Notificacoes |

## Global Topbar Actions

Global actions are not page navigation:

- search;
- messages/mail;
- notifications;
- help/support where applicable;
- profile/account.

## Shell Families

| Shell | Use |
| --- | --- |
| `CrmProductShell` | logged-in CRM and Taliya internal/backoffice, configured through props/region flags |
| `AccessShell` | pre-CRM account/subscription flow |
| `SetupShell` | onboarding/setup after subscription |

## Contextual Surfaces Without Own Navigation

These must appear as drawers, panels, tabs, or contextual blocks unless a later spec says otherwise:

- contatos;
- qualidade de dados;
- historico contextual;
- documentos;
- integracoes;
- auditoria for studio users;
- privacidade;
- lista de espera geral;
- checkout de alunos;
- politicas operacionais.
