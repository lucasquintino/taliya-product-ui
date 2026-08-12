import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn, Icon, type IconName } from "../foundation.js";
import { IconButton } from "../primitives/button.js";
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

  // quality: external-sync â€” document-level pointer listener closes the menu outside its owned container.
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

  // quality: external-sync â€” requestAnimationFrame moves focus into the newly opened menu for keyboard users.
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

export { FilterSelect, FilterMultiSelect } from "./filter-select.js";
export type { FilterSelectProps, FilterMultiSelectProps, FilterSelectOption } from "./filter-select.js";
