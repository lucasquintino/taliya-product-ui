/** Access and authentication surfaces. */
import React from "react";
import { Button, Checkbox, IconButton, InlineAlert, Input, PasswordInput, SocialAuthButton, TaliyaLogo, cn } from "@taliya/ui";
import { CrmBrowserChrome, ProductWindowFrame, crmAccessShellBrowserToolbarItems } from "../../patterns/shell.js";

export function AccessShell({
  children,
  footer,
  context,
  summary,
  help,
  layout = "split",
  onHelp,
  onAccount,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  footer?: React.ReactNode;
  context?: React.ReactNode;
  summary?: React.ReactNode;
  help?: React.ReactNode;
  layout?: "split" | "centered";
  onHelp?: () => void;
  onAccount?: () => void;
}) {
  return (
    <ProductWindowFrame
      bodyClassName="tcrm-access-shell-window__body"
      className={cn("tcrm-access-shell-window", className)}
      chrome={<CrmBrowserChrome className="tcrm-access-shell__browser-chrome" toolbarItems={crmAccessShellBrowserToolbarItems} />}
      {...props}
    >
      <div className={cn("tcrm-access-shell", `tcrm-access-shell--${layout}`)} data-component="AccessShell" data-layout={layout}>
        <header className="tcrm-access-shell__brandbar">
        <TaliyaLogo />
          <span className="tcrm-access-shell__actions">
            <IconButton icon="help" label="Ajuda" onClick={onHelp} />
            <IconButton icon="user" label="Conta" onClick={onAccount} />
          </span>
        </header>
        <main className="tcrm-access-shell__main">
          <section aria-label="Conteudo principal de acesso" className="tcrm-access-shell__content">
            <div className="tcrm-access-shell__content-frame">{children}</div>
          </section>
          {layout === "split" ? (
            <aside aria-label="Contexto de acesso" className="tcrm-access-shell__rail">
              <section className="tcrm-access-shell__rail-card">
                <h3>Contexto</h3>
                <div className="tcrm-access-shell__rail-content">{context}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Resumo</h3>
                <div className="tcrm-access-shell__rail-content">{summary}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Ajuda</h3>
                <div className="tcrm-access-shell__rail-content">{help}</div>
              </section>
            </aside>
          ) : null}
        </main>
        {footer ?? <AccessFooterLinks variant="shell" />}
      </div>
    </ProductWindowFrame>
  );
}

export function AuthCard({
  mode = "signup",
  loading = false,
  error,
  onSubmit,
  onGoogle,
  onMicrosoft,
  onForgotPassword,
  onSwitchMode,
  onTerms,
  onPrivacy,
  className
}: {
  mode?: "signup" | "signin";
  loading?: boolean;
  error?: React.ReactNode;
  onSubmit?: () => void;
  onGoogle?: () => void;
  onMicrosoft?: () => void;
  onForgotPassword?: () => void;
  onSwitchMode?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  className?: string;
}) {
  const isSignup = mode === "signup";

  return (
    <section className={cn("tcrm-auth-card", className)} data-component="AuthCard" data-mode={mode}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
      >
        <header className="tcrm-auth-card__header">
          <h1>{isSignup ? "Crie sua conta Taliya" : "Entrar na Taliya"}</h1>
          <p>{isSignup ? "Continue com sua conta de trabalho ou receba um link por e-mail." : "Acesse sua conta para continuar."}</p>
        </header>
        <div className="tcrm-auth-card__providers">
          <SocialAuthButton disabled={loading} onClick={onGoogle} provider="Google" type="button">Continuar com Google</SocialAuthButton>
          <SocialAuthButton disabled={loading} onClick={onMicrosoft} provider="Microsoft" type="button">Continuar com Microsoft</SocialAuthButton>
        </div>
        <div className="tcrm-auth-card__divider"><span>ou</span></div>
        <div className="tcrm-auth-card__fields">
          {isSignup ? (
            <Input label="E-mail profissional" placeholder="nome@empresa.com" type="email" />
          ) : (
            <>
              <Input leadingIcon="mail" placeholder="E-mail" type="email" />
              <PasswordInput leadingIcon="lock" placeholder="Senha" />
            </>
          )}
        </div>
        {!isSignup ? (
          <div className="tcrm-auth-card__options">
            <Checkbox disabled={loading} label="Manter conectado" />
            <Button className="tcrm-auth-card__text-action" disabled={loading} onClick={onForgotPassword} size="sm" type="button" variant="ghost">Esqueci minha senha</Button>
          </div>
        ) : null}
        {error ? <InlineAlert title="Nao foi possivel continuar" tone="danger">{error}</InlineAlert> : null}
        <Button className="tcrm-auth-card__submit" loading={loading} type="submit" variant="primary">
          {isSignup ? "Continuar com e-mail" : "Entrar"}
        </Button>
        {isSignup ? (
          <>
            <p className="tcrm-auth-card__helper">Enviaremos um link seguro para você continuar e definir sua senha.</p>
            <p className="tcrm-auth-card__legal">
              Ao continuar, você concorda com os{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onTerms} size="sm" type="button" variant="ghost">Termos</Button>{" "}
              e a{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onPrivacy} size="sm" type="button" variant="ghost">Política de Privacidade</Button>.
            </p>
          </>
        ) : null}
        <p className="tcrm-auth-card__switch">
          {isSignup ? "Já tem conta?" : "Não tem conta?"}{" "}
          <Button className="tcrm-auth-card__switch-action" onClick={onSwitchMode} size="sm" type="button" variant="ghost">{isSignup ? "Entrar" : "Criar conta"}</Button>
        </p>
      </form>
    </section>
  );
}

export function AccessFooterLinks({
  links = ["Termos", "Privacidade", "Ajuda"],
  variant = "cluster",
  onLinkClick,
  className
}: {
  links?: string[];
  variant?: "cluster" | "shell";
  onLinkClick?: (link: string, index: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <footer className={cn("tcrm-access-footer-links", `tcrm-access-footer-links--${variant}`, className)} data-component="AccessFooterLinks" data-variant={variant}>
      {links.map((link, index) => (
        <React.Fragment key={link}>
          {index > 0 ? <span aria-hidden="true" className="tcrm-access-footer-links__separator">•</span> : null}
          <a href={`#${link.toLowerCase()}`} onClick={(event) => onLinkClick?.(link, index, event)}>
            {link}
          </a>
        </React.Fragment>
      ))}
    </footer>
  );
}

