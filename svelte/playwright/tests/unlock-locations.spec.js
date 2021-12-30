import base from '@playwright/test';

export const test = base.extend({
  domain: 'http://localhost:3000',
  showAllConsole: false
});

const expect = base.expect;

test.afterEach(async ({ page, domain, showAllConsole }, testInfo) => {
  page.on("console", (message) => {
    if (message.type() === "error" || showAllConsole) {
      console.log(message.text());
    }
  })
  await page.goto(domain + '/cypress/usermodule/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/feedbackAndScores/deletegoalscanmoderate@example.com/password/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/usermodule/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/module/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/connection/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/activity/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/player/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalscanmoderate@example.com/clear');
  await page.waitForSelector('[data-test=complete]');
});

test('Unlock location on map test', async ({ page, domain, showAllConsole }) => {
  page.on("console", (message) => {
    if (message.type() === "error" || showAllConsole) {
      console.log(message.text());
    }
  })

  await page.goto(domain + '/cypress/user/deletegoalscanmoderate@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/activity/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/connection/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/module/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.locator('[data-cy=desktop-logo]').click();
  await page.locator('[data-cy=module-0-title-link]').click();
  await expect(page.locator(".locked_marker_1")).toBeVisible();
  await expect(page.locator(".unlocked_marker_1")).not.toBeVisible();
  await page.locator(".unlocked_marker_0-inner").click();
  let teaser = await page.locator('[data-cy=activity-teaser-0]');
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 11');
  await teaser.click();
  await page.frameLocator('[data-cy=vimeo-iframe]').locator(".play").click();
  await page.locator('[data-test=quiz-question]').waitFor();
  await expect(page.locator('[data-test=quiz-question]')).toContainText('1+1=');
  await page.locator('[data-cy=watch-image-video-button]').click();
  await page.locator('[data-cy=back-to-quiz-button]').click();
  await page.locator('[data-cy=input-value-0]').click();
  await page.locator('[data-cy=check-answer-button]').click();
  await expect(page.locator('[data-cy=incorrect-feedback]')).toBeVisible();
  await page.locator('[data-cy=input-value-1]').click();
  await page.locator('[data-cy=check-answer-button]').click();
  await expect(page.locator('[data-cy=incorrect-feedback]')).not.toBeVisible();
  await expect(page.locator('[data-cy=correct-feedback]')).toBeVisible();
  await page.locator('[data-cy=continue-button]').click();
  await page.locator('[data-cy=too-easy]').click();
  teaser = await page.locator('[data-cy=activity-teaser-0]');
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 12');
  await teaser.click();
  await page.frameLocator('[data-cy=vimeo-iframe]').locator(".play").click();
  await expect(page.locator('[data-cy=too-easy]')).toBeVisible({ timeout: 100000 });
  await page.locator('[data-cy=too-easy]').click();
  teaser = await page.locator('[data-cy=activity-teaser-0]');
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 13');
  await teaser.click();
  await page.frameLocator('[data-cy=vimeo-iframe]').locator(".play").click();
  await expect(page.locator('[data-cy=too-easy]')).toBeVisible({ timeout: 100000 });
  await page.locator('[data-cy=too-easy]').click();
  await expect(page.locator('[data-cy=new-location-unlocked]')).toBeVisible({ timeout: 100000 });
  await page.locator('[data-cy=back-to-course-button]').click();
  await expect(page.locator(".unlocked_marker_1")).toBeVisible();
  await expect(page.locator(".locked_marker_1")).not.toBeVisible();
  await page.locator(".unlocked_marker_1-inner").click();
  teaser = await page.locator('[data-cy=activity-teaser-0]');
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 21');
});