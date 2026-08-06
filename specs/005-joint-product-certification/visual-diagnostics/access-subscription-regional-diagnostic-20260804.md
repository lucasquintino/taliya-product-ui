# Diagnostico Regional De Acesso E Assinatura

Data: 2026-08-04

## Fontes E Render Atual

- fonte estrutural: `71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png`;
- fonte de conteudo alto: `74_round-4.1Q_acesso-assinatura_revisar-assinatura-aprovado.png`;
- render atual: `visual-diagnostics/evidence/access-subscription-human-20260804/01-shell-base.png`;
- render atual: `visual-diagnostics/evidence/access-subscription-human-20260804/04-review-subscription.png`.

As fontes possuem canvas de 1672 x 941. O render humano atual foi capturado em
1265 x 941, portanto a comparacao desta rodada comprova anatomia e comportamento
responsivo, mas nao e usada como alegacao de paridade pixel a pixel.

## Diagnostico Por Regiao

| Regiao | Estado atual | Divergencia | Proprietario |
| --- | --- | --- | --- |
| canvas externo | fundo e centralizacao definidos por `.sb-image-coverage-access-stage` | a story possui direcao visual especifica de acesso, incluindo gradientes literais, altura fixa e variante `soft` | docs, indevido para anatomia reutilizavel |
| janela | `AccessShell` oficial com `ProductWindowFrame` | quatro stories sobrescrevem largura e altura por variaveis CSS inline | `@taliya/crm` e `@taliya/tokens` |
| chrome e brandbar | oficiais e responsivos | sem defeito estrutural observado | `@taliya/crm` |
| conteudo central | componentes oficiais de autenticacao e assinatura | cabe no perfil alto, mas o perfil e story-local | `@taliya/crm` |
| rodape | `AccessFooterLinks` oficial | geometria depende da altura local escolhida pela story | `@taliya/crm` |

## Decisao De Contrato

O produto tera um unico perfil geometrico para `AccessShell`, suficientemente
alto para todas as etapas de acesso e assinatura. As stories poderao manter
somente um canvas neutro de documentacao, sem variantes e sem controlar nenhuma
variavel interna do componente. Largura, altura, body, main, chrome e footer
permanecem propriedade de `@taliya/tokens` e `@taliya/crm`.

## Hipotese Minima

1. Promover o perfil alto hoje repetido nas stories para os tokens canonicos de
   `AccessShell`.
2. Remover `accessCoverageFrameStyle`, `ACCESS_COVERAGE_TALL_FRAME`, os overrides
   de largura/altura e a variante `soft`.
3. Reduzir o CSS do canvas de documentacao a tokens existentes, sem altura fixa,
   cor literal ou dependencia da anatomia interna do shell.
4. Rebuildar o Storybook estatico e verificar as sete jornadas, overflow,
   controles acessiveis e ausencia de erro de navegador.

Essa hipotese preserva um unico shell oficial, elimina variantes dirigidas pelas
imagens e nao cria wrapper publico adicional.
