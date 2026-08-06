import { CrmProductShell } from "@taliya/crm";
import { Toolbar } from "@taliya/ui";

type CrmShellClientProps = {
  children: React.ReactNode;
  drawer?: React.ReactNode;
};

export function CrmShellClient({ children, drawer }: CrmShellClientProps) {
  return (
    <CrmProductShell drawer={drawer}>
      <Toolbar />
      {children}
    </CrmProductShell>
  );
}
