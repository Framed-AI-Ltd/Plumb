// Review capture: screenshots every story in both themes, runs axe on each, and
// writes review/index.html plus review/report.json.
//
// Usage: pnpm review [--url http://127.0.0.1:6007] [--neutral cream|grey]
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const base = arg("url", "http://127.0.0.1:6007");
const brands = ["denim"];
const neutral = arg("neutral", "cream");
const themes = ["light", "dark"];
// Every story in Storybook's index, so new stories are always checked.
const index = await (await fetch(`${base}/index.json`)).json();
const stories = Object.values(index.entries).filter((e) => e.type === "story").map((e) => [e.id, `${e.title} · ${e.name}`]);

const out = "review";
// Only clear this script's own outputs; other files in review/ are left alone.
await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (/^[a-z]+-(light|dark)-.*\.png$/.test(f) || f === "report.json" || f === "index.html") await rm(`${out}/${f}`);
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const report = [];
for (const brand of brands)
  for (const theme of themes)
    for (const [id, title] of stories) {
      const globals = `theme:${theme};brand:${brand};neutral:${neutral}`;
      await page.goto(`${base}/iframe.html?id=${id}&viewMode=story&globals=${globals}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);
      const file = `${brand}-${theme}-${id}.png`;
      await page.screenshot({ path: `${out}/${file}`, fullPage: true });
      // A story that throws renders Storybook's error page, which axe would happily pass.
      const renderError = await page.evaluate(() => {
        const err = document.querySelector("#error-message");
        return document.body.classList.contains("sb-show-errordisplay") || document.body.classList.contains("sb-show-nopreview") ? err?.textContent?.trim() || "render error" : null;
      });
      const axe = await new AxeBuilder({ page }).include("#storybook-root").analyze();
      if (renderError) axe.violations.unshift({ id: "story-render-error", impact: "critical", nodes: [{}], help: renderError });
      report.push({
        brand, theme, story: id, title, file,
        violations: axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help })),
      });
      process.stdout.write(".");
    }

// Phone pass (390px, light): screenshots, and fails any story that scrolls sideways (WCAG 1.4.10 reflow).
// Wide data views (tables, grids, boards) scroll inside their own containers, never the page.
const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mpage = await phone.newPage();
for (const [id, title] of stories) {
  await mpage.goto(`${base}/iframe.html?id=${id}&viewMode=story&globals=theme:light;neutral:${neutral}`, { waitUntil: "networkidle" });
  await mpage.evaluate(() => document.fonts.ready);
  await mpage.waitForTimeout(200);
  const file = `phone-light-${id}.png`;
  await mpage.screenshot({ path: `${out}/${file}`, fullPage: true });
  const overflow = await mpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report.push({ brand: "phone", theme: "light", story: id, title, file,
    violations: overflow > 1 ? [{ id: "page-scrolls-sideways", impact: "serious", nodes: 1, help: `Page is ${overflow}px wider than a 390px screen` }] : [] });
  process.stdout.write(",");
}
await browser.close();

const failing = report.filter((r) => r.violations.length);
await writeFile(`${out}/report.json`, JSON.stringify({ brands, neutral, failing: failing.length, report }, null, 2));
const cell = (r) =>
  `<figure><figcaption>${r.brand} · ${r.theme}${r.violations.length ? ` · <b class="bad">${r.violations.length} axe issue(s)</b>` : " · axe ✓"}</figcaption><a href="${r.file}"><img loading="lazy" src="${r.file}"></a></figure>`;
let html = `<!doctype html><meta charset="utf-8"><title>Plumb review</title><style>
body{font:14px system-ui;margin:24px;background:#e8e8e8;color:#111}h1{margin:0 0 4px}h2{margin:32px 0 8px}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}figure{margin:0}img{width:100%;border:1px solid #aaa;background:#fff}
figcaption{font-size:12px;margin-bottom:4px}.bad{color:#b00020}</style>
<h1>Plumb review</h1><p>Neutrals ${neutral} · ${report.length} captures · ${failing.length} with accessibility issues. Click a screenshot to open it full size. Record visual changes in CHANGELOG.md.</p>`;
// One row per story: desktop light, desktop dark, phone.
for (const [id, title] of stories)
  html += `<h2>${title}</h2><div class="g">${report.filter((r) => r.story === id).map(cell).join("")}</div>`;
await writeFile(`${out}/index.html`, html);
console.log(`\n${report.length} captures written to ${out}/index.html; ${failing.length} with problems (axe, render errors, or sideways scrolling on phones).`);
if (failing.length) {
  for (const f of failing) console.log(`${f.brand} ${f.theme} ${f.story}: ${f.violations.map((v) => `${v.id}(${v.nodes})`).join(", ")}`);
  process.exitCode = 1;
}
