import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dependencyProblems, workflowProblems } from './dependency-policy.mjs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const runtime = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8');

test('declared dependency choices align Storybook packages and Node typings with the configured runtime', () => {
  assert.deepEqual(dependencyProblems(pkg, runtime), []);
  const unaligned = { ...pkg, devDependencies: { ...pkg.devDependencies, '@storybook/addon-docs': '0.0.0-incompatible' } };
  assert(dependencyProblems(unaligned, runtime).some(p => p.includes('Storybook')));
  const wrongRuntime = { ...pkg, devDependencies: { ...pkg.devDependencies, '@types/node': '^26.6.5' } };
  assert(dependencyProblems(wrongRuntime, '24').some(p => p.includes('Node typings')));
  assert(dependencyProblems({ ...pkg, devDependencies: { ...pkg.devDependencies, '@types/node': '>=24.19.2' } }, '24').length);
});

test('action migrations preserve immutable pins, disabled credential persistence and safe PR checkout defaults', () => {
  const directory = new URL('../.github/workflows/', import.meta.url);
  for (const file of readdirSync(directory).filter(p => /\.ya?ml$/.test(p))) {
    assert.deepEqual(workflowProblems(readFileSync(new URL(file, directory), 'utf8')), [], file);
  }
  const safe = `steps:
  - uses: actions/checkout@${'a'.repeat(40)}
    with:
      persist-credentials: false
  - run: node tools/check.mjs
`;
  assert.deepEqual(workflowProblems(safe), []);
  assert(workflowProblems(safe.replace('a'.repeat(40), 'v7')).some(p => p.includes('immutable')));
  assert(workflowProblems(safe.replace('persist-credentials: false', 'persist-credentials: true')).some(p => p.includes('credentials')));
  assert(workflowProblems(safe.replace('persist-credentials: false', 'allow-unsafe-pr-checkout: true')).some(p => p.includes('safety')));
});

test('Pages action can be validated without deploying, and deployment stays on main', () => {
  const source = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(source, /validate_only:\n\s+description:[^\n]+\n\s+type: boolean\n\s+default: false/);
  const deploy = source.split('\n  deploy:')[1];
  assert.match(deploy, /if: github.ref == 'refs\/heads\/main' && \(github.event_name != 'workflow_dispatch' \|\| !inputs.validate_only\)/);
});
