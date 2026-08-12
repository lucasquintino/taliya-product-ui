import type { ComponentTone, IconName } from "../foundation.js";

export function alertIconForTone(tone: ComponentTone): IconName {
  if (tone === "success") return "checkCircle";
  if (tone === "warning" || tone === "danger" || tone === "blocked") return "alert";
  if (tone === "paused") return "pause";
  if (tone === "info" || tone === "update" || tone === "quota") return "info";
  return "circle";
}
