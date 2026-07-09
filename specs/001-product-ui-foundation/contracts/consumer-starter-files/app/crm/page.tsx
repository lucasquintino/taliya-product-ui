import { CrmShellClient } from "../../components/crm-shell-client";
import { WorkListPage } from "../../features/crm/work-list/work-list-page";

export default function CrmPage() {
  return (
    <CrmShellClient>
      <WorkListPage />
    </CrmShellClient>
  );
}
