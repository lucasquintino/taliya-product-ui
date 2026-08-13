import { strict as assert } from "node:assert";
import { test } from "node:test";
import { portabilityGateIds, releaseArchitectureGateIds, runPortabilityGates } from "../run-portability-gates.mjs";

test("portability runner stops at and propagates the first failed gate", () => {
  const calls = [];
  const failedGate = "components:audit";
  const exitCode = runPortabilityGates({
    spawn: (_command, args) => {
      const gateId = args.at(-1);
      calls.push(gateId);
      return { status: gateId === failedGate ? 7 : 0, signal: null };
    }
  });

  assert.equal(exitCode, 7);
  assert.deepEqual(calls, portabilityGateIds.slice(0, portabilityGateIds.indexOf(failedGate) + 1));
});

test("release certification adds both architecture gates to the portable set", () => {
  assert.deepEqual(releaseArchitectureGateIds, ["architecture:standards", "architecture:ratchet"]);
  assert.equal(new Set([...portabilityGateIds, ...releaseArchitectureGateIds]).size, portabilityGateIds.length + 2);
});
