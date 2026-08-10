#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const storyDir = path.join(root, "apps", "docs", "src", "stories");
const files = fs.readdirSync(storyDir).filter((file) => file.endsWith(".stories.tsx"));
const interactivePattern = /\bon[A-Z][A-Za-z]+\s*=|<\s*(Button|Input|Select|Checkbox|Switch|Toggle|Modal|Drawer|Popover|DropdownMenu|ActionMenu|Dialog|FilterChip)\b/;
const rows = files.map((file) => {
  const source = fs.readFileSync(path.join(storyDir, file), "utf8");
  const interactive = interactivePattern.test(source);
  const hasPlay = /\bplay\s*:/.test(source);
  return { file, interactive, hasPlay, status: interactive && !hasPlay ? "fail" : "pass" };
});
const missing = rows.filter((row) => row.status === "fail");
const result = { schemaVersion: "story-interactions.v1", storyCount: rows.length, interactiveCount: rows.filter((row) => row.interactive).length, missing, status: missing.length ? "fail" : "pass" };
console.log(JSON.stringify(result, null, 2));
if (missing.length) process.exitCode = 1;
