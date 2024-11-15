describe('Happy Path', () => {
  it('Registers', () => {
    cy.visit('http://localhost:3000');
    cy.get('#landing-register').click();
    cy.get('#registerEmail').type('9999');
    cy.get('#registerName').type('9999');
    cy.get('#registerPassword').type('9999');
    cy.get('#registerConfirm').type('9999');
    cy.get('#registerSubmit').click();
    cy.contains('dashboard').should('exist');
  })

  it('Creates a new presentation successfully', () => {
    cy.get('#createPresentation').click();
    cy.get('#set-presentation-title').type('Friday-presentation1');
    cy.get('#create-new-presentation-btn').click();
    cy.get('#MediaCard').should('exist');
  });

  it('Updates the presentation title successfully', () => {
    cy.contains('Learn More').click();
    cy.contains('Edit Presentation Title').click();
    cy.get('#edit-presentation').click();
    cy.get('#edit-presentation-title').clear().type('Friday-presentation999');
    cy.get('#edit-presentation-title-submit').click();
    cy.contains('Edit Presentation Title').should('exist');
  });

  //if add success , next button appear
  it('Adds slides to the presentation successfully', () => {
    cy.contains('Create New Slide').click();
    cy.contains('Yes').click();
    cy.contains('Next').should('exist');
  });

  //only two page, only have next or previous on page
  it('Switches between slides successfully', () => {
    cy.contains('Next').click();
    cy.contains('Previous').should('exist');
    cy.contains('Previous').click();
    cy.contains('Next').should('exist');
  });
  //two page, delete one ,no button appear now
  it('Deletes the presentation successfully', () => {
    cy.contains('Delete Current slide').click();
    cy.contains('Next').should('not.exist');
    cy.get('Previous').should('not.exist');
  });

  it('Logs out and logs back in successfully', () => {
    cy.contains('Logout').click();
    cy.contains('Login').should('exist');
    cy.get('#email').type('9999');
    cy.get('#password').type('9999');
    cy.contains('Submit').click();
    cy.contains('Logout').should('exist');
  });
})