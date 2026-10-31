import assert from "node:assert/strict";
import { ESLint } from "eslint";
import stylex from "./stylex-compat.mjs";
const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: [{
  plugins: { stylex }, rules: { "stylex/valid-styles": "error" },
}] });
const lint = async (selector) => (await eslint.lintText(`import * as stylex from '@stylexjs/stylex';
stylex.create({ root: { width: { default: 10, '${selector}': { default: 12, '@media (max-width: 640px)': 14 } } } });`))[0];
assert.equal((await lint(':is([data-size="sm"])')).errorCount, 0);
assert.equal((await lint(':is([data-label])::before')).errorCount, 0);
assert.equal((await lint('::before')).errorCount, 0);
assert.ok((await lint(":not-a-real-pseudo")).errorCount > 0);
assert.ok((await eslint.lintText("import * as stylex from '@stylexjs/stylex'; stylex.create({ root: { border: '1px solid red' } });"))[0].errorCount > 0);
assert.equal((await eslint.lintText("import * as stylex from '@stylexjs/stylex'; stylex.create({ root: { scrollSnapType: 'x proximity' } });"))[0].errorCount, 0);
assert.ok((await eslint.lintText("import * as stylex from '@stylexjs/stylex'; stylex.create({ root: { scrollSnapType: 'x laziness' } });"))[0].errorCount > 0);
console.log("StyleX compatibility: valid conditional selectors accepted; invalid selectors and shorthands rejected.");
