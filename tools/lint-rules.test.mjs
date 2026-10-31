import assert from "node:assert/strict";
import { ESLint } from "eslint";
import project from "./eslint-rules.mjs";

const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: [{
  files: ["**/*.js"], plugins: { plumb: project },
  rules: { "plumb/file-length": "warn", "plumb/feature-facades": "error" },
}] });
const lint = async (text, filePath = "src/features/scope/editor.js") =>
  (await eslint.lintText(text, { filePath }))[0];
for (const [lines, id] of [[90, null], [110, "soft"], [210, "strong"]]) {
  const result = await lint("// meaningful content\n".repeat(lines - 1));
  assert.equal(result.errorCount, 0, "line length must never block");
  assert.equal(result.warningCount, id ? 1 : 0);
  if (id) assert.equal(result.messages[0].messageId, id);
}
assert.equal((await lint('import "../proposal/ProposalDocument.js";')).errorCount, 1);
assert.equal((await lint('export * from "../proposal/private.js";')).errorCount, 1);
assert.equal((await lint('import("../proposal/private.js");')).errorCount, 1);
assert.equal((await lint('import("../proposal/index.js");')).errorCount, 0);
assert.equal((await lint('import "../proposal/index.js";')).errorCount, 0);
assert.equal((await lint('import "../proposal";')).errorCount, 0);
assert.equal((await lint('import "./internal.js";')).errorCount, 0);
console.log("Lint regressions: advisory thresholds and feature facades passed.");
