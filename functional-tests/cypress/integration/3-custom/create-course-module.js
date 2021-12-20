beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.clearFirebaseAuth();
});

describe("Create course modules", () => {
  it("Creating the map, attaching learning goals and saving and editing them", () => {
    cy.visit('http://sveltekit:3000/cypress/login-normal-user').contains('Login complete');
    cy.visit('http://sveltekit:3000/cypress/reset-learning-goals').contains('learning goal ready for testing');
    cy.get('[data-cy=user-menu]').click();
    cy.get('#user-menu-item-teacher-room').click();
    cy.get('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-modules]').click();
    cy.get('[data-cy=create-module-button]').click({ force: true });
    cy.get('#name').type('Test module');
    cy.get('#description').type('Test description');
    cy.get('#maps').select('Growthopia');
    cy.get('[data-cy=location-tab-l1]').should('be.visible');
    cy.get('[data-cy=location-tab-l2]').should('be.visible');
    cy.get('[data-cy=location-tab-l3]').should('be.visible');
    cy.get('[data-cy=location-tab-l4]').should('be.visible');
    cy.get('[data-cy=new-location-button]').should('be.visible');
    cy.get('[data-cy=inhoud-button]').should('be.visible');
    cy.get('[data-cy=paths-button]').should('be.visible');
    cy.get('[data-cy=remove-location-button]').should('be.visible');
    cy.get('[data-cy=create-module-button]').should('be.visible');
    cy.get('#location_name').clear().type('Test start location 1');
    cy.get("#autocomplete-leerdoelen").find('input').clear().type('Cypress');
    // cy.get('#autocomplete-0-input').type('Cypress');
    cy.get(".aa-Panel").find(".aa-List").first().contains("Cypress Test Goal 1");
    cy.get(".aa-Panel").find(".aa-List>li").eq(1).contains("Cypress Test Goal 2").click();


    // cy.get("#autocomplete-0-item-0").contains("Cypress Test Goal 1");
    // cy.get("#autocomplete-0-item-1").contains("Cypress Test Goal 2").click();
    cy.get('[data-cy=added-learning-goal-0]').contains("Cypress Test Goal 2");

    // Change the waypoints.
    cy.get('[data-cy=waypoints-button]').click();
    cy.get('#text_position_x').clear().type('300');
    cy.get('#text_position_y').clear().type('500');
    cy.get('#marker_position_x').clear().type('400');
    cy.get('#marker_position_y').clear().type('500');
    cy.get('#answers_check').should('be.checked');
    cy.get('[data-cy=access-location-2]').should('be.checked');
    cy.get('[data-cy=access-location-3]').click().should('be.checked');

    // Change the paths
    cy.get('[data-cy=paths-button]').click();
    cy.get('[data-cy=path-to-location-button-3]').contains("L3");
    cy.get('[data-cy=start-location-point]').contains("Start locatie: 400 - 500");
    cy.get('[data-cy=end-location-point]').contains("Eind locatie: 370 - 540");
    cy.get("#pointX").clear().type('450');
    cy.get("#pointY").clear().type('550');
    cy.get('[data-cy=add-path-point-button]').click();
    cy.get('[data-cy=path-input-x-4]').should('have.value', '450');
    cy.get('[data-cy=path-input-y-4]').should('have.value', '550');
    cy.get('[data-cy=path-input-x-1]').clear().type('200');
    cy.get('[data-cy=path-input-y-1]').clear().type('430');
    // path-input-x-4
    
    cy.get('[data-cy=location-tab-l2]').click();
    cy.get('[data-cy=inhoud-button]').click();
    cy.get('#learning-goals').contains('Nog geen leerdoelen aan activiteit toegevoegd');
    cy.get('#location_name').clear().type('Test start location 2');
    cy.get("#autocomplete-leerdoelen").find('input').clear().type('Cypress');
    // cy.get('#autocomplete-0-input').clear().type('Cypress');
    cy.get(".aa-Panel").find(".aa-List>li").eq(1).contains("Cypress Test Goal 2");
    cy.get(".aa-Panel").find(".aa-List").first().contains("Cypress Test Goal 1").click();
    cy.get('[data-cy=added-learning-goal-0]').contains("Cypress Test Goal 1");
    cy.get("[data-cy=create-module-button]").click();
  });
});
