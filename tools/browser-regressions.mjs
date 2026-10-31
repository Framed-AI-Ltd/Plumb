// Focused interaction regressions; independent of Storybook snapshots and real microphone permission.
// Run: node tools/browser-regressions.mjs
import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { fixturePlugins, fixtureFsAllow } from "./fixture-vite.mjs";
import { chromium, expect } from "@playwright/test";

const root = fileURLToPath(new URL("../", import.meta.url));
const cacheDir = await mkdtemp(join(tmpdir(), "plumb-browser-regressions-"));
const server = await createServer({ root, envDir: false, configFile: false, plugins: fixturePlugins(), cacheDir, server: { fs: { allow: fixtureFsAllow(root) }, host: "127.0.0.1", port: 0, hmr: false } });
let browser;
let passed = 0;
try {
  await server.listen();
  const base = server.resolvedUrls.local[0];
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(8000);
  page.setDefaultNavigationTimeout(60000); // First-load StyleX compilation is slower than interaction assertions.
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const media = { requests: [], streams: [], recorders: [], fail: "" };
    window.mockMedia = media;
    Object.defineProperty(navigator, "mediaDevices", { configurable: true, value: {
      getUserMedia: () => new Promise((resolve) => media.requests.push(() => {
        const track = { stopped: false, stop() { this.stopped = true; } };
        const stream = { getTracks: () => [track] };
        media.streams.push(track);
        resolve(stream);
      })),
    } });
    window.MediaRecorder = class {
      state = "inactive";
      mimeType = "audio/webm";
      constructor(stream) {
        if (media.fail === "constructor") throw new Error("Recorder unavailable");
        this.stream = stream;
        media.recorders.push(this);
      }
      start() { if (media.fail === "start") throw new Error("Cannot start"); this.state = "recording"; }
      stop() { this.state = "inactive"; queueMicrotask(() => this.onstop?.()); }
    };
  });
  const fresh = async () => { errors.length = 0; await page.goto(new URL("tests/browser/index.html", base).href); await expect(page.getByRole("button", { name: "Record voice note", exact: true })).toBeVisible(); };
  const request = async () => { await page.getByRole("button", { name: "Record voice note", exact: true }).click(); await page.getByRole("button", { name: "Everyone agreed, start recording", exact: true }).click(); };
  const grant = () => page.evaluate(() => window.mockMedia.requests.shift()());
  const check = async (name, run) => { await fresh(); await run(); assert.deepEqual(errors, [], `Unexpected browser errors in ${name}`); passed++; console.log(`PASS ${name}`); };

  await check("VoiceNote cancel invalidates pending permission", async () => {
    await request();
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await grant();
    await expect.poll(() => page.evaluate(() => window.mockMedia.streams.every((s) => s.stopped))).toBe(true);
    assert.equal(await page.evaluate(() => window.mockMedia.recorders.length), 0);
    await expect(page.getByRole("button", { name: "Record voice note", exact: true })).toBeVisible();
  });
  await check("VoiceNote confirmation cannot start duplicate requests", async () => {
    await request();
    // Dispatch bypasses Playwright's disabled-control waiting; React Aria must ignore the repeat press.
    await page.getByRole("button", { name: "Everyone agreed, start recording", exact: true }).evaluate((button) => button.click());
    assert.equal(await page.evaluate(() => window.mockMedia.requests.length), 1);
    await grant();
    await page.getByRole("button", { name: "Stop", exact: true }).click();
    await expect(page.getByTestId("recordings")).toHaveText("1");
    assert.equal(await page.evaluate(() => window.mockMedia.streams.every((s) => s.stopped)), true);
  });
  for (const pending of [true, false]) await check(`VoiceNote unmount releases ${pending ? "pending" : "active"} microphone without recording callback`, async () => {
    await request();
    if (!pending) { await grant(); await expect(page.getByRole("button", { name: "Stop", exact: true })).toBeVisible(); }
    await page.evaluate(() => window.fixture.hideVoice());
    if (pending) await grant();
    await expect.poll(() => page.evaluate(() => window.mockMedia.streams.length === 1 && window.mockMedia.streams.every((s) => s.stopped))).toBe(true);
    await expect(page.getByTestId("recordings")).toHaveText("0");
  });
  for (const failure of ["constructor", "start"]) await check(`VoiceNote releases stream on ${failure} failure`, async () => {
    await page.evaluate((value) => { window.mockMedia.fail = value; }, failure);
    await request(); await grant();
    await expect(page.getByText("Can't use the microphone", { exact: true })).toBeVisible();
    assert.equal(await page.evaluate(() => window.mockMedia.streams.every((s) => s.stopped)), true);
  });

  const capture = async (name, locator) => {
    const folder = join(root, "review-interactions");
    await mkdir(folder, { recursive: true });
    for (const width of [1280, 390]) for (const theme of ["light", "dark"]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate((value) => document.documentElement.setAttribute("data-plumb-theme", value), theme);
      await locator.screenshot({ path: join(folder, `${name}-${theme}-${width}.png`), animations: "disabled" });
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => document.documentElement.setAttribute("data-plumb-theme", "light"));
  };
  const readRows = () => page.getByTestId("rows").textContent().then(JSON.parse);
  const edit = async (col) => { const cell = page.locator(`[data-cell="0-${col}"]`); await cell.focus(); await cell.press("Enter"); };
  await check("LineItemGrid commits reordered editor to its original row", async () => {
    await edit(0);
    await page.getByRole("textbox", { name: /Alpha/ }).fill("Alpha edited");
    await page.evaluate(() => window.fixture.reorder());
    await page.getByRole("textbox", { name: /Alpha/ }).press("Enter");
    await expect.poll(async () => (await readRows()).find((r) => r.id === "a").label).toBe("Alpha edited");
    assert.equal((await readRows()).find((r) => r.id === "b").label, "Beta");
  });
  await check("LineItemGrid discards removed row editor", async () => {
    await edit(0); await page.getByRole("textbox", { name: /Alpha/ }).fill("Wrong row");
    await page.evaluate(() => window.fixture.removeFirst());
    await expect(page.getByRole("textbox", { name: /Alpha/ })).toHaveCount(0);
    assert.deepEqual((await readRows()).map((r) => [r.id, r.label]), [["b", "Beta"]]);
  });
  await check("LineItemGrid typed and cleared rates unlink library provenance", async () => {
    await edit(3); const input = page.getByRole("textbox", { name: /Alpha/ });
    await input.fill("15"); await input.press("Enter");
    await expect.poll(async () => (await readRows())[0].rate).toBe(15);
    assert.equal((await readRows())[0].rateId, undefined);
    const rate = page.locator('[data-cell="1-3"]'); await rate.focus(); await rate.press("Delete");
    await expect.poll(async () => (await readRows())[1].rate).toBe(null);
    assert.equal((await readRows())[1].rateId, undefined);
  });
  await check("Composer preserves newer draft after pending send", async () => {
    const input = page.getByRole("textbox", { name: "Message fixture", exact: true });
    await input.fill("Sent message"); await input.press("Enter");
    await input.fill("New unsent draft"); await capture("composer-pending", page.locator(".plumb-composer")); await page.evaluate(() => window.fixture.resolveSend());
    await expect(input).toHaveValue("New unsent draft");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
  });
  await check("Composer synchronous failure stays editable and displays inline error", async () => {
    await page.evaluate(() => window.fixture.failSend());
    const input = page.getByRole("textbox", { name: "Message fixture", exact: true });
    await input.fill("Retry me"); await input.press("Enter");
    await expect(input).toHaveValue("Retry me");
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
    await expect(page.locator(".plumb-composer").getByRole("alert")).toBeVisible();
    await capture("composer-error", page.locator(".plumb-composer"));
  });
  await check("CommentThread preserves newer draft after pending post", async () => {
    const thread = page.getByRole("region", { name: "Thread fixture" });
    const input = thread.getByRole("textbox");
    await input.fill("First reply"); await thread.getByRole("button", { name: "Post internally", exact: true }).click();
    await input.fill("New reply"); await capture("thread-pending", thread); await page.evaluate(() => window.fixture.resolvePost());
    await expect(input).toHaveValue("New reply");
    await expect(thread.getByRole("button", { name: "Post internally", exact: true })).toBeEnabled();
  });
  await check("CommentThread synchronous failure preserves reply with inline error", async () => {
    await page.evaluate(() => window.fixture.failPost());
    const thread = page.getByRole("region", { name: "Thread fixture" });
    await thread.getByRole("textbox").fill("Retry reply");
    await thread.getByRole("button", { name: "Post internally", exact: true }).click();
    await expect(thread.getByRole("textbox")).toHaveValue("Retry reply");
    await expect(thread.getByRole("button", { name: "Post internally", exact: true })).toBeEnabled();
    await expect(thread.getByRole("alert")).toBeVisible();
    await capture("thread-error", thread);
  });
  await check("FactField synchronous failure preserves correction and reason", async () => {
    const fact = page.locator(".plumb-fact");
    await fact.getByRole("button", { name: /Correct Serial fixture/ }).click();
    const fields = fact.getByRole("textbox");
    await fields.nth(0).fill("New serial"); await fields.nth(1).fill("Checked label");
    await fact.getByRole("button", { name: "Save correction", exact: true }).click();
    await expect(fields.nth(0)).toHaveValue("New serial"); await expect(fields.nth(1)).toHaveValue("Checked label");
    await expect(fact.getByRole("button", { name: "Save correction", exact: true })).toBeEnabled();
    await expect(fact.getByRole("alert")).toBeVisible();
    await capture("fact-error", fact);
  });
  await check("AccessManager synchronous failure preserves editable invite", async () => {
    const access = page.locator(".plumb-access");
    const email = access.getByRole("textbox", { name: "Invite by email", exact: true });
    await email.fill("person@example.com"); await access.getByRole("button", { name: "Invite", exact: true }).click();
    await expect(email).toHaveValue("person@example.com"); await expect(email).toBeEnabled();
    await expect(access.getByRole("button", { name: "Invite", exact: true })).toBeEnabled();
    await expect(access.getByRole("alert")).toBeVisible();
    await capture("access-error", access);
  });
  for (const field of ["changeRevision", "changeTerms"]) await check(`ApprovalRequest resets consent on ${field}`, async () => {
    const approval = page.locator(".plumb-approval-request");
    await approval.getByRole("textbox").fill("Signer");
    const consent = approval.getByRole("checkbox");
    await approval.getByText("Fixture consent", { exact: true }).click();
    await expect(approval.getByRole("button", { name: /^Approve / })).toBeEnabled();
    await page.evaluate((method) => window.fixture[method](), field);
    await expect(consent).not.toBeChecked();
    await expect(approval.getByRole("button", { name: /^Approve / })).toBeDisabled();
  });
  await check("ApprovalRequest blocks submission after idle expiry", async () => {
    await page.clock.install();
    const approval = page.locator(".plumb-approval-request");
    await approval.getByRole("textbox").fill("Signer");
    await approval.getByText("Fixture consent", { exact: true }).click();
    await page.clock.fastForward(61000);
    await approval.getByRole("button", { name: /^Approve / }).click();
    await expect(page.getByTestId("approved")).toHaveText("0");
    await expect(approval.getByRole("status")).toContainText(/expired/i);
  });
  // Initial nested mount catches layout-effect ordering; portal tokens must follow the winner.
  for (const outer of ["dark", "light"]) {
    const snapshot = () => page.evaluate(() => ({
      classes: [...document.documentElement.classList].sort(),
      scheme: document.documentElement.style.colorScheme,
      theme: document.documentElement.dataset.plumbTheme,
      elevated: getComputedStyle(document.documentElement).getPropertyValue("--bg-elevated").trim(),
      text: getComputedStyle(document.documentElement).getPropertyValue("--text").trim(),
    }));
    errors.length = 0;
    await page.goto(new URL(`tests/browser/theme.html?outer=${outer}`, base).href);
    await expect(page.getByTestId("outer")).toHaveText(outer);
    await expect(page.locator("html")).toHaveAttribute("data-plumb-theme", outer);
    const expectedOuter = await snapshot();
    const controlBackgrounds = await page.evaluate(() => {
      const resolveColor = value => {
        const probe = document.createElement("span"); probe.style.color = value;
        document.body.append(probe); const color = getComputedStyle(probe).color; probe.remove(); return color;
      };
      return {
        toggle: getComputedStyle(document.querySelector('[data-testid="toggle-default"]')).backgroundColor,
        expectedToggle: resolveColor('var(--bg-container)'),
        pin: getComputedStyle([...document.querySelectorAll('button')].find(button => button.textContent === 'Dishwasher')).backgroundColor,
      };
    });
    assert.equal(controlBackgrounds.toggle, controlBackgrounds.expectedToggle, `${outer} unselected toggle retains its semantic background`);
    assert.equal(controlBackgrounds.pin, 'rgba(0, 0, 0, 0)', `${outer} text-action button must not use the browser default background`);
    await page.goto(new URL(`tests/browser/theme.html?outer=${outer}&nested=1`, base).href);
    await expect(page.getByTestId("inner")).toBeVisible();
    const inner = outer === "dark" ? "light" : "dark";
    await expect(page.locator("html")).toHaveAttribute("data-plumb-theme", inner);
    const nested = await snapshot();
    assert.equal(nested.scheme, inner);
    assert.ok(nested.elevated, "Theme custom properties must be compiled and present");
    assert.notEqual(nested.elevated, expectedOuter.elevated, "Nested theme must replace outer tokens");
    await page.locator(".plumb-clear").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const portal = await dialog.evaluate(element => ({
      outside: !document.querySelector('[data-testid="inner"]').contains(element),
      elevated: getComputedStyle(element).getPropertyValue("--bg-elevated").trim(),
      text: getComputedStyle(element).getPropertyValue("--text").trim(),
    }));
    assert.equal(portal.outside, true, "Calendar must exercise a portal outside the nested subtree");
    assert.equal(portal.elevated, nested.elevated);
    assert.equal(portal.text, nested.text);
    await page.keyboard.press("Escape");
    await page.evaluate(() => { document.documentElement.classList.add("fixture-unrelated-during"); window.themeFixture.hideInner(); });
    expectedOuter.classes.push("fixture-unrelated-during");
    expectedOuter.classes.sort();
    await expect(page.getByTestId("inner")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("data-plumb-theme", outer);
    assert.deepEqual(await snapshot(), expectedOuter, "Inner unmount must restore exact outer classes/tokens");
    await page.evaluate(() => window.themeFixture.unmount());
    await expect(page.locator("html")).toHaveAttribute("data-plumb-theme", "preexisting");
    const restored = await snapshot();
    assert.equal(restored.scheme, "normal");
    assert.deepEqual(restored.classes, ["fixture-unrelated-before", "fixture-unrelated-during"]);
    assert.deepEqual(errors, []);
    passed++;
    console.log(`PASS nested ${outer}/${inner} theme portal and cleanup`);
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(new URL("tests/browser/theme.html?outer=light", base).href);
  await expect(page.getByRole("button", { name: "Save fixture" })).toBeVisible();
  const narrowStyles = await page.evaluate(() => {
    const resolveColor = value => {
      const probe = document.createElement("span");
      probe.style.color = value; document.body.append(probe);
      const result = getComputedStyle(probe).color; probe.remove(); return result;
    };
    const button = document.querySelector('.plumb-button[data-variant="primary"]');
    const input = document.querySelector('.plumb-input');
    return {
      columns: getComputedStyle(document.querySelector('[data-testid="responsive-grid"]')).gridTemplateColumns,
      background: getComputedStyle(button).backgroundColor,
      expectedBackground: resolveColor('var(--accent-solid)'),
      color: getComputedStyle(button).color,
      expectedColor: resolveColor('var(--on-accent)'),
      inputWidth: input.getBoundingClientRect().width,
      inputBorder: getComputedStyle(input).borderColor,
      expectedInputBorder: resolveColor('var(--control-border)'),
      iconWidth: button.querySelector('svg').getBoundingClientRect().width,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  assert.equal(narrowStyles.columns.trim().split(/\s+/).length, 1, "Mobile sidebar grid must collapse");
  assert.equal(narrowStyles.background, narrowStyles.expectedBackground, "Primary background must compile");
  assert.equal(narrowStyles.color, narrowStyles.expectedColor, "Primary foreground must compile");
  assert.ok(narrowStyles.inputWidth > 200, "Outlined fields must fill the mobile card");
  assert.equal(narrowStyles.inputBorder, narrowStyles.expectedInputBorder, "Outlined fields retain semantic borders");
  assert.equal(narrowStyles.iconWidth, 16, "Consumer-supplied Lucide icons receive the component size");
  assert.equal(narrowStyles.overflow, false);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect.poll(() => page.getByTestId("responsive-grid").evaluate(element => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length)).toBe(2);
  passed++; console.log("PASS StyleX primary colors, field width and responsive sidebar");
  console.log(`${passed} browser regression cases passed`);
} finally {
  await browser?.close();
  await server.close();
  await rm(cacheDir, { recursive: true, force: true });
}
