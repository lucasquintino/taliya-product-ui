/** Executes the smallest observable interaction for a story with controls. */
export async function playFirstInteractiveControl({ canvasElement }: { canvasElement: HTMLElement }) {
  const control = canvasElement.querySelector<HTMLElement>(
    "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [role=button]:not([aria-disabled=true])"
  );
  if (!control) return;
  control.focus();
  if (control instanceof HTMLButtonElement || control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
    control.click();
  }
}
