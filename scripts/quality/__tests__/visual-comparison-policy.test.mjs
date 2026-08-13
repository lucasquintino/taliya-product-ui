import { strict as assert } from "node:assert";
import path from "node:path";
import { test } from "node:test";
import { capturedStoryPath } from "../visual-comparison-policy.mjs";

test("visual comparison resolves current evidence from the capture report story filename", () => {
  const captureDir = path.resolve("artifacts/visual/captures");
  const resolved = capturedStoryPath(captureDir, {
    id: "crm-task-table--default",
    image: "crm-task-table--default.png"
  });
  assert.equal(resolved, path.join(captureDir, "crm-task-table--default.png"));
  assert.equal(capturedStoryPath(captureDir, { id: "missing" }), null);
});
