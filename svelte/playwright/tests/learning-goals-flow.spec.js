

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
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsnoprofile@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/Ik kan subject 1 benoemen en definieren from a work sheet/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/player/clear');
  await page.waitForSelector('[data-test=complete]');
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
  await expect(profileView).toContainText('John Doe12312312');
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

  await page.click('#unistructureel');
  await page.fill('#uni_topic_name', 'subject 1');
  await page.click('#bloom1-1');
  await page.click('#bloom2-2');
  await page.selectOption('select#selectedVerbs', ['benoemen', 'definieren']);
  await page.fill('#from_text', 'from a work sheet');
  await page.fill('#description', 'Important learning goal for reasons');
  await page.fill('#test_name', 'Battle 1');
  await page.click('[data-cy=add-battle-button]');
  await page.click('[data-cy=add-question-button]');
  await page.fill('#quiz_question','$$1+1=$$..');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer','5');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer','1');
  await page.check('#answers_check');
  await page.click('[data-cy=create-goal-submit-button]');
  await expect(page.locator('div#svelte')).toContainText('Ik kan subject 1 benoemen en definieren from a work sheet');
  await page.click('[data-cy=subtab-edit]');
  await page.click('#multistructureel');
  await page.fill('#multi_topic_name','subject 1');
  await page.click('[data-cy=add-multi-topic-button]');
  await page.fill('#multi_topic_name','subject 2');
  await page.click('#bloom1-3');
  await page.click('#bloom2-3');
  await page.selectOption('select#selectedVerbs', ['berekenen', 'omzetten']);
  await page.fill('#from_text', 'from your head without a calculator');
  
  // cy.get('#from_text').clear().type('from your head without a calculator');
  // cy.get('#description').clear().type('Vital to learn this early');
  // cy.get('#quiz_question').clear().type('Weet jij het antwoord? $$1+1=$$..');
  // cy.get('[data-cy=A1]').click();
  // cy.get('#answeranswer').clear().type('1');
  // cy.get('[data-cy=A2]').click();
  // cy.get('#answeranswer').clear().type('2');
  // cy.get('#answers_check').check();
  // cy.get('[data-cy=new-answer-button]').click();
  // cy.get('[data-cy=A3]').click();
  // cy.get('#answeranswer').clear().type('3');
  // cy.get('#test_name').type('Battle 2');
  // cy.get('[data-cy=add-battle-button]').click();
  // cy.get('[data-cy=click-battle-1-button]').click();
  // cy.get('[data-cy=add-question-button]').click();
  // cy.get('#quiz_question').type('$$2+2=$$..');
  // cy.get('[data-cy=new-answer-button]').click();
  // cy.get('[data-cy=A1]').click();
  // cy.get('#answeranswer').type('4');
  // cy.get('#answers_check').check();
  // cy.get('[data-cy=new-answer-button]').click();
  // cy.get('[data-cy=A2]').click();
  // cy.get('#answeranswer').type('1');
  // cy.get('[data-cy=edit-goal-submit-button]').click();
  // cy.contains('Leerdoel gewijzigd');
  // cy.get('[data-cy=subtab-history]').click({force: true});
  // await page.pause();
});