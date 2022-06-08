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


test('Create course modules @module', async ({ page, domain, showAllConsole }) => {
  test.slow();
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
  await page.waitForTimeout(3000);

  // Go to course module create form.
  await page.click('[data-test=user-menu]');
  await page.waitForTimeout(500);
  await page.click('#user-menu-item-teacher-room');
  await page.waitForTimeout(500);
  await page.click('[data-test=desktop-sidebar-menu] > [data-test=teacher-menu-modules]');
  await page.waitForSelector('[data-test=create-module-button-link]');
  await expect(page.locator('[data-test=create-module-button-link]')).toBeVisible();
  await expect(page.locator('[data-test=module-name-0]')).not.toBeVisible();

  // await page.waitForTimeout(5000);
  // await page.goto(domain + '/lerarenkamer/module/maken');
  await page.click('[data-test=create-module-button-link]');
  await page.fill('#name', 'Test course module create');
  await page.fill('#description', 'Test description');
  await page.selectOption('select#maps', { label: 'Map1' });
  await page.waitForSelector('[data-test=location-tab-l1]');
  await expect(page.locator('[data-test=location-tab-l1]')).toBeVisible();
  await expect(page.locator('[data-test=location-tab-l2]')).toBeVisible();
  await expect(page.locator('[data-test=inhoud-button]')).toBeVisible();
  await expect(page.locator('[data-test=paths-button]')).toBeVisible();
  await expect(page.locator('[data-test=remove-location-button]')).toBeVisible();
  await expect(page.locator('[data-test=create-module-submit-button]')).toBeVisible();

  // Add learning goals to location.
  await page.fill('#location_name', 'Test start location 1');
  await page.fill('[placeholder="Search for learning goals"]', 'Cypress');

  // Algolia autocomplete.
  await page.waitForSelector(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=1");
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');

  // Change the waypoints.
  await page.click('[data-test=waypoints-button]');
  await page.fill('#text_position_x', '300');
  await page.fill('#text_position_y', '500');
  await page.fill('#marker_position_x', '400');
  await page.fill('#marker_position_y', '500');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-test=access-location-2]');

  // Change the paths.
  await page.click('[data-test=paths-button]');
  await page.waitForSelector('[data-test=path-to-location-button-2]');
  await expect(page.locator('[data-test=path-to-location-button-2]')).toContainText("L2");
  await expect(page.locator('[data-test=start-location-point]')).toContainText("Start location: 400 - 500");
  await expect(page.locator('[data-test=end-location-point]')).toContainText("End location: 500 - 650");
  await page.fill('#pointX', '450');
  await page.fill('#pointY', '550');
  await page.click('[data-test=add-path-point-button]');
  await page.waitForSelector('[data-test=path-input-x-1]');
  await expect(page.locator('[data-test=path-input-x-1]')).toHaveValue('450');
  await expect(page.locator('[data-test=path-input-y-1]')).toHaveValue('550');
  await page.fill('[data-test=path-input-x-1]', '200');
  await page.fill('[data-test=path-input-y-1]', '430');

  // Location 2.
  await page.click('[data-test=location-tab-l2]');
  await page.click('[data-test=inhoud-button]');
  await page.waitForSelector('#learning-goals');
  await expect(page.locator('#learning-goals')).toContainText('No goals connected');
  await page.fill('#location_name', 'Test start location 2');

  // Autocomplete Algolia widget.
  await page.fill('[placeholder="Search for learning goals"]', 'Cypress');
  await page.waitForSelector(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');

  await page.click('[data-test=waypoints-button]');
  await page.waitForSelector('#start_locations_check');
  await expect(page.locator('#start_locations_check')).not.toBeChecked();

  await page.click("[data-test=create-module-submit-button]");
  await page.waitForSelector('[data-test=alert-success-title]');
  await expect(page.locator('[data-test=alert-success-title]')).toContainText('Module successfully created');
  await page.click('[data-test=desktop-sidebar-menu] > [data-test=teacher-menu-modules]');

  // Click the action link.
  let courseModule = await page.locator("xpath=(//text()[contains(., 'Test course module create')]/../../../td[3]/a)[2]");
  await courseModule.click();

  await page.waitForSelector('#name');
  // Assert correct save of create form.
  await expect(page.locator('#name')).toHaveValue('Test course module create');
  await expect(page.locator('#description')).toHaveValue('Test description');
  await expect(page.locator('select#maps >> option.selected')).toContainText('Map1');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 1');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');

  // Check waypoints.  
  await page.click('[data-test=waypoints-button]');
  await page.waitForSelector('#text_position_x');
  await expect(page.locator('#text_position_x')).toHaveValue('300');
  await expect(page.locator('#text_position_y')).toHaveValue('500');
  await expect(page.locator('#marker_position_x')).toHaveValue('400');
  await expect(page.locator('#marker_position_y')).toHaveValue('500');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-test=access-location-2]');

  // Check paths.
  await page.click('[data-test=paths-button]');
  await page.waitForSelector('[data-test=start-location-point]');
  await expect(page.locator('[data-test=start-location-point]')).toContainText("Start location: 400 - 500");
  await expect(page.locator('[data-test=end-location-point]')).toContainText("End location: 500 - 650");
  await expect(page.locator('[data-test=path-input-x-1]')).toHaveValue('200');
  await expect(page.locator('[data-test=path-input-y-1]')).toHaveValue('430');

  // Check location 2.
  await page.click('[data-test=location-tab-l2]');
  await page.click('[data-test=inhoud-button]');
  await page.waitForSelector('#location_name');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 2');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');

  // Edit the module.
  await page.click('[data-test=location-tab-l1]');
  await page.fill('#name', 'Test module edited');
  await page.fill('#description', 'Test description edited');
  await page.fill('#location_name', 'Test start location 1 edited');
  await page.click("[data-test=remove-goal-button-0]");
  await page.waitForSelector('#learning-goals');
  await expect(page.locator('#learning-goals')).toContainText('No goals connected');

  await page.fill('[placeholder="Search for learning goals"]', 'Cypress');
  await page.waitForSelector(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 1");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=1")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');

  // Edit waypoints location 1.
  await page.click('[data-test=waypoints-button]');
  await page.fill('#text_position_x', '350');
  await page.fill('#text_position_y', '550');
  await page.fill('#marker_position_x', '450');
  await page.fill('#marker_position_y', '550');

  await page.click('[data-test=paths-button]');
  await page.waitForSelector('[data-test=path-to-location-button-2]');
  await expect(page.locator('[data-test=path-to-location-button-2]')).toContainText("L2");
  await expect(page.locator('[data-test=start-location-point]')).toContainText("Start location: 450 - 550");
  await expect(page.locator('[data-test=end-location-point]')).toContainText("End location: 500 - 650");
  await page.fill('[data-test=path-input-x-1]', '260');
  await page.fill('[data-test=path-input-y-1]', '460');
  await page.fill('#pointX', '250');
  await page.fill('#pointY', '450');
  await page.click('[data-test=add-path-point-button]');
  await page.waitForSelector('[data-test=path-input-x-1]');
  await expect(page.locator('[data-test=path-input-x-1]')).toHaveValue('260');
  await expect(page.locator('[data-test=path-input-y-1]')).toHaveValue('460');
  await expect(page.locator('[data-test=path-input-x-2]')).toHaveValue('250');
  await expect(page.locator('[data-test=path-input-y-2]')).toHaveValue('450');

  await page.click('[data-test=location-tab-l2]');
  await page.click('[data-test=inhoud-button]');
  await page.waitForSelector('#learning-goals');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');
  await page.fill('#location_name', 'Test start location 2 edited');
  await page.fill('[placeholder="Search for learning goals"]', 'Cypress');
  await page.waitForSelector(".aa-Panel >> .aa-List >> li >> nth=0");
  await expect(page.locator(".aa-Panel >> .aa-List >> li >> nth=0")).toContainText("Cypress Test Goal 2");
  await page.click(".aa-Panel >> .aa-List >> li >> nth=0");
  await page.waitForSelector('#learning-goals');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');
  await page.click("[data-test=remove-goal-button-0]");
  await page.waitForSelector('#learning-goals');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');
  await page.click("[data-test=edit-module-button]");


  // Check the results of the edit form.
  await page.click('[data-test=user-menu]');
  await page.waitForTimeout(500);
  await page.click('#user-menu-item-teacher-room');
  await page.waitForTimeout(500);
  await page.click('[data-test=desktop-sidebar-menu] > [data-test=teacher-menu-modules]');
  await expect(page.locator('[data-test=module-name-0]')).toContainText('Test module edited');
  await page.click('[data-test=module-edit-button-0]');
  await page.waitForSelector('#name');
  await expect(page.locator('#name')).toHaveValue('Test module edited');
  await expect(page.locator('#description')).toHaveValue('Test description edited');
  await expect(page.locator('select#maps >> option.selected')).toContainText('Map1');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 1 edited');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 1');

  // Check waypoints.  
  await page.click('[data-test=waypoints-button]');
  await page.waitForSelector('#text_position_x');
  await expect(page.locator('#text_position_x')).toHaveValue('350');
  await expect(page.locator('#text_position_y')).toHaveValue('550');
  await expect(page.locator('#marker_position_x')).toHaveValue('450');
  await expect(page.locator('#marker_position_y')).toHaveValue('550');
  await page.isChecked('#start_locations_check');
  await page.isChecked('[data-test=access-location-2]');

  // Check paths.
  await page.click('[data-test=paths-button]');
  await page.waitForSelector('[data-test=start-location-point]');
  await expect(page.locator('[data-test=start-location-point]')).toContainText("Start location: 450 - 550");
  await expect(page.locator('[data-test=end-location-point]')).toContainText("End location: 500 - 650");
  await expect(page.locator('[data-test=path-input-x-1]')).toHaveValue('260');
  await expect(page.locator('[data-test=path-input-y-1]')).toHaveValue('460');
  await expect(page.locator('[data-test=path-input-x-2]')).toHaveValue('250');
  await expect(page.locator('[data-test=path-input-y-2]')).toHaveValue('450');

  // Check location 2.
  await page.click('[data-test=location-tab-l2]');
  await page.click('[data-test=inhoud-button]');
  await page.waitForSelector('#location_name');
  await expect(page.locator('#location_name')).toHaveValue('Test start location 2 edited');
  await expect(page.locator('#learning-goals')).toContainText('Cypress Test Goal 2');

  await page.click('[data-test=desktop-logo]');
  await page.waitForSelector('text=Test module edited');
});

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
