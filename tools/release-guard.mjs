// Runs before `pnpm publish`. Refuses publication when release prerequisites are missing:
// no license declared/file present, placeholder GitHub owner, or an unreleased changelog.
import { readFile } from "node:fs/promises";

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const changelog = await readFile("CHANGELOG.md", "utf8");
const license = await readFile("LICENSE", "utf8").catch(() => "");
const problems = [];
if (!pkg.license || pkg.license === "UNLICENSED") problems.push("package.json must declare the chosen license (docs/LICENSING.md).");
if (!license.trim()) problems.push("LICENSE is missing or unreadable; include the full chosen license text.");
else if (pkg.license === "PolyForm-Noncommercial-1.0.0" && !/^# PolyForm Noncommercial License 1\.0\.0\r?\n/.test(license)) problems.push("LICENSE title does not match the PolyForm Noncommercial 1.0.0 package metadata.");
if (JSON.stringify(pkg).includes("OWNER")) problems.push("package.json still has the OWNER placeholder in repository/homepage/bugs URLs.");
if (!new RegExp(`^## \\[${pkg.version.replace(/\./g, "\\.")}\\] - \\d{4}-\\d{2}-\\d{2}`, "m").test(changelog)) problems.push(`CHANGELOG.md has no dated "## [${pkg.version}] - YYYY-MM-DD" section; move Unreleased under it.`);
if (problems.length) { console.error(`Not publishing:\n- ${problems.join("\n- ")}`); process.exit(1); }
console.log(`release guard: ${pkg.name}@${pkg.version} ready to publish`);
