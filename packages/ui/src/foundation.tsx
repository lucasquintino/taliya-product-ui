import React from "react";
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
  X,
  type LucideIcon as LucideComponent
} from "lucide-react";

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

export const iconSizeTokenByName: Record<string, string> = {
  sm: "var(--taliya-control-icon-size-sm)",
  md: "var(--taliya-control-icon-size-md)",
  lg: "var(--taliya-control-icon-size-lg)"
};

export const iconButtonIconSizeTokenBySize: Record<Size | "xl", string> = {
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
