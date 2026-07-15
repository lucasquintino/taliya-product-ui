# Image 64 Settings Notifications Workspace Diagnostic

- Source: `64_round-4.1M_configuracoes_05_notificacoes-aprovado.png`
- Story: `crm-image-coverage-configuracoes--image-64-configuracoes-notificacoes`
- Source/current dimensions: `1448x1086`
- Previous unrelated composition: mean absolute RGB delta `12.843850793117833`; different pixels `7.766348198569437%`
- First official-workspace capture: mean absolute RGB delta `13.003368885429492`; different pixels `8.242587731347233%`
- Accepted isolated-variant capture: mean absolute RGB delta `10.523345636240924`; different pixels `7.139523111830123%`; SHA-256 `b2c1fb6705a532819a3ddbcaa0270ab91fe38440dcb19b34379b03c33979c8a1`
- Current/diff evidence: `tmp/64-settings-notifications-refined-20260715/64_round-4.1M_configuracoes_05_notificacoes-aprovado--current.png` and `tmp/64-settings-notifications-refined-20260715/64_round-4.1M_configuracoes_05_notificacoes-aprovado--diff.png`

## Ownership Correction

`SettingsNotificationsWorkspace` now owns the canonical main-content anatomy in `@taliya/crm`: three role alert groups, four alert-frequency controls, four internal-channel controls, and the cancel/save footer. The image-coverage story supplies only shell metadata, state and callbacks. Financial `SettingsSection` defaults, permission impact copy and story-local page composition were removed.

`CrmRightPanelPage rightPanelVariant="settings-notifications"` now owns the source-specific `890px / 386px` split, `35px` gap, main/panel offsets, section dimensions, rule axes, header actions and assistant rhythm. The story also uses the canonical URL and neutral top navigation.

## Visual Verdict

**Fail 1:1; semi-approved for product review.** The final render contains the complete canonical product anatomy, fits in the first viewport and improves the current baseline from delta `14.180987768315306` / `8.892242300296084%` to `10.523345636240924` / `7.139523111830123%`. Images 61, 62, 63 and 65 remained bit-identical. Residuals are shared browser/shell chrome, typography, icon glyphs, fine borders, shadows and antialiasing.

The residual is owned by product review, not an unowned structural family. No story-local CSS or reusable anatomy is required.
