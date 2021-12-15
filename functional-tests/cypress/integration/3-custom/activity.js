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
    cy.get('[data-cy=user-menu]', {timeout: 100000}).click();
    cy.get('#user-menu-item-teacher-room').click();
    cy.get('[data-cy=desktop-sidebar-menu] > [data-cy=teacher-menu-concept-activity]').click();
    cy.get('[data-cy=create-activity-button]').should('be.visible').click({ force: true });
    cy.get('[data-cy=select-learning-goal-0]').click();
    cy.get('#explanation').click();
    cy.get('#title').type("Test activity title");
    cy.get('#description').type("Test description $$\\cfrac{{}5}{{}4}$$")
    cy.get('.preview-button').click();
    cy.get('#difficulty').clear().type(2);
    cy.get('#vimeo_id').type(604675909);
    cy.get('[data-cy=add-question-button]').click();
    cy.get('#quiz_video_time').type(2);
    cy.get('#quiz_question').clear().type('Weet jij het antwoord? $$1+1=$$..');
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A1]').click();
    cy.get('#answeranswer').clear().type('1');
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A2]').click();
    cy.get('#answeranswer').clear().type('2');
    cy.get('#answers_check').check();
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A3]').click();
    cy.get('#answeranswer').clear().type('3');
    cy.get('[data-cy=submit-activity-create-button]').click();
    getIframeOfVimeo().find('.play').click()
    getIframeOfVimeo().get('[data-cy=watch-image-video-button]').click();
    getIframeOfVimeo().get('[data-cy=back-to-quiz-button]').click();
    getIframeOfVimeo().get('[data-cy=input-value-0]').click();
    getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    getIframeOfVimeo().get('[data-cy=incorrect-feedback]').should('be.visible');
    getIframeOfVimeo().get('[data-cy=input-value-1]').click();
    getIframeOfVimeo().get('[data-cy=check-answer-button]').click();
    getIframeOfVimeo().not('[data-cy=incorrect-feedback]');
    getIframeOfVimeo().get('[data-cy=correct-feedback]').should('be.visible');
    getIframeOfVimeo().get('[data-cy=continue-button]').click();
    cy.get('[data-cy=back-to-form-button]').click();
    cy.get('[data-cy=concept-status]').should('be.visible');
    cy.get('#title').clear().type("Test activity title changed");
    cy.get('#description').clear().type("Test description $$\\cfrac{{}5}{{}3}$$")
    cy.get('[data-cy=preview-description]').click();
    cy.get('#difficulty').clear().type(3);
    cy.get('#vimeo_id').clear().type(115154289);
    cy.get('#quiz_video_time').clear().type(3);
    cy.get('#quiz_question').clear().type('Weet jij het antwoord? $$1+2=$$..');
    cy.get('[data-cy=A1]').click();
    cy.get('#answeranswer').clear().type('3');
    cy.get('#answers_check').check();
    cy.get('[data-cy=A2]').click();
    cy.get('#answeranswer').clear().type('4');
    cy.get('#answers_check').uncheck();
    cy.get('[data-cy=A3]').click();
    cy.get('#answeranswer').clear().type('2');
    cy.get('[data-cy=edit-activity-submit-button]').click();
    cy.get('[data-cy=back-to-form-button]').click();
    cy.get('[data-cy=last-change-link]').click({ force: true });
    cy.get('[data-cy="Titel:-old"]').contains('Test activity title');
    cy.get('[data-cy="Titel:-new"]').contains('Test activity title changed');
    cy.get('[data-cy="Beschrijving:-old"]').contains('Test description $$\\cfrac{5}{4}$$');
    cy.get('[data-cy="Beschrijving:-new"]').contains('Test description $$\\cfrac{5}{3}$$');
    cy.get('[data-cy="Moeilijkheid:-old"]').contains('Makkelijk');
    cy.get('[data-cy="Moeilijkheid:-new"]').contains('Niet makkelijk, niet moeilijk');
    cy.get('[data-cy="Video - vimeo id:-old"]').contains('604675909');
    cy.get('[data-cy="Video - vimeo id:-new"]').contains('115154289');
    cy.get('[data-cy="Quiz - vraag 1 - vraag:-old"]').contains('Weet jij het antwoord? $$1+1=$$..');
    cy.get('[data-cy="Quiz - vraag 1 - vraag:-new"]').contains('Weet jij het antwoord? $$1+2=$$..');
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-old"]').contains("Nee");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-new"]').contains("Ja");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 1:-old"]').contains("1");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 1:-new"]').contains("3");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-old"]').contains("Ja");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-new"]').contains("Nee");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2:-old"]').contains("2");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2:-new"]').contains("4");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 3:-old"]').contains("3");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 3:-new"]').contains("2");
    cy.get('[data-cy="Quiz - vraag 1 - tijd in video:-old"]').contains("2")
    cy.get('[data-cy="Quiz - vraag 1 - tijd in video:-new"]').contains("3")
    cy.get('[data-cy="show-all-activity-revisions-button"]').click({ force: true });
    cy.get('[data-cy="revision-link-0"]').should('be.visible');
    cy.get('[data-cy="revision-link-2"]').should('not.exist');
    cy.get('[data-cy="revision-link-1"]').click({ force: true });
    cy.get('[data-cy="Type:-new"]').contains('Uitleg');
    cy.get('[data-cy="Titel:-new"]').contains("Test activity title");
    cy.get('[data-cy="Beschrijving:-new"]').contains("Test description $$\\cfrac{5}{4}$$");
    cy.get('[data-cy="Moeilijkheid:-new"]').contains("Makkelijk");
    cy.get('[data-cy="Video - vimeo id:-new"]').contains("604675909");
    cy.get('[data-cy="Quiz - vraag 1 - vraag:-new"]').contains("Weet jij het antwoord? $$1+1=$$..");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 1 - goed antwoord:-new"]').contains("Nee");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2 - goed antwoord:-new"]').contains("Ja");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 2:-new"]').contains("2");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 3 - goed antwoord:-new"]').contains("Nee");
    cy.get('[data-cy="Quiz - vraag 1 - antwoord 3:-new"]').contains("3");
    cy.get('[data-cy="Quiz - vraag 1 - tijd in video:-new"]').contains("2");
    cy.get('[data-cy="Quiz - vraag 1 - Type:-new"]').contains("Geen type");
    cy.get('[data-cy=reset-activity-to-revision-button]').click({ force: true });
    cy.get('#difficulty').should('have.value', '2');
    cy.get('[data-cy=edit-activity-submit-button]').click();
    cy.get('[data-cy=connect-activity-learning-goal-button]').click();
    cy.get('[data-cy=title-learning-goal-connection-page]').contains("Koppeling leerdoel activiteit informatie");
    cy.get('[data-cy=field-Titel]').contains("Test activity title");
    cy.get('[data-cy=field-Moeilijkheid]').contains("Makkelijk");
    cy.get('[data-cy=field-Type]').contains("Uitleg");
    cy.get('[data-cy="connection-write-by-teacher-update-content-0"]').contains("Activiteit gekoppeld met leerdoel");
    cy.get('#comment').type("Hey this is a comment on a learning goal activity connection page");
    cy.get('[data-cy=post-reaction-button]').click();
    cy.get('[data-cy="comment-teacher-content-1"]').contains("Hey this is a comment on a learning goal activity connection page");
    cy.get('[data-cy=ready-to-publish-button]').click();
    cy.get('[data-cy="status-changed-content-2"]').contains("heeft de status gewijzigd naar Goedkeuring nodig zojuist");
    cy.get('[data-cy=edit-activity-page-link]').click();
    cy.get('[data-cy=concept-status]').contains("Open");
    cy.get('#title').clear().type("CHECKCHECKCHECK");
    cy.get('[data-cy=edit-activity-submit-button]').click();
    cy.get('[data-cy=update-activity-learning-goal-button]').click();
    cy.get('[data-cy="connection-write-by-teacher-update-content-3"]').contains("Activiteit is geupdate");
    cy.get('[data-cy="connection-write-by-teacher-update-content-3"]').contains("CHECKCHECKCHECK");
  });
});
