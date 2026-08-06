# Auditoria Humana De Configuracoes Pos-Live

Data: 2026-08-04

## Escopo

Auditoria das nove rotas canonicas da familia Configuracoes pos-live:

- Hub;
- Studio;
- Equipe;
- Permissoes;
- Canais;
- Planos e modelos;
- Pagamentos e financeiro;
- Agenda;
- Notificacoes.

Os contratos foram comparados com `post-go-live-configuration-master-map.pt-BR.md`, `post-go-live-configuration-field-contracts.pt-BR.md` e `post-go-live-configuration-state-contracts.pt-BR.md` em `agentes-landing-system/specs/006-crm-operational-core`.

## Interacoes Exercitadas

| Rota | Interacoes verificadas |
| --- | --- |
| Hub | abertura de uma configuracao pelo card oficial |
| Studio | alteracao de dia, estado sujo, salvar e retorno ao estado salvo |
| Equipe | convidar, editar, abrir Permissoes, desativar membro, estado Inativo e salvar |
| Canais | troca do estado do WhatsApp, teste de conexao e salvar |
| Planos e modelos | troca do tipo do plano, persistencia visual e salvar |
| Permissoes | selecao de papel, alteracao de permissao e salvar |
| Pagamentos e financeiro | alternancia de meio manual, regra financeira, ativacao, integracao tecnica e salvar |
| Agenda | adicionar excecao, editar item, alternar lista de espera e salvar |
| Notificacoes | selecao persistente de papel, alternancia de frequencia/canal e salvar |

As nove aliases oficiais executaram seus `play` contracts no Storybook estatico sem erro visivel. O clique `Desativar` de Equipe, antes interceptado pelo painel lateral, passou a mudar o membro para `Inativo` e habilitar `Salvar alteracoes`.

## Achado Responsivo Resolvido

Equipe, Canais, Planos, Pagamentos e Notificacoes mantinham descendentes com largura fixa maior que a coluna principal em 1280 x 720. O conteudo entrava sob o painel do Agente de Configuracao e podia bloquear cliques.

A correcao ficou somente em `@taliya/crm`, tornando workspaces, secoes, barras e regras fluidos no intervalo intermediario. Medidas finais:

| Rota | Direita do main | Maior filho | Inicio do painel | Filhos sob painel |
| --- | ---: | ---: | ---: | ---: |
| Equipe | 854 | 854 | 880 | 0 |
| Canais | 854 | 854 | 880 | 0 |
| Planos | 854 | 854 | 880 | 0 |
| Pagamentos | 856 | 856 | 888 | 0 |
| Notificacoes | 851 | 851 | 886 | 0 |

Capturas antes, depois e finais estao em `visual-diagnostics/evidence/settings-human-20260804`. Este achado esta resolvido como `JPC-017`.

## Estados Funcionais Certificados

A familia ainda nao esta funcionalmente completa contra todas as specs. Os estados transversais de leitura por permissao, validacao, salvamento e erro de sistema agora possuem contrato oficial comum nas oito rotas editaveis e estados navegaveis no Hub.

Campos bloqueados continuam visiveis em leitura, `Pedir acesso` permanece acionavel fora do grupo bloqueado, validacao mantem os campos corrigiveis e impede o salvamento, e erro de sistema apresenta um unico retry na barra oficial. O Hub representa `readOnly`, `entitlementBlocked` e erro sem desativar a navegacao recuperavel.

Studio passou a expor Complemento, Bairro e Fuso horario; Pagamentos passou a controlar os meios manuais e os estados `pending`, `active`, `blocked` e `error`; Notificacoes passou a controlar papel, `enabledAlertTypes[]` e canal indisponivel. Equipe agora confirma desativacao/reativacao e alteracao de papel, bloqueia o ultimo admin e usa uma confirmacao reforcada em duas etapas para transferencia de Dono/Admin. Permissoes agora representa leitura bloqueada, erro de validacao e aprovacao sensivel com confirmacao de Dono/Admin pelo `ConfirmDialog` oficial.

Os estados de dominio restantes foram promovidos e certificados sem anatomia local: `reviewAgendaImpact` usa o `SettingsAgentPanel` oficial com `Abrir Agenda`; Canais isola conexao pendente e desconectada; Planos isola rascunho, revisao de consumo e o fallback de inativacao para plano com historico; Notificacoes marca o alerta especifico que precisa de revisao.

## Validacao

- CRM typecheck: aprovado;
- CRM: 182/182 testes;
- docs typecheck e lint: aprovados;
- diff check: aprovado;
- build estatico: aprovado novamente apos as correcoes finais;
- stories de Equipe, Pagamentos, Notificacoes e Permissoes: executados no bundle estatico sem novos erros de navegador;
- estados transversais de Studio, Pagamentos, Agenda, Notificacoes e Hub: inspecionados no bundle estatico sem erro de navegador;
- estados de dominio de Studio, Canais, Planos e Notificacoes: stories isoladas presentes e inspecionadas no bundle estatico sem erro de navegador;
- retry de erro de sistema: uma unica acao visivel e executavel na barra oficial;
- confirmacao sensivel de Permissoes e bloqueio do ultimo admin: verificados por interacao humana no navegador.

Status: anatomia, responsividade e estados funcionais da familia aprovados pelo Codex; `JPC-018` resolvido. A aprovacao conjunta por rota continua dependente do registro do product owner no ledger.
