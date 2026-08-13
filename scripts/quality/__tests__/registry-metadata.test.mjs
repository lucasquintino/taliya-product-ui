import { strict as assert } from "node:assert";
import { test } from "node:test";
import { fetchRegistryMetadata } from "../../lib/registry-metadata.mjs";

test("registry metadata retries transient responses and preserves the final result", async () => {
  const responses = [
    { ok: false, status: 503, headers: { get: () => null } },
    { ok: true, status: 200, json: async () => ({ name: "@taliya/ui", version: "0.1.1" }) }
  ];
  const waits = [];
  const result = await fetchRegistryMetadata(
    { name: "@taliya/ui", version: "0.1.1" },
    {
      fetchImpl: async () => responses.shift(),
      waitImpl: async (milliseconds) => waits.push(milliseconds),
      timeoutMs: 10
    }
  );

  assert.equal(result.httpStatus, 200);
  assert.equal(result.metadata.version, "0.1.1");
  assert.deepEqual(waits, [250]);
});

test("registry metadata does not retry a definitive not-found response", async () => {
  let calls = 0;
  const result = await fetchRegistryMetadata(
    { name: "@taliya/missing", version: "0.0.0" },
    {
      fetchImpl: async () => {
        calls += 1;
        return { ok: false, status: 404, headers: { get: () => null } };
      },
      waitImpl: async () => assert.fail("404 must not be retried"),
      timeoutMs: 10
    }
  );

  assert.equal(calls, 1);
  assert.equal(result.httpStatus, 404);
  assert.equal(result.metadata, null);
});
