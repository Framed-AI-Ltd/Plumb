// All in-memory browser fixtures need the same compile-time StyleX transform as builds.
import stylex from '@stylexjs/unplugin';
import { realpathSync } from 'node:fs';
import { join } from 'node:path';
export function fixturePlugins() { return [stylex.vite({ useCSSLayers: false, propertyValidationMode: "throw" })]; }

// Isolated worktrees may share a dependency tree; permit its resolved font assets.
export function fixtureFsAllow(root) { return [root, realpathSync(join(root, "node_modules"))]; }
