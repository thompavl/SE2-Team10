
describe('Click `Authorize`', () => {
  beforeEach(() => {
    // Visit the page before each test  
    cy.visit('http://localhost:8080/docs/');
  });

    it('Click the Authorize buuton and enter an API key', () => {
        //find the section of the header where the buttons are
        cy.get('.scheme-container').within(() => {
            // find the button and click it
            cy.get('.authorize').click();
        });
        // should get the popup asking for API key
        cy.get('.modal-ux').within(() => {
            
            //there should be an input box, type something in it
            cy.get('input').type('key');
            
            //click the confirmation button
            cy.get('.authorize').click();
            //should also have Close button, click it to close
            cy.get('.btn-done').click();
        });
        //find the initial button
        cy.get('.scheme-container').within(() => {
            //it should now show a locked padlock
            cy.get('.authorize').should('have.class', 'locked');
        });
    });
});
