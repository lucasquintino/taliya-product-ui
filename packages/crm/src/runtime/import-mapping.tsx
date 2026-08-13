import { Avatar, Button, Card, Chip, Icon, Panel, Radio, StatusDot, cn } from "@taliya/ui";

import { CrmSurfaceProps } from "../patterns/shell.js";

export function DuplicateResolver({ state = "candidates", onAction, avatarSrc, className }: CrmSurfaceProps & {
    onAction?: (actionId: string) => void;
    avatarSrc?: string;
}) {
    return (<Panel className={cn("tcrm-duplicate-resolver", className)} data-state={state}>
      <header className="tcrm-duplicate-resolver__header">
        <span aria-hidden="true">5</span>
        <h3>Resolução de duplicidade</h3>
      </header>
      <div className="tcrm-duplicate-resolver__choices" role="radiogroup" aria-label="Escolher registro principal">
        <Radio defaultChecked label="Registro A (sugerido)" name="duplicate-primary" onChange={() => onAction?.("select-a")}/>
        <Radio label="Registro B" name="duplicate-primary" onChange={() => onAction?.("select-b")}/>
      </div>
      <div className="tcrm-duplicate-resolver__body">
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--primary">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="success"/>
            <span><strong>João Pedro Silva</strong><small>ID: 456871</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw (mãe)</dd></div>
            <div><dt>E-mail</dt><dd>joao.silva@email.com</dd></div>
            <div><dt>Endereço</dt><dd>Rua das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <div className="tcrm-duplicate-resolver__match-column" aria-hidden="true">
          <span>=</span>
          <StatusDot status="success"/>
          <StatusDot status="success"/>
          <Icon name="alert"/>
          <Icon name="arrowRight"/>
        </div>
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--conflict">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="danger"/>
            <span><strong>João Pedro Silva</strong><small>ID: 90214</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw</dd></div>
            <div className="is-warning"><dt>E-mail</dt><dd>joaopedro@gmail.com</dd></div>
            <div className="is-danger"><dt>Endereço</dt><dd>R. das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <Card className="tcrm-duplicate-resolver__actions">
          <strong>Ações</strong>
          <span>Escolher principal</span>
          <Radio defaultChecked label="Registro A" name="duplicate-action-primary" onChange={() => onAction?.("select-a")}/>
          <Radio label="Registro B" name="duplicate-action-primary" onChange={() => onAction?.("select-b")}/>
          <Button onClick={() => onAction?.("merge-a")} size="sm" variant="primary">Mesclar registros</Button>
          <Button onClick={() => onAction?.("separate")} size="sm" variant="secondary">Manter separados</Button>
        </Card>
      </div>
      <footer className="tcrm-duplicate-resolver__legend">
        <span><Icon name="check"/>Corresponde (5)</span>
        <span><Icon name="alert"/>Divergente (2)</span>
        <span><Icon name="alertCircle"/>Ausente (0)</span>
      </footer>
    </Panel>);
}
