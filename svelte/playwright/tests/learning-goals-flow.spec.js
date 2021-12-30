

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

test('Test flow for learning goals.', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);;
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.click('[data-cy=user-menu]');
  await page.click('#user-menu-item-curriculum');

  await page.fill('#fullname', 'John Doe');
  await page.fill('#institution', 'University of Logic');
  await page.fill('#email', 'johndoe@unilogic.org');
  await page.fill('#credentials', 'Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-cy=submit-button]');

  let profileView = await page.locator('[data-test=profile-view]');
  await expect(profileView).toContainText('Volledige naam:');
  await expect(profileView).toContainText('John Doe');
  await expect(profileView).toContainText('University of Logic');
  await expect(profileView).toContainText('johndoe@unilogic.org');
  await expect(profileView).toContainText('Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-cy=subtab-edit]');
  await expect(page.locator("#fullname")).not.toBeVisible();
  await page.fill('#institution', 'University of Education');
  await page.fill('#email', 'johndoe@uniedu.org');
  await page.fill('#credentials', 'The top Proffesor of education (5 years) Head of department of logic.');
  await page.click('[data-cy=submit-button]');
  await page.click('[data-cy=subtab-read]');
  await expect(profileView).toContainText('University of Education');
  await expect(profileView).toContainText('johndoe@uniedu.org');
  await expect(profileView).toContainText('The top Proffesor of education (5 years) Head of department of logic.');
  await page.click('[data-cy=curriculum-menu]');
  await page.click('[data-cy=create-goal-link]');
});