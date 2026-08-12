import React, { useId, useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cn, Icon, type IconName } from "../foundation.js";

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

