

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

test('Test flow for learning goals @goal', async ({ page, domain, showAllConsole }) => {
  test.slow();
  printMessages(page, showAllConsole);;
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.click('[data-test=user-menu]');
  await page.waitForTimeout(500);
  await page.click('#user-menu-item-curriculum');
  await page.waitForTimeout(500);
  await page.fill('#fullname', 'John Doe');
  await page.fill('#institution', 'University of Logic');
  await page.fill('#email', 'johndoe@unilogic.org');
  await page.fill('#credentials', 'Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-test=submit-button]');

  let profileView = await page.locator('[data-test=profile-view]');
  await expect(profileView).toContainText('Volledige naam:');
  await expect(profileView).toContainText('John Doe');
  await expect(profileView).toContainText('University of Logic');
  await expect(profileView).toContainText('johndoe@unilogic.org');
  await expect(profileView).toContainText('Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-test=tabs-sub-edit]');
  await page.waitForTimeout(1000);
  await page.waitForSelector('#institution');
  await expect(page.locator('#institution')).toBeVisible();
  await expect(page.locator("#fullname")).not.toBeVisible();
  await page.fill('#institution', 'University of Education');
  await page.fill('#email', 'johndoe@uniedu.org');
  await page.fill('#credentials', 'The top Proffesor of education (5 years) Head of department of logic.');
  await page.click('[data-test=submit-button]');
  await page.click('[data-test=tabs-sub-read]');
  await page.waitForTimeout(1000);
  await page.waitForSelector('[data-test=curriculum-menu]');
  await expect(profileView).toContainText('University of Education');
  await expect(profileView).toContainText('johndoe@uniedu.org');
  await expect(profileView).toContainText('The top Proffesor of education (5 years) Head of department of logic.');
  await page.click('[data-test=curriculum-menu]');
  await page.click('[data-test=create-goal-link]');

  // Create goal page.
  await page.click('#solo-1');
  await page.fill('#uni_topic_name', 'subject 1');
  await page.click('#bloom1-1');
  await page.click('#bloom2-2');
  await page.selectOption('select#select-verbs', ['describe', 'show']);
  await page.fill('#from_text', 'from a work sheet');
  await page.waitForTimeout(2000);
  await page.click('[data-test=apply-button]');
  await expect(page.locator('#title-textarea')).toHaveValue('I can describe and show subject 1 from a work sheet');
  await page.fill('#title-textarea', 'I can describe and show subject 1 from a work sheet with extra info');
  await page.fill('#description', 'Important learning goal for reasons');
  await page.click('[data-test=create-goal-submit-button]');
  await expect(page.locator('div#svelte')).toContainText('I can describe and show subject 1 from a work sheet with extra info');

  // Edit goal page.
  await page.click('[data-test=tabs-sub-edit]');
  await page.click('#solo-2');
  await page.fill('#multi_topic_name', 'subject 1');
  await page.click('[data-test=add-multi-topic-button]');
  await page.fill('#multi_topic_name', 'subject 2');
  await page.click('[data-test=add-multi-topic-button]');
  await page.click('#bloom1-3');
  await page.click('#bloom2-3');
  await page.selectOption('select#select-verbs', ['investigate', 'adjust']);
  await page.fill('#from_text', 'from your head without a calculator');
  await page.fill('#description', 'Vital to learn this early');
  await page.fill('#title-textarea', 'I can describe and show subject 1 from a work sheet with extra info test');
  await page.click('[data-test=edit-goal-submit-button]');
  await page.waitForSelector('[data-test=alert-success-title]');
  await expect(page.locator('div#svelte')).toContainText('I can describe and show subject 1 from a work sheet with extra info test');
});

test.afterEach(async ({ page, domain, showAllConsole }, testInfo) => {
  printMessages(page, showAllConsole);
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/Ik kan subject 1 benoemen en definieren from a work sheet/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/Ik kan subject 1 en subject 2 berekenen en omzetten from your head without a calculator/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/player/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/clear');
  await page.waitForSelector('[data-test=complete]');
});
