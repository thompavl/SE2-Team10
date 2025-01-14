
describe('DELETE /post', () => {
  beforeEach(() => {
    // Visit the page before each test  
    cy.visit('http://localhost:8080/docs/');
    //Check if the event section exists and is visible
    cy.get('#operations-tag-post')
      .should('exist')
      .should('be.visible');
    //Find DeleteUSerPost and click it
    cy.get('#operations-post-deleteUserPost')
      .scrollIntoView()
      .find('.opblock-summary')
      .click(); // Expand the endpoint details
  });

  it('Test the `try it out` button', () => {
    cy.get('#operations-post-deleteUserPost').within(() => {
      // Verify fields are disabled by default
      cy.get('input[placeholder*="postID"]').should('be.disabled');
      cy.get('.btn.execute').should('not.exist');
      // Click "Try it out"
      cy.get('.try-out__btn').click();
      // Fields should now be enabled
      cy.get('input[placeholder*="postID"]').should('not.be.disabled');
      cy.get('.btn.execute').should('exist');
      // Click "Cancel" to reset the form 
      cy.get('.try-out__btn.cancel').click();
      // Verify fields are now disabled
      cy.get('input[placeholder*="postID"]').should('be.disabled');
      cy.get('.btn.execute').should('not.exist');
    });
  });
  
  it('Prevents "Execute" without filling in postID', () => {
    cy.get('#operations-post-deleteUserPost').within(() => {
      cy.get('.try-out__btn').click();
      cy.get('.execute-wrapper .btn').click();
      // Verify the postID field is marked as invalid
      cy.get('input[placeholder*="postID"]')
        .should('have.class', 'invalid')
        .should('have.attr', 'title', 'Required field is not provided');
    });
  });

  it('Prevents "Execute" with non-integer postID', () => {
    cy.get('#operations-post-deleteUserPost').within(() => {
      cy.get('.try-out__btn').click();
      // input a string into postID and click "Execute"
      cy.get('input[placeholder*="postID"]').type('invalidUserID');
      cy.get('.execute-wrapper .btn').click();
      // it should be marked invalid
      cy.get('input[placeholder*="postID"]')
        .should('have.class', 'invalid')
        // and text should also be present
        .should('have.attr', 'title', 'Value must be an integer');
    });
  });
  
  it('Verifies typing in the postID field and clicking "Execute" returns a response', () => {
    cy.get('#operations-post-deleteUserPost').within(() => {
      // Click "Try it out"
      cy.get('.try-out__btn').click();
      // Enter postID and a valid JSON body
      cy.get('input[placeholder*="postID"]')
        .should('not.be.disabled') // Verify the field is now editable
        .type('1');
      // Execute the request
      cy.get('.execute-wrapper .btn').click();
      // Verify response visibility
      cy.get('.live-responses-table').should('be.visible');
    });      
  });

  it('Verifies the structure and presence of the response elements', () => {
    cy.get('#operations-post-deleteUserPost').within(() => {
      //Verify table for response codes is present regardless of execution
      cy.get('.responses-table')
        .should('exist')
        .should('be.visible');
      // Curl and Request URL sections should be present only after clicking "Execute"
      cy.get('.responses-wrapper textarea.curl')
        .should('not.exist');
      cy.get('.request-url')
        .should('not.exist');
      // Execute a request to see the response
      cy.get('.try-out__btn').click();
      cy.get('input[placeholder*="postID"]')
        .type('1');
      cy.get('.execute-wrapper .btn').click();
    // Check that "Curl" section is present and read-only
      cy.get('.responses-wrapper textarea.curl')
        .should('exist')
        .should('be.visible')
        .should('have.attr', 'readonly');  
    // Check that "Request URL" section is present
    cy.get('.request-url')
      .should('exist')
      .should('be.visible')
    // Verify that clicking the "Clear" button removes the response elements
    cy.get('.btn.btn-clear').click();
    cy.get('.live-responses-table')
      .should('not.exist');
    cy.get('.responses-wrapper textarea.curl')
      .should('not.exist');
    cy.get('.request-url')
      .should('not.exist');
    });
  }); 
});

