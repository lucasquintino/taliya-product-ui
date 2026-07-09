import { createRoot } from "react-dom/client";

import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
import "./storybook.css";

import { TodayShell } from "./stories/ImageCoverageToday.stories";

function PreviewApp() {
  const params = new URLSearchParams(window.location.search);
  const imageParam = params.get("image");
  const image = imageParam === "18" || imageParam === "20" ? imageParam : "17";

  return <TodayShell drawer={image === "18"} />;
}

createRoot(document.getElementById("root")!).render(
  <PreviewApp />
);
