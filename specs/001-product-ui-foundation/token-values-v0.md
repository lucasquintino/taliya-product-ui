# Token Values v0

These values are the initial canonical extraction from the approved Taliya CRM visual direction. They are implementation inputs, not suggestions.

## Color

| Token | Value | Usage |
| --- | --- | --- |
| `color.black.900` | `#10141A` | primary text, selected nav, primary button, strong icons |
| `color.gray.100` | `#E4E4E4` | app background, outer frame |
| `color.blue.400` | `#83A2DB` | functional accent, progress, neutral/positive badge |
| `color.red.400` | `#CE6969` | danger, risk, exception |
| `color.white` | `#FFFFFF` | card/panel surfaces |
| `color.border.default` | `rgba(16, 20, 26, 0.10)` | default border |
| `color.border.subtle` | `rgba(16, 20, 26, 0.06)` | internal dividers |
| `color.border.active` | `rgba(16, 20, 26, 0.22)` | active/hover borders |
| `color.text.primary` | `#10141A` | primary text |
| `color.text.secondary` | `rgba(16, 20, 26, 0.62)` | secondary text |
| `color.text.muted` | `rgba(16, 20, 26, 0.42)` | metadata/captions |

## Semantic Status

| Token | Value | Usage |
| --- | --- | --- |
| `status.success.fg` | `#0F8A3A` | success text/icon |
| `status.success.bg` | `rgba(35, 190, 94, 0.12)` | success chip bg |
| `status.info.fg` | `#1F66E5` | info/progress text/icon |
| `status.info.bg` | `rgba(31, 102, 229, 0.10)` | info chip bg |
| `status.warning.fg` | `#B56A00` | warning text/icon |
| `status.warning.bg` | `rgba(245, 156, 35, 0.14)` | warning chip bg |
| `status.danger.fg` | `#B94444` | danger text/icon |
| `status.danger.bg` | `rgba(206, 105, 105, 0.14)` | danger chip bg |
| `status.neutral.fg` | `rgba(16, 20, 26, 0.62)` | neutral status text |
| `status.neutral.bg` | `rgba(16, 20, 26, 0.06)` | neutral chip bg |
| `status.paused.fg` | `rgba(16, 20, 26, 0.52)` | paused/manual status |
| `status.blocked.fg` | `#10141A` | blocked status, always with explanation |

## Typography

Primary font: `Lufga`.  
Fallback: geometric sans-serif stack with similar x-height.

| Token | Size | Line Height | Weight | Usage |
| --- | ---: | ---: | ---: | --- |
| `type.display` | `72px` | `80px` | `600` | DS covers only, not dense panels |
| `type.pageTitle` | `40px` | `48px` | `600` | page title |
| `type.sectionTitle` | `24px` | `32px` | `600` | panel/section title |
| `type.cardTitle` | `18px` | `24px` | `600` | card title |
| `type.body` | `15px` | `22px` | `400` | default body |
| `type.bodyStrong` | `15px` | `22px` | `600` | emphasized body |
| `type.small` | `13px` | `18px` | `400` | helper text |
| `type.caption` | `11px` | `14px` | `400` | metadata |
| `type.badge` | `11px` | `12px` | `600` | badge text |
| `type.button` | `14px` | `18px` | `500` | buttons/nav pills |

Typography rules:

- Do not scale font size with viewport width.
- Letter spacing is `0`.
- Dense panels must not use hero/display type.

## Spacing

| Token | Value |
| --- | ---: |
| `space.1` | `4px` |
| `space.2` | `8px` |
| `space.3` | `12px` |
| `space.4` | `16px` |
| `space.5` | `20px` |
| `space.6` | `24px` |
| `space.8` | `32px` |
| `space.10` | `40px` |
| `space.12` | `48px` |

## Layout

| Token | Value | Usage |
| --- | ---: | --- |
| `layout.sidebar.compact` | `72px` | icon sidebar |
| `layout.topbar.height` | `72px` | app topbar |
| `layout.page.paddingX` | `32px` | web page horizontal padding |
| `layout.page.paddingY` | `28px` | web page vertical padding |
| `layout.grid.gap` | `24px` | page grid gap |
| `layout.panel.gap` | `20px` | panel internal gap |
| `layout.contextPanel.width` | `320px` | right context panel minimum |
| `layout.content.maxWidth` | `1440px` | max canvas |

## Radius

| Token | Value | Usage |
| --- | ---: | --- |
| `radius.2xs` | `6px` | micro badge |
| `radius.xs` | `8px` | chips |
| `radius.sm` | `12px` | inputs/small pills |
| `radius.md` | `16px` | small cards |
| `radius.lg` | `20px` | internal cards |
| `radius.xl` | `24px` | medium panels |
| `radius.2xl` | `32px` | large panels |
| `radius.full` | `999px` | circles/pills |

## Borders

| Token | Value |
| --- | --- |
| `border.width.default` | `1px` |
| `border.width.strong` | `1.5px` |
| `border.color.default` | `rgba(16, 20, 26, 0.10)` |
| `border.color.subtle` | `rgba(16, 20, 26, 0.06)` |
| `border.color.active` | `rgba(16, 20, 26, 0.22)` |
| `border.color.blue` | `rgba(131, 162, 219, 0.70)` |
| `border.color.red` | `rgba(206, 105, 105, 0.70)` |

## Shadows

| Token | Value |
| --- | --- |
| `shadow.1` | `0 2px 8px rgba(16, 20, 26, 0.08)` |
| `shadow.2` | `0 6px 20px rgba(16, 20, 26, 0.10)` |
| `shadow.3` | `0 12px 32px rgba(16, 20, 26, 0.14)` |
| `shadow.innerSoft` | `inset 0 1px 0 rgba(255, 255, 255, 0.70)` |

## Surfaces

| Token | Value | Usage |
| --- | --- | --- |
| `surface.page` | `#E4E4E4` | outer app background |
| `surface.panel` | `rgba(255, 255, 255, 0.72)` | large panel |
| `surface.card` | `rgba(255, 255, 255, 0.88)` | internal card |
| `surface.button` | `rgba(255, 255, 255, 0.82)` | light button |
| `surface.subtle` | `rgba(16, 20, 26, 0.04)` | subtle area |
| `surface.selected` | `#10141A` | selected nav/control |

## Icon Sizes

| Token | Button Size | Icon Size |
| --- | ---: | ---: |
| `iconButton.sm` | `36px` | `16px` |
| `iconButton.md` | `40px` | `18px` |
| `iconButton.lg` | `52px` | `20px` |
| `iconButton.xl` | `60px` | `22px` |

## Avatar Sizes

| Token | Size |
| --- | ---: |
| `avatar.xs` | `24px` |
| `avatar.sm` | `32px` |
| `avatar.md` | `40px` |
| `avatar.lg` | `56px` |
| `avatar.xl` | `72px` |

## Motion

| Token | Value | Usage |
| --- | ---: | --- |
| `motion.fast` | `120ms` | hover/press |
| `motion.base` | `180ms` | simple state change |
| `motion.slow` | `260ms` | drawer/modal entrance |
| `motion.ease` | `cubic-bezier(0.2, 0, 0, 1)` | default easing |

Reduced motion must disable non-essential transition and attention motion.
