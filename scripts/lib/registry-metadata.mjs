import { setTimeout as wait } from "node:timers/promises";

export async function fetchRegistryMetadata(spec, options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const waitImpl = options.waitImpl ?? wait;
  const attempts = options.attempts ?? 3;
  const timeoutMs = options.timeoutMs ?? 15000;
  const metadataUrl = `https://registry.npmjs.org/${encodeURIComponent(spec.name)}/${encodeURIComponent(spec.version)}`;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetchImpl(metadataUrl, {
        headers: {
          accept: "application/json",
          "user-agent": "taliya-product-ui-registry-audit/1.0"
        },
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (response.ok) {
        return { metadataUrl, httpStatus: response.status, metadata: await response.json(), error: null };
      }

      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) {
        return { metadataUrl, httpStatus: response.status, metadata: null, error: `registry returned HTTP ${response.status}` };
      }

      const retryAfterValue = response.headers?.get?.("retry-after");
      const retryAfterSeconds = retryAfterValue == null ? Number.NaN : Number(retryAfterValue);
      const delayMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0
        ? retryAfterSeconds * 1000
        : attempt * 250;
      await waitImpl(delayMs);
    } catch (error) {
      if (attempt === attempts) {
        return {
          metadataUrl,
          httpStatus: null,
          metadata: null,
          error: error instanceof Error ? error.message : String(error)
        };
      }
      await waitImpl(attempt * 250);
    }
  }

  throw new Error("Registry metadata retry loop ended unexpectedly.");
}
