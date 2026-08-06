# Auditoria Humana Do Onboarding E Setup Inicial

Data: 2026-08-04

## Escopo

Auditoria no Storybook estatico das 13 superficies oficiais da familia Setup:

- shell global;
- agente de configuracao;
- configuracao guiada de consumo;
- boas-vindas;
- Studio;
- Equipe;
- Canais;
- Planos;
- Pagamento;
- Alunos;
- Turmas;
- Agenda;
- Revisao.

Os contratos de produto foram conferidos contra `specs/006-crm-operational-core/setup-*` do `agentes-landing-system`. A verificacao foi feita no navegador como fluxo operacional, com captura visual, arvore acessivel, estado dos controles e geometria em desktop de 1280 x 720 e mobile de 390 x 844.

## Interacoes Exercitadas

| Superficie | Interacoes humanas verificadas |
| --- | --- |
| Boas-vindas | tentativa sem nome, erro obrigatorio, preenchimento do studio, inicio valido, resposta rapida e ajuda humana |
| Shell global | seletor do studio, ajuda, perfil e selecao da etapa Equipe |
| Agente | menu, resposta rapida, pergunta digitada, envio e ajuda humana |
| Configuracao guiada | troca do modelo, toggle de renovacao e salvar rascunho |
| Studio | dia ativo, modo com pausa, ajuste por dia e salvar rascunho |
| Equipe | adicionar pessoa, editar convite, remover convite e salvar rascunho |
| Canais | estado do WhatsApp, conectar WhatsApp Business e salvar rascunho |
| Planos | selecionar plano, novo plano, editar, trocar tipo e salvar rascunho |
| Pagamento | alternar Pix, abrir explicacao de Pagamentos Taliya e salvar rascunho |
| Alunos | importar, editar, abrir aluno e salvar rascunho |
| Turmas | importar, editar, abrir turma e salvar rascunho |
| Agenda | abrir slot, voltar para Turmas e salvar rascunho |
| Revisao | abrir area, resolver bloqueio, revisar avisos, bloquear publicacao ao desmarcar confirmacao, confirmar e publicar |

Todos os alvos essenciais tinham exatamente um controle acessivel quando consultados com nome exato. O bloqueio de publicacao da Revisao mudou corretamente com a confirmacao.

## Achados Humanos

1. O contador padrao dizia `de 8` enquanto o stepper e o fluxo canonico possuem nove etapas.
2. A descricao de Studio continha `nomr`.
3. O dono do workspace aparecia como `Dono/Admin`, divergindo do contrato de setup que prefere `Dono`.
4. Equipe comprimida no shell intermediario aproximava e truncava campos do card do dono.
5. A composicao de Planos nao controlava `fieldValues`; trocar o tipo nao persistia visualmente.
6. A opcao longa `Nao tenho turmas prontas` era truncada.
7. Agenda mantinha resumo e calendario largos dentro da coluna intermediaria, com sobreposicao e corte.
8. O agente de boas-vindas e o agente isolado ocultavam o final do conteudo em alturas menores sem rolagem natural.
9. No mobile, os sete dias de funcionamento colidiam na mesma linha.
10. No mobile, os cards de resumo da Agenda mantinham altura fixa e ocultavam seus dados.
11. O rodape `Sequencia obrigatoria` do stepper era transparente e deixava conteudo visualmente passar por baixo.
12. O seletor longo `Experimental/Avaliacao` ultrapassava o espaco disponivel no editor de Planos.

As correcoes foram feitas somente em componentes e estilos oficiais. A story de Planos recebeu apenas dados e estado controlado, conforme o contrato de composicao da biblioteca.

## Evidencia

Capturas iniciais e mobile estao em:

`visual-diagnostics/evidence/onboarding-human-20260804`

Validacao automatica apos a correcao:

- CRM: 173/173 testes;
- typecheck de tokens, UI, CRM e docs: aprovado;
- docs smoke: 5/5 testes.

## Recaptura Final

O Storybook estatico foi reconstruido depois das ultimas correcoes e as superficies criticas foram recapturadas no artefato final:

- `final-static-desktop-welcome.png`: o agente usa uma unica area de rolagem interna e a pagina nao cria overflow de viewport;
- `final-static-mobile-studio.png`: o stepper mantem o rodape opaco e separado da lista, com rolagem propria, e exibe `Bloco 1 de 9`;
- `final-static-desktop-plans.png`: `Experimental/Avaliacao` quebra linha sem overflow e a troca para `Aula avulsa` persiste com `aria-pressed=true`.

Status final: aprovado para a familia Setup. Os doze achados humanos foram resolvidos em componentes e estilos oficiais, sem anatomia visual local nas stories (`JPC-016`).
