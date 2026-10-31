import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
// Absolute paths avoid Semgrep's relative fixture discovery bug.
const scan = process.argv.includes('--scan');
const commands = scan
  ? [['scan', '--error', '--config', resolve('.semgrep/rules.yml'), resolve('src'), resolve('.github/workflows')]]
  : ['rules.tsx', 'rules.yaml'].map(file => ['--test', resolve(`.semgrep/tests/${file}`), '--config', resolve('.semgrep/rules.yml')]);
for (const args of commands) {
  const result = spawnSync('semgrep', args, {
    stdio: 'inherit',
    env: { ...process.env, SEMGREP_SEND_METRICS: 'off', SEMGREP_ENABLE_VERSION_CHECK: '0' }
  });
  if (result.error) {
    console.error('Semgrep is required for project-rule checks. Install it in the development environment.');
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
