# Batch 7 Component Contract - CRM Shell Recomposition

Status: fechado em 2026-05-30. Todos os componentes abaixo passaram no gate da skill `taliya-product-ui-batch`.

## Fonte Canonica

| Fonte | Componentes extraidos | Regra de fidelidade |
| --- | --- | --- |
| `79_round-4.1S_app-shell_01_base-web-sem-conteudo.png` | `CRM / Image 79 Empty Shell`, `CrmEmptyShell`, `CrmEmptyShellWindow`, browser chrome, sidebar, topbar, page header, canvas vazio | clone 1:1 do shell vazio; nenhum conteudo de pagina; todos os controles reais e reutilizaveis |
| `16_round-4.1S_app-shell_01_base-web.png` | `CrmProductShell`, `ProductWindowFrame`, canonical shell spacing, sidebar/topbar relationship | contexto do shell com conteudo; anatomia e ritmo visual, nao dados finais |
| `07_round-3a_componentes-web-referencia_aprovada.png` | `IconButton`, `NavPill`, `Avatar`, `TaliyaLogo`, `Badge` consumed by shell wrappers | primitive visuals permanecem em `@taliya/ui`; CRM nao redefine hover/focus/active desses primitives |
| `navigation-contract.md` | `Sidebar`, `Topbar`, `GlobalActions`, `SidebarItem` route taxonomy | labels oficiais vencem labels historicos de imagens quando houver conflito |

## Contratos Por Componente

| Componente | Storybook | Extracao exata | Reuso obrigatorio | Variantes/estados | Comportamento minimo | Medidas/tokens obrigatorios |
| --- | --- | --- | --- | --- | --- | --- |
| `ProductWindowFrame` | `CRM / Shell / Components/ProductWindowFrameStory` | frame externo da imagem 79/16: browser-like, app e frameless | compoe `CrmBrowserChrome` ou `ProductWindowAppChrome`; nao importa docs/app | `browser`, `app`, `frameless` | frame nao interativo; body preserva layout; browser chrome contem botoes reais | window 1092x722 no clone 79; chrome 57; radius 10 no browser frame 79; shadows/frame tokens |
| `CrmBrowserTrafficLights` | `CRM / Shell / Components/BrowserTrafficLights` | tres luzes macOS no canto superior esquerdo | visual helper CRM; tokens de cor/size para chrome | default | decorativo `aria-hidden`; sem foco | light 12, gap 9, red/gray/green tokens |
| `CrmBrowserToolbarButton` | `CRM / Shell / Components/BrowserToolbarButtonStates` | icons book/star/back/forward sem circulo na chrome | usa `Icon`; botao real por ser controle do browser chrome | default, disabled, pressed via aria | click/keyboard real; disabled sem acao; focus visivel | width 18/20, gap 24, cor chrome foreground/token |
| `CrmBrowserToolbar` | `CRM / Shell / Components/BrowserToolbar` | grupo de botoes browser left | compoe `CrmBrowserToolbarButton` | default, disabled child | nav aria-label | left 96/top17 dentro chrome |
| `CrmBrowserAddressBar` | `CRM / Shell / Components/BrowserAddressBar` | pill central `https://app.taliya.com` | usa `Icon`; texto truncado | default, url custom | accessible label com url | 196x28, top10, radius full, font 11 sem letter spacing |
| `CrmBrowserChrome` | `CRM / Shell / Components/BrowserChrome` | linha superior completa do browser | compoe traffic/toolbar/address | default | header sem role especial; filhos acessiveis/decorativos conforme tipo | height 57, gradient/surface tokens |
| `CrmProductShell` | `CRM / Shell / Components/ProductShellStory` | shell logado com sidebar/topbar/content relationship | compoe `Sidebar`, `Topbar`, `PageHeader` e slots | default, contextPanel, mobile collapsed | main landmark; sem backend; sem data fetching | sidebar compact 72, topbar 72, content max 1440/padding tokens |
| `Sidebar` | `CRM / Shell / Components/SidebarStory` | sidebar canonica com logo, lista de familias oficiais e footer avatar | compoe `TaliyaLogo`, `SidebarItem`, `Avatar` | compact, active child, alert child, disabled child | `aside`, `nav` com label; scroll sem layout shift | width compact 72; vertical rhythm tokens |
| `SidebarItem` | `CRM / Shell / Components/SidebarItemStates` | item icon-first da sidebar | deve compor `IconButton` de `@taliya/ui`; CRM nao redefine hover/focus/selected | default, active/selected, alert, disabled | button real; `aria-current=page` em active; disabled sem acao | usa tamanho/radius/shadow/alert do `IconButton`; apenas layout CRM |
| `Topbar` | `CRM / Shell / Components/TopbarStory` | topbar canonica com nav/context chips e global actions | compoe `NavPill` e `GlobalActions` | default, active, disabled, custom tabs/actions | header; nav buttons reais; overflow responsivo sem clipping | height 72; gap/padding tokens |
| `GlobalActions` | `CRM / Shell / Components/GlobalActionsStory` | cluster search/mail/bell/avatar da topbar canonica | compoe `IconButton` e `Avatar` | alert, disabled via child, avatar src | botoes reais; icon-only names acessiveis | gap 7/8, action size do `IconButton` |
| `PageHeader` | `CRM / Shell / Components/PageHeaderStory` | titulo compacto de pagina com subtitle/breadcrumb/actions | compoe actions passadas; nao hero | title-only, subtitle, breadcrumb, actions | semantic header/h1; actions reais | type page title tokens; no viewport font scaling |
| `CrmShellBrand` | `CRM / Shell / Components/ShellBrand` | logo Taliya no canto esquerdo da imagem 79 | compoe `TaliyaLogo` de `@taliya/ui` | default | imagem/label acessivel pelo primitive | width 132, x 24, y -4 |
| `CrmShellBackButton` | `CRM / Shell / Components/ShellBackButton` | botao circular voltar no topo da imagem 79 | compoe `IconButton` | default, pressed, disabled | button real; focus visivel | position x119/y3 dentro topbar 79 |
| `CrmSidebarFloatingButton` | `CRM / Shell / Components/SidebarFloatingButtonStates` | botoes circulares da rail da imagem 79 | compoe `IconButton` | default, alert, pressed/selected, disabled | button real; labels acessiveis | usa `IconButton` md; CRM posiciona somente stack |
| `CrmSidebarNavigation` | `CRM / Shell / Components/SidebarNavigation` | pilha principal de botoes da sidebar 79 | compoe `CrmSidebarFloatingButton` | default, active/alert/disabled child | nav com label | offset x -29, y 14, gap 3 |
| `CrmSidebarUtilityNavigation` | `CRM / Shell / Components/SidebarUtilityNavigation` | botoes lua/sol inferiores da sidebar 79 | compoe `CrmSidebarFloatingButton` | default, disabled child | nav com label | utility gap 4, offset 24 |
| `CrmShellSidebar` | `CRM / Shell / Components/ShellSidebar` | sidebar completa da imagem 79 | compoe brand/nav/utility | default/custom items | aside; sem primitives soltos na story | width 72; padding top 8/bottom 64 |
| `CrmTopbarNavChip` | `CRM / Shell / Components/TopbarNavChipStates` | chips/pills da nav superior 79 | compoe `NavPill` | default, active, disabled | button real; `aria-current=page` em active | nav gap 19, active black |
| `CrmShellTopNav` | `CRM / Shell / Components/ShellTopNav` | lista topbar da imagem 79 | compoe `CrmTopbarNavChip` | default/custom items | nav com label; mobile sem overflow/clipping | left 225/top1 no clone 79; scroll/wrap em story isolada |
| `CrmTopbarActionButton` | `CRM / Shell / Components/TopbarActionButtonStates` | search/mail/bell circulares da imagem 79 | compoe `IconButton` | default, alert, pressed, disabled | button real | size/gap do `IconButton`; action gap 7 |
| `CrmShellAvatar` | `CRM / Shell / Components/ShellAvatar` | avatar direito da imagem 79 | compoe `Avatar` | default, selected, disabled, src/name | button real; `aria-pressed` em selected | 40 avatar size; no custom primitive hover |
| `CrmShellGlobalActions` | `CRM / Shell / Components/ShellGlobalActions` | cluster global actions da imagem 79 | compoe `CrmTopbarActionButton` e `CrmShellAvatar` | alert/default/avatar | controls reais | right 20/top3, gap 7 |
| `CrmEmptyShellTopbar` | `CRM / Shell / Components/EmptyShellTopbar` | topbar completa da imagem 79 | compoe back/topnav/global actions | default/custom nav/avatar | layout responsivo em story isolada; controls reais | height 58; x/y tokens 79 |
| `CrmEmptyShellPageHeader` | `CRM / Shell / Components/EmptyShellPageHeader` | titulo `Jornadas` e divisor fino da imagem 79 | h1 sem hero; token de type/layout | title custom | semantic header/h1 | header 43; margin-left 13; title y -4; font 27/34 |
| `CrmEmptyShellCanvas` | `CRM / Shell / Components/EmptyShellCanvas` | area vazia da imagem 79 abaixo do header | section surface apenas | empty | `aria-label` de area vazia | surface rgba/tokens; sem conteudo/empty state ilustrado |
| `CrmEmptyShellWindow` | `CRM / Shell / Components/EmptyShellWindow` | janela browser + body com sidebar/main | compoe `ProductWindowFrame` | default | body layout preserva child composition | 1092x722, body 665 |
| `CrmEmptyShell` | `CRM / Image Coverage/Image 79 Empty Shell` | reconstrucao completa da imagem 79 | compoe `CrmEmptyShellWindow`, `CrmShellSidebar`, `CrmEmptyShellTopbar`, `CrmEmptyShellPageHeader`, `CrmEmptyShellCanvas` | default/custom title/nav/sidebar/avatar | todos controles reais; sem conteudo real/backend/API | stage 1160x868; window x34/y71; clone desktop 1:1; mobile scaled without horizontal overflow |

## Bloqueios Encontrados Na Auditoria Atual

| Bloqueio | Componente/story | Evidencia | Criterio afetado |
| --- | --- | --- | --- |
| `Image 79` fixa em 1160px estoura viewport mobile | `CRM / Image Coverage/Image 79 Empty Shell` | resolvido em `tmp/batch7-final-20260530/manifest.json` | pass |
| Top nav isolada estoura em mobile | `CrmShellTopNav`, `CrmEmptyShellTopbar`, `CrmEmptyShellWindow` | resolvido em `tmp/batch7-final-20260530/manifest.json` | pass |
| `ProductShellStory` mobile estoura por wrapper fixo | `ProductShellStory` | resolvido em `tmp/batch7-final-20260530/mobile-app-shell.png` | pass |
| `SidebarItem` duplica visual de botao em CRM | `SidebarItem` | `SidebarItem` agora compoe `IconButton`; CSS CRM nao redefine anatomia visual | pass |
| Story de imagem ainda nao esta no grupo oficial `CRM / Image Coverage` | `Image79EmptyShell.stories.tsx` | story movida para `CRM / Image Coverage/Image 79 Empty Shell` | pass |
| Browser/frame chrome ainda usa varios valores soltos | `CrmBrowser*`, `CrmEmptyShell*` CSS | tokens promovidos em `packages/tokens/src/tokens.css`, `packages/tokens/src/index.ts` e `token-system-v1.md` | pass |

## Matriz De Fechamento

Evidencias: `tmp/batch7-final-20260530/manifest.json`, `tmp/batch7-final-20260530/interactions.json`, capturas desktop/mobile no mesmo diretorio.

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ProductWindowFrame | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmBrowserTrafficLights | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmBrowserToolbarButton | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmBrowserToolbar | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmBrowserAddressBar | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmBrowserChrome | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmProductShell | pass | pass | pass | pass | pass | pass | pass | approved |
| Sidebar | pass | pass | pass | pass | pass | pass | pass | approved |
| SidebarItem | pass | pass | pass | pass | pass | pass | pass | approved |
| Topbar | pass | pass | pass | pass | pass | pass | pass | approved |
| GlobalActions | pass | pass | pass | pass | pass | pass | pass | approved |
| PageHeader | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellBrand | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellBackButton | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmSidebarFloatingButton | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmSidebarNavigation | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmSidebarUtilityNavigation | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellSidebar | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmTopbarNavChip | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellTopNav | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmTopbarActionButton | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellAvatar | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmShellGlobalActions | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmEmptyShellTopbar | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmEmptyShellPageHeader | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmEmptyShellCanvas | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmEmptyShellWindow | pass | pass | pass | pass | pass | pass | pass | approved |
| CrmEmptyShell / Image 79 | pass | pass | pass | pass | pass | pass | pass | approved |

## Validacao Obrigatoria

- Abrir fonte aprovada com `view_image`: images 79, 16 e 07. Pass.
- Capturar Storybook desktop/mobile para todos os stories CRM shell tocados e para `CRM / Image Coverage / Image 79 Empty Shell`. Pass, ver `tmp/batch7-final-20260530`.
- Smoke funcional: toolbar/browser buttons, sidebar buttons, topbar chips, global action buttons, avatar, `SidebarItem`, mobile no-overflow, disabled/focus/keyboard. Pass, ver `interactions.json` e `manifest.json`.
- Rodar `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`. Pass em 2026-05-30.
- Atualizar esta matriz e `implementation-execution-plan.md` com evidencias antes de declarar Batch 7 completo. Pass.
