const getIframeOfVimeo = () => {
  return cy
    .get('iframe[data-cy="vimeo-iframe"]')
    .its('0.contentDocument').should('exist')
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
}

describe("Unlock location on map test", () => {
  it("Goes to the map. Visits a location and goes on adventure. Should unlock locations.", () => {
    cy.visit('http://sveltekit:3000/cypress/login-normal-user').contains('Login complete');
    cy.visit('http://sveltekit:3000/cypress/reset-map').contains('Player map is deleted!', {timeout: 100000});
    cy.get(':nth-child(1) > [data-cy=logo]').click();
    cy.get('.locked_marker_1').first().should('be.visible')
    cy.get('#map').not('.unlocked_marker_1');
    cy.get('.unlocked_marker_0').first().should('be.visible').click({ force: true });   
    // Click adventure link.
    cy.get('[href="/e0gBgbnAtztC78gHjhsb/IoangRp3XdQCGi86C4fz"] > .col-span-1').click();
    getIframeOfVimeo().find('.play').click()
    .get(':nth-child(1) > .text-lg').contains('Can you press the correct answer Cypress?').should('be.visible');
    getIframeOfVimeo().get('[data-cy=watch-image-video-button]').click();
    getIframeOfVimeo().get('[data-cy=back-to-quiz-button]').click();
    getIframeOfVimeo().get('[data-cy=input-value-1]').click();
    getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    getIframeOfVimeo().get('[data-cy=incorrect-feedback]').should('be.visible');
    getIframeOfVimeo().get('[data-cy=input-value-0]').click();
    getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    getIframeOfVimeo().not('[data-cy=incorrect-feedback]');
    getIframeOfVimeo().get('[data-cy=correct-feedback]').should('be.visible');
    getIframeOfVimeo().get('[data-cy=continue-button]').click();
    getIframeOfVimeo().get('[data-cy=just-right]').should('be.visible').click();
    cy.get('.unlocked_marker_1').first().should('be.visible')
    cy.get('#map').not('.locked_marker_1');
    cy.get('.unlocked_marker_1').first().click({ force: true });
    cy.get('#map').not('.unlocked_marker_3');
    // Click adventure link.
    cy.get('[href="/YRuPvnC4jJCQisbrgSb6/4EZ3exPKUfyn8SyyejT7"] > .col-span-1').click();
    cy.get('[data-cy=attack_v1]').should('be.visible'). should('be.disabled');
    cy.get('[data-cy=answer_v2_1]').click();
    cy.get('[data-cy=attack_v1]').click();
    cy.get('[data-cy=defeated').should('be.visible');
    getIframeOfVimeo().find('.play').click()
    getIframeOfVimeo().get('[data-cy=too-easy]').should('be.visible').click();
    cy.get('[data-cy=attack_v1]').should('be.visible'). should('be.disabled');
    cy.get('[data-cy=answer_v2_2]').click();
    cy.get('[data-cy=attack_v1]').click();
    cy.get('[data-cy=won').should('be.visible');
    cy.get('.unlocked_marker_3').first().should('be.visible');
    cy.get('#map').not('.locked_marker_3');
    cy.visit('http://sveltekit:3000/cypress/reset-map').contains('Player map is deleted!', {timeout: 100000});
  });
});


// describe('Visit learning goal map', () => {
//   it('Visits the website', () => {

//     cy.visit('http://localhost:3000/')
//     cy.wait(2000)
//     cy.window().then(win => {
//       // cy.stub(win, 'open').as('Open')
//     })
//     cy.contains('Sign in').click()
//     // cy.get('@Open').should('be.called');
//   })
// })