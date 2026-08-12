import React from "react";
import { cn } from "./foundation.js";
export { Button, ButtonGroup, IconButton, PrimitiveButton } from "./primitives/button.js";
export type { ButtonProps, IconButtonProps } from "./primitives/button.js";
export { PrimitiveInput } from "./primitives/forms.js";
export { Tabs, Timeline } from "./components/navigation-data.js";
export type { TabItem, TimelineItem } from "./components/navigation-data.js";
export { Toast } from "./primitives/feedback.js";
export { AuditTable, ChecklistItem, ComposerInput, ConfidenceMeter, ConflictCard, DiffTable, DocumentPreview, ExecutionRow, ImportProgressCard, MessageBubble, MetricTile, PermissionTable, RelationshipCard, SearchInput, StatusSummaryCard } from "./components/workflow-data.js";
export type { AuditTableProps, AuditTableRow, AuditTableStatus, ChecklistItemProps, ChecklistItemState, ComposerInputProps, ConfidenceMeterLevel, ConfidenceMeterProps, ConflictCardProps, ConflictCardState, DiffRowStatus, DiffTableProps, DiffTableRow, DocumentPreviewHistoryItem, DocumentPreviewPage, DocumentPreviewProps, DocumentPreviewState, ExecutionRowProps, ExecutionRowStatus, ImportProgressCardProps, ImportProgressCardState, ImportProgressMetric, MessageBubbleProps, MessageBubbleVariant, MetricTileProps, MetricTileTone, PermissionTableProps, PermissionTableRow, PermissionTableState, RelationshipCardProps, RelationshipCardVariant, SearchInputProps, StatusSummaryCardProps, StatusSummaryState } from "./components/workflow-data.js";
export { Avatar, AvatarStack, PersonLabel } from "./components/identity.js";
export type { AvatarProps, AvatarStackPerson, PersonLabelProps } from "./components/identity.js";
export { DataTable, TablePagination } from "./components/data-table.js";
export type { DataTableColumn, DataTableProps, DataTableSortDirection, DataTableSortState, TablePaginationProps } from "./components/data-table.js";
export { CalendarCell, CalendarEventBlock, CalendarGrid, ChartPanelPrimitive, FlowNode } from "./components/calendar-flow-chart.js";
export type { CalendarCellEvent, CalendarCellProps, CalendarEventBlockProps, CalendarEventBlockStatus, CalendarGridProps, ChartPanelDatum, ChartPanelPrimitiveProps, FlowNodeProps, FlowNodeVariant } from "./components/calendar-flow-chart.js";
export { Stepper } from "./primitives/stepper.js";
export type { StepperProps, StepperStep, StepperStepState } from "./primitives/stepper.js";
export { ConfirmDialog, Drawer, DrawerFooter, DrawerHeader, DrawerSection, Modal, Popover, ProgressBar, ScrollArea, Tooltip } from "./primitives/overlays.js";
export type { ConfirmDialogProps, DrawerFooterProps, DrawerHeaderProps, DrawerProps, DrawerSectionProps, ModalProps, PopoverProps, ProgressBarProps, TooltipProps } from "./primitives/overlays.js";
export { AttachmentList, Checkbox, ContentGrid, DateInput, FieldGrid, FieldGroup, FieldStack, FileUpload, Input, MoneyInput, PasswordInput, Radio, Select, SegmentedControl, SocialAuthButton, TagInput, Textarea, TimeInput, Toggle } from "./primitives/forms.js";
export type { AttachmentItem, CheckboxProps, ContentGridProps, FieldBaseProps, FieldGridProps, FieldGroupProps, FieldStackProps, FieldState, FileUploadProps, InputProps, PasswordInputProps, RadioProps, SelectOption, SelectProps, SegmentedControlOption, SocialAuthButtonProps, TagInputItem, TagInputProps, TextareaProps, ToggleProps } from "./primitives/forms.js";
export { ActionMenu, Breadcrumb, DropdownMenu, FilterBar, FilterChip, FilterMultiSelect, FilterSelect, NavPill } from "./components/controls.js";
export type { BreadcrumbItem, DropdownAction, DropdownMenuProps, FilterChipProps, FilterMultiSelectProps, FilterSelectOption, FilterSelectProps, NavPillProps } from "./components/controls.js";
export { Card, InlineGroup, MetaText, Panel, PanelBody, PanelHeader, Stack, StatePage, Toolbar } from "./primitives/layout.js";
export type { CardProps, InlineGroupProps, MetaTextProps, PanelBodyProps, PanelHeaderProps, PanelProps, StackProps, StatePageProps, ToolbarProps } from "./primitives/layout.js";
export { Badge, Chip, InlineAlert, StatusDot } from "./primitives/feedback.js";
export type { BadgeProps, ChipProps, InlineAlertProps, StatusDotProps } from "./primitives/feedback.js";
export { EmptyState, ErrorState, KeyValueRow, List, ListItem, LoadingState } from "./components/state-list.js";
export type { EmptyStateProps, ErrorStateProps, KeyValueRowProps, ListItemProps, ListProps, LoadingStateProps } from "./components/state-list.js";
export { ConnectorLine, ListIcon } from "./components/connectors.js";
export type { ConnectorLineProps, ListIconProps } from "./components/connectors.js";
export { Icon } from "./foundation.js";
export { cn, iconButtonIconSizeTokenBySize, iconRegistry, iconSizeTokenByName } from "./foundation.js";
export type { ButtonVariant, ComponentTone, IconButtonVariant, IconName, IconProps, Size } from "./foundation.js";
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
