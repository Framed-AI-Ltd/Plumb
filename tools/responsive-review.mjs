// Capture every page template at phone/tablet/desktop widths and flag actual clipping.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const urlIndex = process.argv.indexOf("--url");
const base = urlIndex < 0 ? "http://127.0.0.1:6007" : process.argv[urlIndex + 1];
const index = await (await fetch(`${base}/index.json`)).json();
const stories = Object.values(index.entries).filter((entry) => entry.type === "story" && entry.title === "Layouts/Page templates");
assert.ok(stories.length > 0, "Storybook must expose page templates");
const output = "review-responsive";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const report = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  let errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const theme of ["light", "dark"]) for (const width of [320, 390, 768, 1280]) for (const story of stories) {
    errors = [];
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`, { waitUntil: "domcontentloaded" });
    await page.locator("#storybook-root > *").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const issues = await page.evaluate(() => {
      const problems = [];
      if (document.documentElement.scrollWidth > innerWidth + 1) problems.push("document overflow");
      if (document.body.classList.contains("sb-show-errordisplay")) problems.push("story render error");
      for (const head of document.querySelectorAll(".plumb-shell-topbar")) {
        const box = head.getBoundingClientRect();
        for (const control of head.querySelectorAll("button, .plumb-avatar")) {
          const item = control.getBoundingClientRect();
          if (item.width && item.height && (item.top < box.top - 1 || item.bottom > box.bottom + 1)) problems.push("topbar control outside header");
        }
      }
      for (const card of document.querySelectorAll(".plumb-selection, .plumb-file")) {
        const box = card.getBoundingClientRect();
        for (const badge of card.querySelectorAll(".plumb-badge, .plumb-unknown")) {
          const item = badge.getBoundingClientRect();
          if (item.width && (item.left < box.left - 1 || item.right > box.right + 1)) problems.push("file or selection status outside card");
        }
      }
      return problems;
    });
    const file = `${theme}-${width}-${story.id}.png`;
    const a11yChecked = width === 320 && /--(field-capture|customer-portal|request-and-bids)$/.test(story.id);
    if (a11yChecked) {
      const axe = await new AxeBuilder({ page }).include("#storybook-root").analyze();
      issues.push(...axe.violations.map((violation) => `accessibility: ${violation.id}`));
    }
    await page.screenshot({ path: `${output}/${file}`, fullPage: true });
    report.push({ story: story.id, title: story.name, theme, width, file, a11yChecked, issues: [...new Set([...issues, ...errors])] });
    process.stdout.write(".");
  }
} finally {
  await browser.close();
}
const failing = report.filter((entry) => entry.issues.length);
await writeFile(`${output}/report.json`, JSON.stringify({ captures: report.length, failing: failing.length, report }, null, 2));
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
await writeFile(`${output}/index.html`, `<!doctype html><meta charset="utf-8"><title>Responsive templates</title><style>body{font:14px system-ui;margin:24px}figure{display:inline-block;vertical-align:top;width:300px;margin:8px}img{width:100%;border:1px solid #ddd}</style><h1>Responsive templates</h1><p>${report.length} captures; ${failing.length} with detected problems. Inspect screenshots for visual judgment.</p>${report.map((entry) => `<figure><figcaption>${escape(entry.title)} · ${entry.theme} · ${entry.width}px${entry.issues.length ? ` · ${escape(entry.issues.join(", "))}` : ""}</figcaption><a href="${entry.file}"><img loading="lazy" src="${entry.file}"></a></figure>`).join("")}`);
console.log(`\n${report.length} responsive captures; ${failing.length} with detected problems.`);
for (const item of failing) console.log(`${item.theme} ${item.width} ${item.story}: ${item.issues.join(", ")}`);
if (failing.length) process.exitCode = 1;
