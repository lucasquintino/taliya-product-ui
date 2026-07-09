import "@testing-library/jest-dom/vitest";

Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? (() => undefined);
Element.prototype.hasPointerCapture = Element.prototype.hasPointerCapture ?? (() => false);
Element.prototype.setPointerCapture = Element.prototype.setPointerCapture ?? (() => undefined);
Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture ?? (() => undefined);

globalThis.ResizeObserver =
  globalThis.ResizeObserver ??
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
