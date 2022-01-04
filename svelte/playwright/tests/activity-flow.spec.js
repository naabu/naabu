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
  test.slow();
  // await page.goto(domain + '/cypress/module/clear');
  // await page.waitForSelector('[data-test=complete]');
  // await page.goto(domain + '/cypress/map/clear');
  // await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsactivityflow@example.com/clear');
  await page.waitForSelector('[data-test=complete]');
});

test('Create activities and attach them', async ({ page, domain, showAllConsole }) => {
  printMessages(page, showAllConsole);;
  // Load content needed for test.
  await page.goto(domain + '/cypress/user/deletegoalsactivityflow@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsactivityflow@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');

  await page.goto(domain + '/cypress/curriculumProfile/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/add');
  await page.waitForSelector('[data-test=complete]');

  await page.click('[data-cy=user-menu]');
  await page.waitForTimeout(300);
  await page.click('#user-menu-item-teacher-room');
  await page.click('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-concept-activity]');
  await expect(page.locator('[data-cy=create-activity-button]')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.click('[data-cy=create-activity-button]', { force: true });

  // Select learning goal.
  await page.click('[data-cy=select-learning-goal-0]');
  
  // Create form.
  // Click type.
  await page.click("#explanation");
  await page.fill('#title', 'Test activity title');
  await page.fill('#description', "Test description $$\\cfrac{5}{4}$$");
  await page.click('.preview-button');
  await page.fill('#difficulty', '2');
  await page.fill('#vimeo_id', '604675909');
  await page.click('[data-cy=add-question-button]');
  await page.fill('#quiz_video_time', '2');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+1=$$..');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer', '2');
  await page.click('#answers_check');
  await page.click('[data-cy=new-answer-button]');
  await page.click('[data-cy=A3]');
  await page.fill('#answeranswer', '3');
  await page.click('[data-cy=submit-activity-create-button]');

  // Preview of activity.
  await page.frameLocator('[data-cy=vimeo-iframe]').locator(".play").click();
  await page.locator('[data-test=quiz-question]').waitFor();
  await expect(page.locator('[data-test=quiz-question]')).toContainText('1+1=');
  await page.click('[data-cy=watch-image-video-button]');
  await page.click('[data-cy=back-to-quiz-button]');
  await page.click('[data-cy=input-value-0]');
  await page.click('[data-cy=check-answer-button]');
  await expect(page.locator('[data-cy=incorrect-feedback]')).toBeVisible();
  await page.click('[data-cy=input-value-1]');
  await page.click('[data-cy=check-answer-button]');
  await expect(page.locator('[data-cy=incorrect-feedback]')).not.toBeVisible();
  await expect(page.locator('[data-cy=correct-feedback]')).toBeVisible();
  await page.click('[data-cy=continue-button]');
  await page.locator('[data-cy=back-to-form-button]').scrollIntoViewIfNeeded();
  await page.click('[data-cy=back-to-form-button]');

  // Edit form.
  await page.fill('#title', 'Test activity title changed');
  await expect(page.locator('[data-cy=concept-status]')).toBeVisible();
  await page.fill('#description', "Test description $$\\cfrac{5}{3}$$");
  await page.click('[data-cy=preview-description]');
  await page.fill('#difficulty', '3');
  await page.fill('#vimeo_id', '115154289');
  await page.fill('#quiz_video_time', '3');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+2=$$..');
  await page.click('[data-cy=A1]');
  await page.fill('#answeranswer', '3');
  await page.check('#answers_check');
  await page.click('[data-cy=A2]');
  await page.fill('#answeranswer', '4');
  await page.uncheck('#answers_check');
  await page.click('[data-cy=A3]');
  await page.fill('#answeranswer', '2');
  await page.click('[data-cy=edit-activity-submit-button]');
  await page.locator('[data-cy=back-to-form-button]').scrollIntoViewIfNeeded();
  await page.click('[data-cy=back-to-form-button]');
  // Click revisions - changes with Force?
  await page.click('[data-cy=last-change-link]');
  await expect(page.locator('[data-cy="Titel:-old"]')).toContainText('Test activity title');
  await expect(page.locator('[data-cy="Titel:-new"]')).toContainText('Test activity title changed');
  await expect(page.locator('[data-cy="Beschrijving:-old"]')).toContainText('Test description $$\\cfrac{5}{4}$$');
  await expect(page.locator('[data-cy="Beschrijving:-new"]')).toContainText('Test description $$\\cfrac{5}{3}$$');
  await expect(page.locator('[data-cy="Moeilijkheid:-old"]')).toContainText('Makkelijk');
  await expect(page.locator('[data-cy="Moeilijkheid:-new"]')).toContainText('Niet makkelijk, niet moeilijk');
  await expect(page.locator('[data-cy="Video - vimeo id:-old"]')).toContainText('604675909');
  await expect(page.locator('[data-cy="Video - vimeo id:-new"]')).toContainText('115154289');
  await expect(page.locator('[data-cy="Quiz - vraag 1 - vraag:-old"]')).toContainText('Weet jij het antwoord? $$1+1=$$..');
  await expect(page.locator('[data-cy="Quiz - vraag 1 - vraag:-new"]')).toContainText('Weet jij het antwoord? $$1+2=$$..');
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-old"]')).toContainText("Nee");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-new"]')).toContainText("Ja");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 1:-old"]')).toContainText("1");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 1:-new"]')).toContainText("3");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-old"]')).toContainText("Ja");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-new"]')).toContainText("Nee");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2:-old"]')).toContainText("2");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2:-new"]')).toContainText("4");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 3:-old"]')).toContainText("3");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 3:-new"]')).toContainText("2");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - tijd in video:-old"]')).toContainText("2");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - tijd in video:-new"]')).toContainText("3");

  await page.click('[data-cy="show-all-activity-revisions-button"]');
  await expect(page.locator('[data-cy="revision-link-0"]')).toBeVisible();
  await expect(page.locator('[data-cy="revision-link-2"]')).not.toBeVisible();
  await page.click('[data-cy="revision-link-1"]');

  await expect(page.locator('[data-cy="Type:-new"]')).toContainText('Uitleg');
  await expect(page.locator('[data-cy="Titel:-new"]')).toContainText("Test activity title");
  await expect(page.locator('[data-cy="Beschrijving:-new"]')).toContainText("Test description $$\\cfrac{5}{4}$$");
  await expect(page.locator('[data-cy="Moeilijkheid:-new"]')).toContainText("Makkelijk");
  await expect(page.locator('[data-cy="Video - vimeo id:-new"]')).toContainText("604675909");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - vraag:-new"]')).toContainText("Weet jij het antwoord? $$1+1=$$..");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-new"]')).toContainText("Nee");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-new"]')).toContainText("Ja");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 2:-new"]')).toContainText("2");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 3 - goed antwoord:-new"]')).toContainText("Nee");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - antwoord 3:-new"]')).toContainText("3");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - tijd in video:-new"]')).toContainText("2");
  await expect(page.locator('[data-cy="Quiz - vraag 1 - Type:-new"]')).toContainText("Geen type");
  await page.click('[data-cy=reset-activity-to-revision-button]');
  await page.waitForTimeout(1000);
  await page.waitForTimeout('#difficulty');
  await expect(page.locator('#difficulty')).toHaveValue('2');
  await page.click('[data-cy=edit-activity-submit-button]');
  await page.click('[data-cy=connect-activity-learning-goal-button]');
  await expect(page.locator('[data-cy=title-learning-goal-connection-page]')).toContainText("Koppeling leerdoel activiteit informatie");
  await expect(page.locator('[data-cy=field-Titel]')).toContainText("Test activity title");
  await expect(page.locator('[data-cy=field-Moeilijkheid]')).toContainText("Makkelijk");
  await expect(page.locator('[data-cy=field-Type]')).toContainText("Uitleg");
  await expect(page.locator('[data-cy="connection-write-by-teacher-update-content-0"]')).toContainText("Activiteit gekoppeld met leerdoel");
  await page.fill('#comment', "Hey this is a comment on a learning goal activity connection page");
  await page.click('[data-cy=post-reaction-button]');
  await expect(page.locator('[data-cy="comment-teacher-content-1"]')).toContainText("Hey this is a comment on a learning goal activity connection page");
  await page.click('[data-cy=ready-to-publish-button]');
  await expect(page.locator('[data-cy="status-changed-content-2"]')).toContainText("heeft de status gewijzigd naar Goedkeuring nodig zojuist");
  await page.click('[data-cy=edit-activity-page-link]');
  await expect(page.locator('[data-cy=concept-status]')).toContainText("Open");
  await page.fill('#title', 'CHECKCHECKCHECK');
  await page.click('[data-cy=edit-activity-submit-button]');
  await page.click('[data-cy=update-activity-learning-goal-button]');
  await expect(page.locator('[data-cy="connection-write-by-teacher-update-content-3"]')).toContainText("Activiteit is geupdate");
  await expect(page.locator('[data-cy="connection-write-by-teacher-update-content-3"]')).toContainText("CHECKCHECKCHECK");
});