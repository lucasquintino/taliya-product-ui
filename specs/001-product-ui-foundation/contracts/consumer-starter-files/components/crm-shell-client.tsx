import { CrmProductShell } from "@taliya/crm";
import { Toolbar } from "@taliya/ui";

type CrmShellClientProps = {
  children: React.ReactNode;
};

export function CrmShellClient({ children }: CrmShellClientProps) {
  return (
    <CrmProductShell>
      <Toolbar />
      {children}
    </CrmProductShell>
  );
}
