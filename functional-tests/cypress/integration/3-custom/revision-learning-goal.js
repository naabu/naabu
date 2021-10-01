describe("Revision flow editing learning goals", () => {
  it("Create a profile and learning goal. Edits goal. Checks revisions. Post on talk page. Check history on Profile", () => {
    cy.visit('http://sveltekit:3000/cypress/login-normal-user').contains('Login complete');
    cy.visit('http://sveltekit:3000/cypress/reset-curriculum-profile').contains('Curriculum features are deleted!', {timeout: 100000});
    cy.get('[data-cy=user-menu]').click();
    cy.get('#user-menu-item-curriculum').click();

    // Create curriculum page.
    cy.get('#fullname').should('be.visible').type('John Doe')
    cy.get('#institution').should('be.visible').type('University of Logic')
    cy.get('#email').should('be.visible').type('johndoe@unilogic.org')
    cy.get('#credentials').should('be.visible').type('Proffesor of logic (5 years) Head of department of logic.')
    cy.get('[data-cy=submit-button]').click();
    cy.contains('Volledige naam:');
    cy.contains('John Doe');
    cy.contains('University of Logic');
    cy.contains('johndoe@unilogic.org');
    cy.contains('Proffesor of logic (5 years) Head of department of logic.');
    cy.get('[data-cy=subtab-edit]').click({ force: true });

    // Edit curriculum profile page.
    cy.get('#fullname').should('not.exist');
    cy.get('#institution').should('be.visible').clear().type('University of Education')
    cy.get('#email').should('be.visible').clear().type('johndoe@uniedu.org')
    cy.get('#credentials').should('be.visible').clear().type('The top Proffesor of logic (5 years) Head of department of logic.')
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=subtab-read]').click({force: true});
    cy.contains('Volledige naam:');
    cy.contains('University of Education');
    cy.contains('johndoe@uniedu.org');
    cy.contains('The top Proffesor of logic (5 years) Head of department of logic.');
    cy.get('[data-cy=user-menu]').click();
    cy.get('#user-menu-item-management').click();
    cy.get('[data-cy=maintab-goal]').click();
    cy.get('[data-cy=create-goal-link]').click();

    // Create goal page.
    cy.get('#unistructureel').click();
    cy.get('#uni_topic_name').type('subject 1');
    cy.get('#bloom1-1').click();
    cy.get('#bloom2-2').click();
    cy.get('#selectedVerbs').select(['benoemen', 'definieren']);
    cy.get('#from_text').type('from a work sheet');
    cy.get('#description').type('Important learning goal for reasons')
    cy.get('#battle_name').type('Battle 1');
    cy.get('[data-cy=add-battle-button]').click();
    cy.get('#quiz_question').type('$$1+1=$$..');
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A1]').click();
    cy.get('#answeranswer').type('5');
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A2]').click();
    cy.get('#answeranswer').type('1');
    cy.get('#answers_check').check();
    cy.get('[data-cy=create-goal-submit-button]').click();

    // Edit page.
    cy.contains('Ik kan subject 1 benoemen en definieren from a work sheet');
    cy.get('[data-cy=subtab-edit]').click({force: true});
    cy.get('#multistructureel').click();
    cy.get('#multi_topic_name').type('subject 1');
    cy.get('[data-cy=add-multi-topic-button]').click();
    cy.get('#multi_topic_name').type('subject 2');
    cy.get('[data-cy=add-multi-topic-button]').click();
    cy.get('#bloom1-3').click();
    cy.get('#bloom2-3').click();
    cy.get('#selectedVerbs').select(['berekenen', 'omzetten']);
    cy.get('#from_text').clear().type('from your head without a calculator');
    cy.get('#description').clear().type('Vital to learn this early');
    cy.get('#quiz_question').clear().type('Weet jij het antwoord? $$1+1=$$..');
    cy.get('[data-cy=A1]').click();
    cy.get('#answeranswer').clear().type('1');
    cy.get('[data-cy=A2]').click();
    cy.get('#answeranswer').clear().type('2');
    cy.get('#answers_check').check();
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A3]').click();
    cy.get('#answeranswer').clear().type('3');
    cy.get('#battle_name').type('Battle 2');
    cy.get('[data-cy=add-battle-button]').click();
    cy.get('[data-cy=click-battle-1-button]').click();
    cy.get('#quiz_question').type('$$2+2=$$..');
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A1]').click();
    cy.get('#answeranswer').type('4');
    cy.get('#answers_check').check();
    cy.get('[data-cy=new-answer-button]').click();
    cy.get('[data-cy=A2]').click();
    cy.get('#answeranswer').type('1');
    cy.get('[data-cy=edit-goal-submit-button]').click();
    cy.contains('Leerdoel gewijzigd');
    cy.get('[data-cy=subtab-history]').click({force: true});

    // Revision page.
    cy.contains('John Doe')
    cy.contains('University of Education')

    cy.get('[data-cy=revision0]').should('exist');
    cy.get('[data-cy=revision1]').should('exist');
    cy.get('[data-cy=revision2]').should('not.exist');

    cy.get('[data-cy=revision-index-0]').click();
    cy.get('[data-cy=Titel-old]').contains("Ik kan subject 1 benoemen en definieren from a work sheet")
    cy.get('[data-cy=Titel-new]').contains("Ik kan subject 1 en subject 2 berekenen en omzetten from your head without a calculator")
    cy.get('[data-cy=Omschrijving-old]').contains("Important learning goal for reasons");
    cy.get('[data-cy=Omschrijving-new]').contains("Vital to learn this early");
    cy.get('[data-cy="from Text-old"]').contains("from a work sheet");
    cy.get('[data-cy="from Text-new"]').contains("from your head without a calculator");
    // cy.get('[data-cy=Onderwerpen-old]').contains(); //empty
    cy.get('[data-cy=Onderwerpen-new] > [data-cy=new-index0]').contains('subject 1');
    cy.get('[data-cy=Onderwerpen-new] > [data-cy=new-index1]').contains('subject 2');
    cy.get('[data-cy=Werkwoorden-old] > [data-cy=old-index0]').contains('benoemen');
    cy.get('[data-cy=Werkwoorden-old] > [data-cy=old-index1]').contains('definieren');
    cy.get('[data-cy=Werkwoorden-new] > [data-cy=new-index0]').contains('berekenen');
    cy.get('[data-cy=Werkwoorden-new] > [data-cy=new-index1]').contains('omzetten');
    cy.get('[data-cy="Bloom\'s taxonomy-old"] > [data-cy=old-index0]').contains('bloom1-1');
    cy.get('[data-cy="Bloom\'s taxonomy-old"] > [data-cy=old-index1]').contains('bloom2-2');
    cy.get('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index0]').contains('bloom1-3');
    cy.get('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index1]').contains('bloom2-2');
    cy.get('[data-cy="Bloom\'s taxonomy-new"] > [data-cy=new-index2]').contains('bloom2-3');
    cy.get('[data-cy="Solo\'s taxonomy-old"]').contains('solo-1');
    cy.get('[data-cy="Solo\'s taxonomy-new"]').contains('solo-2');
    cy.get('[data-cy="Battles-old"] > [data-cy=old-index0]').contains('Battle 1')
    cy.get('[data-cy="Battles-new"] > [data-cy=new-index0]').contains('Battle 1')
    cy.get('[data-cy="Battles-new"] > [data-cy=new-index1]').contains('Battle 2')
    cy.get('[data-cy="Vraag-old"]').contains('$$1+1=$$..');
    cy.get('[data-cy="Vraag-new"]').contains('Weet jij het antwoord? $$1+1=$$..');
    cy.get('[data-cy="Antwoorden-old"] > [data-cy=old-index0]').contains('5 - Fout antwoord');
    cy.get('[data-cy="Antwoorden-old"] > [data-cy=old-index1]').contains('1 - Goede antwoord');
    cy.get('[data-cy="Antwoorden-new"] > [data-cy=new-index0]').contains('1 - Fout antwoord');
    cy.get('[data-cy="Antwoorden-new"] > [data-cy=new-index1]').contains('2 - Goede antwoord');
    cy.get('[data-cy="Antwoorden-new"] > [data-cy=new-index2]').contains('3 - Fout antwoord');

    cy.get('[data-cy=subtab-edit]').click({force:true});
    cy.contains('Waarschuwing: u bewerkt een oude versie van deze pagina.');
    cy.contains('Als u uw bewerking opslaat, gaan alle wijzigingen verloren die na deze versie zijn gemaakt.');
    cy.get('[data-cy="maintab-goal"]').click({force:true});
    cy.contains('Je bekijkt een revisie');
    cy.get('[data-cy="show-diff-link"]').click();
    cy.contains('Verschil tussen versies');
    cy.get('[data-cy=discuss-revision-button]').click();

    cy.get('[data-cy=post-title]').should('to.includes.value', 'Overleg revisie');
    cy.get('#post').type('Test post for cypress');
    cy.get('[data-cy="post-button"]').click();
    cy.contains('Antwoord');
    cy.get('#reply').type('Answer on post');
    cy.get('[data-cy="maintab-talk"]').click({force:true});
    cy.contains('Titel');
    cy.get('#title').type('New title');
    cy.get('#post').type('New post');
    cy.get('[data-cy="post-button"]').click();
    cy.contains('Antwoord');
    cy.get('[data-cy="profile-link"]').click();
    cy.contains('Ik kan subject 1 en subject 2 berekenen en omzetten from your head wi…');
    cy.contains('Ik kan subject 1 benoemen en definieren from a work sheet');
    cy.contains('New title');
    cy.contains('Overleg revisie');
  });
});
