

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
  // await expect(page.locator()).toContainText();
  // await page.click();
  // await page.fill('', '');
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
  await expect(profileView).toContainText('John Doe');
  await expect(profileView).toContainText('University of Logic');
  await expect(profileView).toContainText('johndoe@unilogic.org');
  await expect(profileView).toContainText('Proffesor of logic (5 years) Head of department of logic.');
  await page.click('[data-cy=subtab-edit]');
  await expect(page.locator('#institution')).toBeVisible();
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

  // Create goal page.
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
  await page.fill('#quiz_question', '$$1+1=$$..');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer', '5');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer', '1');
  await page.check('#answers_check');
  await page.click('[data-cy=create-goal-submit-button]');
  await expect(page.locator('div#svelte')).toContainText('Ik kan subject 1 benoemen en definieren from a work sheet');

  // Edit goal page.
  await page.click('[data-cy=subtab-edit]');
  await page.click('#multistructureel');
  await page.fill('#multi_topic_name', 'subject 1');
  await page.click('[data-cy=add-multi-topic-button]');
  await page.fill('#multi_topic_name', 'subject 2');
  await page.click('[data-cy=add-multi-topic-button]');
  await page.click('#bloom1-3');
  await page.click('#bloom2-3');
  await page.selectOption('select#selectedVerbs', ['berekenen', 'omzetten']);
  await page.fill('#from_text', 'from your head without a calculator');
  await page.fill('#description', 'Vital to learn this early');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+1=$$..');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer', '2');
  await page.check('#answers_check');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A3]');
  await page.fill('#answeranswer', '3');
  await page.fill('#test_name', 'Battle 2');
  await page.click('[data-cy=add-battle-button]');
  await page.click('[data-cy=click-battle-1-button]');
  await page.click('[data-cy=add-question-button]');
  await page.fill('#quiz_question', '$$2+2=$$..');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer', '4');
  await page.check('#answers_check');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-cy=edit-goal-submit-button]');
  await expect(page.locator('div#svelte')).toContainText('Leerdoel gewijzigd');
  await page.click('[data-cy=subtab-history]');

  // Revision page.
  await expect(page.locator('div#svelte')).toContainText('John Doe')
  await expect(page.locator('div#svelte')).toContainText('University of Education')
  await expect(page.locator('[data-cy=revision0]')).toBeVisible();
  await expect(page.locator('[data-cy=revision1]')).toBeVisible();
  await expect(page.locator('[data-cy=revision2]')).not.toBeVisible();

  await page.click('[data-cy=revision-index-0]');
  await expect(page.locator('[data-cy=Titel-old]')).toContainText("Ik kan subject 1 benoemen en definieren from a work sheet");
  await expect(page.locator('[data-cy=Titel-new]')).toContainText("Ik kan subject 1 en subject 2 berekenen en omzetten from your head without a calculator");
  await expect(page.locator('[data-cy=Omschrijving-old]')).toContainText("Important learning goal for reasons");
  await expect(page.locator('[data-cy=Omschrijving-new]')).toContainText("Vital to learn this early");

  await expect(page.locator('[data-cy="from Text-old"]')).toContainText("from a work sheet");
  await expect(page.locator('[data-cy="from Text-new"]')).toContainText("from your head without a calculator");
  await expect(page.locator('[data-cy=Onderwerpen-new] > [data-cy=new-index0]')).toContainText('subject 1');

  await expect(page.locator('[data-cy=Onderwerpen-new] > [data-cy=new-index1]')).toContainText('subject 2');
  await expect(page.locator('[data-cy=Werkwoorden-old] > [data-cy=old-index0]')).toContainText('benoemen');
  await expect(page.locator('[data-cy=Werkwoorden-old] > [data-cy=old-index1]')).toContainText('definieren');
  await expect(page.locator('[data-cy=Werkwoorden-new] > [data-cy=new-index0]')).toContainText('berekenen');
  await expect(page.locator('[data-cy=Werkwoorden-new] > [data-cy=new-index1]')).toContainText('omzetten');
  await expect(page.locator('[data-cy="Bloom\'s taxonomy-old"] > [data-cy=old-index0]')).toContainText('bloom1-1');
  await expect(page.locator('[data-cy="Bloom\'s taxonomy-old"] > [data-cy=old-index1]')).toContainText('bloom2-2');

  await expect(page.locator('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index1]')).toContainText('bloom1-3');
  await expect(page.locator('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index2]')).toContainText('bloom2-2');
  await expect(page.locator('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index3]')).toContainText('bloom2-3');
  await expect(page.locator('[data-cy="Solo\'s taxonomy-old"]')).toContainText('solo-1');
  await expect(page.locator('[data-cy="Solo\'s taxonomy-new"]')).toContainText('solo-2');
  await expect(page.locator('[data-cy="Battles-old"] > [data-cy=old-index0]')).toContainText('Battle 1');
  await expect(page.locator('[data-cy="Battles-new"] > [data-cy=new-index0]')).toContainText('Battle 1');
  await expect(page.locator('[data-cy="Battles-new"] > [data-cy=new-index1]')).toContainText('Battle 2');
  await expect(page.locator('[data-cy="Vraag-old"]')).toContainText('$$1+1=$$..');
  await expect(page.locator('[data-cy="Vraag-new"]')).toContainText('Weet jij het antwoord? $$1+1=$$..');
  await expect(page.locator('[data-cy="Antwoorden-old"] > [data-cy=old-index0]')).toContainText('5 - Fout antwoord');
  await expect(page.locator('[data-cy="Antwoorden-old"] > [data-cy=old-index1]')).toContainText('1 - Goede antwoord');
  await expect(page.locator('[data-cy="Antwoorden-new"] > [data-cy=new-index0]')).toContainText('1 - Fout antwoord');
  await expect(page.locator('[data-cy="Antwoorden-new"] > [data-cy=new-index1]')).toContainText('2 - Goede antwoord');
  await expect(page.locator('[data-cy="Antwoorden-new"] > [data-cy=new-index2]')).toContainText('3 - Fout antwoord');

  await page.click('[data-cy=subtab-edit]');
  await expect(page.locator('div#svelte')).toContainText('Waarschuwing: u bewerkt een oude versie van deze pagina.');
  await expect(page.locator('div#svelte')).toContainText('Als u uw bewerking opslaat, gaan alle wijzigingen verloren die na deze versie zijn gemaakt.');
  await page.click('[data-cy="maintab-goal"]');
  await expect(page.locator('div#svelte')).toContainText('Je bekijkt een revisie');
  await page.click('[data-cy="show-diff-link"]');
  await expect(page.locator('div#svelte')).toContainText('Verschil tussen versies');
  await page.click('[data-cy=discuss-revision-button]');
  
  await expect(page.locator('[data-cy=post-title]')).toHaveValue(/Overleg revisie.*/);
  await page.fill('#post', 'Test post for cypress');
  await page.click('[data-cy="post-button"]');
  await expect(page.locator('div#svelte')).toContainText('Antwoord');
  await page.fill('#reply', 'Answer on post');
  await page.click('[data-cy="maintab-talk"]')
  await expect(page.locator('div#svelte')).toContainText('Titel');
  await page.fill('#title', 'New title');
  await page.fill('#post', 'New post');
  await page.click('[data-cy="post-button"]');
  await expect(page.locator('div#svelte')).toContainText('Antwoord');
  await page.click('[data-cy="profile-link"]');
  await expect(page.locator('div#svelte')).toContainText('Ik kan subject 1 en subject 2 berekenen en omzetten from your head wi…');
  await expect(page.locator('div#svelte')).toContainText('Ik kan subject 1 benoemen en definieren from a work sheet');
  await expect(page.locator('div#svelte')).toContainText('New title');
  await expect(page.locator('div#svelte')).toContainText('Overleg revisie');
});