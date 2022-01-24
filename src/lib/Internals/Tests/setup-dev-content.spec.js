import base from '@playwright/test';

export const test = base.extend({
  domain: ['http://localhost:3000', { option: true }],
  showAllConsole: [false, { option: true }],
});

function printMessages(page, showAllConsole) {
  page.on("console", (message) => {
    if (message.type() === "error" || showAllConsole) {
      console.log(message.text());
    }
  })
}

const expect = base.expect;

test('Set up development content @dev', async ({ page, domain, showAllConsole }) => {
  console.log(domain);
  console.log(showAllConsole);
  printMessages(page, showAllConsole);
  await page.goto(domain + '/cypress/user/deletegoalscanmoderatedevelopcontent@example.com/password/login');
  await expect(page.locator('html')).toContainText('Great success! Now login! This should fail now!');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalscanmoderatedevelopcontent@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/activity/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/connection/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/developcontent-map/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/module/developcontent-map/module-developcontent/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
});
