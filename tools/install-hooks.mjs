import { existsSync } from 'node:fs';

// Registry consumers, production installs and CI do not need local Git hooks.
if (process.env.CI !== 'true' && process.env.NODE_ENV !== 'production' && process.env.HUSKY !== '0' && existsSync('.git')) {
  const husky = (await import('husky')).default;
  const error = husky();
  if (error) throw new Error(error);
}
