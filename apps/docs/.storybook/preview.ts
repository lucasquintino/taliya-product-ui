import type { Preview } from "@storybook/react-vite";

import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
import "../src/storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Taliya page",
      values: [{ name: "Taliya page", value: "#E4E4E4" }]
    },
    controls: {
      expanded: true
    },
    layout: "fullscreen"
  }
};

export default preview;
