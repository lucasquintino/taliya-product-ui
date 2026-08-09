export function normalizeText(text) { return text.replace(/\r\n?/g, '\n'); }
export function normalizeRepositoryPath(value) { return value.replaceAll('\\', '/').replace(/^\.\//, ''); }
export function deterministicTimestamp(input) { return new Date(input).toISOString(); }
export function stableDecision(value) {
  if (Array.isArray(value)) return value.map(stableDecision);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableDecision(value[key])]));
  return value;
}
