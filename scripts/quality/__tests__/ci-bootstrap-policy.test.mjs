import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { validatePackageManagerConfig, validateRepository, validateWorkflowBootstrap } from '../validate-ci-bootstrap.mjs';

const setupPnpm = `      - uses: pnpm/action-setup@0123456789012345678901234567890123456789
        with:
          version: 9.15.4`;
const setupNode = `      - uses: actions/setup-node@0123456789012345678901234567890123456789
        with:
          node-version: 22.12.0
          cache: pnpm`;

test('repository CI bootstrap policy passes', () => {
  assert.deepEqual(validateRepository(process.cwd()), []);
});

test('pnpm must be installed before setup-node enables its cache', () => {
  const source = `jobs:\n  test:\n    steps:\n${setupNode}\n${setupPnpm}`;
  assert.match(validateWorkflowBootstrap(source, '9.15.4')[0], /^CI-PNPM-ORDER:/);
});

test('workflow pnpm setup must match the packageManager pin', () => {
  const source = `jobs:\n  test:\n    steps:\n${setupPnpm.replace('9.15.4', '10.0.0')}\n${setupNode}`;
  assert.match(validateWorkflowBootstrap(source, '9.15.4')[0], /^CI-PNPM-VERSION:/);
});

test('workflow commands use the pnpm binary installed by the setup action', () => {
  const source = `jobs:\n  test:\n    steps:\n${setupPnpm}\n${setupNode}\n      - run: corepack pnpm install --frozen-lockfile`;
  assert.match(validateWorkflowBootstrap(source, '9.15.4')[0], /^CI-PNPM-DISPATCH:/);
});

test('Storybook browser interactions require Chromium installation first', () => {
  const source = `jobs:\n  test:\n    steps:\n${setupPnpm}\n${setupNode}\n      - run: node scripts/quality/run-story-interactions.mjs`;
  assert.match(validateWorkflowBootstrap(source, '9.15.4')[0], /^CI-PLAYWRIGHT-INSTALL:/);
});

test('pnpm 9 rejects v11 workspace configuration placement', () => {
  const packageJson = { packageManager: 'pnpm@9.15.4', pnpm: { overrides: { vite: '7.3.5' } } };
  const errors = validatePackageManagerConfig(packageJson, 'packages:\n  - packages/*\noverrides:\n  vite: 7.3.5\n', 'overrides:\n  vite: 7.3.5\n');
  assert.match(errors[0], /^CI-PNPM-CONFIG:/);
});

test('package scripts do not re-enter Corepack after the caller selected pnpm', () => {
  const packageJson = {
    packageManager: 'pnpm@9.15.4',
    pnpm: { overrides: { vite: '7.3.5' } },
    scripts: { typecheck: 'corepack pnpm -r typecheck' }
  };
  const errors = validatePackageManagerConfig(packageJson, 'packages:\n  - packages/*\n', 'overrides:\n  vite: 7.3.5\n');
  assert.match(errors[0], /^CI-PNPM-SCRIPT-DISPATCH:/);
});

test('override comparison is semantic rather than key-order dependent', () => {
  const packageJson = { packageManager: 'pnpm@9.15.4', pnpm: { overrides: { vite: '7.3.5', esbuild: '0.28.1' } } };
  const errors = validatePackageManagerConfig(packageJson, 'packages:\n  - packages/*\n', 'overrides:\n  esbuild: 0.28.1\n  vite: 7.3.5\n');
  assert.deepEqual(errors, []);
});
