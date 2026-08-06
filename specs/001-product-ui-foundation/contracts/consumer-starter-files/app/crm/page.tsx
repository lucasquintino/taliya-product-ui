import { CrmRecordDrawer } from "@taliya/crm";
import { CrmShellClient } from "../../components/crm-shell-client";
import { WorkListPage } from "../../features/crm/work-list/work-list-page";

export default function CrmPage() {
  return (
    <CrmShellClient
      drawer={<CrmRecordDrawer open={false} title="Registro" onOpenChange={() => undefined} />}
    >
      <WorkListPage />
    </CrmShellClient>
  );
}
