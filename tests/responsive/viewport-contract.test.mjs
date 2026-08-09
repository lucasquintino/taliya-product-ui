import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import fs from 'node:fs';

test('supported responsive styles retain shrink-safe tracks', () => {
  const css = fs.readFileSync('packages/crm/src/styles.css', 'utf8');
  assert.match(css, /min-width:\s*0/);
  assert.match(css, /overflow-x:\s*auto/);
});
