import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
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
