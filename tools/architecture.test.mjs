import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

// An explicit root lets isolated worktrees exercise the integration config while
// keeping its plugin instances, element selectors, policies and custom rules.
const projectRoot = process.env.PLUMB_PROJECT_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(projectRoot, 'package.json'));
const { ESLint } = require('eslint');
const { default: projectConfig } = await import(pathToFileURL(join(projectRoot, 'eslint.config.js')).href);

async function diagnostics(importer, specifier) {
  const directory = mkdtempSync(join(tmpdir(), 'plumb-architecture-'));
  const source = `import { value } from '${specifier}';\nexport const result = value;\n`;
  const files = {
    'src/lib/base.ts': 'export const value = 1;\n',
    'src/app/root.ts': 'export const value = 1;\n',
    'src/index.ts': 'export const value = 1;\n',
    'src/features/one/index.ts': "export { value } from './internal';\n",
    'src/features/one/internal.ts': 'export const value = 1;\n',
    'src/features/two/index.ts': "export { value } from './internal';\n",
    'src/features/two/internal.ts': 'export const value = 1;\n',
    [importer]: source,
  };
  try {
    for (const [file, content] of Object.entries(files)) {
      mkdirSync(dirname(join(directory, file)), { recursive: true });
      writeFileSync(join(directory, file), content);
    }
    writeFileSync(join(directory, 'tsconfig.json'), JSON.stringify({ compilerOptions: { moduleResolution: 'bundler', module: 'esnext', target: 'es2022' }, include: ['src'] }));
    const eslint = new ESLint({
      cwd: directory,
      overrideConfigFile: true,
      overrideConfig: [...projectConfig, {
        settings: {
          'boundaries/root-path': directory,
          'import/resolver': { typescript: { project: join(directory, 'tsconfig.json') } },
        },
      }],
    });
    const [result] = await eslint.lintFiles([join(directory, importer)]);
    assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
    assert.ok(!result.messages.some((message) => /resolv|unknown element|ignored/i.test(message.message)), JSON.stringify(result.messages));
    return result.messages;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

for (const [name, importer, specifier] of [
  ['lib cannot import feature', 'src/lib/check.ts', '../features/one'],
  ['lib cannot import app', 'src/lib/check.ts', '../app/root'],
  ['lib cannot import public entry', 'src/lib/check.ts', '../index'],
  ['feature cannot import app', 'src/features/one/check.ts', '../../app/root'],
]) {
  test(name, async () => {
    const messages = await diagnostics(importer, specifier);
    assert.ok(messages.some((message) => message.ruleId === 'boundaries/dependencies' && message.severity === 2), JSON.stringify(messages));
  });
}

test('cross-feature internal imports fail the effective facade rule', async () => {
  const messages = await diagnostics('src/features/one/check.ts', '../two/internal');
  assert.ok(messages.some((message) => message.ruleId === 'plumb/feature-facades' && message.severity === 2), JSON.stringify(messages));
});

for (const [name, importer, specifier] of [
  ['app can import a feature facade', 'src/app/check.ts', '../features/one'],
  ['feature can import lib', 'src/features/one/check.ts', '../../lib/base'],
  ['feature can import another feature facade', 'src/features/one/check.ts', '../two'],
  ['feature can import its own internals', 'src/features/one/check.ts', './internal'],
]) {
  test(name, async () => assert.deepEqual(await diagnostics(importer, specifier), []));
}
