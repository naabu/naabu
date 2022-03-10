

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
  await page.fill('#test_name', 'Battle 1');
  await page.click('[data-test=add-battle-button]');
  await page.waitForTimeout(500);
  await page.click('[data-test=add-question-button]');
  await page.fill('#quiz_question', '$$1+1=$$..');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A1]');
  await page.fill('#answeranswer', '5');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A2]');
  await page.fill('#answeranswer', '1');
  await page.check('#answers_check');
  await page.click('[data-test=create-goal-submit-button]');
  await expect(page.locator('div#svelte')).toContainText('Title: I can describe and show subject 1 from a work sheet with extra info');

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
  await page.waitForTimeout(2000);
  await page.click('[data-test=apply-button]');
  await page.fill('#description', 'Vital to learn this early');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+1=$$..');
  await page.click('[data-test=A1]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-test=A2]');
  await page.fill('#answeranswer', '2');
  await page.check('#answers_check');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A3]');
  await page.fill('#answeranswer', '3');
  await page.fill('#test_name', 'Battle 2');
  await page.click('[data-test=add-battle-button]');
  await page.click('[data-test=battle-main-1]');
  await page.waitForTimeout(500);
  await page.click('[data-test=add-question-button]');
  await page.fill('#quiz_question', '$$2+2=$$..');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A1]');
  await page.fill('#answeranswer', '4');
  await page.check('#answers_check');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A2]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-test=edit-goal-submit-button]');
  await page.waitForSelector('[data-test=alert-success-title]');
  await page.click('[data-test=tabs-sub-history]');

  // Revision page.
  await expect(page.locator('div#svelte')).toContainText('John Doe')
  await expect(page.locator('div#svelte')).toContainText('University of Education')
  await expect(page.locator('[data-test=revision0]')).toBeVisible();
  await expect(page.locator('[data-test=revision1]')).toBeVisible();
  await expect(page.locator('[data-test=revision2]')).not.toBeVisible();

  await page.click('[data-test=revision-index-0]');
  await page.waitForSelector('[data-test=title-old]');
  await expect(page.locator('[data-test=title-old]')).toContainText("I can describe and show subject 1 from a work sheet");
  await expect(page.locator('[data-test=title-new]')).toContainText("I can investigate and adjust subject 1 and subject 2 from your head without a calculator");
  await expect(page.locator('[data-test=description-old]')).toContainText("Important learning goal for reasons");
  await expect(page.locator('[data-test=description-new]')).toContainText("Vital to learn this early");

  await expect(page.locator('[data-test=from-text-old]')).toContainText("from a work sheet");
  await expect(page.locator('[data-test=from-text-new]')).toContainText("from your head without a calculator");
  await expect(page.locator('[data-test=topics-new] > [data-test=new-index0]')).toContainText('subject 1');

  await expect(page.locator('[data-test=topics-new] > [data-test=new-index1]')).toContainText('subject 2');
  await expect(page.locator('[data-test=verbs-old] > [data-test=old-index0]')).toContainText('describe');
  await expect(page.locator('[data-test=verbs-old] > [data-test=old-index1]')).toContainText('show');
  await expect(page.locator('[data-test=verbs-new] > [data-test=new-index0]')).toContainText('investigate');
  await expect(page.locator('[data-test=verbs-new] > [data-test=new-index1]')).toContainText('adjust');
  await expect(page.locator('[data-test=blooms-taxonomy-old] > [data-test=old-index0]')).toContainText('bloom1-1');
  await expect(page.locator('[data-test=blooms-taxonomy-old] > [data-test=old-index1]')).toContainText('bloom2-2');

  await expect(page.locator('[data-test=blooms-taxonomy-new] > [data-test=new-index1]')).toContainText('bloom1-3');
  await expect(page.locator('[data-test=blooms-taxonomy-new] > [data-test=new-index2]')).toContainText('bloom2-2');
  await expect(page.locator('[data-test=blooms-taxonomy-new] > [data-test=new-index3]')).toContainText('bloom2-3');
  await expect(page.locator('[data-test=solo-taxonomy-old]')).toContainText('solo-1');
  await expect(page.locator('[data-test=solo-taxonomy-new]')).toContainText('solo-2');
  await expect(page.locator('[data-test=tests-old] > [data-test=old-index0]')).toContainText('Battle 1');
  await expect(page.locator('[data-test=tests-new] > [data-test=new-index0]')).toContainText('Battle 1');
  await expect(page.locator('[data-test=tests-new] > [data-test=new-index1]')).toContainText('Battle 2');
  await expect(page.locator('[data-test=question-old]')).toContainText('$$1+1=$$..');
  await expect(page.locator('[data-test=question-new]')).toContainText('Weet jij het antwoord? $$1+1=$$..');
  await expect(page.locator('[data-test=answers-old] > [data-test=old-index0]')).toContainText('5 - Wrong answer');
  await expect(page.locator('[data-test=answers-old] > [data-test=old-index1]')).toContainText('1 - Correct answer');
  await expect(page.locator('[data-test=answers-new] > [data-test=new-index0]')).toContainText('1 - Wrong answer');
  await expect(page.locator('[data-test=answers-new] > [data-test=new-index1]')).toContainText('2 - Correct answer');
  await expect(page.locator('[data-test=answers-new] > [data-test=new-index2]')).toContainText('3 - Wrong answer');

  await page.click('[data-test=tabs-sub-edit]');
  await expect(page.locator('[data-test=alert-old-version]')).toContainText('Warning: You are editing an old version of this page.');
  await expect(page.locator('div#svelte')).toContainText('If you save your edit, all changes made after this version will be lost.');
  await page.click('[data-test="tabs-main-goal"]');
  await expect(page.locator('div#svelte')).toContainText('You are viewing a revision');
  await page.click('[data-test="show-diff-link"]');
  await page.waitForSelector('[data-test=discuss-revision-button]');
  // await page.waitForTimeout(5000);
  await expect(page.locator('div#svelte')).toContainText('Versions differences');
  await page.click('[data-test=discuss-revision-button]');
  await page.waitForSelector('[data-test=post-title]');
  await expect(page.locator('[data-test=post-title]')).toHaveValue(/Discuss revision.*/);
  await page.fill('#post', 'Test post for cypress');
  await page.click('[data-test="post-button"]');
  await expect(page.locator('div#svelte')).toContainText('Answer');
  await page.fill('#reply', 'Answer on post');
  await page.click('[data-test="tabs-main-talk"]')
  await expect(page.locator('div#svelte')).toContainText('Title');
  await page.fill('#title', 'New title');
  await page.fill('#post', 'New post');
  await page.click('[data-test="post-button"]');
  await expect(page.locator('div#svelte')).toContainText('Answers');
  await page.waitForTimeout(1000);
  await page.click('[data-test="profile-link"]');
  await expect(page.locator('div#svelte')).toContainText('I can investigate and adjust subject 1 and subject 2 from your ');
  await expect(page.locator('div#svelte')).toContainText('I can describe and show subject 1 from a work sheet with extra info');
  await expect(page.locator('div#svelte')).toContainText('New title');
  await expect(page.locator('div#svelte')).toContainText('Discuss revision');
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
