import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

export function checkStaged(root = process.cwd(), run = spawnSync) {
  const snapshot = mkdtempSync(join(tmpdir(), 'plumb-staged-'));
  try {
    // Copy the index without stashing, changing the working tree or staging files.
    const checkout = spawnSync('git', ['checkout-index', '--all', `--prefix=${snapshot}${sep}`], { cwd: root, stdio: 'inherit' });
    if (checkout.error || checkout.status !== 0) return 1;
    symlinkSync(resolve(root, 'node_modules'), join(snapshot, 'node_modules'), 'junction');
    console.log('Checking the staged project (static checks; no files will be rewritten)...');
    const result = run(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', ['check:static'], {
      cwd: snapshot, stdio: 'inherit', env: { ...process.env, HUSKY: '0' },
    });
    if (result.error) console.error(result.error.message);
    return result.status ?? 1;
  } finally {
    rmSync(snapshot, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { process.exitCode = checkStaged(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
