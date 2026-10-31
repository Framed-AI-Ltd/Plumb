import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, readFileSync, realpathSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const root = createRequire(new URL('../package.json', import.meta.url));
function installed(name, from = root) {
  const file = from.resolve.paths(name).map(path => join(path, name, 'package.json')).find(existsSync);
  assert(file, `${name} must be installed`);
  const path = realpathSync(file);
  return { path, metadata: JSON.parse(readFileSync(path, 'utf8')), require: createRequire(path) };
}
function atLeast(version, minimum) {
  const current = version.split('.').map(Number);
  return current.every(Number.isInteger) && current.reduce((result, part, i) => result || Math.sign(part - minimum[i]), 0) >= 0;
}
const eslint = installed('eslint');
const minimatch = installed('minimatch', eslint.require);

test('patched matchers retain the callable, named and class APIs used by lint tooling', async () => {
  assert(atLeast(minimatch.metadata.version, [11, 0, 1]), 'minimatch must include the amplification fix');
  const legacy = eslint.require('minimatch');
  assert.equal(typeof legacy, 'function');
  assert(legacy('src/lib/control.ts', 'src/**/*.ts'));
  assert(!legacy('tests/control.ts', 'src/**/*.ts'));
  assert(new legacy.Minimatch('src/**/*.ts').match('src/lib/control.ts'));
  const modern = await import(new URL(minimatch.metadata.exports['.'].import.default, pathToFileURL(minimatch.path)).href);
  assert.equal(typeof modern.default, 'function');
  assert(modern.default('src/lib/control.ts', 'src/**/*.ts'));
  assert(modern.minimatch('src/lib/control.ts', 'src/**/*.ts'));
});

test('ESLint legacy ESM adapters still load and translate overrides with the patched matcher', async () => {
  const legacy = installed('@eslint/eslintrc', eslint.require);
  const entry = legacy.metadata.exports['.'].import;
  const { FlatCompat } = await import(new URL(entry, pathToFileURL(legacy.path)).href);
  const translated = new FlatCompat().config({ overrides: [{ files: ['src/**/*.ts'], rules: { eqeqeq: 'error' } }] });
  assert(translated.length > 0);
});

test('Storybook docgen uses a patched glob and its existing sync API still finds sources', () => {
  const react = installed('@storybook/react-vite');
  const docgen = installed('@joshwooding/vite-plugin-react-docgen-typescript', react.require);
  const glob = installed('glob', docgen.require);
  assert(atLeast(glob.metadata.version, [14, 0, 2]), 'glob must include the cancellation fix');
  const matcher = installed('minimatch', glob.require);
  assert(atLeast(matcher.metadata.version, [11, 0, 1]));
  const directory = mkdtempSync(join(tmpdir(), 'plumb-safe-glob-'));
  try {
    mkdirSync(join(directory, 'src'));
    writeFileSync(join(directory, 'src/control.ts'), 'export {};');
    const api = docgen.require('glob');
    assert.deepEqual(api.sync('**/*.ts', { cwd: directory }), ['src/control.ts']);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
