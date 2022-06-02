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

test('Create activities and attach them @activity', async ({ page, domain, showAllConsole }) => {
  test.slow();
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

  await page.click('[data-test=user-menu]');
  await page.waitForTimeout(500);
  await page.click('#user-menu-item-teacher-room');
  await page.waitForTimeout(500);
  await page.click('[data-test=desktop-sidebar-menu] > [data-test=teacher-menu-concept-activity]');
  await expect(page.locator('[data-test=create-activity-button]')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.click('[data-test=create-activity-button]', { force: true });
  
  await page.click('[data-test=select-learning-goal-0]');
  await page.click("#explanation");
  await page.fill('#title', 'Test activity title');
  await page.fill('#description', "Test description $$\\cfrac{5}{4}$$");
  await page.click('[data-test=preview-description]');
  await page.fill('#difficulty', '2');

  await page.click('[data-test="add-plugin-button"]');
  await page.click('[data-test="plugin-option-vimeo-player"]');
  await page.waitForTimeout(500);
  await page.fill('#vimeo_id', '604675909');
  await page.click('[data-test="add-interrupt-+-button"]');
  await page.click('[data-test="plugin-option-multiple-choice"]');
  await page.waitForTimeout(500);
  await page.fill('#video_time', '2');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+1=$$..');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A1]');
  await page.fill('#answeranswer', '1');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A2]');
  await page.fill('#answeranswer', '2');
  await page.click('#answers_check');
  await page.click('[data-test=new-answer-button]');
  await page.click('[data-test=A3]');
  await page.fill('#answeranswer', '3');
  await page.click('[data-test=submit-activity-create-button]');

  // Preview of activity.
  await page.frameLocator('[data-test=vimeo-iframe]').locator(".play").click();
  await page.locator('[data-test=quiz-question]').waitFor();
  await expect(page.locator('[data-test=quiz-question]')).toContainText('1+1=');
  await page.click('[data-test=watch-image-video-button]');
  await page.click('[data-test=back-to-interruption]');
  await page.click('[data-test=input-value-0]');
  await page.click('[data-test=check-answer-button]');
  await expect(page.locator('[data-test=incorrect-feedback]')).toBeVisible();
  await page.click('[data-test=input-value-1]');
  await page.click('[data-test=check-answer-button]');
  await expect(page.locator('[data-test=incorrect-feedback]')).not.toBeVisible();
  await expect(page.locator('[data-test=correct-feedback]')).toBeVisible();
  await page.click('[data-test=continue-button]');
  await page.locator('[data-test=back-to-form-button]').scrollIntoViewIfNeeded();
  await page.click('[data-test=back-to-form-button]');

  // Edit form.
  await page.fill('#title', 'Test activity title changed');
  await expect(page.locator('[data-test=concept-status]')).toBeVisible();
  await page.fill('#description', "Test description $$\\cfrac{5}{3}$$");
  await page.click('[data-test=preview-description]');
  await page.fill('#difficulty', '3');
  await page.fill('#vimeo_id', '115154289');
  await page.click('[data-test="edit-plugin-0-button"]');
  await page.fill('#video_time', '3');
  await page.fill('#quiz_question', 'Weet jij het antwoord? $$1+2=$$..');
  await page.click('[data-test=A1]');
  await page.fill('#answeranswer', '3');
  await page.check('#answers_check');
  await page.click('[data-test=A2]');
  await page.fill('#answeranswer', '4');
  await page.uncheck('#answers_check');
  await page.click('[data-test=A3]');
  await page.fill('#answeranswer', '2');
  await page.click('[data-test=edit-activity-submit-button]');
  await page.locator('[data-test=back-to-form-button]').scrollIntoViewIfNeeded();
  await page.click('[data-test=back-to-form-button]');
  await page.click('[data-test=last-change-link]');
  await page.waitForSelector('[data-test=title-old]');
  await expect(page.locator('[data-test=title-old]')).toContainText('Test activity title');
  await expect(page.locator('[data-test=title-new]')).toContainText('Test activity title changed');
  await expect(page.locator('[data-test=descriptionRaw-old]')).toContainText('Test description $$\\cfrac{5}{4}$$');
  await expect(page.locator('[data-test=descriptionRaw-new]')).toContainText('Test description $$\\cfrac{5}{3}$$');
  await expect(page.locator('[data-test=difficulty-old]')).toContainText('Easy');
  await expect(page.locator('[data-test=difficulty-new]')).toContainText('Not easy, not difficult');

  await expect(page.locator('[data-test=plugins-old]')).toContainText('604675909');
  await expect(page.locator('[data-test=plugins-new]')).toContainText('115154289');
  await expect(page.locator('[data-test=plugins-old]')).toContainText('Weet jij het antwoord? $$1+1=$$..');
  await expect(page.locator('[data-test=plugins-new]')).toContainText('Weet jij het antwoord? $$1+2=$$..');
  await expect(page.locator('[data-test=plugins-old]')).toContainText("{\"answers\":[{\"answer\":\"1\",\"correct\":false},{\"answer\":\"2\",\"correct\":true},{\"answer\":\"3\",\"correct\":false}],\"question\":\"Weet jij het antwoord? $$1+1=$$..\"}");
  await expect(page.locator('[data-test=plugins-new]')).toContainText("{\"answers\":[{\"answer\":\"3\",\"correct\":true},{\"answer\":\"4\",\"correct\":false},{\"answer\":\"2\",\"correct\":false}],\"question\":\"Weet jij het antwoord? $$1+2=$$..\"}");
  await expect(page.locator('[data-test=plugins-old]')).toContainText("\"interruptionData\":{\"timeInVideo\":2}}");
  await expect(page.locator('[data-test=plugins-new]')).toContainText("\"interruptionData\":{\"timeInVideo\":3}}");

  await page.click('[data-test="show-all-activity-revisions-button"]');
  await page.waitForSelector('[data-test="revision-link-0"]');
  await expect(page.locator('[data-test="revision-link-0"]')).toBeVisible();
  await expect(page.locator('[data-test="revision-link-2"]')).not.toBeVisible();
  await page.click('[data-test="revision-link-1"]');
  await page.waitForSelector('[data-test=type-new]');
  await expect(page.locator('[data-test=type-new]')).toContainText('Explanation');
  await expect(page.locator('[data-test=title-new]')).toContainText("Test activity title");
  await expect(page.locator('[data-test=descriptionRaw-new]')).toContainText("Test description $$\\cfrac{5}{4}$$");
  await expect(page.locator('[data-test=difficulty-new]')).toContainText("Easy");

  await expect(page.locator('[data-test=plugins-new]')).toContainText("{\"answers\":[{\"answer\":\"1\",\"correct\":false},{\"answer\":\"2\",\"correct\":true},{\"answer\":\"3\",\"correct\":false}],\"question\":\"Weet jij het antwoord? $$1+1=$$..\"}");
  await expect(page.locator('[data-test=plugins-new]')).toContainText("\"interruptionData\":{\"timeInVideo\":2}}");

  await page.click('[data-test=reset-activity-to-revision-button]');
  await page.waitForSelector('#difficulty');
  await expect(page.locator('#difficulty')).toHaveValue('2');
  await page.click('[data-test=edit-activity-submit-button]');
  await page.click('[data-test=connect-activity-learning-goal-button]');
  await page.waitForSelector('[data-test=title-learning-goal-connection-page]');

  await expect(page.locator('[data-test=title-learning-goal-connection-page]')).toContainText("Connection learning goal activity information");
  await expect(page.locator('[data-test=field-Title]')).toContainText("Test activity title");
  await expect(page.locator('[data-test=field-Difficulty]')).toContainText("Easy");
  await expect(page.locator('[data-test=field-Type]')).toContainText("Explanation");
  await expect(page.locator('[data-test="connection-write-by-teacher-update-content-0"]')).toContainText("Activity connected to activity");
  await page.fill('#comment', "Hey this is a comment on a learning goal activity connection page");
  await page.click('[data-test=post-reaction-button]');
  await page.waitForSelector('[data-test="comment-teacher-content-1"]');
  await expect(page.locator('[data-test="comment-teacher-content-1"]')).toContainText("Hey this is a comment on a learning goal activity connection page");
  await page.click('[data-test=ready-to-publish-button]');
  await page.waitForSelector('[data-test="status-changed-content-2"]');
  await expect(page.locator('[data-test="status-changed-content-2"]')).toContainText("has changed the status to Needs approval just now");
  await page.click('[data-test=edit-activity-page-link]');
  await page.waitForSelector('[data-test=concept-status]');
  await expect(page.locator('[data-test=concept-status]')).toContainText("Open");
  await page.fill('#title', 'CHECKCHECKCHECK');
  await page.click('[data-test=edit-activity-submit-button]');
  await page.click('[data-test=update-activity-learning-goal-button]');
  await page.waitForSelector('[data-test="connection-write-by-teacher-update-content-3"]');
  await expect(page.locator('[data-test="connection-write-by-teacher-update-content-3"]')).toContainText("CHECKCHECKCHECK");
});

test.afterEach(async ({ page, domain, showAllConsole }, testInfo) => {
  printMessages(page, showAllConsole);
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalsactivityflow@example.com/clear');
  await page.waitForSelector('[data-test=complete]');
});
