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
  await page.goto(domain + '/cypress/module/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/revision/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/clear');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalscoursemodule@example.com/clear');
  await page.waitForSelector('[data-test=complete]');
});

test('Create course modules', async ({ page, domain, showAllConsole }) => {

  printMessages(page, showAllConsole);;
  // Load content needed for test.
  await page.goto(domain + '/cypress/user/deletegoalscoursemodule@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/logout');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/user/deletegoalscoursemodule@example.com/password/login');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/curriculumProfile/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/goal/add');
  await page.waitForSelector('[data-test=complete]');
  await page.goto(domain + '/cypress/map/course-test-map/add');
  await page.waitForSelector('[data-test=complete]');

  // Go to course module create form.
  await page.click('[data-cy=user-menu]');
  await page.waitForTimeout(300);
  await page.click('#user-menu-item-teacher-room');
  await page.click('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-modules]');
  await expect(page.locator('[data-cy=module-name-0]')).not.toBeVisible();
  await expect(page.locator('[data-cy=create-module-button-link]')).toBeVisible();
  await page.waitForTimeout(5000);
  await page.click('[data-cy=create-module-button-link]', { force: true });
  await page.fill('#name', 'Test module');
  await page.fill('#description', 'Test description');
  await page.selectOption('select#maps', { label: 'Map1' });
  await expect(page.locator('[data-cy=location-tab-l1]')).toBeVisible();
  await expect(page.locator('[data-cy=location-tab-l2]')).toBeVisible();
  await expect(page.locator('[data-cy=new-location-button]')).toBeVisible();
  await expect(page.locator('[data-cy=inhoud-button]')).toBeVisible();
  await expect(page.locator('[data-cy=paths-button]')).toBeVisible();
  await expect(page.locator('[data-cy=remove-location-button]')).toBeVisible();
  await expect(page.locator('[data-cy=create-module-submit-button]')).toBeVisible();

  // Add learning goals to location.
  await page.fill('#location_name', 'Test start location 1');
  await page.fill('[placeholder="Zoek voor leerdoelen"]', 'Cypress');
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=1");
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 2");

  // Change the waypoints.
  await page.click('[data-cy=waypoints-button]');
  await page.fill('#text_position_x', '300');
  await page.fill('#text_position_y', '500');
  await page.fill('#marker_position_x', '400');
  await page.fill('#marker_position_y', '500');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-cy=access-location-2]');

  // Change the paths.
  await page.click('[data-cy=paths-button]');
  await expect(page.locator('[data-cy=path-to-location-button-2]')).toContainText("L2");
  await expect(page.locator('[data-cy=start-location-point]')).toContainText("Start locatie: 400 - 500");
  await expect(page.locator('[data-cy=end-location-point]')).toContainText("Eind locatie: 500 - 650");
  await page.fill('#pointX', '450');
  await page.fill('#pointY', '550');
  await page.click('[data-cy=add-path-point-button]');
  await expect(page.locator('[data-cy=path-input-x-1]')).toHaveValue('450');
  await expect(page.locator('[data-cy=path-input-y-1]')).toHaveValue('550');
  await page.fill('[data-cy=path-input-x-1]', '200');
  await page.fill('[data-cy=path-input-y-1]', '430');

  // Location 2.
  await page.click('[data-cy=location-tab-l2]');
  await page.click('[data-cy=inhoud-button]');
  await expect(page.locator('#learning-goals')).toContainText('Nog geen leerdoelen aan activiteit toegevoegd');
  await page.fill('#location_name', 'Test start location 2');
  await page.fill('[placeholder="Zoek voor leerdoelen"]', 'Cypress');
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 1");

  await page.click('[data-cy=waypoints-button]');
  await expect(page.locator('#start_locations_check')).not.toBeChecked();

  await page.click("[data-cy=create-module-submit-button]");
  await expect(page.locator('[data-cy=alert-success-title]')).toContainText('Module succesvol aangemaakt');
  await page.click('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-modules]');
  await expect(page.locator('[data-cy=module-name-0]')).toContainText('Test module');
  // Edit form.
  await page.click('[data-cy=module-edit-button-0]');

  // Assert correct save of create form.
  await expect(page.locator('#name')).toHaveValue('Test module');
  await expect(page.locator('#description')).toHaveValue('Test description');
  await expect(page.locator('select#maps >> option.selected')).toContainText('Map1');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 1');
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 2");

  // Check waypoints.  
  await page.click('[data-cy=waypoints-button]');
  await expect(page.locator('#text_position_x')).toHaveValue('300');
  await expect(page.locator('#text_position_y')).toHaveValue('500');
  await expect(page.locator('#marker_position_x')).toHaveValue('400');
  await expect(page.locator('#marker_position_y')).toHaveValue('500');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-cy=access-location-2]');

  // Check paths.
  await page.click('[data-cy=paths-button]');
  await expect(page.locator('[data-cy=start-location-point]')).toContainText("Start locatie: 400 - 500");
  await expect(page.locator('[data-cy=end-location-point]')).toContainText("Eind locatie: 500 - 650");
  await expect(page.locator('[data-cy=path-input-x-1]')).toHaveValue('200');
  await expect(page.locator('[data-cy=path-input-y-1]')).toHaveValue('430');

  // Check location 2.
  await page.click('[data-cy=location-tab-l2]');
  await page.click('[data-cy=inhoud-button]');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 2');
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 1");

  // Edit the module.
  await page.click('[data-cy=location-tab-l1]');
  await page.fill('#name', 'Test module edited');
  await page.fill('#description', 'Test description edited');
  await page.fill('#location_name', 'Test start location 1 edited');
  await page.click("[data-cy=remove-goal-button-0]");
  await expect(page.locator('#learning-goals')).toContainText('Nog geen leerdoelen aan activiteit toegevoegd');

  await page.fill('[placeholder="Zoek voor leerdoelen"]', 'Cypress');
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 1");

  // Edit waypoints location 1.
  await page.click('[data-cy=waypoints-button]');
  await page.fill('#text_position_x', '350');
  await page.fill('#text_position_y', '550');
  await page.fill('#marker_position_x', '450');
  await page.fill('#marker_position_y', '550');

  await page.click('[data-cy=paths-button]');
  await expect(page.locator('[data-cy=path-to-location-button-2]')).toContainText("L2");
  await expect(page.locator('[data-cy=start-location-point]')).toContainText("Start locatie: 450 - 550");
  await expect(page.locator('[data-cy=end-location-point]')).toContainText("Eind locatie: 500 - 650");
  await page.fill('[data-cy=path-input-x-1]', '260');
  await page.fill('[data-cy=path-input-y-1]', '460');
  await page.fill('#pointX', '250');
  await page.fill('#pointY', '450');
  await page.click('[data-cy=add-path-point-button]');
  await expect(page.locator('[data-cy=path-input-x-1]')).toHaveValue('260');
  await expect(page.locator('[data-cy=path-input-y-1]')).toHaveValue('460');
  await expect(page.locator('[data-cy=path-input-x-2]')).toHaveValue('250');
  await expect(page.locator('[data-cy=path-input-y-2]')).toHaveValue('450');

  await page.click('[data-cy=location-tab-l2]');
  await page.click('[data-cy=inhoud-button]');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');
  await page.fill('#location_name', 'Test start location 2 edited');
  await page.fill('[placeholder="Zoek voor leerdoelen"]', 'Cypress');
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 1");
  await expect(page.locator('[data-cy=added-learning-goal-1]')).toContainText("Cypress Test Goal 2");
  await page.click("[data-cy=remove-goal-button-0]");
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');
  await page.click("[data-cy=edit-module-button]");


  // Check the results of the edit form.
  await page.click('[data-cy=user-menu]');
  await page.waitForTimeout(300);
  await page.click('#user-menu-item-teacher-room');
  await page.click('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-modules]');
  await expect(page.locator('[data-cy=module-name-0]')).toContainText('Test module edited');
  await page.click('[data-cy=module-edit-button-0]');
  await expect(page.locator('#name')).toHaveValue('Test module edited');
  await expect(page.locator('#description')).toHaveValue('Test description edited');
  await expect(page.locator('select#maps >> option.selected')).toContainText('Map1');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 1 edited');
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 1");

  // Check waypoints.  
  await page.click('[data-cy=waypoints-button]');
  await expect(page.locator('#text_position_x')).toHaveValue('350');
  await expect(page.locator('#text_position_y')).toHaveValue('550');
  await expect(page.locator('#marker_position_x')).toHaveValue('450');
  await expect(page.locator('#marker_position_y')).toHaveValue('550');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-cy=access-location-2]');

  // Check paths.
  await page.click('[data-cy=paths-button]');
  await expect(page.locator('[data-cy=start-location-point]')).toContainText("Start locatie: 450 - 550");
  await expect(page.locator('[data-cy=end-location-point]')).toContainText("Eind locatie: 500 - 650");
  await expect(page.locator('[data-cy=path-input-x-1]')).toHaveValue('260');
  await expect(page.locator('[data-cy=path-input-y-1]')).toHaveValue('460');
  await expect(page.locator('[data-cy=path-input-x-2]')).toHaveValue('250');
  await expect(page.locator('[data-cy=path-input-y-2]')).toHaveValue('450');

  // Check location 2.
  await page.click('[data-cy=location-tab-l2]');
  await page.click('[data-cy=inhoud-button]');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 2 edited');
  await expect(page.locator('[data-cy=added-learning-goal-0]')).toContainText("Cypress Test Goal 2");

  await page.click('[data-cy=desktop-logo]');
  await expect(page.locator('[data-cy=module-0-title-link]')).toContainText('Test module edited');
});