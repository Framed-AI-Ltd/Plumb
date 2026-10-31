import { test, expect } from '@playwright/test';
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
    await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story&globals=theme:${theme};brand:denim;neutral:cream`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('#storybook-root')).not.toBeEmpty();
    await expect(page.locator('body')).not.toHaveClass(/sb-show-errordisplay|sb-show-nopreview/);
    await page.addStyleTag({ content: '*,*::before,*::after { animation:none!important; transition:none!important; caret-color:transparent!important }' });
    const file = info.outputPath(`${story.id}.png`);
    await page.screenshot({ path: file, fullPage: true });
    await info.attach(story.id, { path: file, contentType: 'image/png' });
    // Strict assertions use owner-inspected committed baselines; CI never auto-updates.
    if (process.env.VISUAL_CAPTURE_ONLY !== '1') await expect.soft(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true, animations: 'disabled', maxDiffPixels: 0 });
  }
  expect(errors).toEqual([]);
});
