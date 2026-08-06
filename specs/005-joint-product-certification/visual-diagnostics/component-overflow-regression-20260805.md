# Component Overflow Regression Check

Date: 2026-08-05

The two overflow candidates found by the component runtime scan were rechecked in fresh Storybook tabs after rebuilding `apps/docs/storybook-static`.

| Story | Result | Evidence |
| --- | --- | --- |
| `crm-inbox-conversationlist--all-states` | Pass | `scrollWidth` equals `clientWidth`; blocked alert is 483px wide and right edge stays at 1408px, inside its 483px ConversationList parent. |
| `crm-tasks-tasktable--all-states` | Pass | `scrollWidth` equals `clientWidth`; the official table remains 780px wide and no 1,000,000px fixture chain remains. |
| `crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional` | Pass | No horizontal overflow; the student profile content uses the official right-panel layout and the action rail is 377px wide. This route intentionally has no drawer. |

Fixes applied:

- `ConversationList` now establishes its own positioning context so its blocked alert cannot escape the component bounds.
- The TaskTable component story now uses a bounded one-column fixture track instead of an unbounded `max-content` track around percentage-width children.

The CRM focused suite passed with 202 tests, and the Storybook production build completed successfully.
