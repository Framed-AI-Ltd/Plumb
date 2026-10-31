import assert from "node:assert/strict";
import { findCycles } from "./verify-imports.mjs";
assert.deepEqual(findCycles(new Map([["app", ["feature"]], ["feature", ["lib"]], ["lib", []]])), []);
assert.deepEqual(findCycles(new Map([["app", ["feature"]], ["feature", ["app"]]])), [["app", "feature", "app"]]);
assert.deepEqual(findCycles(new Map([["lib", ["lib"]]])), [["lib", "lib"]]);
assert.deepEqual(findCycles(new Map([["a", ["shared"]], ["b", ["shared"]], ["shared", []]])), []);
console.log("Import graph regressions passed.");
