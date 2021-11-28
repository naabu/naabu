const getIframeOfVimeo = () => {
  return cy
    .get('iframe[data-cy="vimeo-iframe"]')
    .its('0.contentDocument').should('exist')
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
}

describe("Create activities", () => {
  it("All things related to activities and connecting them with learning goals", () => {
    cy.visit('http://sveltekit:3000/cypress/login-normal-user').contains('Login complete');
    // cy.visit('http://sveltekit:3000/cypress/reset-learning-goals').contains('learning goal ready for testing')
    // cy.get('[data-cy=user-menu]').click();
    // cy.get('#user-menu-item-teacher-room').click();
    // cy.get('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-concept-activity]').click();
    // cy.get('[data-cy=create-activity-button]').should('be.visible').click({force: true});
    // cy.get('a[href*="/lerarenkamer/activiteit/maken/cypress-test-goal-1"]').click()

    // cy.get('#explanation').click();
    // cy.get('#title').type("Test activity title");
    // cy.get('#description').type("Test description $$\\cfrac{{}5}{{}4}$$")
    // cy.get('.preview-button').click();
    // cy.get('#difficulty').clear().type(2);
    // cy.get('#vimeo_id').type(604675909);
    // cy.get('[data-cy=add-question-button]').click();
    // cy.get('#quiz_video_time').type(2);
    // cy.get('#quiz_question').clear().type('Weet jij het antwoord? $$1+1=$$..');
    // cy.get('[data-cy=new-answer-button]').click();
    // cy.get('[data-cy=A1]').click();
    // cy.get('#answeranswer').clear().type('1');
    // cy.get('[data-cy=new-answer-button]').click();
    // cy.get('[data-cy=A2]').click();
    // cy.get('#answeranswer').clear().type('2');
    // cy.get('#answers_check').check();
    // cy.get('[data-cy=new-answer-button]').click();
    // cy.get('[data-cy=A3]').click();
    // cy.get('#answeranswer').clear().type('3');
    // cy.get('[data-cy=submit-activity-create-button]').click();
    // getIframeOfVimeo().find('.play').click()
    // getIframeOfVimeo().get('[data-cy=watch-image-video-button]').click();
    // getIframeOfVimeo().get('[data-cy=back-to-quiz-button]').click();
    // getIframeOfVimeo().get('[data-cy=input-value-0]').click();
    // getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    // getIframeOfVimeo().get('[data-cy=incorrect-feedback]').should('be.visible');
    // getIframeOfVimeo().get('[data-cy=input-value-1]').click();
    // getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    // getIframeOfVimeo().not('[data-cy=incorrect-feedback]');
    // getIframeOfVimeo().get('[data-cy=correct-feedback]').should('be.visible');
    // getIframeOfVimeo().get('[data-cy=continue-button]').click();
    // getIframeOfVimeo().get('[data-cy=just-right]').should('be.visible').click();
    // cy.get('[data-cy=back-to-form-button]').click();
    // cy.get('[data-cy=concept-status]').should('be.visible');
  });
});
