# Contract: State Taxonomy

## Global UI States

Every relevant component family must support these states where applicable:

| State | Required UI |
| --- | --- |
| loading | skeleton/spinner and context |
| empty | explanation and next action |
| error recoverable | retry/support/fallback |
| error blocking | impact and owner/problem |
| no permission | reason and required role |
| data incomplete | missing field/object and route to fix |
| data conflicting | comparison and resolve action |
| integration failed | provider/status/retry/fallback |
| plan blocked | plan reason and manual path |
| quota 70 | preventive alert |
| quota 90 | economy/degradation alert |
| quota 100 | paid automation blocked, manual continues |
| agent paused | who/why/when and resume when allowed |
| waiting human | owner/queue/SLA |
| waiting approval | approver/impact/expiry |
| sensitive | privacy/audit indication |

## Object Status Families

| Object | Minimum Status Set |
| --- | --- |
| Aluno | ativo, pausado, inativo, cancelado, risco, inadimplente, dado sensivel |
| Interessado | novo, quente, sem resposta, experimental, pre-matricula, perdido, sem vaga |
| Aula | agendada, chamada pendente, concluida, cancelada, conflito |
| Presenca | esperada, presente, falta avisada, no-show, corrigida |
| Reposicao | disponivel, reservada, aguardando resposta, usada, expirada, conflito |
| Pagamento | previsto, pendente, atrasado, pago, falhou, disputa, reembolso |
| Conversa | nova, agente respondendo, humano ativo, aguardando contato, opt-out, falha |
| Caso | aberto, atribuido, bloqueado, pendente aprovacao, resolvido, reaberto |
| Fluxo | rascunho, em teste, ativo, pausado, bloqueado, falhou |
| Assinatura | ausente, revisao, verificando, confirmada, falhou, ativa |

## Button State Rules

| State | Behavior |
| --- | --- |
| active | can execute |
| loading/executing | prevents duplicate action |
| disabled | shows reason when relevant |
| blocked permission | shows required permission or request access |
| blocked quota | shows quota state and manual alternative |
| blocked data | shows missing data path |
| waiting approval | shows approver/status |

## State Display Rule

State cannot rely only on color. Use text, icon, or placement to communicate meaning.
