import { CrmShellClient } from "../../../components/crm-shell-client";
import { KanbanPage } from "../../../features/crm/kanban/kanban-page";

export default function CrmKanbanRoute() {
  return (
    <CrmShellClient>
      <KanbanPage />
    </CrmShellClient>
  );
}
