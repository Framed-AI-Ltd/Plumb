// Prepare a local prerelease archive for npm's one-time package-registration step.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function prepareBootstrap(archive, output) {
  archive = resolve(archive); output = resolve(output);
  const members = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' }).trim().split('\n');
  assert(members.every(name => name.startsWith('package/') && !name.includes('\\') && !name.split('/').some(part => part === '..' || part.startsWith('.env') || part === '.aws')), 'Expected a safe package archive');
  const types = execFileSync('tar', ['-tvzf', archive], { encoding: 'utf8' }).trim().split('\n');
  assert(types.every(line => ['-', 'd'].includes(line[0])), 'Package symlinks and hard links are not supported');
  const temporary = mkdtempSync(join(tmpdir(), 'plumb-bootstrap-'));
  try {
    execFileSync('tar', ['-xzf', archive, '-C', temporary]);
    const directory = join(temporary, 'package');
    const path = join(directory, 'package.json');
    const pkg = JSON.parse(readFileSync(path, 'utf8'));
    assert.equal(pkg.name, '@framed-ai/plumb');
    assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
    const version = pkg.version;
    pkg.version += '-bootstrap.0';
    delete pkg.scripts;
    delete pkg.devEngines;
    writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
    const readme = join(directory, 'README.md');
    writeFileSync(readme, `# Bootstrap prerelease\n\nThis archive establishes npm trusted publishing before the ${version} release. Install the stable release when available.\n\n` + readFileSync(readme, 'utf8'));
    mkdirSync(output, { recursive: true });
    const filename = join(output, `${pkg.name.slice(1).replace('/', '-')}-${pkg.version}.tgz`);
    execFileSync('tar', ['-czf', filename, '-C', temporary, 'package']);
    return filename;
  } finally { rmSync(temporary, { recursive: true, force: true }); }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  assert(process.argv[2], 'Usage: node tools/prepare-bootstrap.mjs release/framed-ai-plumb-VERSION.tgz');
  console.log(prepareBootstrap(process.argv[2], 'release/bootstrap'));
}
