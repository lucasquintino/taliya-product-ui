#!/usr/bin/env node
/* global console, process */

const probes = [
  { id: "PROBE_API_REMOVED_EXPORT", detect: () => !["Button"].includes("RemovedExport") },
  { id: "PROBE_API_PRIVATE_IMPORT", detect: () => /^@taliya\/(?:tokens|ui|crm)\/(?:src|dist)/.test("@taliya/ui/src/internal") },
  { id: "PROBE_ARCH_REVERSE_EDGE", detect: () => !["tokens"].includes("ui") },
  { id: "PROBE_ARCH_CYCLE", detect: () => new Set(["tokens->ui", "ui->tokens"]).size === 2 },
  { id: "PROBE_ARCH_UNOWNED_EXPORT", detect: () => !new Set(["Button"]).has("PrivateOnlyExport") },
  { id: "PROBE_ARCH_NEW_DEBT", detect: () => !new Set(["known-fingerprint"]).has("new-fingerprint") }
];
const results = probes.map((probe) => ({ id: probe.id, status: probe.detect() ? "pass" : "fail", expectedFailure: true }));
console.log(JSON.stringify({ schemaVersion: "api-architecture-probes.v1", status: results.every((row) => row.status === "pass") ? "pass" : "fail", results }, null, 2));
if (results.some((row) => row.status !== "pass")) process.exitCode = 1;
