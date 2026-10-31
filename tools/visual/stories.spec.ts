import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// Dynamic inventory catches new stories. Capture is evidence, never baseline approval.
test('responsive story rendering and visual evidence', async ({ page, request }, info) => {
  test.setTimeout(30 * 60 * 1000);
  const response = await request.get('/index.json');
  expect(response.ok()).toBeTruthy();
  const index = await response.json();
  const stories = Object.values(index.entries) as { id: string; type: string }[];
  expect(stories.filter(s => s.type === 'story').length).toBeGreaterThan(0);
  const selected = process.env.VISUAL_STORY_IDS?.split(',');
  if (selected) {
    expect(selected.every(id => /^[-a-z0-9]+$/.test(id) && stories.some(story => story.type === 'story' && story.id === id))).toBeTruthy();
    expect(new Set(selected).size).toBe(selected.length);
  }
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  const theme = info.project.name.endsWith('dark') ? 'dark' : 'light';
  for (const story of stories.filter(s => s.type === 'story' && (!selected || selected.includes(s.id)))) {
    await page.clock.setFixedTime(new Date('2026-01-15T12:00:00Z'));
    // The harness owns axe runs; disable only Storybook's duplicate background audit.
    await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story&globals=theme:${theme};brand:denim;neutral:cream;a11y.manual:!true`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('#storybook-root')).not.toBeEmpty();
    await expect(page.locator('body')).not.toHaveClass(/sb-show-errordisplay|sb-show-nopreview/);
    if (process.env.VISUAL_A11Y === '1') {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `${story.id}: document must not scroll sideways`).toBeLessThanOrEqual(1);
      const width = info.project.use.viewport?.width;
      if (width === 1440 || /--(field-capture|customer-portal|request-and-bids)$/.test(story.id)) {
        const audit = await new AxeBuilder({ page }).include('#storybook-root').analyze();
        expect(audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), `${story.id}: accessibility`).toEqual([]);
      }
    }
    if (story.id === 'framed--estimate-grid') {
      const spacing = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--space-3').trim());
      await expect(page.locator('.plumb-line-grid [role="columnheader"]').first()).toHaveCSS('padding-top', spacing);
    }
    const calendarButtons = page.locator('.plumb-calendar-head .plumb-button[data-icon-only][data-size="sm"]');
    if (await calendarButtons.count()) {
      const size = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--control-h-sm').trim());
      for (const button of await calendarButtons.all()) await expect(button).toHaveCSS('width', size);
    }
    for (const event of await page.locator('.plumb-event[data-confirmed][data-overdue]').all()) {
      const color = await event.evaluate(el => {
        const probe = document.createElement('span'); probe.style.color = 'var(--accent-text)';
        el.append(probe); const resolved = getComputedStyle(probe).color; probe.remove(); return resolved;
      });
      await expect(event).toHaveCSS('color', color);
    }
    await page.addStyleTag({ content: '*,*::before,*::after { animation:none!important; transition:none!important; caret-color:transparent!important }' });
    const file = info.outputPath(`${story.id}.png`);
    await page.screenshot({ path: file, fullPage: true });
    await info.attach(story.id, { path: file, contentType: 'image/png' });
    // Strict assertions use owner-inspected committed baselines; CI never auto-updates.
    if (process.env.VISUAL_CAPTURE_ONLY !== '1') await expect.soft(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true, animations: 'disabled', maxDiffPixels: 0 });
  }
  expect(errors).toEqual([]);
});
