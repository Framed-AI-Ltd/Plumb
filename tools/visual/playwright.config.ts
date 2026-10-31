import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const port = Number(process.env.VISUAL_PORT || 6007);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid VISUAL_PORT');
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: '.', testMatch: 'stories.spec.ts', workers: 2, retries: 0,
  snapshotPathTemplate: '{testDir}/snapshots/{projectName}/{arg}{ext}',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL, reducedMotion: 'reduce', locale: 'en-CA', timezoneId: 'UTC' },
  webServer: { cwd: fileURLToPath(new URL('../../', import.meta.url)), command: `python3 tools/visual/serve.py ${port}`, url: `${baseURL}/index.json`, reuseExistingServer: false },
  projects: [360, 768, 1440].flatMap(width => ['light', 'dark'].map(theme => ({ name: `${width}-${theme}`, use: { viewport: { width, height: 900 }, colorScheme: theme as 'light' | 'dark' } }))),
});
