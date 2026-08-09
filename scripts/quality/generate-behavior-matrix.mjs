#!/usr/bin/env node
/* global console, process */

import fs from 'node:fs';
import path from 'node:path';
import { parseMode } from './modes.mjs';

const root = process.cwd();
const output = path.join(root, 'tests', 'contracts', 'public-behavior-matrix.json');
const sources = [
  ['tokens', 'packages/tokens/src/index.ts'],
  ['ui', 'packages/ui/src/index.tsx'],
  ['crm', 'packages/crm/src/index.tsx'],
  ['crm', 'packages/crm/src/standard-page-kit.ts']
];
const rows = [];
for (const [owner, relative] of sources) {
  const content = fs.readFileSync(path.join(root, ...relative.split('/')), 'utf8');
  const matches = content.matchAll(/export\s+(?:declare\s+)?(function|const|class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g);
  for (const match of matches) {
    const symbol = match[2];
    const component = /^[A-Z]/.test(symbol) && (match[1] === 'function' || match[1] === 'const' || match[1] === 'class');
    rows.push({
      id: `${owner}:${symbol}`,
      symbol,
      ownerPackage: `@taliya/${owner}`,
      source: relative,
      kind: component ? 'component' : match[1],
      requiredTestLayers: component ? ['unit', 'browser', 'story', 'a11y'] : ['unit']
    });
  }
}
const unique = [...new Map(rows.map((row) => [row.id, row])).values()].sort((a, b) => a.id.localeCompare(b.id));
const document = { schemaVersion: 'public-behavior-matrix.v1', generatedBy: 'generate-behavior-matrix.mjs', sourceFiles: sources.map(([, file]) => file), rows: unique };
if (parseMode(process.argv) === 'check') {
  const expected = `${JSON.stringify(document, null, 2)}\n`;
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== expected) {
    console.error('BEHAVIOR-MATRIX-STALE: run the explicit update command');
    process.exit(1);
  }
} else {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(document, null, 2)}\n`);
  console.log(`Wrote ${path.relative(root, output)} (${unique.length} rows)`);
}
