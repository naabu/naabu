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
    cy.get('#autocomplete-0-input').type('Cypress');
    
  });
});
