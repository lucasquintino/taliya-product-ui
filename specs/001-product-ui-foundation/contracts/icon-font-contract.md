# Contract: Icons And Font

## Font

Primary product font: `Lufga`.

Fallback stack:

```text
Lufga, "Inter", "Avenir Next", "Segoe UI", Arial, sans-serif
```

Rules:

- Components must not hardcode external font loading.
- The consuming SaaS app is responsible for loading the font.
- Storybook must document the fallback state if Lufga is unavailable.
- Numeric values in dense tables may use tabular numeric features when available.

## Icons

All icons must go through a Taliya icon wrapper or registry.

Allowed implementation strategy:

- use a vetted icon source such as Lucide for common UI icons;
- provide custom Taliya logo/mark assets separately;
- expose only `Icon`, `IconButton`, and named Taliya icon APIs to consumers.

Forbidden:

- importing icon library components directly in consumer code;
- hand-drawn one-off SVGs inside unrelated components;
- icon-only buttons without accessible labels or tooltip where meaning is not obvious.

## Core Icons Required

Navigation:

- Hoje;
- Inbox/Conversas;
- Alunos;
- Agenda;
- Vendas;
- Financeiro;
- Retencao;
- Operacao;
- Agentes;
- Uso/Cotas;
- Relatorios;
- Configuracoes.

Global:

- search;
- mail/messages;
- notifications;
- profile/avatar;
- help;
- settings;
- theme;
- close;
- more menu.

Operational:

- task;
- approval;
- warning;
- success;
- blocked;
- quota;
- billing;
- calendar;
- table/list;
- kanban;
- timeline;
- agent/bot;
- support;
- secure payment.

## Icon Button Rules

- Use circular icon buttons for shell/global utilities.
- Use text buttons for clear commands.
- Use icon + text buttons when the action benefits from extra clarity.
- Never use icon-only controls without accessible label.
