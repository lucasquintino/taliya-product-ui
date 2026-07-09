# Contract: Drawer Lifecycle

## Rule

A drawer is not just a visual side panel. It represents the selected state of an operational object or demand.

Default page state:

- drawers are closed unless a URL/detail state or explicit selected item opens them.

Approved images with open drawers are reference states for selected items, not required initial route states.

## Required Drawer Anatomy

Every operational drawer must define:

1. header;
2. object identity;
3. current status;
4. source/origin;
5. why it appears now;
6. owner/responsible person or queue;
7. impact;
8. safe next action;
9. history/timeline when relevant;
10. agent/copilot suggestion when relevant;
11. primary, secondary, and sensitive actions;
12. blocked/permission/quota/data states.

## Drawer Families

| Drawer Family | Used By |
| --- | --- |
| `TaskDrawer` | Hoje, Tarefas, Operacao |
| `ChecklistDrawer` | Checklists, rotinas operacionais |
| `ApprovalDrawer` | Aprovacoes, Hoje, sensitive actions |
| `CaseDrawer` | Operacao, Retencao, Reclamacoes |
| `StudentDrawer` | Alunos, Hoje, Agenda |
| `ClassDrawer` | Agenda, Aula, Chamada |
| `ReplacementDrawer` | Reposicoes |
| `PaymentDrawer` | Financeiro studio |
| `LeadDrawer` | Vendas |
| `AgentFlowDrawer` | Agentes/Fluxos |
| `UsageDrawer` | Uso/Cotas where needed |
| `SupportTicketDrawer` | Suporte Taliya |
| `TenantSecurityDrawer` | Internal backoffice only |

## Required Lifecycle Questions

Every drawer contract must answer:

```text
O que e isto?
De onde veio?
Por que apareceu agora?
Quem e responsavel?
Qual impacto?
Qual e a proxima acao segura?
O que muda em 0, 1, 3 e 7 agentes?
O que pode ser manual, copiloto ou autonomo?
```

## Action Rules

- Sensitive actions must show impact and confirmation.
- Disabled actions must explain why.
- Permission-blocked actions must offer request access when allowed.
- Quota-blocked automation must preserve the manual path.
- Agent suggestions never imply autonomous execution unless the state permits it.
