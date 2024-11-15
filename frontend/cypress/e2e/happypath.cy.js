describe('Happy Path', () => {
  it('Registers', () => {
    cy.visit('http://localhost:3000');
    cy.get('#landing-register').click();
    cy.get('#registerEmail').type('9999');
    cy.get('#registerName').type('9999');
    cy.get('#registerPassword').type('9999');
    cy.get('#registerConfirm').type('9999');
    cy.get('#registerSubmit').click();
    cy.get('#dashboardWelcome-success').should('exist');
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
    cy.get('#MediaCard').should('exist');
  });
})