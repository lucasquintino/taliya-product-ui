import React from "react";
import { cn, Icon, type IconName } from "../foundation.js";
import { ProgressBar } from "./overlays.js";
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
