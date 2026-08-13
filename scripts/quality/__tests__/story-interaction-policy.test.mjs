import { strict as assert } from "node:assert";
import { test } from "node:test";
import { isRetryableStoryFailure, waitForStorybookRender } from "../story-interaction-policy.mjs";

test("Storybook retries one transient timeout but never retries real render failures", () => {
  assert.equal(isRetryableStoryFailure("page.waitForFunction: Timeout 60000ms exceeded.", 1), true);
  assert.equal(isRetryableStoryFailure("page.waitForFunction: Timeout 60000ms exceeded.", 2), false);
  assert.equal(isRetryableStoryFailure("pageerror: Cannot read properties of undefined", 1), false);
  assert.equal(isRetryableStoryFailure("console error", 1), false);
});

test("Storybook render timeout is passed through Playwright's third options argument", async () => {
  let received;
  const page = {
    waitForFunction: async (...args) => { received = args; }
  };
  await waitForStorybookRender(page, 60000);
  assert.equal(received.length, 3);
  assert.equal(received[1], undefined);
  assert.deepEqual(received[2], { timeout: 60000 });
});
