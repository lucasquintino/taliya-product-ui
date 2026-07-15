import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixPopover from "@radix-ui/react-popover";
import * as RadixSelect from "@radix-ui/react-select";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ArrowUpDown,
  Banknote,
  BarChart3,
  Bell,
  Bot,
  BookOpen,
  Calendar,
  Camera,
  ChartPie,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Circle,
  CircleAlert,
  ClipboardCheck,
  ClipboardList,
  Clock,
  CloudOff,
  Coins,
  Copy,
  CreditCard,
  Database,
  Download,
  Edit3,
  Ellipsis,
  Eye,
  EyeOff,
  ExternalLink,
  FileDown,
  FileText,
  Filter,
  Fingerprint,
  Folder,
  Hand,
  HelpCircle,
  Headphones,
  Home,
  Inbox,
  Info,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  MessageCircleMore,
  MessageSquareText,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Package,
  Pause,
  Percent,
  Phone,
  Play,
  Plus,
  Search,
  Scan,
  Send,
  Settings,
  ShoppingCart,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  GraduationCap,
  RefreshCw,
  Rocket,
  Scale,
  Tag,
  TrendingUp,
  Trash2,
  Unplug,
  Upload,
  User,
  Users,
  WalletCards,
  X
} from "lucide-react";
import type { LucideIcon as LucideComponent } from "lucide-react";

const ShieldStarIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<LucideComponent>>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, ...props }, ref) => (
  <svg
    fill="none"
    height={size}
    ref={ref}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
    <path d="m12 7.8 1.05 2.13 2.35.34-1.7 1.66.4 2.34-2.1-1.1-2.1 1.1.4-2.34-1.7-1.66 2.35-.34L12 7.8Z" />
  </svg>
  )
);
ShieldStarIcon.displayName = "ShieldStarIcon";

const SlidersRoundIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<LucideComponent>>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, ...props }, ref) => (
    <svg
      fill="none"
      height={size}
      ref={ref}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.4 6.8h3.7" />
      <path d="M12.9 6.8h7.7" />
      <circle cx="10" cy="6.8" r="2.75" />
      <path d="M3.4 12h9.1" />
      <path d="M18.4 12h2.2" />
      <circle cx="15.5" cy="12" r="2.75" />
      <path d="M3.4 17.2h3.7" />
      <path d="M12.9 17.2h7.7" />
      <circle cx="10" cy="17.2" r="2.75" />
    </svg>
  )
);
SlidersRoundIcon.displayName = "SlidersRoundIcon";

const WhatsAppIcon = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<LucideComponent>>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, ...props }, ref) => (
    <svg
      fill="none"
      height={size}
      ref={ref}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
      <path d="M9.2 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.2.7l-.4.4c.6 1.1 1.5 1.9 2.7 2.4l.5-.6c.2-.2.4-.3.7-.2l1.4.7c.3.1.4.3.4.6v.4c0 .4-.2.7-.6.9-.5.3-1.4.5-2.9-.1-2.5-1-4.3-3.2-4.8-4.7-.3-.8 0-1.5.4-1.8Z" />
    </svg>
  )
);
WhatsAppIcon.displayName = "WhatsAppIcon";

export type Size = "sm" | "md" | "lg";
export type ComponentTone =
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "paused"
  | "blocked"
  | "update"
  | "quota";
export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
export type IconButtonVariant = "default" | "subtle" | "selected" | "danger" | "ghost";

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export const iconRegistry = {
  alert: AlertTriangle,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  banknote: Banknote,
  barChart: BarChart3,
  bell: Bell,
  bot: Bot,
  book: BookOpen,
  calendar: Calendar,
  camera: Camera,
  pieChart: ChartPie,
  check: Check,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsRight: ChevronsRight,
  circle: Circle,
  alertCircle: CircleAlert,
  clipboard: ClipboardList,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  cloudOff: CloudOff,
  coins: Coins,
  copy: Copy,
  creditCard: CreditCard,
  database: Database,
  download: Download,
  edit: Edit3,
  ellipsis: Ellipsis,
  eye: Eye,
  eyeOff: EyeOff,
  externalLink: ExternalLink,
  fileDown: FileDown,
  fileText: FileText,
  filter: Filter,
  fingerprint: Fingerprint,
  folder: Folder,
  hand: Hand,
  help: HelpCircle,
  headphones: Headphones,
  home: Home,
  inbox: Inbox,
  info: Info,
  layout: LayoutDashboard,
  link: Link2,
  loader: LoaderCircle,
  lock: Lock,
  mail: Mail,
  menu: Menu,
  message: MessageCircle,
  messageMore: MessageCircleMore,
  messageSquareText: MessageSquareText,
  minus: Minus,
  moon: Moon,
  more: MoreHorizontal,
  moreVertical: MoreVertical,
  paperclip: Paperclip,
  package: Package,
  pause: Pause,
  percent: Percent,
  phone: Phone,
  play: Play,
  plus: Plus,
  search: Search,
  scan: Scan,
  send: Send,
  settings: Settings,
  shoppingCart: ShoppingCart,
  shield: Shield,
  shieldAlert: ShieldAlert,
  shieldCheck: ShieldCheck,
  shieldX: ShieldX,
  shieldStar: ShieldStarIcon,
  sliders: SlidersHorizontal,
  slidersRound: SlidersRoundIcon,
  sort: ArrowUpDown,
  sortAsc: ArrowUpNarrowWide,
  sortDesc: ArrowDownNarrowWide,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  graduation: GraduationCap,
  refresh: RefreshCw,
  rocket: Rocket,
  scale: Scale,
  tag: Tag,
  trendingUp: TrendingUp,
  trash: Trash2,
  unplug: Unplug,
  upload: Upload,
  user: User,
  users: Users,
  wallet: WalletCards,
  whatsapp: WhatsAppIcon,
  x: X
} satisfies Record<string, LucideComponent>;

export type IconName = keyof typeof iconRegistry;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  tone?: ComponentTone | "current";
  label?: string;
}

const iconSizeTokenByName: Record<string, string> = {
  sm: "var(--taliya-control-icon-size-sm)",
  md: "var(--taliya-control-icon-size-md)",
  lg: "var(--taliya-control-icon-size-lg)"
};

const iconButtonIconSizeTokenBySize: Record<Size | "xl", string> = {
  sm: "var(--taliya-control-icon-button-sm-icon)",
  md: "var(--taliya-control-icon-button-md-icon)",
  lg: "var(--taliya-control-icon-button-lg-icon)",
  xl: "var(--taliya-control-icon-button-xl-icon)"
};

export function Icon({
  name,
  size = "md",
  tone = "current",
  label,
  className,
  style,
  strokeWidth,
  ...props
}: IconProps) {
  const LucideIcon = iconRegistry[name] ?? Circle;
  const resolvedSize = typeof size === "string" ? (iconSizeTokenByName[size] ?? size) : size;
  const iconStyle = {
    "--tl-icon-size": typeof resolvedSize === "number" ? `${resolvedSize}px` : resolvedSize,
    ...style
  } as React.CSSProperties;

  return (
    <LucideIcon
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      className={cn("tl-icon", tone !== "current" && `tl-icon--${tone}`, className)}
      focusable="false"
      role={label ? "img" : undefined}
      size={resolvedSize}
      style={iconStyle}
      strokeWidth={strokeWidth ?? "var(--taliya-control-icon-stroke-width)"}
      {...props}
    />
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  tone?: "default" | "danger";
  loading?: boolean;
  blockedReason?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = "secondary",
  size = "md",
  tone = "default",
  loading = false,
  blockedReason,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps, ref) {
  const isDisabled = disabled || loading || Boolean(blockedReason);

  return (
    <button
      className={cn(
        "tl-button",
        `tl-button--${variant}`,
        `tl-button--${size}`,
        tone !== "default" && `tl-button--tone-${tone}`,
        blockedReason && "tl-button--blocked",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      ref={ref}
      title={blockedReason}
      type={type}
      {...props}
    >
      {loading ? <Icon className="tl-spin" name="loader" /> : leadingIcon ? <Icon name={leadingIcon} /> : null}
      <span>{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} /> : null}
    </button>
  );
});

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  size?: Size | "xl";
  variant?: IconButtonVariant;
  selected?: boolean;
  alert?: boolean;
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    label,
    size = "md",
    variant = "default",
    selected = false,
    alert = false,
    loading = false,
    className,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  const isSelected = selected || variant === "selected";
  const isDisabled = disabled || loading;

  return (
    <button
      aria-label={label}
      aria-pressed={isSelected || undefined}
      aria-busy={loading || undefined}
      className={cn(
        "tl-icon-button",
        `tl-icon-button--${size}`,
        `tl-icon-button--${variant}`,
        isSelected && "tl-icon-button--selected",
        alert && "tl-icon-button--alert",
        loading && "tl-icon-button--loading",
        className
      )}
      disabled={isDisabled}
      ref={ref}
      title={label}
      type={type}
      {...props}
    >
      <Icon className={loading ? "tl-spin" : undefined} name={loading ? "loader" : icon} size={iconButtonIconSizeTokenBySize[size]} />
      {alert ? <span className="tl-icon-button__alert" /> : null}
    </button>
  );
});

export function ButtonGroup({
  className,
  align = "start",
  role = "group",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "between" }) {
  return <div className={cn("tl-button-group", `tl-button-group--${align}`, className)} role={role} {...props} />;
}

export interface DropdownAction {
  label: string;
  icon?: IconName;
  disabled?: boolean;
  destructive?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  label?: string;
  actions: DropdownAction[];
  className?: string;
  triggerIcon?: IconName;
  trigger?: (props: {
    id: string;
    isOpen: boolean;
    label: string;
    onClick: () => void;
    onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  }) => React.ReactElement;
  align?: "start" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  label = "Abrir menu",
  actions,
  className,
  triggerIcon = "more",
  trigger,
  align = "end",
  open,
  defaultOpen = false,
  onOpenChange
}: DropdownMenuProps) {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const setTriggerNode = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);

  const setOpen = useCallback((nextOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.requestAnimationFrame(() => {
      const firstEnabledItem = itemRefs.current.find((item) => item && !item.disabled);
      firstEnabledItem?.focus();
    });
  }, [isOpen]);

  const focusMenuItem = (currentIndex: number, direction: 1 | -1) => {
    const enabledItems = itemRefs.current
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item && !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex(({ index }) => index === currentIndex);
    const nextEnabledIndex =
      currentEnabledIndex === -1
        ? 0
        : (currentEnabledIndex + direction + enabledItems.length) % enabledItems.length;
    enabledItems[nextEnabledIndex]?.item?.focus();
  };

  return (
    <div
      className={cn("tl-menu", `tl-menu--${align}`, isOpen && "tl-menu--open", className)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
      ref={containerRef}
    >
      {trigger ? trigger({
        id: menuId,
        isOpen,
        label,
        onClick: () => setOpen(!isOpen),
        onKeyDown: (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }
      }) : (
        <IconButton
          aria-controls={menuId}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          icon={triggerIcon}
          label={label}
          onClick={() => setOpen(!isOpen)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
            }
          }}
          ref={setTriggerNode}
        />
      )}
      <div className="tl-menu__content" hidden={!isOpen} id={menuId} role="menu">
        {actions.map((action, index) => (
          <button
            aria-checked={action.selected || undefined}
            className={cn(
              "tl-menu__item",
              action.destructive && "tl-menu__item--destructive",
              action.selected && "tl-menu__item--selected"
            )}
            disabled={action.disabled}
            key={action.label}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusMenuItem(index, 1);
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                focusMenuItem(index, -1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                itemRefs.current.find((item) => item && !item.disabled)?.focus();
              }
              if (event.key === "End") {
                event.preventDefault();
                [...itemRefs.current].reverse().find((item) => item && !item.disabled)?.focus();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
            onClick={() => {
              action.onSelect?.();
              setOpen(false);
              triggerRef.current?.focus();
            }}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            role="menuitem"
            type="button"
          >
            {action.icon ? <Icon name={action.icon} size="var(--taliya-control-menu-icon-size)" /> : null}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ActionMenu(props: DropdownMenuProps) {
  return <DropdownMenu {...props} />;
}

export interface NavPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: IconName;
  count?: React.ReactNode;
  variant?: "default" | "shell";
}

export function NavPill({ active = false, icon, count, variant = "default", className, children, type = "button", ...props }: NavPillProps) {
  return (
    <button
      aria-pressed={active}
      className={cn("tl-nav-pill", variant !== "default" && `tl-nav-pill--${variant}`, active && "tl-nav-pill--active", className)}
      type={type}
      {...props}
    >
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
      {count ? <span className="tl-nav-pill__count">{count}</span> : null}
    </button>
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("tl-breadcrumb", className)}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <span className="tl-breadcrumb__item" key={`${item.label}-${index}`}>
            {index > 0 ? <Icon name="chevronRight" size={13} /> : null}
            {item.href && !isCurrent ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current={isCurrent ? "page" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function FilterBar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tl-filter-bar", className)} {...props} />;
}

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  count?: React.ReactNode;
}

export function FilterChip({
  selected = false,
  removable = false,
  onRemove,
  removeLabel,
  count,
  className,
  children,
  type = "button",
  ...props
}: FilterChipProps) {
  const chipButton = (
    <button
      aria-pressed={selected}
      className={cn("tl-filter-chip", selected && "tl-filter-chip--selected", className)}
      type={type}
      {...props}
    >
      <span>{children}</span>
      {count ? <span className="tl-filter-chip__count">{count}</span> : null}
      {removable && !onRemove ? <Icon name="x" size="var(--taliya-control-chip-icon-size)" /> : null}
    </button>
  );

  if (!removable || !onRemove) {
    return chipButton;
  }

  return (
    <span className="tl-filter-chip-group">
      {chipButton}
      <IconButton
        className="tl-filter-chip__remove"
        icon="x"
        label={removeLabel ?? `Remover ${children}`}
        onClick={onRemove}
        size="sm"
        variant={selected ? "selected" : "subtle"}
      />
    </span>
  );
}

export interface FilterSelectOption {
  value: string;
  label: React.ReactNode;
  icon?: IconName;
  description?: React.ReactNode;
  count?: React.ReactNode;
  disabled?: boolean;
}

export interface FilterSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "value"> {
  label: string;
  options: FilterSelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  emptyText?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  icon?: IconName;
  open?: boolean;
  defaultOpen?: boolean;
  clearLabel?: string;
  triggerDisplay?: "label-value" | "value";
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
}

export function FilterSelect({
  label,
  options,
  value,
  defaultValue,
  emptyText = "Nenhuma opcao disponivel.",
  loading = false,
  disabled = false,
  clearable = true,
  icon,
  open: controlledOpen,
  defaultOpen = false,
  clearLabel = "Limpar",
  triggerDisplay = "label-value",
  onOpenChange,
  onValueChange,
  className,
  ...props
}: FilterSelectProps) {
  const listId = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const isSelected = Boolean(selectedOption);
  const summary = selectedOption?.label ?? label;
  const triggerLabel = selectedOption ? `${label}: ${selectedOption.label}` : label;

  const commitValue = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const clearSelection = () => {
    commitValue("");
    setOpen(false);
  };

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open}>
      <RadixPopover.Trigger asChild>
        <button
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={triggerLabel}
          className={cn("tl-filter-select", isSelected && "tl-filter-select--selected", open && "tl-filter-select--open", className)}
          disabled={disabled}
          type="button"
          {...props}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest("[data-filter-clear]")) {
              event.preventDefault();
              event.stopPropagation();
              clearSelection();
              return;
            }
            props.onClick?.(event);
          }}
        >
          {icon ? <Icon name={icon} size="var(--taliya-control-chip-icon-size)" /> : null}
          {triggerDisplay === "label-value" || !isSelected ? <span className="tl-filter-select__label">{label}</span> : null}
          {isSelected && triggerDisplay === "label-value" ? (
            <span className="tl-filter-select__separator" aria-hidden="true">
              :
            </span>
          ) : null}
          {isSelected ? <span className="tl-filter-select__value">{summary}</span> : null}
          {isSelected && clearable ? (
            <span className="tl-filter-select__clear-icon" data-filter-clear aria-label={clearLabel} title={clearLabel}>
              <Icon name="x" size="var(--taliya-control-chip-icon-size)" />
            </span>
          ) : null}
          <Icon name="chevronDown" size="var(--taliya-control-chip-icon-size)" />
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align="start"
          className="tl-filter-select__popup"
          onCloseAutoFocus={(event) => event.preventDefault()}
          side="bottom"
          sideOffset={6}
        >
          <div aria-label={label} className="tl-filter-select__options" id={listId} role="listbox">
            {loading ? (
              <span className="tl-filter-select__state">Carregando opcoes...</span>
            ) : options.length === 0 ? (
              <span className="tl-filter-select__state">{emptyText}</span>
            ) : (
              options.map((option) => {
                const optionSelected = selectedValue === option.value;
                return (
                  <button
                    aria-selected={optionSelected}
                    className={cn("tl-filter-select__option", optionSelected && "tl-filter-select__option--selected")}
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => {
                      if (option.disabled || loading) return;
                      if (!optionSelected) commitValue(option.value);
                      setOpen(false);
                    }}
                    role="option"
                    type="button"
                  >
                    <span className="tl-filter-select__option-icon" aria-hidden="true">
                      {option.icon ? <Icon name={option.icon} size="var(--taliya-control-select-item-icon-size)" /> : null}
                    </span>
                    <span className="tl-filter-select__option-body">
                      <span>{option.label}</span>
                    </span>
                    <span className="tl-filter-select__option-check" aria-hidden="true">
                      {optionSelected ? <Icon name="check" size="var(--taliya-control-select-item-icon-size)" /> : null}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export interface FilterMultiSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "value"> {
  label: string;
  options: FilterSelectOption[];
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  emptyText?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  clearLabel?: string;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string[]) => void;
}

export function FilterMultiSelect({
  label,
  options,
  value,
  defaultValue,
  emptyText = "Nenhuma opcao disponivel.",
  loading = false,
  disabled = false,
  open: controlledOpen,
  defaultOpen = false,
  clearLabel = "Limpar",
  onOpenChange,
  onValueChange,
  className,
  ...props
}: FilterMultiSelectProps) {
  const listId = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const selectedValues = isControlled ? value : internalValue;
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const isSelected = selectedValues.length > 0;
  const visibleSelectedOptions = selectedOptions.slice(0, 2);
  const hiddenSelectedCount = Math.max(0, selectedOptions.length - visibleSelectedOptions.length);
  const triggerLabel = selectedOptions.length > 1 ? `${label}: ${selectedOptions.length}` : selectedOptions.length === 1 ? `${label}: ${selectedOptions[0]?.label}` : label;

  const commitValue = (nextValue: string[]) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const toggleOption = (option: FilterSelectOption) => {
    if (option.disabled || loading) return;
    const nextValue = selectedValues.includes(option.value)
      ? selectedValues.filter((item) => item !== option.value)
      : [...selectedValues, option.value];
    commitValue(nextValue);
  };

  const clearSelection = () => {
    commitValue([]);
    setOpen(false);
  };

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open}>
      <RadixPopover.Trigger asChild>
        <button
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={triggerLabel}
          className={cn("tl-filter-select tl-filter-multi-select", isSelected && "tl-filter-select--selected", open && "tl-filter-select--open", className)}
          disabled={disabled}
          type="button"
          {...props}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest("[data-filter-clear]")) {
              event.preventDefault();
              event.stopPropagation();
              clearSelection();
              return;
            }
            props.onClick?.(event);
          }}
        >
          <span className="tl-filter-select__label">{label}</span>
          {isSelected ? (
            <span className="tl-filter-multi-select__values" aria-hidden="true">
              {visibleSelectedOptions.map((option) => (
                <span className="tl-filter-multi-select__pill" key={option.value}>
                  {option.label}
                </span>
              ))}
              {hiddenSelectedCount > 0 ? <span className="tl-filter-multi-select__pill">+{hiddenSelectedCount}</span> : null}
            </span>
          ) : null}
          {isSelected ? (
            <span className="tl-filter-select__clear-icon" data-filter-clear aria-label={clearLabel} title={clearLabel}>
              <Icon name="x" size="var(--taliya-control-chip-icon-size)" />
            </span>
          ) : null}
          <Icon name="chevronDown" size="var(--taliya-control-chip-icon-size)" />
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align="start"
          className="tl-filter-select__popup"
          onCloseAutoFocus={(event) => event.preventDefault()}
          side="bottom"
          sideOffset={6}
        >
          <div aria-label={label} aria-multiselectable className="tl-filter-select__options" id={listId} role="listbox">
            {loading ? (
              <span className="tl-filter-select__state">Carregando opcoes...</span>
            ) : options.length === 0 ? (
              <span className="tl-filter-select__state">{emptyText}</span>
            ) : (
              options.map((option) => {
                const optionSelected = selectedValues.includes(option.value);
                return (
                  <button
                    aria-selected={optionSelected}
                    className={cn("tl-filter-select__option", optionSelected && "tl-filter-select__option--selected")}
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => toggleOption(option)}
                    role="option"
                    type="button"
                  >
                    <span className="tl-filter-select__option-icon" aria-hidden="true">
                      {option.icon ? <Icon name={option.icon} size="var(--taliya-control-select-item-icon-size)" /> : null}
                    </span>
                    <span className="tl-filter-select__option-body">
                      <span>{option.label}</span>
                    </span>
                    <span className="tl-filter-select__option-check" aria-hidden="true">
                      {optionSelected ? <Icon name="check" size="var(--taliya-control-select-item-icon-size)" /> : null}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
  icon?: IconName;
  showDot?: boolean;
}

export function Chip({ tone = "neutral", icon, showDot = true, className, children, ...props }: ChipProps) {
  return (
    <span className={cn("tl-chip", `tl-chip--${tone}`, className)} {...props}>
      {icon ? <Icon name={icon} size="var(--taliya-control-chip-icon-size)" /> : showDot ? <span className="tl-chip__dot" /> : null}
      <span>{children}</span>
    </span>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
  variant?: "count" | "dot" | "pill";
  label?: string;
}

export function Badge({ tone = "neutral", variant = "pill", label, className, children, ...props }: BadgeProps) {
  return (
    <span
      aria-label={label}
      className={cn("tl-badge", `tl-badge--${tone}`, `tl-badge--${variant}`, className)}
      role={label ? "status" : undefined}
      {...props}
    >
      {variant === "dot" ? <span className="tl-badge__dot" /> : children}
    </span>
  );
}

export type StatusDotStatus =
  | "online"
  | "paused"
  | "pending"
  | "error"
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "blocked"
  | "update"
  | "quota";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusDotStatus;
  label?: string;
}

export function StatusDot({ status = "neutral", label, className, ...props }: StatusDotProps) {
  return (
    <span className={cn("tl-status-dot", `tl-status-dot--${status}`, className)} {...props}>
      <span className="tl-status-dot__mark" />
      {label ? <span>{label}</span> : null}
    </span>
  );
}

export interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ComponentTone;
  title?: string;
  icon?: IconName;
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function InlineAlert({
  tone = "info",
  title,
  icon,
  action,
  onDismiss,
  dismissLabel = "Fechar alerta",
  className,
  children,
  role,
  ...props
}: InlineAlertProps) {
  const alertRole = role ?? (tone === "danger" ? "alert" : "status");

  return (
    <div className={cn("tl-alert", `tl-alert--${tone}`, className)} role={alertRole} {...props}>
      <Icon className="tl-alert__icon" name={icon ?? alertIconForTone(tone)} />
      <div className="tl-alert__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <div className="tl-alert__content">{children}</div> : null}
      </div>
      {action ? <div className="tl-alert__action">{action}</div> : null}
      {onDismiss ? <IconButton className="tl-alert__close" icon="x" label={dismissLabel} onClick={onDismiss} size="sm" variant="ghost" /> : null}
    </div>
  );
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ComponentTone;
  title?: string;
  icon?: IconName;
  action?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Toast({
  tone = "neutral",
  title,
  icon,
  action,
  onClose,
  closeLabel = "Fechar notificação",
  className,
  children,
  role,
  ...props
}: ToastProps) {
  const toastRole = role ?? (tone === "danger" ? "alert" : "status");

  return (
    <div className={cn("tl-toast", `tl-toast--${tone}`, className)} role={toastRole} {...props}>
      <span className="tl-toast__icon">
        <Icon name={icon ?? alertIconForTone(tone)} />
      </span>
      <div className="tl-toast__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <div className="tl-toast__content">{children}</div> : null}
      </div>
      {action ? <div className="tl-toast__action">{action}</div> : null}
      {onClose ? <IconButton className="tl-toast__close" icon="x" label={closeLabel} onClick={onClose} size="sm" variant="ghost" /> : null}
    </div>
  );
}

function alertIconForTone(tone: ComponentTone): IconName {
  if (tone === "success") return "checkCircle";
  if (tone === "warning" || tone === "danger" || tone === "blocked") return "alert";
  if (tone === "paused") return "pause";
  if (tone === "info" || tone === "update" || tone === "quota") return "info";
  return "circle";
}

export type FieldState = "default" | "success" | "warning" | "error" | "blocked";

export type FieldBaseProps = {
  label?: string;
  helperText?: string;
  error?: string;
  fieldSize?: Size;
  fieldState?: FieldState;
  blockedReason?: string;
};

export interface InputProps
  extends FieldBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  leadingIconTone?: IconProps["tone"];
  trailingIconTone?: IconProps["tone"];
  leadingText?: React.ReactNode;
  trailingText?: React.ReactNode;
  clearLabel?: string;
  onClear?: () => void;
  loading?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  fieldSize = "md",
  fieldState = "default",
  blockedReason,
  leadingIcon,
  trailingIcon,
  leadingIconTone,
  trailingIconTone,
  leadingText,
  trailingText,
  clearLabel,
  onClear,
  loading = false,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${inputId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);

  return (
    <label
      className={cn(
        "tl-field",
        `tl-field--${resolvedState}`,
        readOnly && "tl-field--readonly",
        isDisabled && "tl-field--disabled",
        className
      )}
      htmlFor={inputId}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <span className={cn("tl-input-shell", `tl-input-shell--${fieldSize}`)}>
        {leadingIcon ? (
          <Icon
            className={loading ? "tl-spin" : undefined}
            name={loading ? "loader" : leadingIcon}
            size="var(--taliya-control-field-icon-size)"
            tone={leadingIconTone}
          />
        ) : null}
        {leadingText ? <span className="tl-input-affix">{leadingText}</span> : null}
        <input
          aria-busy={loading || undefined}
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error) || undefined}
          aria-labelledby={labelId}
          className="tl-input"
          disabled={isDisabled}
          id={inputId}
          readOnly={readOnly}
          {...props}
        />
        {trailingText ? <span className="tl-input-affix">{trailingText}</span> : null}
        {onClear ? (
          <IconButton
            className="tl-input-clear"
            disabled={isDisabled || readOnly}
            icon="x"
            label={clearLabel ?? `Limpar ${label ?? "campo"}`}
            onClick={onClear}
            size="sm"
            variant="ghost"
          />
        ) : null}
        {trailingIcon ? (
          <Icon
            name={trailingIcon}
            size="var(--taliya-control-field-icon-size)"
            tone={trailingIconTone ?? (resolvedState === "error" ? "danger" : "current")}
          />
        ) : null}
      </span>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </label>
  );
}

export interface TextareaProps
  extends FieldBaseProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  density?: "default" | "compact";
}

export function Textarea({
  label,
  helperText,
  error,
  fieldState = "default",
  density = "default",
  blockedReason,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${inputId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);

  return (
    <label
      className={cn(
        "tl-field",
        `tl-field--${resolvedState}`,
        readOnly && "tl-field--readonly",
        isDisabled && "tl-field--disabled",
        className
      )}
      htmlFor={inputId}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <textarea
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error) || undefined}
        aria-labelledby={labelId}
        className={cn("tl-textarea", density !== "default" && `tl-textarea--${density}`)}
        disabled={isDisabled}
        id={inputId}
        readOnly={readOnly}
        {...props}
      />
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </label>
  );
}

export interface FieldStackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md";
}

export function FieldStack({ gap = "sm", className, ...props }: FieldStackProps) {
  return <div className={cn("tl-field-stack", `tl-field-stack--${gap}`, className)} {...props} />;
}

export interface TagInputItem {
  id: string;
  label: React.ReactNode;
}

export interface TagInputProps extends FieldBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: Array<TagInputItem | string>;
  removable?: boolean;
  onRemove?: (item: TagInputItem, index: number) => void;
  placeholder?: React.ReactNode;
}

export function TagInput({
  label,
  helperText,
  error,
  fieldState = "default",
  blockedReason,
  className,
  items,
  removable = false,
  onRemove,
  placeholder,
  id,
  ...props
}: TagInputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = label ? `${fieldId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${fieldId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const normalizedItems = items.map((item) => (typeof item === "string" ? { id: item, label: item } : item));

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className={cn("tl-field", `tl-field--${resolvedState}`, className)}
      id={fieldId}
      role="group"
      {...props}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <div className="tl-tag-input">
        {normalizedItems.length ? (
          normalizedItems.map((item, index) => (
            <span className="tl-tag-input__chip" key={item.id}>
              <span>{item.label}</span>
              {removable ? (
                <IconButton
                  icon="x"
                  label={`Remover ${typeof item.label === "string" ? item.label : item.id}`}
                  onClick={() => onRemove?.(item, index)}
                  size="sm"
                  variant="ghost"
                />
              ) : null}
            </span>
          ))
        ) : (
          <span className="tl-tag-input__placeholder">{placeholder}</span>
        )}
      </div>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </div>
  );
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends FieldBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "size" | "value"> {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
}

export function Select({
  label,
  helperText,
  error,
  fieldSize = "md",
  fieldState = "default",
  blockedReason,
  options,
  placeholder,
  className,
  id,
  disabled,
  value,
  defaultValue,
  name,
  required,
  open,
  defaultOpen,
  onOpenChange,
  onValueChange,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = label ? `${selectId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${selectId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);

  return (
    <div
      className={cn("tl-field", `tl-field--${resolvedState}`, isDisabled && "tl-field--disabled", className)}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <RadixSelect.Root
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={isDisabled}
        name={name}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        open={open}
        required={required}
        value={value}
      >
        <RadixSelect.Trigger
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error) || undefined}
          aria-labelledby={labelId}
          className={cn("tl-select-shell", `tl-select-shell--${fieldSize}`)}
          id={selectId}
          {...props}
        >
          <RadixSelect.Value className="tl-select-value" placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <Icon name="chevronDown" size="var(--taliya-control-field-icon-size)" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className="tl-select-content"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
            }}
            position="popper"
            sideOffset={6}
          >
            <RadixSelect.Viewport className="tl-select-viewport">
              {options.map((option) => (
                <RadixSelect.Item className="tl-select-item" disabled={option.disabled} key={option.value} value={option.value}>
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="tl-select-item__indicator">
                    <Icon name="check" size="var(--taliya-control-select-item-icon-size)" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </div>
  );
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  indeterminate?: boolean;
  helperText?: string;
}

export function Checkbox({ label, indeterminate = false, helperText, className, disabled, ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={cn("tl-checkbox", indeterminate && "tl-checkbox--indeterminate", disabled && "tl-checkbox--disabled", className)}>
      <input aria-checked={indeterminate ? "mixed" : undefined} disabled={disabled} ref={ref} type="checkbox" {...props} />
      <span className="tl-checkbox__box" aria-hidden="true" />
      <span className="tl-checkbox__content">
        {label ? <span>{label}</span> : null}
        {helperText ? <small>{helperText}</small> : null}
      </span>
    </label>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helperText?: string;
}

export function Radio({ label, helperText, className, disabled, ...props }: RadioProps) {
  return (
    <label className={cn("tl-radio", disabled && "tl-radio--disabled", className)}>
      <input disabled={disabled} type="radio" {...props} />
      <span className="tl-radio__mark" aria-hidden="true" />
      <span className="tl-radio__content">
        {label ? <span>{label}</span> : null}
        {helperText ? <small>{helperText}</small> : null}
      </span>
    </label>
  );
}

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: string;
  blockedReason?: string;
  compact?: boolean;
}

export function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  label,
  blockedReason,
  compact = false,
  className,
  type = "button",
  disabled,
  onClick,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const resolvedPressed = isControlled ? pressed : uncontrolledPressed;
  const isDisabled = disabled || Boolean(blockedReason);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || isDisabled) {
      return;
    }

    const nextPressed = !resolvedPressed;
    if (!isControlled) {
      setUncontrolledPressed(nextPressed);
    }
    onPressedChange?.(nextPressed);
  };

  return (
    <button
      aria-checked={resolvedPressed}
      className={cn(
        "tl-toggle",
        resolvedPressed && "tl-toggle--on",
        compact && "tl-toggle--compact",
        blockedReason && "tl-toggle--blocked",
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      role="switch"
      title={blockedReason}
      type={type}
      {...props}
    >
      <span className="tl-toggle__track">
        <span className="tl-toggle__thumb" />
      </span>
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
  current?: boolean | "page" | "step" | "location" | "date" | "time";
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  compact = false,
  variant = "default",
  className
}: {
  options: SegmentedControlOption[];
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  compact?: boolean;
  variant?: "default" | "shell";
  className?: string;
}) {
  return (
    <div aria-label={label} className={cn("tl-segmented", compact && "tl-segmented--compact", variant !== "default" && `tl-segmented--${variant}`, className)} role="group">
      {options.map((option) => (
        <button
          aria-current={option.current === true ? "page" : option.current || undefined}
          aria-pressed={option.value === value}
          className={cn("tl-segmented__item", option.value === value && "tl-segmented__item--active")}
          disabled={option.disabled}
          key={option.value}
          onClick={() => onChange?.(option.value)}
          type="button"
        >
          <span className="tl-segmented__label">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

export interface PasswordInputProps extends Omit<InputProps, "type" | "trailingIcon"> {}

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = props.id ?? generatedId;

  return (
    <div className="tl-password-field">
      <Input id={inputId} type={visible ? "text" : "password"} {...props} />
      <IconButton
        className="tl-password-field__toggle"
        icon={visible ? "eyeOff" : "eye"}
        label={visible ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setVisible((current) => !current)}
        size="sm"
      />
    </div>
  );
}

export function MoneyInput(props: Omit<InputProps, "leadingIcon">) {
  return <Input inputMode="decimal" leadingText="R$" {...props} />;
}

export function DateInput(props: Omit<InputProps, "leadingIcon" | "type">) {
  return <Input leadingIcon="calendar" placeholder="DD / MM / AAAA" type="text" {...props} />;
}

export function TimeInput(props: Omit<InputProps, "leadingIcon" | "type">) {
  return <Input leadingIcon="clock" placeholder="HH : MM" type="text" {...props} />;
}

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  inline?: boolean;
}

export function FieldGroup({ title, description, inline = false, className, children, ...props }: FieldGroupProps) {
  return (
    <section className={cn("tl-field-group", inline && "tl-field-group--inline", className)} {...props}>
      {title || description ? (
        <header className="tl-field-group__header">
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="tl-field-group__body">{children}</div>
    </section>
  );
}

export interface FieldGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

export function FieldGrid({ columns = 2, className, ...props }: FieldGridProps) {
  return <div className={cn("tl-field-grid", `tl-field-grid--${columns}`, className)} {...props} />;
}

export interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
}

export function ContentGrid({ columns = 2, className, ...props }: ContentGridProps) {
  return <div className={cn("tl-content-grid", `tl-content-grid--${columns}`, className)} {...props} />;
}

export interface SocialAuthButtonProps extends Omit<ButtonProps, "variant" | "leadingIcon"> {
  provider: "Google" | "Microsoft" | string;
}

function SocialProviderMark({ provider }: { provider: string }) {
  const normalizedProvider = provider.toLowerCase();

  if (normalizedProvider === "google") {
    return (
      <svg aria-hidden="true" className="tl-social-auth-button__mark-icon" viewBox="0 0 24 24">
        <path d="M21.6 12.2c0-.8-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1Z" fill="#4285F4" />
        <path d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.5C4.8 19.8 8.3 22 12 22Z" fill="#34A853" />
        <path d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.6H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.4l3.3-2.5Z" fill="#FBBC05" />
        <path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3 14.7 2 12 2 8.3 2 4.8 4.2 3.1 7.6l3.3 2.5C7.2 7.8 9.4 6 12 6Z" fill="#EA4335" />
      </svg>
    );
  }

  if (normalizedProvider === "microsoft") {
    return (
      <svg aria-hidden="true" className="tl-social-auth-button__mark-icon" viewBox="0 0 24 24">
        <path d="M3 3h8v8H3V3Z" fill="#F25022" />
        <path d="M13 3h8v8h-8V3Z" fill="#7FBA00" />
        <path d="M3 13h8v8H3v-8Z" fill="#00A4EF" />
        <path d="M13 13h8v8h-8v-8Z" fill="#FFB900" />
      </svg>
    );
  }

  return <span className="tl-social-auth-button__fallback">{provider.slice(0, 1)}</span>;
}

export function SocialAuthButton({ provider, children, ...props }: SocialAuthButtonProps) {
  return (
    <Button className="tl-social-auth-button" variant="secondary" {...props}>
      <span className="tl-social-auth-button__mark">
        <SocialProviderMark provider={provider} />
      </span>
      <span className="tl-social-auth-button__label">{children ?? `Continuar com ${provider}`}</span>
    </Button>
  );
}

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: "idle" | "dragging" | "uploading" | "error" | "complete";
  title?: string;
  description?: string;
  actionLabel?: string;
}

export function FileUpload({
  state = "idle",
  title = "Enviar arquivo",
  description = "Arraste ou selecione um arquivo.",
  actionLabel = "Selecionar",
  className,
  ...props
}: FileUploadProps) {
  return (
    <div className={cn("tl-file-upload", `tl-file-upload--${state}`, className)} {...props}>
      <Icon name={state === "complete" ? "checkCircle" : state === "error" ? "alert" : "upload"} />
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <Button size="sm" variant="secondary">
        {actionLabel}
      </Button>
    </div>
  );
}

export interface AttachmentItem {
  id: string;
  name: string;
  meta?: string;
  state?: "file" | "link" | "error";
}

export function AttachmentList({
  items,
  removable = false,
  className
}: {
  items: AttachmentItem[];
  removable?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("tl-attachment-list", className)}>
      {items.map((item) => (
        <li className={cn("tl-attachment-list__item", item.state === "error" && "tl-attachment-list__item--error")} key={item.id}>
          <Icon name={item.state === "link" ? "copy" : item.state === "error" ? "alert" : "fileText"} />
          <span>
            <strong>{item.name}</strong>
            {item.meta ? <small>{item.meta}</small> : null}
          </span>
          {removable ? <IconButton icon="x" label={`Remover ${item.name}`} size="sm" /> : null}
        </li>
      ))}
    </ul>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "inverse" | "success" | "info" | "warning" | "danger";
  pattern?: "default" | "summary" | "mini" | "quota" | "flow" | "crm";
  compact?: boolean;
  selected?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}

export function Card({
  tone = "default",
  pattern = "default",
  compact = false,
  selected = false,
  interactive = false,
  disabled = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "tl-card",
        `tl-card--${tone}`,
        pattern !== "default" && `tl-card--${pattern}`,
        compact && "tl-card--compact",
        selected && "tl-card--selected",
        interactive && "tl-card--interactive",
        disabled && "tl-card--disabled",
        className
      )}
      {...props}
    />
  );
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle" | "crm";
  compact?: boolean;
  minHeight?: "none" | "md";
}

export function Panel({ variant = "default", compact = false, minHeight = "none", className, ...props }: PanelProps) {
  return (
    <section
      className={cn("tl-panel", `tl-panel--${variant}`, compact && "tl-panel--compact", minHeight !== "none" && `tl-panel--min-height-${minHeight}`, className)}
      {...props}
    />
  );
}

export interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export function PanelBody({ compact = false, className, ...props }: PanelBodyProps) {
  return <div className={cn("tl-panel-body", compact && "tl-panel-body--compact", className)} {...props} />;
}

export interface PanelHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
  compact?: boolean;
}

export function PanelHeader({
  title,
  description,
  meta,
  action,
  headingLevel = 2,
  compact = false,
  className,
  children,
  ...props
}: PanelHeaderProps) {
  const Heading = `h${headingLevel}` as React.ElementType;

  return (
    <header className={cn("tl-panel-header", compact && "tl-panel-header--compact", className)} {...props}>
      <span className="tl-panel-header__body">
        <Heading className="tl-panel-header__title">{title}</Heading>
        {description ? <small className="tl-panel-header__description">{description}</small> : null}
      </span>
      {meta || action || children ? (
        <span className="tl-panel-header__aside">
          {meta ? <span className="tl-panel-header__meta">{meta}</span> : null}
          {action}
          {children}
        </span>
      ) : null}
    </header>
  );
}

export interface MetaTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "warning" | "danger" | "info" | "muted";
}

export function MetaText({ tone = "default", className, ...props }: MetaTextProps) {
  return <span className={cn("tl-meta-text", `tl-meta-text--${tone}`, className)} {...props} />;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg";
}

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return <div className={cn("tl-stack", `tl-stack--${gap}`, className)} {...props} />;
}

export interface StatePageProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "main" | "section";
}

export function StatePage({ as: Component = "div", className, ...props }: StatePageProps) {
  return <Component className={cn("tl-state-page", className)} {...props} />;
}

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  justify?: "start" | "between" | "end";
  wrap?: boolean;
}

export function Toolbar({ align = "center", justify = "between", wrap = false, className, ...props }: ToolbarProps) {
  return (
    <div
      className={cn(
        "tl-toolbar",
        `tl-toolbar--align-${align}`,
        `tl-toolbar--justify-${justify}`,
        wrap && "tl-toolbar--wrap",
        className
      )}
      {...props}
    />
  );
}

export interface InlineGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  compact?: boolean;
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

export function InlineGroup({ compact = false, justify = "start", wrap = false, className, ...props }: InlineGroupProps) {
  return <span className={cn("tl-inline-group", compact && "tl-inline-group--compact", `tl-inline-group--justify-${justify}`, wrap && "tl-inline-group--wrap", className)} {...props} />;
}

export interface ConnectorLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "info" | "danger" | "neutral" | "success";
  variant?: "straight" | "elbow" | "dashed" | "curved";
  startNode?: boolean;
  endNode?: boolean;
  arrow?: boolean;
}

export function ConnectorLine({
  tone = "info",
  variant = "straight",
  startNode = false,
  endNode = true,
  arrow = true,
  className,
  ...props
}: ConnectorLineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "tl-connector-line",
        `tl-connector-line--${tone}`,
        `tl-connector-line--${variant}`,
        startNode && "tl-connector-line--start-node",
        endNode && "tl-connector-line--end-node",
        arrow && "tl-connector-line--arrow",
        className
      )}
      {...props}
    />
  );
}

export interface ListIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: IconName;
  tone?: ComponentTone | "neutral";
}

export function ListIcon({ icon, tone = "info", className, ...props }: ListIconProps) {
  return (
    <span className={cn("tl-list-icon", `tl-list-icon--${tone}`, className)} {...props}>
      <Icon name={icon} size="var(--taliya-control-list-icon-icon-size)" />
    </span>
  );
}

export interface PersonLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  avatarSrc?: string;
  size?: "xs" | "sm";
}

export function PersonLabel({ name, avatarSrc, size = "xs", className, ...props }: PersonLabelProps) {
  return (
    <span className={cn("tl-person-label", className)} {...props}>
      <Avatar name={name} size={size} src={avatarSrc} />
      {name}
    </span>
  );
}

export interface DataTableColumn<T extends { id: string }> {
  key: keyof T | string;
  header: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: React.CSSProperties["width"];
  render?: (row: T) => React.ReactNode;
}

export type DataTableSortDirection = "ascending" | "descending";

export interface DataTableSortState {
  key: string;
  direction: DataTableSortDirection;
}

export interface DataTableProps<T extends { id: string }> {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  emptyState?: React.ReactNode;
  loading?: boolean;
  error?: React.ReactNode;
  density?: "default" | "dense";
  compact?: boolean;
  selectable?: boolean;
  selectedRowIds?: string[];
  selectedRowId?: string;
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void;
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  actionColumnWidth?: React.CSSProperties["width"];
  pagination?: React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyState,
  loading = false,
  error,
  density = "default",
  compact = false,
  selectable = false,
  selectedRowIds = [],
  selectedRowId,
  sort,
  onSortChange,
  onRowSelect,
  onRowClick,
  rowActions,
  actionColumnWidth,
  pagination,
  className
}: DataTableProps<T>) {
  const handleSortChange = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;

    const key = String(column.key);
    const direction: DataTableSortDirection =
      sort?.key === key && sort.direction === "ascending" ? "descending" : "ascending";
    onSortChange?.({ key, direction });
  };

  if (error) {
    return <ErrorState title="Nao foi possivel carregar a tabela" description={error} />;
  }

  if (loading) {
    return <LoadingState title="Carregando tabela" variant="skeleton" />;
  }

  if (rows.length === 0) {
    return <>{emptyState ?? <EmptyState title="Nenhum registro encontrado" />}</>;
  }

  return (
    <div className={cn("tl-table-wrap", compact && "tl-table-wrap--compact", className)}>
      <table className={cn("tl-table", density === "dense" && "tl-table--dense", compact && "tl-table--compact")}>
        <colgroup>
          {selectable ? <col className="tl-table__select-column" /> : null}
          {columns.map((column) => (
            <col key={String(column.key)} style={column.width ? { width: column.width } : undefined} />
          ))}
          {rowActions ? <col className="tl-table__action-column" style={{ width: actionColumnWidth ?? "var(--taliya-control-table-action-column-width)" }} /> : null}
        </colgroup>
        <thead>
          <tr>
            {selectable ? (
              <th className="tl-table__select-cell" scope="col">
                <span className="tl-table__sr-only">Selecionar</span>
              </th>
            ) : null}
            {columns.map((column) => {
              const columnKey = String(column.key);
              const isSorted = sort?.key === columnKey;
              const ariaSort = isSorted ? sort.direction : undefined;
              const sortIconName = isSorted ? (sort.direction === "ascending" ? "sortAsc" : "sortDesc") : "sort";

              return (
              <th
                aria-sort={ariaSort}
                className={cn(
                  column.align && `tl-table__cell--${column.align}`,
                  column.sortable && "tl-table__header-cell--sortable"
                )}
                key={columnKey}
                scope="col"
              >
                {column.sortable ? (
                  <button
                    aria-label={`Ordenar por ${typeof column.header === "string" ? column.header : columnKey}`}
                    className="tl-table__header-action"
                    onClick={() => handleSortChange(column)}
                    type="button"
                  >
                    <span className="tl-table__header-label">{column.header}</span>
                    <Icon
                      className={cn("tl-table__sort-icon", isSorted && "tl-table__sort-icon--active")}
                      name={sortIconName}
                      size={14}
                    />
                  </button>
                ) : (
                  <span className="tl-table__header-label">{column.header}</span>
                )}
              </th>
              );
            })}
            {rowActions ? (
              <th className="tl-table__action-cell" scope="col">
                <span className="tl-table__sr-only">Acoes</span>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className={cn(
                (row.id === selectedRowId || selectedRowIds.includes(row.id)) && "tl-table__row--selected",
                onRowClick && "tl-table__row--interactive"
              )}
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {selectable ? (
                <td className="tl-table__select-cell" onClick={(event) => event.stopPropagation()}>
                  <Checkbox
                    aria-label={`Selecionar linha ${row.id}`}
                    checked={selectedRowIds.includes(row.id)}
                    onChange={(event) => onRowSelect?.(row.id, event.target.checked)}
                  />
                </td>
              ) : null}
              {columns.map((column) => (
                <td className={column.align ? `tl-table__cell--${column.align}` : undefined} key={`${row.id}-${String(column.key)}`}>
                  {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
              {rowActions ? (
                <td className="tl-table__action-cell" onClick={(event) => event.stopPropagation()}>
                  {rowActions(row)}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination ? <div className="tl-table__pagination-slot">{pagination}</div> : null}
    </div>
  );
}

export interface TablePaginationProps {
  label: string;
  itemsPerPageLabel?: string;
  itemsPerPageValue?: React.ReactNode;
  onItemsPerPageClick?: () => void;
  itemsPerPageButtonLabel?: string;
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export function TablePagination({
  label,
  itemsPerPageLabel = "Itens por pagina:",
  itemsPerPageValue,
  onItemsPerPageClick,
  itemsPerPageButtonLabel = "Alterar itens por pagina",
  page,
  pageCount,
  onPageChange,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  className
}: TablePaginationProps) {
  const pages = page && pageCount ? Array.from({ length: Math.min(pageCount, 5) }, (_, index) => index + 1) : [];

  return (
    <div className={cn("tl-table-pagination", className)}>
      {itemsPerPageValue !== undefined ? (
        <div className="tl-table-pagination__page-size">
          <span>{itemsPerPageLabel}</span>
          <button aria-label={itemsPerPageButtonLabel} onClick={onItemsPerPageClick} type="button">
            {itemsPerPageValue}
            <Icon name="chevronDown" size={14} />
          </button>
        </div>
      ) : null}
      <div className="tl-table-pagination__controls">
        <span className="tl-table-pagination__status">{label}</span>
        <div className="tl-table-pagination__nav" aria-label="Paginação">
          <IconButton disabled={previousDisabled} icon="chevronLeft" label="Pagina anterior" onClick={onPrevious} size="sm" />
          {pages.map((pageNumber) => (
            <button
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn("tl-table-pagination__page", pageNumber === page && "tl-table-pagination__page--active")}
              key={pageNumber}
              onClick={() => onPageChange?.(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          ))}
          {pageCount && pageCount > 5 ? <span className="tl-table-pagination__ellipsis">...</span> : null}
          {pageCount && pageCount > 5 ? (
            <button className="tl-table-pagination__page" onClick={() => onPageChange?.(pageCount)} type="button">
              {pageCount}
            </button>
          ) : null}
          <IconButton disabled={nextDisabled} icon="chevronRight" label="Proxima pagina" onClick={onNext} size="sm" />
        </div>
      </div>
    </div>
  );
}

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  grouped?: boolean;
  dense?: boolean;
  divided?: boolean;
}

export function List({ grouped = false, dense = false, divided = false, className, ...props }: ListProps) {
  return <div className={cn("tl-list", grouped && "tl-list--grouped", dense && "tl-list--dense", divided && "tl-list--divided", className)} role="list" {...props} />;
}

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  selected?: boolean;
  unread?: boolean;
  warning?: boolean;
  disabled?: boolean;
  leading?: React.ReactNode;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  action?: React.ReactNode;
}

export function ListItem({
  selected = false,
  unread = false,
  warning = false,
  disabled = false,
  leading,
  title,
  meta,
  trailing,
  action,
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <div
      className={cn(
        "tl-list-item",
        selected && "tl-list-item--selected",
        unread && "tl-list-item--unread",
        warning && "tl-list-item--warning",
        disabled && "tl-list-item--disabled",
        className
      )}
      aria-disabled={disabled || undefined}
      role="listitem"
      {...props}
    >
      {leading ? <div className="tl-list-item__leading">{leading}</div> : null}
      <div className="tl-list-item__content">
        {title ? <strong>{title}</strong> : null}
        {meta ? <small>{meta}</small> : null}
        {children ? <div>{children}</div> : null}
      </div>
      {trailing ? <div className="tl-list-item__trailing">{trailing}</div> : null}
      {action ? <div className="tl-list-item__action">{action}</div> : null}
    </div>
  );
}

export interface KeyValueRowProps extends Omit<ListItemProps, "title" | "trailing" | "children"> {
  label: React.ReactNode;
  value: React.ReactNode;
  valueTone?: MetaTextProps["tone"];
}

export function KeyValueRow({ label, value, valueTone = "default", ...props }: KeyValueRowProps) {
  return <ListItem title={label} trailing={<MetaText tone={valueTone}>{value}</MetaText>} {...props} />;
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "neutral" | "actionable" | "blocked";
  icon?: IconName;
}

export function EmptyState({ title, description, action, variant = "neutral", icon, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("tl-state", `tl-state--${variant}`, className)} {...props}>
      <span className="tl-state__icon">
        <Icon name={icon ?? (variant === "blocked" ? "lock" : "search")} />
      </span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div className="tl-state__action">{action}</div> : null}
    </div>
  );
}

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: "spinner" | "skeleton" | "table" | "panel";
  showTitle?: boolean;
}

export function LoadingState({ title = "Carregando", variant = "spinner", showTitle = true, className, ...props }: LoadingStateProps) {
  const skeletonRows = variant === "table" ? 9 : variant === "panel" ? 5 : 5;

  return (
    <div
      aria-busy="true"
      aria-label={showTitle ? undefined : title}
      className={cn("tl-state", "tl-state--loading", `tl-state--${variant}`, className)}
      role={variant === "spinner" ? "status" : undefined}
      {...props}
    >
      {variant === "spinner" ? (
        <span className="tl-state__icon">
          <Icon className="tl-spin" name="loader" />
        </span>
      ) : (
        <span aria-hidden="true" className="tl-skeleton-block">
          {Array.from({ length: skeletonRows }, (_, index) => (
            <span key={index} />
          ))}
        </span>
      )}
      {showTitle ? <strong>{title}</strong> : null}
    </div>
  );
}

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  blocking?: boolean;
  icon?: IconName;
}

export function ErrorState({ title, description, action, blocking = false, icon = "alert", className, ...props }: ErrorStateProps) {
  return (
    <div className={cn("tl-state", "tl-state--error", blocking && "tl-state--blocking", className)} role="alert" {...props}>
      <span className="tl-state__icon">
        <Icon name={icon} />
      </span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div className="tl-state__action">{action}</div> : null}
    </div>
  );
}

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerStatus?: React.ReactNode;
  headerMeta?: React.ReactNode;
  headerActions?: React.ReactNode;
  side?: "right" | "left";
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
  footerLayout?: DrawerFooterProps["layout"];
  trigger?: React.ReactElement;
  dismissible?: boolean;
  modal?: boolean;
  loading?: boolean;
  blockedReason?: React.ReactNode;
  closeLabel?: string;
  bodyClassName?: string;
  overlayClassName?: string;
  inline?: boolean;
}

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  headerStatus,
  headerMeta,
  headerActions,
  side = "right",
  size = "md",
  footer,
  footerLayout = "row",
  trigger,
  dismissible = true,
  modal = true,
  loading = false,
  blockedReason,
  closeLabel = "Fechar painel",
  className,
  bodyClassName,
  overlayClassName,
  inline = false,
  children,
  ...props
}: DrawerProps) {
  const descriptionId = useId();
  const header = title ? (
    <DrawerHeader
      asDialogClose={!inline}
      asDialogTitle={!inline}
      actions={headerActions}
      description={description ? <span id={descriptionId}>{description}</span> : undefined}
      meta={headerMeta}
      onClose={dismissible ? () => onOpenChange?.(false) : undefined}
      status={blockedReason ? <Badge tone="warning">Bloqueado</Badge> : headerStatus}
      title={title}
      closeLabel={closeLabel}
    />
  ) : null;
  const body = (
    <div className={cn("tl-drawer__body", bodyClassName)}>
      {loading ? <LoadingState title="Carregando dados" variant="panel" /> : null}
      {blockedReason ? (
        <InlineAlert tone="warning" title="Acao bloqueada">
          {blockedReason}
        </InlineAlert>
      ) : null}
      {children}
    </div>
  );
  const drawerFooter = footer ? <DrawerFooter layout={footerLayout}>{footer}</DrawerFooter> : null;

  if (inline) {
    if (open === false) return null;

    return (
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-modal="false"
        className={cn("tl-drawer", "tl-drawer--inline", `tl-drawer--${side}`, `tl-drawer--${size}`, className)}
        role="dialog"
        {...props}
      >
        {header}
        {body}
        {drawerFooter}
      </div>
    );
  }

  return (
    <RadixDialog.Root defaultOpen={defaultOpen} modal={modal} onOpenChange={onOpenChange} open={open}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={cn("tl-overlay", "tl-drawer-overlay", overlayClassName)} />
        <RadixDialog.Content
          aria-describedby={description ? descriptionId : undefined}
          className={cn("tl-drawer", `tl-drawer--${side}`, `tl-drawer--${size}`, className)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus({ preventScroll: true });
          }}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          {...props}
        >
          {header}
          {body}
          {drawerFooter}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export interface DrawerHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  meta?: React.ReactNode;
  status?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  closeDisabled?: boolean;
  compact?: boolean;
  asDialogTitle?: boolean;
  asDialogClose?: boolean;
}

export function DrawerHeader({
  title,
  meta,
  status,
  description,
  actions,
  onClose,
  closeLabel = "Fechar",
  closeDisabled = false,
  compact = false,
  asDialogTitle = false,
  asDialogClose = false,
  className,
  ...props
}: DrawerHeaderProps) {
  const heading = asDialogTitle ? (
    <RadixDialog.Title asChild>
      <h2>{title}</h2>
    </RadixDialog.Title>
  ) : (
    <h2>{title}</h2>
  );
  const closeButton = onClose ? (
    <IconButton disabled={closeDisabled} icon="x" label={closeLabel} onClick={onClose} size="sm" variant="ghost" />
  ) : null;

  return (
    <header className={cn("tl-drawer-header", compact && "tl-drawer-header--compact", className)} {...props}>
      <div>
        {status ? <div className="tl-drawer-header__status">{status}</div> : null}
        {heading}
        {meta ? <p>{meta}</p> : null}
        {description ? <div className="tl-drawer-header__description">{description}</div> : null}
        {actions ? <div className="tl-drawer-header__actions">{actions}</div> : null}
      </div>
      {closeButton && asDialogClose ? (
        <RadixDialog.Close asChild>
          {closeButton}
        </RadixDialog.Close>
      ) : closeButton}
    </header>
  );
}

export interface DrawerSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  subtle?: boolean;
  variant?: "default" | "subtle" | "divided";
  compact?: boolean;
  empty?: React.ReactNode;
  loading?: boolean;
}

export function DrawerSection({
  title,
  subtle = false,
  variant = "default",
  compact = false,
  empty,
  loading = false,
  className,
  children,
  ...props
}: DrawerSectionProps) {
  const visualVariant = subtle ? "subtle" : variant;

  return (
    <section
      className={cn(
        "tl-drawer-section",
        `tl-drawer-section--${visualVariant}`,
        compact && "tl-drawer-section--compact",
        className
      )}
      {...props}
    >
      {title ? <h3>{title}</h3> : null}
      {loading ? <LoadingState title="Carregando" /> : children ?? empty}
    </section>
  );
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "row" | "stack" | "grid";
  sticky?: boolean;
}

export function DrawerFooter({ layout = "row", sticky = true, className, ...props }: DrawerFooterProps) {
  return (
    <footer
      className={cn("tl-drawer-footer", `tl-drawer-footer--${layout}`, sticky && "tl-drawer-footer--sticky", className)}
      {...props}
    />
  );
}

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  alert?: boolean;
  variant?: "simple" | "form" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  trigger?: React.ReactElement;
  dismissible?: boolean;
  closeLabel?: string;
  bodyClassName?: string;
  inline?: boolean;
  titleHidden?: boolean;
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  footer,
  alert = false,
  variant = alert ? "destructive" : "simple",
  size = "md",
  icon,
  trigger,
  dismissible = true,
  closeLabel = "Fechar modal",
  className,
  bodyClassName,
  inline = false,
  titleHidden = false,
  children,
  ...props
}: ModalProps) {
  const descriptionId = useId();

  if (inline) {
    if (open === false) return null;

    return (
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-modal="false"
        className={cn("tl-modal", "tl-modal--inline", `tl-modal--${variant}`, `tl-modal--${size}`, alert && "tl-modal--alert", className)}
        role="dialog"
        {...props}
      >
        {dismissible ? (
          <IconButton
            className="tl-modal__close"
            icon="x"
            label={closeLabel}
            onClick={() => onOpenChange?.(false)}
            size="sm"
            variant="ghost"
          />
        ) : null}
        {icon ? (
          <span className="tl-modal__icon">
            <Icon name={icon} />
          </span>
        ) : null}
        <header className="tl-modal__header">
          <h2 className={titleHidden ? "tl-sr-only" : undefined}>{title}</h2>
          {description ? <p id={descriptionId}>{description}</p> : null}
        </header>
        <div className={cn("tl-modal__body", bodyClassName)}>{children}</div>
        {footer ? <footer className="tl-modal__footer">{footer}</footer> : null}
      </div>
    );
  }

  return (
    <RadixDialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="tl-overlay tl-modal-backdrop" />
        <RadixDialog.Content
          aria-describedby={description ? descriptionId : undefined}
          className={cn("tl-modal", `tl-modal--${variant}`, `tl-modal--${size}`, alert && "tl-modal--alert", className)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus({ preventScroll: true });
          }}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          {...props}
        >
          {dismissible ? (
            <RadixDialog.Close asChild>
              <IconButton className="tl-modal__close" icon="x" label={closeLabel} size="sm" variant="ghost" />
            </RadixDialog.Close>
          ) : null}
          {icon ? (
            <span className="tl-modal__icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <header className="tl-modal__header">
            <RadixDialog.Title asChild>
              <h2 className={titleHidden ? "tl-sr-only" : undefined}>{title}</h2>
            </RadixDialog.Title>
            {description ? (
              <RadixDialog.Description asChild>
                <p id={descriptionId}>{description}</p>
              </RadixDialog.Description>
            ) : null}
          </header>
          <div className={cn("tl-modal__body", bodyClassName)}>{children}</div>
          {footer ? <footer className="tl-modal__footer">{footer}</footer> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  tone?: "neutral" | "destructive" | "sensitive";
  blockedReason?: string;
  loading?: boolean;
  summary?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  inline?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  tone,
  blockedReason,
  loading = false,
  summary,
  onOpenChange,
  onConfirm,
  onCancel,
  inline = false
}: ConfirmDialogProps) {
  const effectiveTone = tone ?? (destructive ? "destructive" : "neutral");
  const isDestructive = effectiveTone === "destructive";

  return (
    <Modal
      alert={isDestructive}
      description={description}
      dismissible={false}
      footer={
        <ButtonGroup align="end">
          <Button onClick={onCancel} size="sm" variant="secondary">
            {cancelLabel}
          </Button>
          <Button
            blockedReason={blockedReason}
            loading={loading}
            onClick={onConfirm}
            size="sm"
            variant={isDestructive ? "destructive" : "primary"}
          >
            {confirmLabel}
          </Button>
        </ButtonGroup>
      }
      icon={isDestructive ? "trash" : effectiveTone === "sensitive" ? "shield" : "checkCircle"}
      inline={inline}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      variant={isDestructive ? "destructive" : "simple"}
    >
      {summary ? <div className="tl-confirm-dialog__summary">{summary}</div> : null}
    </Modal>
  );
}

export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  variant?: "simple" | "icon" | "rich" | "disabled";
  icon?: IconName;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
}

export function Tooltip({
  label,
  children,
  className,
  side = "top",
  align = "center",
  delayDuration = 120,
  variant = "simple",
  icon,
  open,
  defaultOpen,
  onOpenChange,
  sideOffset = 8
}: TooltipProps) {
  const childIsDisabled = React.isValidElement(children) && Boolean((children.props as { disabled?: boolean }).disabled);
  const triggerElement =
    childIsDisabled || variant === "disabled" ? (
      <span aria-disabled={childIsDisabled ? "true" : undefined} className="tl-tooltip__disabled-trigger" tabIndex={0}>
        {children}
      </span>
    ) : (
      children
    );

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
        <RadixTooltip.Trigger asChild>{triggerElement}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            align={align}
            className={cn("tl-tooltip__content", `tl-tooltip__content--${variant}`, className)}
            side={side}
            sideOffset={sideOffset}
          >
            {icon ? <Icon name={icon} size={14} /> : null}
            <span>{label}</span>
            <RadixTooltip.Arrow className="tl-tooltip__arrow" height={7} width={12} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  width?: "sm" | "md" | "lg";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  inline?: boolean;
  showArrow?: boolean;
  sideOffset?: number;
}

export function Popover({
  trigger,
  children,
  className,
  title,
  footer,
  side = "bottom",
  align = "end",
  width = "sm",
  open,
  defaultOpen,
  onOpenChange,
  dismissible = true,
  inline = false,
  showArrow = false,
  sideOffset = 10
}: PopoverProps) {
  const triggerElement = React.isValidElement(trigger) ? (
    trigger
  ) : (
    <button className="tl-popover__trigger" type="button">
      {trigger}
    </button>
  );
  const content = (
    <>
      {title ? <div className="tl-popover__title">{title}</div> : null}
      <div className="tl-popover__body">{children}</div>
      {footer ? <div className="tl-popover__footer">{footer}</div> : null}
    </>
  );

  if (inline) {
    if (open === false) return null;

    return <div className={cn("tl-popover__content", "tl-popover__content--inline", `tl-popover__content--${width}`, className)}>{content}</div>;
  }

  return (
    <RadixPopover.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      <RadixPopover.Trigger asChild>{triggerElement}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          className={cn("tl-popover__content", `tl-popover__content--${width}`, className)}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          side={side}
          sideOffset={sideOffset}
        >
          {content}
          {showArrow ? <RadixPopover.Arrow className="tl-popover__arrow" height={8} width={14} /> : null}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export function ScrollArea({
  orientation = "vertical",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both" }) {
  return <div className={cn("tl-scroll-area", `tl-scroll-area--${orientation}`, className)} {...props} />;
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  helperText?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  segmented?: boolean;
  indeterminate?: boolean;
}

export function ProgressBar({
  value = 0,
  label,
  helperText,
  tone = "default",
  segmented = false,
  indeterminate = false,
  className,
  ...props
}: ProgressBarProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("tl-progress", `tl-progress--${tone}`, segmented && "tl-progress--segmented", indeterminate && "tl-progress--indeterminate", className)} {...props}>
      <div className="tl-progress__meta">
        {label ? <span>{label}</span> : null}
        {!indeterminate ? <strong>{normalizedValue}%</strong> : null}
      </div>
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={indeterminate ? undefined : normalizedValue}
        className="tl-progress__track"
        role="progressbar"
      >
        <span className="tl-progress__bar" style={{ width: indeterminate ? undefined : `${normalizedValue}%` }} />
      </div>
      {helperText ? <span className="tl-progress__helper">{helperText}</span> : null}
    </div>
  );
}

export type StepperStepState = "complete" | "current" | "blocked" | "pending" | "warning";

export interface StepperStep {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  state?: StepperStepState;
  disabled?: boolean;
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "onChange"> {
  steps: StepperStep[];
  currentStepId?: string;
  progress?: number;
  progressLabel?: string;
  compact?: boolean;
  markerStyle?: "state-icon" | "number";
  orientation?: "horizontal" | "vertical";
  readonly?: boolean;
  onStepSelect?: (stepId: string) => void;
}

const stepperIconByState: Record<StepperStepState, IconName | null> = {
  complete: "check",
  current: null,
  blocked: "lock",
  pending: "minus",
  warning: "alert"
};

function resolveStepState(step: StepperStep, currentStepId?: string): StepperStepState {
  if (step.state) return step.state;
  if (step.id === currentStepId) return "current";
  return "pending";
}

export function Stepper({
  steps,
  currentStepId,
  progress,
  progressLabel = "Progresso geral",
  compact = false,
  markerStyle = "state-icon",
  orientation = "horizontal",
  readonly = false,
  onStepSelect,
  className,
  style,
  ...props
}: StepperProps) {
  return (
    <div className={cn("tl-stepper-wrap", compact && "tl-stepper-wrap--compact", `tl-stepper-wrap--${orientation}`)}>
      <ol
        className={cn("tl-stepper", `tl-stepper--${orientation}`, compact && "tl-stepper--compact", className)}
        style={{ "--tl-stepper-count": steps.length, ...style } as React.CSSProperties}
        {...props}
      >
        {steps.map((step, index) => {
          const state = resolveStepState(step, currentStepId);
          const icon = stepperIconByState[state];
          const markerContent = markerStyle === "number" && state !== "complete" && state !== "blocked" && state !== "warning"
            ? index + 1
            : icon ? <Icon name={icon} size="var(--taliya-control-icon-size-sm)" /> : index + 1;
          const isDisabled = step.disabled || state === "blocked" || readonly;
          const body = (
            <>
              <span className="tl-stepper__marker">{markerContent}</span>
              <span className="tl-stepper__text">
                <strong>{step.label}</strong>
                {step.description ? <small>{step.description}</small> : null}
              </span>
            </>
          );

          return (
            <li className={cn("tl-stepper__item", `tl-stepper__item--${state}`)} key={step.id}>
              {onStepSelect ? (
                <button
                  aria-current={state === "current" ? "step" : undefined}
                  aria-disabled={isDisabled || undefined}
                  className="tl-stepper__control"
                  disabled={isDisabled}
                  onClick={() => onStepSelect(step.id)}
                  type="button"
                >
                  {body}
                </button>
              ) : (
                <span aria-current={state === "current" ? "step" : undefined} className="tl-stepper__control">
                  {body}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {typeof progress === "number" ? (
        <ProgressBar className="tl-stepper__progress" label={progressLabel} tone="info" value={progress} />
      ) : null}
    </div>
  );
}

export type ChecklistItemState = "complete" | "incomplete" | "warning" | "blocked";

export interface ChecklistItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange" | "onToggle"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: ChecklistItemState;
  owner?: React.ReactNode;
  ownerAvatarSrc?: string;
  actionLabel?: string;
  actionDisabled?: boolean;
  onAction?: () => void;
  onToggle?: (checked: boolean) => void;
  menu?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  showStateChip?: boolean;
}

const checklistToneByState: Record<ChecklistItemState, ComponentTone> = {
  complete: "success",
  incomplete: "info",
  warning: "warning",
  blocked: "blocked"
};

const checklistIconByState: Record<ChecklistItemState, IconName> = {
  complete: "checkCircle",
  incomplete: "info",
  warning: "alert",
  blocked: "lock"
};

export function ChecklistItem({
  title,
  description,
  state = "incomplete",
  owner,
  ownerAvatarSrc,
  actionLabel,
  actionDisabled = false,
  onAction,
  onToggle,
  menu,
  selected = false,
  disabled = false,
  showStateChip = false,
  className,
  ...props
}: ChecklistItemProps) {
  const checked = state === "complete";
  const status = (
    <span className={cn("tl-checklist-item__status", `tl-checklist-item__status--${state}`)}>
      <Icon name={checklistIconByState[state]} size="var(--taliya-control-checklist-icon-size)" />
    </span>
  );

  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "tl-checklist-item",
        `tl-checklist-item--${state}`,
        selected && "tl-checklist-item--selected",
        disabled && "tl-checklist-item--disabled",
        showStateChip && "tl-checklist-item--with-chip",
        className
      )}
      role="listitem"
      {...props}
    >
      {onToggle ? (
        <button
          aria-checked={checked}
          aria-label={`Marcar ${typeof title === "string" ? title : "item"}`}
          className="tl-checklist-item__toggle"
          disabled={disabled}
          onClick={() => onToggle(!checked)}
          role="checkbox"
          type="button"
        >
          {status}
        </button>
      ) : (
        status
      )}
      <span className="tl-checklist-item__body">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {owner ? <PersonLabel avatarSrc={ownerAvatarSrc} className="tl-checklist-item__owner" name={String(owner)} /> : null}
      {showStateChip ? <Chip tone={checklistToneByState[state]}>{state}</Chip> : null}
      {actionLabel ? (
        <Button disabled={disabled || actionDisabled || state === "blocked"} onClick={onAction} size="sm" variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
      {menu ?? <IconButton disabled={disabled} icon="more" label="Mais acoes" size="sm" variant="ghost" />}
    </div>
  );
}

export type MetricTileTone = "neutral" | "positive" | "negative" | "warning";

export interface MetricTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  helperText?: React.ReactNode;
  icon?: IconName;
  progressValue?: number;
  tone?: MetricTileTone;
  variant?: "default" | "operational";
  selected?: boolean;
  compact?: boolean;
  disabled?: boolean;
  action?: React.ReactNode;
  onSelect?: () => void;
}

const metricToneClass: Record<MetricTileTone, string> = {
  neutral: "neutral",
  positive: "success",
  negative: "danger",
  warning: "warning"
};

export function MetricTile({
  label,
  value,
  delta,
  helperText,
  icon,
  progressValue,
  tone = "neutral",
  variant = "default",
  selected = false,
  compact = false,
  disabled = false,
  action,
  onSelect,
  className,
  ...props
}: MetricTileProps) {
  const normalizedProgress = typeof progressValue === "number" ? Math.max(0, Math.min(100, progressValue)) : undefined;
  const progressStyle = normalizedProgress !== undefined ? { "--tl-metric-progress": `${normalizedProgress}%` } as React.CSSProperties : undefined;
  const content = (
    <>
      <span className="tl-metric-tile__icon">
        {normalizedProgress !== undefined ? (
          <span
            aria-label={`${normalizedProgress}%`}
            className="tl-metric-tile__progress-ring"
            role="progressbar"
            style={progressStyle}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={normalizedProgress}
          />
        ) : icon ? <Icon name={icon} size="var(--taliya-control-metric-tile-icon-size)" /> : null}
      </span>
      <span className="tl-metric-tile__label">{label}</span>
      <strong className="tl-metric-tile__value">{value}</strong>
      <span className="tl-metric-tile__footer">
        {delta ? <MetaText tone={metricToneClass[tone] as MetaTextProps["tone"]}>{delta}</MetaText> : null}
        {helperText ? <small>{helperText}</small> : null}
        {action}
      </span>
    </>
  );
  const classes = cn(
    "tl-card",
    "tl-metric-tile",
    `tl-metric-tile--${tone}`,
    variant !== "default" && `tl-metric-tile--${variant}`,
    selected && "tl-card--inverse tl-metric-tile--selected",
    compact && "tl-metric-tile--compact",
    disabled && "tl-card--disabled tl-metric-tile--disabled",
    onSelect && "tl-card--interactive",
    className
  );

  if (onSelect) {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button {...buttonProps} aria-pressed={selected} className={classes} disabled={disabled} onClick={onSelect} type="button">
        {content}
      </button>
    );
  }

  return (
    <Card className={classes} disabled={disabled} selected={selected} {...props}>
      {content}
    </Card>
  );
}

export type StatusSummaryState = "ok" | "attention" | "danger" | "blocked" | "info";

export interface StatusSummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: StatusSummaryState;
  icon?: IconName;
  statusLabel?: React.ReactNode;
  details?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  selected?: boolean;
  compact?: boolean;
  layout?: "default" | "hero";
}

const statusSummaryToneByState: Record<StatusSummaryState, ComponentTone> = {
  ok: "success",
  attention: "warning",
  danger: "danger",
  blocked: "blocked",
  info: "info"
};

export function StatusSummaryCard({
  title,
  description,
  state = "info",
  icon,
  statusLabel,
  details,
  primaryAction,
  secondaryAction,
  selected = false,
  compact = false,
  layout = "default",
  className,
  children,
  ...props
}: StatusSummaryCardProps) {
  const tone = statusSummaryToneByState[state];
  return (
    <Card
      className={cn(
        "tl-status-summary",
        `tl-status-summary--${state}`,
        compact && "tl-status-summary--compact",
        layout !== "default" && `tl-status-summary--${layout}`,
        className
      )}
      selected={selected}
      {...props}
    >
      <header className="tl-status-summary__header">
        <span className="tl-status-summary__icon">
          <Icon name={icon ?? alertIconForTone(tone)} size="var(--taliya-control-status-summary-icon-size)" />
        </span>
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        <Chip tone={tone}>{statusLabel ?? state}</Chip>
      </header>
      {details ? (
        <dl className="tl-status-summary__details">
          {details.map((detail, index) => (
            <span key={index}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {children ? <div className="tl-status-summary__body">{children}</div> : null}
      {primaryAction || secondaryAction ? (
        <footer className="tl-status-summary__actions">
          {layout === "hero" ? <>{primaryAction}{secondaryAction}</> : <>{secondaryAction}{primaryAction}</>}
        </footer>
      ) : null}
    </Card>
  );
}

export type DiffRowStatus = "changed" | "removed" | "added" | "approved" | "rejected";

export interface DiffTableRow {
  id: string;
  label: React.ReactNode;
  before: React.ReactNode;
  after: React.ReactNode;
  status?: DiffRowStatus;
}

export interface DiffTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  rows: DiffTableRow[];
  fieldHeader?: React.ReactNode;
  beforeHeader?: React.ReactNode;
  afterHeader?: React.ReactNode;
  actor?: React.ReactNode;
  actorAvatarSrc?: string;
  actorLabel?: React.ReactNode;
  origin?: React.ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  onRevert?: () => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  showStatusColumn?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const diffToneByStatus: Record<DiffRowStatus, ComponentTone> = {
  changed: "success",
  removed: "danger",
  added: "info",
  approved: "success",
  rejected: "danger"
};

export function DiffTable({
  title,
  meta,
  rows,
  fieldHeader = "Campo",
  beforeHeader = "Valor anterior",
  afterHeader = "Valor novo",
  actor,
  actorAvatarSrc,
  actorLabel,
  origin,
  onApprove,
  onReject,
  onRevert,
  onRowClick,
  compact = false,
  showStatusColumn = false,
  loading = false,
  error,
  className,
  ...props
}: DiffTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar o diff" description={error} />;
  if (loading) return <LoadingState title="Carregando diff" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhuma alteracao encontrada" />;

  return (
    <Card className={cn("tl-diff-table", compact && "tl-diff-table--compact", className)} {...props}>
      {title || meta ? (
        <header className="tl-batch-table__header">
          {title ? <strong>{title}</strong> : null}
          {meta ? <small>{meta}</small> : null}
        </header>
      ) : null}
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">{fieldHeader}</th>
              <th scope="col">{beforeHeader}</th>
              <th scope="col">{afterHeader}</th>
              {showStatusColumn ? <th scope="col">Status</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = row.status ?? "changed";
              return (
                <tr
                  aria-label={onRowClick ? `Abrir alteracao ${row.id}` : undefined}
                  className={cn("tl-diff-table__row", `tl-diff-table__row--${status}`, onRowClick && "tl-table__row--interactive")}
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                  onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                  role={onRowClick ? "button" : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  <td>{row.label}</td>
                  <td>{row.before}</td>
                  <td>{row.after}</td>
                  {showStatusColumn ? (
                    <td>
                      <Chip tone={diffToneByStatus[status]}>{status}</Chip>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(actor || origin || onApprove || onReject || onRevert) ? (
        <footer className="tl-batch-table__footer">
          <InlineGroup>
            {actorLabel ? <MetaText>{actorLabel}</MetaText> : null}
            {actor ? <PersonLabel avatarSrc={actorAvatarSrc} name={String(actor)} /> : null}
            {origin ? <MetaText>{origin}</MetaText> : null}
          </InlineGroup>
          <ButtonGroup align="end">
            {onRevert ? <Button onClick={onRevert} size="sm" variant="secondary">Reverter</Button> : null}
            {onReject ? <Button onClick={onReject} size="sm" variant="ghost">Rejeitar</Button> : null}
            {onApprove ? <Button leadingIcon="check" onClick={onApprove} size="sm" variant="primary">Aprovar</Button> : null}
          </ButtonGroup>
        </footer>
      ) : null}
    </Card>
  );
}

export type PermissionTableState = "allowed" | "blocked" | "request" | "pending";

export interface PermissionTableRow {
  id: string;
  module: React.ReactNode;
  profile: React.ReactNode;
  action: React.ReactNode;
  state: PermissionTableState;
}

export interface PermissionTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: PermissionTableRow[];
  onRequestAccess?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
}

const permissionToneByState: Record<PermissionTableState, ComponentTone> = {
  allowed: "success",
  blocked: "danger",
  request: "info",
  pending: "warning"
};

const permissionLabelByState: Record<PermissionTableState, string> = {
  allowed: "Permitido",
  blocked: "Bloqueado",
  request: "Solicitar acesso",
  pending: "Pendente"
};

const permissionIconByState: Record<PermissionTableState, IconName> = {
  allowed: "check",
  blocked: "alertCircle",
  request: "info",
  pending: "clock"
};

function handleInteractiveRowKeyDown(event: React.KeyboardEvent<HTMLElement>, action: () => void) {
  if (event.currentTarget !== event.target) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

export function PermissionTable({ rows, onRequestAccess, onRowClick, compact = false, className, ...props }: PermissionTableProps) {
  return (
    <div className={cn("tl-permission-table", compact && "tl-permission-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Modulo</th>
              <th scope="col">Perfil</th>
              <th scope="col">Acao</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir permissao ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td>{row.module}</td>
                <td>{row.profile}</td>
                <td>{row.action}</td>
                <td className="tl-permission-table__status">
                  {row.state === "request" && onRequestAccess ? (
                    <Button onClick={(event) => { event.stopPropagation(); onRequestAccess(row.id); }} size="sm" variant="secondary">
                      {permissionLabelByState[row.state]}
                    </Button>
                  ) : (
                    <Chip icon={permissionIconByState[row.state]} showDot={false} tone={permissionToneByState[row.state]}>{permissionLabelByState[row.state]}</Chip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type AuditTableStatus = "success" | "pending" | "alert" | "denied";

export interface AuditTableRow {
  id: string;
  actor: string;
  actorAvatarSrc?: string;
  object: React.ReactNode;
  action: React.ReactNode;
  time: React.ReactNode;
  origin: React.ReactNode;
  status: AuditTableStatus;
}

export interface AuditTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: AuditTableRow[];
  onOpenObject?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const auditToneByStatus: Record<AuditTableStatus, ComponentTone> = {
  success: "success",
  pending: "info",
  alert: "warning",
  denied: "danger"
};

const auditLabelByStatus: Record<AuditTableStatus, string> = {
  success: "Sucesso",
  pending: "Pendente",
  alert: "Alerta",
  denied: "Negada"
};

export function AuditTable({ rows, onOpenObject, onRowClick, compact = false, loading = false, error, className, ...props }: AuditTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar auditoria" description={error} />;
  if (loading) return <LoadingState title="Carregando auditoria" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhum log encontrado" icon="shield" />;

  return (
    <div className={cn("tl-audit-table", compact && "tl-audit-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Ator</th>
              <th scope="col">Objeto</th>
              <th scope="col">Acao</th>
              <th scope="col">Horario</th>
              <th scope="col">Origem</th>
              <th scope="col">Status</th>
              {onOpenObject ? <th scope="col">Abrir objeto</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir auditoria ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td><PersonLabel avatarSrc={row.actorAvatarSrc} name={row.actor} /></td>
                <td>{row.object}</td>
                <td>{row.action}</td>
                <td>{row.time}</td>
                <td>{row.origin}</td>
                <td><Chip showDot={false} tone={auditToneByStatus[row.status]}>{auditLabelByStatus[row.status]}</Chip></td>
                {onOpenObject ? (
                  <td className="tl-audit-table__action" onClick={(event) => event.stopPropagation()}>
                    <IconButton icon="externalLink" label={`Abrir ${row.id}`} onClick={() => onOpenObject(row.id)} size="sm" variant="ghost" />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type ImportProgressCardState = "running" | "complete" | "duplicate" | "error" | "paused";

export interface ImportProgressMetric {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface ImportProgressCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  fileName?: React.ReactNode;
  value?: number;
  state?: ImportProgressCardState;
  metrics?: ImportProgressMetric[];
  helperText?: React.ReactNode;
  compact?: boolean;
  summary?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onDetails?: () => void;
  onRetry?: () => void;
}

const importToneByState: Record<ImportProgressCardState, ComponentTone> = {
  running: "info",
  complete: "success",
  duplicate: "warning",
  error: "danger",
  paused: "paused"
};

const importIconByState: Record<ImportProgressCardState, IconName> = {
  running: "loader",
  complete: "check",
  duplicate: "copy",
  error: "alert",
  paused: "pause"
};

export function ImportProgressCard({
  title,
  fileName,
  value = 0,
  state = "running",
  metrics = [],
  helperText,
  compact = false,
  summary = false,
  onPause,
  onResume,
  onDetails,
  onRetry,
  className,
  ...props
}: ImportProgressCardProps) {
  const tone = importToneByState[state];
  const progressTone: ProgressBarProps["tone"] =
    tone === "success" || tone === "warning" || tone === "danger" || tone === "info" ? tone : "default";
  return (
    <Card className={cn("tl-import-progress", summary && "tl-import-progress--summary", compact && "tl-import-progress--compact", className)} {...props}>
      <header className="tl-import-progress__header">
        <span className={cn("tl-import-progress__icon", state === "running" && "tl-import-progress__icon--running")}>
          <Icon name={importIconByState[state]} />
        </span>
        <span>
          <strong>{title}</strong>
          {fileName ? <small>{fileName}</small> : null}
        </span>
        <Chip tone={tone}>{state}</Chip>
      </header>
      {!summary ? <ProgressBar label="Progresso" tone={progressTone} value={value} /> : null}
      {metrics.length ? (
        <dl className="tl-import-progress__metrics">
          {metrics.map((metric, index) => (
            <span key={index}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {helperText ? <MetaText>{helperText}</MetaText> : null}
      {onPause || onResume || onDetails || onRetry ? (
        <footer className="tl-import-progress__actions">
          {onPause ? <Button leadingIcon="pause" onClick={onPause} size="sm" variant="secondary">Pausar</Button> : null}
          {onResume ? <Button leadingIcon="play" onClick={onResume} size="sm" variant="secondary">Continuar</Button> : null}
          {onRetry ? <Button leadingIcon="refresh" onClick={onRetry} size="sm" variant="secondary">Tentar novamente</Button> : null}
          {onDetails ? <Button onClick={onDetails} size="sm" variant="primary">Ver detalhes</Button> : null}
        </footer>
      ) : null}
    </Card>
  );
}

export type RelationshipCardVariant = "primary" | "related" | "conflict";

export interface RelationshipCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  name: string;
  roleLabel?: React.ReactNode;
  contact?: React.ReactNode;
  details?: Array<{ icon?: IconName; value: React.ReactNode }>;
  highlight?: React.ReactNode;
  avatarSrc?: string;
  avatarStatus?: StatusDotStatus | null;
  variant?: RelationshipCardVariant;
  selected?: boolean;
  disabled?: boolean;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  onSelect?: () => void;
  onAction?: () => void;
}

export function RelationshipCard({
  name,
  roleLabel,
  contact,
  details,
  highlight,
  avatarSrc,
  avatarStatus,
  variant = "related",
  selected = false,
  disabled = false,
  badge,
  badgeTone,
  onSelect,
  onAction,
  className,
  ...props
}: RelationshipCardProps) {
  const detailRows = details ?? (contact ? [{ value: contact }] : []);
  const isFeatured = selected && variant === "related";
  const defaultAvatarStatus = variant === "conflict" ? "danger" : variant === "primary" ? "success" : "info";
  const resolvedAvatarStatus = avatarStatus === undefined ? defaultAvatarStatus : avatarStatus ?? undefined;
  const resolvedBadgeTone = badgeTone ?? (variant === "conflict" ? "danger" : variant === "primary" ? "success" : "info");
  const content = (
    <>
      <Avatar name={name} size="xs" src={avatarSrc} status={resolvedAvatarStatus} />
      {isFeatured ? (
        <>
          <span className="tl-relationship-card__highlight">
            {highlight ?? <strong>{name}</strong>}
          </span>
          {roleLabel ? <small className="tl-relationship-card__featured-meta">{roleLabel}</small> : null}
          {badge ? <Chip className="tl-relationship-card__bottom-chip" showDot={false} tone="info">{badge}</Chip> : null}
        </>
      ) : (
        <>
          <span className="tl-relationship-card__body">
            <span className="tl-relationship-card__title">
              <strong>{name}</strong>
              {badge ? <Chip showDot={false} tone={resolvedBadgeTone}>{badge}</Chip> : null}
            </span>
            {roleLabel ? <small>{roleLabel}</small> : null}
          </span>
          {detailRows.map((detail, index) => (
            <span className="tl-relationship-card__detail" key={index}>
              {detail.icon ? <Icon name={detail.icon} size={12} tone="neutral" /> : null}
              <MetaText>{detail.value}</MetaText>
            </span>
          ))}
        </>
      )}
      {onAction ? <IconButton disabled={disabled} icon="link" label={`Acao de ${name}`} onClick={(event) => { event.stopPropagation(); onAction(); }} size="sm" variant="ghost" /> : null}
    </>
  );
  const classes = cn(
    "tl-card",
    "tl-relationship-card",
    `tl-relationship-card--${variant}`,
    selected && "tl-relationship-card--selected",
    isFeatured && "tl-relationship-card--featured",
    disabled && "tl-card--disabled",
    className
  );

  if (onSelect) {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button {...buttonProps} aria-pressed={selected} className={classes} disabled={disabled} onClick={onSelect} type="button">
        {content}
      </button>
    );
  }

  return (
    <Card className={classes} disabled={disabled} selected={selected} {...props}>
      {content}
    </Card>
  );
}

export type ConflictCardState = "warning" | "danger" | "suggestion" | "applied" | "unresolved";

export interface ConflictCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: ConflictCardState;
  facts?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  suggestion?: React.ReactNode;
  compact?: boolean;
  onApply?: () => void;
  onIgnore?: () => void;
  onView?: () => void;
}

const conflictToneByState: Record<ConflictCardState, ComponentTone> = {
  warning: "warning",
  danger: "danger",
  suggestion: "info",
  applied: "success",
  unresolved: "blocked"
};

export function ConflictCard({
  title,
  description,
  state = "warning",
  facts = [],
  suggestion,
  compact = false,
  onApply,
  onIgnore,
  onView,
  className,
  ...props
}: ConflictCardProps) {
  const tone = conflictToneByState[state];
  return (
    <Card className={cn("tl-conflict-card", `tl-conflict-card--${state}`, compact && "tl-conflict-card--compact", className)} {...props}>
      <header className="tl-conflict-card__header">
        <Icon name={alertIconForTone(tone)} />
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        <Chip tone={tone}>{state}</Chip>
      </header>
      {facts.length ? (
        <dl className="tl-conflict-card__facts">
          {facts.map((fact, index) => (
            <span key={index}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {suggestion ? (
        <div className="tl-conflict-card__suggestion">
          <span>{suggestion}</span>
          {compact && onApply ? <Button disabled={state === "applied"} onClick={onApply} size="sm" variant="primary">Aplicar sugestao</Button> : null}
        </div>
      ) : null}
      {(onApply || onIgnore || onView) ? (
        <footer className="tl-conflict-card__actions">
          {onView ? <Button onClick={onView} size="sm" variant="ghost">Ver cenario completo</Button> : null}
          {onIgnore ? <Button onClick={onIgnore} size="sm" variant="secondary">Ignorar</Button> : null}
          {onApply && !compact ? <Button disabled={state === "applied"} onClick={onApply} size="sm" variant="primary">Aplicar sugestao</Button> : null}
        </footer>
      ) : null}
    </Card>
  );
}

export type DocumentPreviewState = "preview" | "signed" | "pending" | "error" | "loading";

export interface DocumentPreviewPage {
  id: string;
  label: React.ReactNode;
}

export interface DocumentPreviewHistoryItem {
  id: string;
  label: React.ReactNode;
  time?: React.ReactNode;
}

export interface DocumentPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  client?: React.ReactNode;
  date?: React.ReactNode;
  state?: DocumentPreviewState;
  stateLabel?: React.ReactNode;
  downloadLabel?: React.ReactNode;
  sendLabel?: React.ReactNode;
  pages?: DocumentPreviewPage[];
  selectedPageId?: string;
  history?: DocumentPreviewHistoryItem[];
  onPageSelect?: (pageId: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullscreen?: () => void;
  compact?: boolean;
}

const documentToneByState: Record<DocumentPreviewState, ComponentTone> = {
  preview: "info",
  signed: "success",
  pending: "warning",
  error: "danger",
  loading: "paused"
};

const documentLabelByState: Record<DocumentPreviewState, string> = {
  preview: "Visualizacao",
  signed: "Assinado",
  pending: "Pendente",
  error: "Erro",
  loading: "Carregando"
};

export function DocumentPreview({
  title,
  client,
  date,
  state = "preview",
  stateLabel,
  downloadLabel = "Baixar PDF",
  sendLabel = "Enviar por e-mail",
  pages = [],
  selectedPageId,
  history = [],
  onPageSelect,
  onDownload,
  onSend,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  compact = false,
  className,
  ...props
}: DocumentPreviewProps) {
  const effectivePageId = selectedPageId ?? pages[0]?.id;
  return (
    <Card className={cn("tl-document-preview", `tl-document-preview--${state}`, compact && "tl-document-preview--compact", className)} {...props}>
      <div className="tl-document-preview__rail" aria-label="Paginas">
        {pages.map((page, index) => {
          const pageLabel = typeof page.label === "string" || typeof page.label === "number" ? String(page.label) : String(index + 1);
          return (
            <button
              aria-current={page.id === effectivePageId ? "page" : undefined}
              aria-label={`Pagina ${pageLabel}`}
              className={cn("tl-document-preview__thumb", page.id === effectivePageId && "tl-document-preview__thumb--selected")}
              key={page.id}
              onClick={() => onPageSelect?.(page.id)}
              type="button"
            >
              <span>{page.label}</span>
            </button>
          );
        })}
      </div>
      <section className="tl-document-preview__canvas">
        <strong>{title}</strong>
        {client ? <small>{client}</small> : null}
        {date ? <MetaText>{date}</MetaText> : null}
        <span className="tl-document-preview__line tl-document-preview__line--wide" />
        <span className="tl-document-preview__line" />
        <span className="tl-document-preview__line tl-document-preview__line--short" />
        <footer className="tl-document-preview__toolbar">
          <IconButton icon="minus" label="Reduzir zoom" onClick={onZoomOut} size="sm" variant="ghost" />
          <MetaText>100%</MetaText>
          <IconButton icon="plus" label="Aumentar zoom" onClick={onZoomIn} size="sm" variant="ghost" />
          <IconButton icon="eye" label="Tela cheia" onClick={onFullscreen} size="sm" variant="ghost" />
        </footer>
      </section>
      <aside className="tl-document-preview__meta">
        <Chip tone={documentToneByState[state]}>{stateLabel ?? documentLabelByState[state]}</Chip>
        <ButtonGroup align="start">
          {onDownload ? <Button leadingIcon="download" onClick={onDownload} size="sm" variant="secondary">{downloadLabel}</Button> : null}
          {onSend ? <Button leadingIcon="mail" onClick={onSend} size="sm" variant="secondary">{sendLabel}</Button> : null}
        </ButtonGroup>
        {history.length ? (
          <List dense divided>
            {history.map((item) => (
              <ListItem key={item.id} meta={item.time} title={item.label} />
            ))}
          </List>
        ) : null}
      </aside>
    </Card>
  );
}

export type ExecutionRowStatus = "running" | "success" | "failed" | "pending" | "skipped";

export interface ExecutionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  step: number;
  title: React.ReactNode;
  tool?: React.ReactNode;
  status?: ExecutionRowStatus;
  duration?: React.ReactNode;
  cost?: React.ReactNode;
  error?: React.ReactNode;
  details?: React.ReactNode;
  statusLabel?: React.ReactNode;
  compact?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  onRetry?: () => void;
  onOpen?: () => void;
}

const executionToneByStatus: Record<ExecutionRowStatus, ComponentTone> = {
  running: "info",
  success: "success",
  failed: "danger",
  pending: "paused",
  skipped: "neutral"
};

export function ExecutionRow({
  step,
  title,
  tool,
  status = "pending",
  duration,
  cost,
  error,
  details,
  statusLabel,
  compact = false,
  expanded = false,
  onToggle,
  onRetry,
  onOpen,
  className,
  ...props
}: ExecutionRowProps) {
  const tone = executionToneByStatus[status];
  return (
    <div className={cn("tl-execution-row", `tl-execution-row--${status}`, compact && "tl-execution-row--compact", expanded && "tl-execution-row--expanded", className)} {...props}>
      <button
        aria-expanded={details ? expanded : undefined}
        className="tl-execution-row__main"
        disabled={!details && !onToggle}
        onClick={onToggle}
        type="button"
      >
        <span className="tl-execution-row__marker" data-step={step}>{step}</span>
        <span className="tl-execution-row__title">
          <strong>{title}</strong>
          {tool ? <small>{tool}</small> : null}
        </span>
        <Chip tone={tone}>{statusLabel ?? status}</Chip>
        {duration ? <MetaText>{duration}</MetaText> : null}
        {cost ? <MetaText>{cost}</MetaText> : null}
        {error ? <MetaText tone="danger">{error}</MetaText> : null}
      </button>
      {(onRetry || onOpen) ? (
        <span className="tl-execution-row__actions">
          {onRetry ? <IconButton icon="refresh" label="Reprocessar" onClick={onRetry} size="sm" variant="ghost" /> : null}
          {onOpen ? <IconButton icon="arrowRight" label="Abrir detalhes" onClick={onOpen} size="sm" variant="ghost" /> : null}
        </span>
      ) : null}
      {expanded && details ? <div className="tl-execution-row__details">{details}</div> : null}
    </div>
  );
}

export type ConfidenceMeterLevel = "low" | "medium" | "high" | "unknown";

export interface ConfidenceMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  level?: ConfidenceMeterLevel;
  segments?: number;
  compact?: boolean;
  loading?: boolean;
}

const confidenceToneByLevel: Record<ConfidenceMeterLevel, ComponentTone> = {
  low: "danger",
  medium: "warning",
  high: "success",
  unknown: "paused"
};

export function ConfidenceMeter({
  value = 0,
  label,
  helperText,
  level,
  segments = 5,
  compact = false,
  loading = false,
  className,
  style,
  ...props
}: ConfidenceMeterProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const segmentCount = Math.max(1, Math.round(segments));
  const effectiveLevel = level ?? (normalizedValue >= 75 ? "high" : normalizedValue >= 45 ? "medium" : normalizedValue > 0 ? "low" : "unknown");
  const activeSegments = loading ? 0 : Math.ceil((normalizedValue / 100) * segmentCount);
  const tone = confidenceToneByLevel[effectiveLevel];

  return (
    <Card
      className={cn("tl-confidence-meter", `tl-confidence-meter--${effectiveLevel}`, compact && "tl-confidence-meter--compact", loading && "tl-confidence-meter--loading", className)}
      style={{ "--tl-confidence-meter-segment-count": segmentCount, ...style } as React.CSSProperties}
      {...props}
    >
      <header className="tl-confidence-meter__header">
        <Chip icon="sparkles" tone={tone}>{label ?? (effectiveLevel === "high" ? "Alta confianca" : effectiveLevel === "medium" ? "Confianca media" : effectiveLevel === "low" ? "Baixa confianca" : "Sem leitura")}</Chip>
      </header>
      <strong className="tl-confidence-meter__value">{loading ? "--" : `${normalizedValue}%`}</strong>
      <div
        aria-label="Confianca"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={loading ? undefined : normalizedValue}
        className="tl-confidence-meter__segments"
        role="progressbar"
      >
        {Array.from({ length: segmentCount }, (_, index) => (
          <span className={index < activeSegments ? "tl-confidence-meter__segment--active" : undefined} key={index} />
        ))}
      </div>
      {helperText ? <p>{helperText}</p> : null}
    </Card>
  );
}

export interface SearchInputProps extends Omit<InputProps, "leadingIcon" | "type"> {
  loading?: boolean;
  resultCount?: React.ReactNode;
  onFilter?: () => void;
  filterLabel?: string;
  filterPlacement?: "separate" | "embedded";
}

export function SearchInput({
  loading = false,
  resultCount,
  onFilter,
  filterLabel = "Abrir filtros",
  filterPlacement = "separate",
  className,
  ...props
}: SearchInputProps) {
  const isFilterEmbedded = filterPlacement === "embedded";

  return (
    <div className={cn("tl-search-input", isFilterEmbedded && "tl-search-input--filter-embedded", className)}>
      <Input
        className="tl-search-input__field"
        leadingIcon="search"
        loading={loading}
        trailingText={resultCount ? <span className="tl-search-input__count">{resultCount}</span> : undefined}
        type="search"
        {...props}
      />
      {onFilter ? (
        <IconButton
          className="tl-search-input__filter"
          icon="sliders"
          label={filterLabel}
          onClick={onFilter}
          size={isFilterEmbedded ? "sm" : "md"}
        />
      ) : null}
    </div>
  );
}

export type MessageBubbleVariant = "inbound" | "outbound" | "internal" | "failed" | "suggestion";

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MessageBubbleVariant;
  sender?: React.ReactNode;
  timestamp?: React.ReactNode;
  status?: "sent" | "delivered" | "read" | "pending" | "failed" | "locked";
  action?: React.ReactNode;
  confidence?: React.ReactNode;
}

export function MessageBubble({
  variant = "inbound",
  sender,
  timestamp,
  status,
  action,
  confidence,
  className,
  children,
  role,
  ...props
}: MessageBubbleProps) {
  const effectiveStatus = status ?? (variant === "failed" ? "failed" : undefined);
  const iconForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, IconName>> = {
    delivered: "check",
    failed: "alert",
    locked: "lock",
    pending: "clock",
    read: "checkCircle",
    sent: "check"
  };
  const labelForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, string>> = {
    delivered: "Mensagem entregue",
    failed: "Mensagem com falha",
    locked: "Nota interna bloqueada",
    pending: "Mensagem pendente",
    read: "Mensagem lida",
    sent: "Mensagem enviada"
  };

  return (
    <div
      className={cn("tl-message-bubble", `tl-message-bubble--${variant}`, className)}
      role={role ?? (variant === "failed" ? "alert" : undefined)}
      {...props}
    >
      {sender || confidence ? (
        <div className="tl-message-bubble__header">
          {sender ? <strong>{sender}</strong> : null}
          {confidence ? <Chip tone="info">{confidence}</Chip> : null}
        </div>
      ) : null}
      <div className="tl-message-bubble__body">{children}</div>
      {timestamp || effectiveStatus || action ? (
        <div className="tl-message-bubble__meta">
          {timestamp ? <span>{timestamp}</span> : null}
          {effectiveStatus ? (
            <span
              aria-label={labelForStatus[effectiveStatus]}
              className={cn("tl-message-bubble__status", `tl-message-bubble__status--${effectiveStatus}`)}
              role="img"
            >
              <Icon name={iconForStatus[effectiveStatus] ?? "circle"} size={13} />
            </span>
          ) : null}
          {action ? <span className="tl-message-bubble__action">{action}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export interface ComposerInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "onChange" | "value"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSend?: (value: string, options: { internal: boolean }) => void;
  internal?: boolean;
  defaultInternal?: boolean;
  onInternalChange?: (internal: boolean) => void;
  allowEmptySend?: boolean;
  sending?: boolean;
  sendLabel?: string;
  attachLabel?: string;
  mediaLabel?: string;
  quickReplyLabel?: string;
  showFieldIcon?: boolean;
  showInternalToggle?: boolean;
  onAttach?: () => void;
  onMedia?: () => void;
  onQuickReply?: () => void;
  actionsOrder?: Array<"attach" | "quickReply" | "media">;
  quickReplyControl?: React.ReactNode;
  sendTrailingControl?: React.ReactNode;
}

export function ComposerInput({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  internal,
  defaultInternal = false,
  onInternalChange,
  allowEmptySend = false,
  sending = false,
  disabled = false,
  placeholder = "Digite sua mensagem...",
  sendLabel = "Enviar",
  attachLabel = "Anexar arquivo",
  mediaLabel = "Abrir midia interna",
  quickReplyLabel = "Modelos e respostas rapidas",
  showFieldIcon = true,
  showInternalToggle = true,
  onAttach,
  onMedia,
  onQuickReply,
  actionsOrder = ["attach", "quickReply", "media"],
  quickReplyControl,
  sendTrailingControl,
  className,
  ...props
}: ComposerInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [uncontrolledInternal, setUncontrolledInternal] = useState(defaultInternal);
  const currentValue = value ?? internalValue;
  const currentInternal = internal ?? uncontrolledInternal;
  const canSend = (allowEmptySend || currentValue.trim().length > 0) && !disabled && !sending;

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const send = () => {
    if (!canSend) return;
    onSend?.(currentValue, { internal: currentInternal });
    if (value === undefined) setInternalValue("");
  };

  const updateInternal = (nextInternal: boolean) => {
    if (internal === undefined) setUncontrolledInternal(nextInternal);
    onInternalChange?.(nextInternal);
  };

  const actionControl = (action: "attach" | "quickReply" | "media") => {
    if (action === "attach") {
      return <IconButton key="attach" disabled={disabled} icon="paperclip" label={attachLabel} onClick={onAttach} size="sm" variant="ghost" />;
    }

    if (action === "quickReply") {
      return quickReplyControl ?? (
        <IconButton key="quickReply" disabled={disabled} icon="layout" label={quickReplyLabel} onClick={onQuickReply} size="sm" variant="ghost" />
      );
    }

    return <IconButton key="media" disabled={disabled} icon="fileText" label={mediaLabel} onClick={onMedia} size="sm" variant="ghost" />;
  };

  return (
    <div className={cn("tl-composer-input", currentInternal && "tl-composer-input--internal", disabled && "tl-composer-input--disabled", className)}>
      <div className="tl-composer-input__field">
        {showFieldIcon ? <Icon name="message" size={16} /> : null}
        <textarea
          aria-label={props["aria-label"] ?? "Mensagem"}
          disabled={disabled}
          onChange={(event) => updateValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              send();
            }
          }}
          placeholder={placeholder}
          value={currentValue}
          {...props}
        />
      </div>
      <div className="tl-composer-input__toolbar">
        <span className="tl-composer-input__actions">{actionsOrder.map(actionControl)}</span>
        <span className="tl-composer-input__submit">
          {showInternalToggle ? (
            <Toggle
              className="tl-composer-input__toggle"
              disabled={disabled}
              label="Nota interna"
              onPressedChange={updateInternal}
              pressed={currentInternal}
            />
          ) : null}
          <Button
            className="tl-composer-input__send"
            disabled={!canSend}
            leadingIcon={sending ? "loader" : "send"}
            loading={sending}
            onClick={send}
            size="sm"
            type="button"
            variant="primary"
          >
            {sendLabel}
          </Button>
          {sendTrailingControl}
        </span>
      </div>
    </div>
  );
}

export interface CalendarCellEvent {
  id?: string;
  tone?: "info" | "success" | "warning" | "danger" | "neutral";
  label?: string;
}

export interface CalendarGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 5 | 7;
}

export function CalendarGrid({ columns = 7, className, ...props }: CalendarGridProps) {
  return <div className={cn("tl-calendar-grid", `tl-calendar-grid--${columns}`, className)} {...props} />;
}

export interface CalendarCellProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  day: React.ReactNode;
  eyebrow?: React.ReactNode;
  selected?: boolean;
  today?: boolean;
  conflict?: boolean;
  muted?: boolean;
  events?: CalendarCellEvent[];
}

export function CalendarCell({
  day,
  eyebrow,
  selected = false,
  today = false,
  conflict = false,
  muted = false,
  events = [],
  disabled,
  className,
  ...props
}: CalendarCellProps) {
  return (
    <button
      aria-current={today ? "date" : undefined}
      aria-pressed={selected}
      className={cn(
        "tl-calendar-cell",
        selected && "tl-calendar-cell--selected",
        today && "tl-calendar-cell--today",
        conflict && "tl-calendar-cell--conflict",
        muted && "tl-calendar-cell--muted",
        className
      )}
      disabled={disabled}
      type="button"
      {...props}
    >
      {eyebrow ? <span className="tl-calendar-cell__eyebrow">{eyebrow}</span> : null}
      <strong>{day}</strong>
      {events.length > 0 ? (
        <span className="tl-calendar-cell__events" aria-label={`${events.length} eventos`}>
          {events.slice(0, 4).map((event, index) => (
            <span
              className={cn("tl-calendar-cell__event-dot", `tl-calendar-cell__event-dot--${event.tone ?? "info"}`)}
              key={event.id ?? `${event.label ?? "event"}-${index}`}
              title={event.label}
            />
          ))}
        </span>
      ) : null}
    </button>
  );
}

export type CalendarEventBlockStatus = "scheduled" | "full" | "available" | "conflict" | "cancelled";

export interface CalendarEventBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: CalendarEventBlockStatus;
  time?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  capacity?: React.ReactNode;
  compact?: boolean;
  action?: React.ReactNode;
}

export function CalendarEventBlock({
  status = "scheduled",
  time,
  title,
  meta,
  capacity,
  compact = false,
  action,
  className,
  ...props
}: CalendarEventBlockProps) {
  return (
    <div className={cn("tl-calendar-event", `tl-calendar-event--${status}`, compact && "tl-calendar-event--compact", className)} {...props}>
      <div className="tl-calendar-event__header">
        {time ? <span>{time}</span> : null}
        {action ? <span className="tl-calendar-event__action">{action}</span> : null}
      </div>
      <strong>{title}</strong>
      {meta ? <small>{meta}</small> : null}
      {capacity ? <span className="tl-calendar-event__capacity">{capacity}</span> : null}
    </div>
  );
}

export type FlowNodeVariant = "trigger" | "condition" | "action" | "approval" | "fallback" | "blocked";

export interface FlowNodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: FlowNodeVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  icon?: IconName;
  selected?: boolean;
  blocked?: boolean;
  onMenu?: () => void;
  menuLabel?: string;
}

export function FlowNode({
  variant = "action",
  title,
  description,
  status,
  icon,
  selected = false,
  blocked = false,
  onMenu,
  menuLabel = "Abrir opcoes do no",
  className,
  onClick,
  onKeyDown,
  ...props
}: FlowNodeProps) {
  const iconByVariant: Record<FlowNodeVariant, IconName> = {
    action: "send",
    approval: "users",
    blocked: "lock",
    condition: "filter",
    fallback: "shield",
    trigger: "sparkles"
  };
  const actionable = Boolean(onClick);
  const interactive = actionable && !blocked;

  return (
    <div
      aria-label={actionable && typeof title === "string" ? title : undefined}
      aria-disabled={blocked || undefined}
      className={cn(
        "tl-flow-node",
        `tl-flow-node--${variant}`,
        selected && "tl-flow-node--selected",
        blocked && "tl-flow-node--blocked",
        interactive && "tl-flow-node--interactive",
        className
      )}
      onClick={interactive ? onClick : undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      role={actionable ? "button" : "group"}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <span className="tl-flow-node__port tl-flow-node__port--in" />
      <span className="tl-flow-node__port tl-flow-node__port--out" />
      <div className="tl-flow-node__top">
        <span className="tl-flow-node__icon">
          <Icon name={icon ?? iconByVariant[variant]} size={16} />
        </span>
        {onMenu ? (
          <IconButton
            icon="ellipsis"
            label={menuLabel}
            onClick={(event) => {
              event.stopPropagation();
              onMenu();
            }}
            size="sm"
            variant="ghost"
          />
        ) : null}
      </div>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {status ? <span className="tl-flow-node__status">{status}</span> : null}
    </div>
  );
}

export type ChartPanelVariant = "line" | "bar" | "funnel" | "ranking" | "heatmap";

export interface ChartPanelDatum {
  label: string;
  value: number;
}

export interface ChartPanelPrimitiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ChartPanelVariant;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  data?: ChartPanelDatum[];
  legend?: React.ReactNode;
  action?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
}

const defaultChartData: ChartPanelDatum[] = [
  { label: "22/04", value: 34 },
  { label: "23/04", value: 46 },
  { label: "24/04", value: 39 },
  { label: "25/04", value: 58 },
  { label: "26/04", value: 49 },
  { label: "27/04", value: 66 }
];

function ChartPanelGraphic({ variant, data }: { variant: ChartPanelVariant; data: ChartPanelDatum[] }) {
  if (variant === "heatmap") {
    return (
      <div className="tl-chart-panel__heatmap" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, index) => (
          <span key={index} className={`tl-chart-panel__heat-${(index % 4) + 1}`} />
        ))}
      </div>
    );
  }

  if (variant === "ranking") {
    return (
      <div className="tl-chart-panel__ranking">
        {data.slice(0, 5).map((item) => (
          <span key={item.label}>
            <strong>{item.label}</strong>
            <i style={{ width: `${Math.max(14, item.value)}%` }} />
            <em>{item.value}</em>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "funnel") {
    return (
      <div className="tl-chart-panel__funnel">
        {data.slice(0, 4).map((item, index) => (
          <span key={item.label} style={{ width: `${100 - index * 13}%` }}>
            <strong>{item.label}</strong>
            <em>{item.value}%</em>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className="tl-chart-panel__bars" aria-hidden="true">
        {data.map((item) => (
          <span key={item.label} style={{ height: `${Math.max(18, item.value)}%` }} />
        ))}
      </div>
    );
  }

  return (
    <svg aria-hidden="true" className="tl-chart-panel__line" viewBox="0 0 260 120">
      <path d="M14 94 H248 M14 64 H248 M14 34 H248" />
      <polyline points="14,84 58,68 102,74 146,48 190,56 238,30" />
      <polyline className="tl-chart-panel__line-secondary" points="14,96 58,82 102,86 146,70 190,62 238,48" />
    </svg>
  );
}

export function ChartPanelPrimitive({
  variant = "line",
  title,
  subtitle,
  data = defaultChartData,
  legend,
  action,
  loading = false,
  empty = false,
  className,
  ...props
}: ChartPanelPrimitiveProps) {
  return (
    <section className={cn("tl-chart-panel", `tl-chart-panel--${variant}`, loading && "tl-chart-panel--loading", empty && "tl-chart-panel--empty", className)} {...props}>
      <header className="tl-chart-panel__header">
        <span>
          <strong>{title}</strong>
          {subtitle ? <small>{subtitle}</small> : null}
        </span>
        {action}
      </header>
      {loading ? <LoadingState className="tl-chart-panel__state" title="Carregando grafico" variant="spinner" /> : null}
      {!loading && empty ? <EmptyState className="tl-chart-panel__state" icon="barChart" title="Sem dados" /> : null}
      {!loading && !empty ? <ChartPanelGraphic data={data} variant={variant} /> : null}
      {legend && !loading && !empty ? <footer className="tl-chart-panel__legend">{legend}</footer> : null}
    </section>
  );
}

export interface TabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  compact = false,
  className,
  "aria-label": ariaLabel = "Abas",
  showPanel = true,
  idBase
}: {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  compact?: boolean;
  className?: string;
  "aria-label"?: string;
  showPanel?: boolean;
  idBase?: string;
}) {
  const fallback = items[0]?.value ?? "";
  const generatedId = useId().replaceAll(":", "");
  const tabsIdBase = idBase ?? `tl-tabs-${generatedId}`;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internalValue, setInternalValue] = useState(defaultValue ?? fallback);
  const currentValue = value ?? internalValue;
  const currentItem = useMemo(
    () => items.find((item) => item.value === currentValue) ?? items[0],
    [currentValue, items]
  );
  const selectItem = (item: TabItem) => {
    if (item.disabled) {
      return;
    }

    setInternalValue(item.value);
    onValueChange?.(item.value);
  };
  const focusAndSelect = (index: number) => {
    const enabledItems = items
      .map((item, itemIndex) => ({ item, itemIndex }))
      .filter(({ item }) => !item.disabled);

    if (!enabledItems.length) {
      return;
    }

    const next = enabledItems[((index % enabledItems.length) + enabledItems.length) % enabledItems.length];
    if (!next) {
      return;
    }

    tabRefs.current[next.itemIndex]?.focus();
    selectItem(next.item);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabledIndexes = items
      .map((item, itemIndex) => (item.disabled ? -1 : itemIndex))
      .filter((itemIndex) => itemIndex >= 0);
    const currentEnabledIndex = enabledIndexes.indexOf(index);

    if (currentEnabledIndex < 0) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAndSelect(currentEnabledIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAndSelect(currentEnabledIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusAndSelect(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusAndSelect(enabledIndexes.length - 1);
    }
  };

  return (
    <div className={cn("tl-tabs", compact && "tl-tabs--compact", className)}>
      <div aria-label={ariaLabel} className="tl-tabs__list" role="tablist">
        {items.map((item, index) => (
          <button
            aria-selected={item.value === currentValue}
            aria-controls={showPanel ? `${tabsIdBase}-panel-${item.value}` : undefined}
            className={cn("tl-tabs__tab", item.value === currentValue && "tl-tabs__tab--active")}
            disabled={item.disabled}
            id={`${tabsIdBase}-tab-${item.value}`}
            key={item.value}
            onClick={() => selectItem(item)}
            onKeyDown={(event) => onKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            tabIndex={item.value === currentValue ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {showPanel ? (
        <div
          aria-labelledby={currentItem ? `${tabsIdBase}-tab-${currentItem.value}` : undefined}
          className="tl-tabs__panel"
          id={currentItem ? `${tabsIdBase}-panel-${currentItem.value}` : undefined}
          role="tabpanel"
        >
          {currentItem?.content}
        </div>
      ) : null}
    </div>
  );
}

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  time?: React.ReactNode;
  description?: React.ReactNode;
  tone?: ComponentTone;
  icon?: IconName;
  meta?: React.ReactNode;
  actor?: React.ReactNode;
  action?: React.ReactNode;
}

export function Timeline({
  items,
  compact = false,
  variant = "default",
  className
}: {
  items: TimelineItem[];
  compact?: boolean;
  variant?: "default" | "sensitive" | "execution";
  className?: string;
}) {
  return (
    <ol className={cn("tl-timeline", `tl-timeline--${variant}`, compact && "tl-timeline--compact", className)}>
      {items.map((item) => (
        <li className={cn("tl-timeline__item", `tl-timeline__item--${item.tone ?? "neutral"}`)} key={item.id}>
          <span className="tl-timeline__mark">
            {item.icon ? <Icon name={item.icon} size={14} /> : null}
          </span>
          <div className="tl-timeline__content">
            <span className="tl-timeline__heading">
              <strong>{item.title}</strong>
              {item.time ? <small>{item.time}</small> : null}
            </span>
            {item.actor || item.meta ? (
              <span className="tl-timeline__meta">
                {item.actor ? <em>{item.actor}</em> : null}
                {item.meta ? <small>{item.meta}</small> : null}
              </span>
            ) : null}
            {item.description ? <p>{item.description}</p> : null}
            {item.action ? <div className="tl-timeline__action">{item.action}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export interface TaliyaLogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  variant?: "mark" | "wordmark" | "compact";
}

export function TaliyaLogo({ label = "Taliya", variant = "wordmark", className, ...props }: TaliyaLogoProps) {
  const viewBox = variant === "mark" ? "0 0 272 223.59" : "0 0 1000 223.59";
  const gradientId = React.useId().replaceAll(":", "");

  return (
    <span aria-label={label} className={cn("tl-logo", `tl-logo--${variant}`, className)} role="img" {...props}>
      <svg aria-hidden="true" focusable="false" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="28%" r="72%">
            <stop offset="0" stopColor="var(--taliya-color-logo-dot-start)" />
            <stop offset="1" stopColor="var(--taliya-color-logo-dot-end)" />
          </radialGradient>
        </defs>
        <path
          d="M987.71 184.89 L944.1 81.08 L925.68 81.08 L881.45 184.89 L901.11 184.89 L909.09 164.62 L911.55 161.55 L957.62 161.55 L960.69 165.85 L968.67 184.89 Z M951.47 144.35 L950.25 145.58 L918.3 144.96 L918.3 142.51 L932.43 107.49 L934.28 105.04 L936.12 106.27 Z M862.41 81.08 L842.14 81.08 L815.72 125.92 L812.65 124.08 L787.47 81.08 L767.2 81.08 L805.9 147.42 L805.9 184.89 L823.71 184.89 L824.32 146.19 Z M716.22 81.08 L697.79 81.08 L697.79 184.89 L716.22 184.89 Z M646.81 168.92 L599.51 168.92 L596.44 167.08 L596.44 82.92 L595.82 81.08 L578.01 81.08 L578.01 184.89 L646.81 184.89 Z M530.71 184.89 L487.1 81.08 L468.67 81.08 L425.06 184.89 L444.1 184.89 L452.7 163.39 L454.55 161.55 L501.23 161.55 L511.67 184.89 Z M494.47 143.12 L493.86 145.58 L461.3 144.96 L462.53 139.43 L474.82 109.34 L477.27 105.65 L478.5 105.65 L492.01 136.98 Z M386.98 81.08 L302.83 81.08 L302.83 97.05 L333.54 97.05 L335.38 98.28 L336 184.89 L353.81 184.89 L353.81 98.28 L355.04 97.05 L386.98 97.05 Z M193.49 96.44 L191.65 90.29 L188.57 85.38 L183.05 80.47 L135.14 48.53 L100.74 17.81 L90.91 12.29 L85.38 11.06 L27.03 11.06 L18.43 14.74 L13.51 20.27 L11.06 27.64 L11.67 33.78 L14.13 39.31 L53.44 79.24 L58.35 81.7 L64.5 82.92 L123.46 82.92 L124.69 84.15 L124.69 195.33 L127.76 203.32 L132.68 208.23 L139.43 211.3 L179.36 211.3 L186.73 207.62 L191.03 202.7 L193.49 196.56 Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          d="M261.06 43 L259.83 35.63 L255.53 26.41 L247.54 17.81 L237.1 12.29 L224.82 11.06 L211.92 15.36 L201.47 24.57 L195.95 35.01 L194.72 39.93 L194.72 50.98 L198.4 61.43 L203.93 68.8 L213.14 75.55 L219.9 78.01 L232.8 78.62 L240.79 76.17 L246.31 73.1 L254.91 64.5 L260.44 52.21 Z"
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  status?: StatusDotStatus;
  badge?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export function Avatar({ name, src, size = "md", status, badge, selected = false, disabled = false, className, ...props }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const shouldShowImage = src && failedSrc !== src;

  return (
    <div
      aria-label={name}
      aria-selected={selected || undefined}
      className={cn(
        "tl-avatar",
        `tl-avatar--${size}`,
        selected && "tl-avatar--selected",
        disabled && "tl-avatar--disabled",
        className
      )}
      data-disabled={disabled || undefined}
      {...props}
    >
      {shouldShowImage ? <img alt="" onError={() => setFailedSrc(src)} src={src} /> : <span>{initials}</span>}
      {status ? <span className={cn("tl-avatar__status", `tl-avatar__status--${status}`)} /> : null}
      {badge ? <span className="tl-avatar__badge">{badge}</span> : null}
    </div>
  );
}

export interface AvatarStackPerson {
  id: string;
  name: string;
  src?: string;
  status?: AvatarProps["status"];
  badge?: React.ReactNode;
}

export function AvatarStack({
  people,
  max = 3,
  showAdd = false,
  addLabel = "Adicionar pessoa",
  onAdd,
  className
}: {
  people: AvatarStackPerson[];
  max?: number;
  showAdd?: boolean;
  addLabel?: string;
  onAdd?: () => void;
  className?: string;
}) {
  const visible = people.slice(0, max);
  const overflow = people.length - visible.length;

  return (
    <div className={cn("tl-avatar-stack", className)}>
      {visible.map((person) => (
        <Avatar
          badge={person.badge}
          key={person.id}
          name={person.name}
          size="sm"
          src={person.src}
          status={person.status}
        />
      ))}
      {overflow > 0 ? <span className="tl-avatar-stack__count">+{overflow}</span> : null}
      {showAdd ? (
        <button className="tl-avatar-stack__add" onClick={onAdd} title={addLabel} type="button" aria-label={addLabel}>
          <Icon name="plus" size="var(--taliya-control-avatar-add-icon-size)" />
        </button>
      ) : null}
    </div>
  );
}
