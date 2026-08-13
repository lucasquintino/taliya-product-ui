export function isRetryableStoryFailure(error, attempt, maxAttempts = 2) {
  return attempt < maxAttempts && /Timeout\s+\d+ms exceeded/i.test(String(error ?? ""));
}
