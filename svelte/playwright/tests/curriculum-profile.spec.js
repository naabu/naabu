

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
test.afterEach(async ({ page, domain, showAllConsole }, testInfo) => {
  printMessages(page, showAllConsole);
  console.log("trying to delete the user");
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/clear');
  await page.waitForSelector('[data-test=complete]');
});

test('Test flow for creating and editing learning goals', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);
  await page.goto(domain);
  await page.click('[data-cy=curriculum-menu]');
  await page.click('[data-cy=create-goal-link]');
  await page.locator('[data-cy=create-goal-submit-button]').isDisabled();
  await page.click('[data-test=create-curriculum-profile-message]');
  
  // Login with Google firebase emulator.
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile2@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.click('[data-cy=curriculum-menu]');
  await page.click('[data-cy=create-goal-link]');
  await page.click('[data-test=create-curriculum-profile-message]');
  // const [popup] = await Promise.all([
  //   page.waitForEvent('popup'),
  //   page.click('#linkGoogleButton')
  // ]);
  // await popup.waitForLoadState();
  // await popup.click('#add-account-button');
  // await popup.click('#autogen-button');
  // await popup.click('#sign-in');
  await expect(page.locator('#linkGoogleButton')).not.toBeVisible();
  // Fil in curriculum profile.
  await page.fill('#fullname', 'John Doe');
  await page.fill('#institution', 'University of Logic');
  await page.fill('#email', 'johndoe@unilogic.org');
  await page.fill('#credentials', 'Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-cy=submit-button]');
});
