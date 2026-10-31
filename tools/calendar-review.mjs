import { mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { fixturePlugins, fixtureFsAllow } from "./fixture-vite.mjs";
import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const cacheDir = await mkdtemp(join(tmpdir(), "plumb-calendar-"));
const server = await createServer({ root, envDir: false, configFile: false, plugins: fixturePlugins(), cacheDir, server: { fs: { allow: fixtureFsAllow(root) }, host: "127.0.0.1", port: 0, hmr: false } });
const before = process.argv.includes("--before");
const output = join(root, "review-calendars", before ? "before" : "after");
let browser;
try {
  await mkdir(output, { recursive: true });
  await server.listen();
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.setDefaultTimeout(10000);
  page.setDefaultNavigationTimeout(60000); // First-load StyleX compilation is slower than interaction assertions.
  const base = server.resolvedUrls.local[0];
  for (const theme of ["light", "dark"]) for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL(`tests/browser/calendar.html?theme=${theme}`, base).href);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);

    await page.locator(".plumb-clear").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(250);
    await page.screenshot({ path: join(output, `${theme}-${width}.png`), fullPage: true });
    if (!before) {
      const violations = (await new AxeBuilder({ page }).analyze()).violations;
      assert.deepEqual(violations.map((v) => v.id), [], `${theme} ${width} accessibility`);
      const bounds = await dialog.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1, "calendar must fit viewport");
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(page.locator(".plumb-clear").first()).toBeFocused();
    }
  }
  if (!before) {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(new URL("tests/browser/calendar.html", base).href);
  await page.locator(".plumb-clear").first().click();
  const calendar = page.getByRole("dialog");
  const ninth = calendar.locator(".plumb-calendar-cell").filter({ hasText: /^9$/ });
  await ninth.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.screenshot({ path: join(output, "keyboard-focus-390.png"), fullPage: true });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("range")).toHaveText("2026-11-09 / 2026-11-12");
  await expect(calendar).toHaveCount(0);
  for (const [name, query] of [["french", "locale=fr-CA"], ["rtl", "locale=ar-AE&dir=rtl"]]) {
    await page.goto(new URL(`tests/browser/calendar.html?${query}`, base).href);
    await page.locator(".plumb-clear").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(250);
    await page.screenshot({ path: join(output, `${name}-390.png`), fullPage: true });
    const box = await page.getByRole("dialog").boundingBox();
    assert.ok(box.x >= 0 && box.x + box.width <= 391, `${name} must fit`);
  }
  await page.emulateMedia({ forcedColors: "active" });
  await page.screenshot({ path: join(output, "forced-colors-390.png"), fullPage: true });
  console.log("Calendar keyboard range selection, focus return, locales, forced colours and six accessibility/fit checks passed.");
  }
  assert.deepEqual(errors, [], "Calendar fixture must not throw browser errors");
  console.log(`Calendar captures written to ${output}`);
} finally {
  await browser?.close();
  await server.close();
  await rm(cacheDir, { recursive: true, force: true });
}
