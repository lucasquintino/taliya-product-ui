import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isRetryableStoryFailure } from "../story-interaction-policy.mjs";

test("Storybook retries one transient timeout but never retries real render failures", () => {
  assert.equal(isRetryableStoryFailure("page.waitForFunction: Timeout 30000ms exceeded.", 1), true);
  assert.equal(isRetryableStoryFailure("page.waitForFunction: Timeout 30000ms exceeded.", 2), false);
  assert.equal(isRetryableStoryFailure("pageerror: Cannot read properties of undefined", 1), false);
  assert.equal(isRetryableStoryFailure("console error", 1), false);
});
