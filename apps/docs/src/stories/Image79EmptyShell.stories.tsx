import type { Meta } from "@storybook/react-vite";

import { CrmEmptyShell } from "@taliya/crm";

import image79Avatar from "../assets/image79-avatar.png";

const meta: Meta = {
  title: "CRM / Image Coverage / Image 79 Empty Shell",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Clone final de 79_round-4.1S_app-shell_01_base-web-sem-conteudo.png. Esta tela deve ser composta por CRM / Shell / Components, que por sua vez compoem Primitives / UI."
      }
    }
  }
};

export default meta;

export function Image79EmptyShell() {
  return <CrmEmptyShell avatarSrc={image79Avatar} />;
}

Image79EmptyShell.parameters = {
  docs: {
    description: {
      story: "Fonte: 79_round-4.1S_app-shell_01_base-web-sem-conteudo.png."
    }
  },
  sourceImage: "79_round-4.1S_app-shell_01_base-web-sem-conteudo.png"
};
