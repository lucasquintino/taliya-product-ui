#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("tests/visual/capture-manifest.json", "utf8"));
const invalid = manifest.components.filter((row) => row.certified && (!row.storyFile || !row.sourceImage || !row.sourceImageExists));
const result = { schemaVersion: "capture-manifest-validation.v1", certifiedCount: manifest.components.filter((row) => row.certified).length, deferredCount: manifest.components.filter((row) => !row.certified).length, invalid, status: invalid.length ? "fail" : "pass" };
console.log(JSON.stringify(result, null, 2));
if (invalid.length) process.exitCode = 1;
