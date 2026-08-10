import React, { useMemo, useRef, useState, useId } from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";
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
