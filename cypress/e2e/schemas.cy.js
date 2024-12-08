describe('Swagger UI Tests for schemas area', () => {
    beforeEach(() => {
      // Visit the page before each test
      cy.visit('http://localhost:8080/docs/');
      // Check that the Schemas section exists and is visible
      cy.get('.models.is-open h4 span').contains('Schemas')
        .should('exist')
        .should('be.visible');
    });
    it('Verifies clicking the Schemas header toggles section visibility', () => {
        cy.get('.models.is-open h4 span').click(); // Collapse the Schemas section
        cy.get('.models.is-open div').should('not.exist'); // Verify it is collapsed

        cy.get('.models h4 span').click(); // Expand the Schemas section again
        cy.get('.models.is-open div').should('be.visible'); // Verify it is expanded
    });

    it('Interacts with the Artist schema properly', () => {
      cy.get('#model-Artist').within(() => {
      // Clicking the title or toggle should expand/collapse the model
      cy.get('.model-title').click({ multiple: true }); // Expand model by clicking the title
      cy.get('.inner-object').should('be.visible'); // Verify expanded state

     // Check all fields inside `inner-object`
     cy.get('.inner-object').within(() => {
      cy.contains('td', 'name').next().should('contain.text', 'Pink Floyd');
      cy.contains('td', 'entity-id').next().should('contain.text', 'moneypinkfloyd102562');
      // Albums is also expandable!
      cy.contains('td', 'albums').next().should('have.text', '[...]'); // Collapsed state
      cy.get('.model-toggle').click();
      // Expanded state
      cy.contains('td', 'albums').next().should('contain.text', 'moneypinkfloyd102562');
      cy.contains('td', 'image').next().should('contain.text', '($byte)');
      // Collapse the albums object again
      cy.get('.model-toggle').click();
      cy.contains('td', 'albums').next().should('have.text', '[...]'); // Collapsed state

      });
      // This time collapse model by clicking the toggle
      cy.get('.model-toggle').first().click();
      cy.get('.inner-object').should('not.exist'); // Verify collapsed state
      });
    });

  it("Not found schema is shown correctly", () => {
    cy.get("#model-NotFoundMessage").within(() => {
      cy.get(".model-title").click()
      cy.get(".inner-object").should("be.visible")
      cy.get(".inner-object").within(() => {
        cy.contains("td", "message").next().should("contain.text", "Your requested resource is nowhere to be found! Perhaps try searching something else?")
        cy.contains("td","code").next().should("contain.text", "404")
      })
    })
  })
});
