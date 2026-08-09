import { strict as assert } from "node:assert";
import { test } from "node:test";
import { loadGovernanceFixtures, validatePolicyFixture } from "../governance-fixtures.mjs";

const fixtures = loadGovernanceFixtures("quality-policy");

test("quality policy fixtures cover canonical and negative contract cases", () => {
  assert.ok(fixtures.length >= 5);
  const ids = new Set(fixtures.map((fixture) => fixture.id));
  assert.equal(ids.size, fixtures.length);
});

for (const fixture of fixtures) {
  test(`policy fixture: ${fixture.id}`, () => {
    const result = validatePolicyFixture(fixture);
    if (fixture.expected === "valid") {
      assert.deepEqual(result.errors, []);
      return;
    }

    assert.ok(result.errors.length > 0, `${fixture.id} unexpectedly passed`);
    assert.ok(
      result.errors.some((error) => error.code === fixture.failureCode),
      `${fixture.id} did not emit ${fixture.failureCode}: ${JSON.stringify(result.errors)}`
    );
  });
}
