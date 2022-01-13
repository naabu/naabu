import base from '@playwright/test';

export const test = base.extend({
  domain: 'http://localhost:3000',
  showAllConsole: false
});

function printMessages(page, showAllConsole) {
  page.on("console", (message) => {
    if (message.type() === "error" || showAllConsole) {
      console.log(message.text());
    }
  })
}

const expect = base.expect;

test('Test if the front page loads @ping', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);
  await page.goto(domain + '/');
  let divSvelte = await page.locator('#svelte');
  await expect(page.locator(divSvelte)).toContainText('De reis');
  await expect(page.locator(divSvelte)).toContainText('Curriculum');
});

test('Test if you can login with routes @ping', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);
  await page.goto(domain + '/');
  let divSvelte = await page.locator('#svelte');
  await expect(page.locator(divSvelte)).toContainText('De reis');
  await expect(page.locator(divSvelte)).toContainText('Curriculum');
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
});



