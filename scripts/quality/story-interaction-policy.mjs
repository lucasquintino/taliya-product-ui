export function isRetryableStoryFailure(error, attempt, maxAttempts = 2) {
  return attempt < maxAttempts && /Timeout\s+\d+ms exceeded/i.test(String(error ?? ""));
}

export function waitForStorybookRender(page, timeoutMs) {
  return page.waitForFunction(
    () => window.__STORYBOOK_PREVIEW__?.currentRender?.phase === "finished",
    undefined,
    { timeout: timeoutMs }
  );
}
