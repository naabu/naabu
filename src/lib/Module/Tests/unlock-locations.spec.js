import base from '@playwright/test';

export const test = base.extend({
  domain: 'http://localhost:3000',
  showAllConsole: false
});

const expect = base.expect;

function printMessages(page, showAllConsole) {
  page.on("console", (message) => {
    if (message.type() === "error" || showAllConsole) {
      console.log(message.text());
    }
  })
}

test('Unlock location on map test @module', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);
  test.slow();
  await page.goto(domain + '/cypress/user/deletegoalscanmoderateunlocklocationonmap@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalscanmoderateunlocklocationonmap@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');

  await page.goto(domain + '/cypress/curriculumProfile/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/activity/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/connection/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/unlock-locations-map/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/module/unlock-locations-map/module-unlock-test/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.click('[data-test=desktop-logo]');
  await page.click('[data-test=module-0-title-link]');
  await page.waitForSelector(".locked_marker_1");
  await expect(page.locator(".locked_marker_1")).toBeVisible();
  await expect(page.locator(".unlocked_marker_1")).not.toBeVisible();
  await page.click(".unlocked_marker_0-inner");
  let teaser = await page.locator('[data-test=activity-teaser-0]');
  await teaser.waitFor();
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 11');
  await teaser.click();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").scrollIntoViewIfNeeded();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").click();
  await page.locator('[data-test=quiz-question]').waitFor();
  await expect(page.locator('[data-test=quiz-question]')).toContainText('1+1=');
  await page.click('[data-test=watch-image-video-button]');
  await page.click('[data-test=back-to-quiz-button]');
  await page.click('[data-test=input-value-0]');
  await page.click('[data-test=check-answer-button]');
  await page.waitForSelector('[data-test=incorrect-feedback]');
  await expect(page.locator('[data-test=incorrect-feedback]')).toBeVisible();
  await page.click('[data-test=input-value-1]');
  await page.click('[data-test=check-answer-button]');
  await page.waitForSelector('[data-test=correct-feedback]');
  await expect(page.locator('[data-test=correct-feedback]')).toBeVisible();
  await expect(page.locator('[data-test=incorrect-feedback]')).not.toBeVisible();
  await page.waitForSelector('[data-test=continue-button]');
  await page.click('[data-test=continue-button]');
  await page.waitForSelector('[data-test=too-easy]');
  await page.click('[data-test=too-easy]', { timeout: 30000 });
  teaser = await page.locator('[data-test=activity-teaser-0]');
  await teaser.waitFor();
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 12');
  await teaser.click();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").scrollIntoViewIfNeeded();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").click();
  console.log("played video");
  await page.waitForSelector('[data-test=too-easy]');
  console.log("data-test=too-easy");
  await page.waitForTimeout(1000);
  await page.click('[data-test=too-easy]', { timeout: 30000 });
  teaser = await page.locator('[data-test=activity-teaser-0]');
  await teaser.waitFor();
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 13');
  await teaser.click();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").scrollIntoViewIfNeeded();
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").click();
  await page.waitForSelector('[data-test=too-easy]');
  await page.waitForTimeout(1000);
  await page.click('[data-test=too-easy]', { timeout: 30000 });
  await page.waitForSelector('[data-test=new-location-unlocked]');
  await expect(page.locator('[data-test=new-location-unlocked]')).toBeVisible({ timeout: 100000 });
  await page.click('[data-test=back-to-course-button]');
  await page.waitForSelector(".unlocked_marker_1");
  await expect(page.locator(".unlocked_marker_1")).toBeVisible();
  await expect(page.locator(".locked_marker_1")).not.toBeVisible();
  await page.locator(".unlocked_marker_1-inner").click();
  teaser = await page.locator('[data-test=activity-teaser-0]');
  await teaser.waitFor();
  await expect(teaser).toBeVisible({ timeout: 100000 });
  await expect(teaser).toContainText('activity 21');
});

test.afterEach(async ({ page, domain, showAllConsole }, testInfo) => {
  printMessages(page, showAllConsole);
  await page.goto(domain + '/cypress/usermodule/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/feedbackAndScores/deletegoalscanmoderateunlocklocationonmap@example.com/password/clear');
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
  await page.goto(domain + '/cypress/user/deletegoalscanmoderateunlocklocationonmap@example.com/clear');
  await page.waitForSelector('[data-test=complete]');
});