describe('test PUT endpoint', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs')

    // Open authorization modal and authorize with test token
    cy.get(".btn").contains("Authorize").click()
    cy.get(".modal-ux").should("be.visible")
    cy.get(".auth-container").find("input").type("test-token")
    cy.get(".auth-btn-wrapper").find("button").contains("Authorize").click()
    // Verify successful authorization
    cy.get(".auth-btn-wrapper").find("button").contains("Logout").should("be.visible")
    cy.get(".auth-btn-wrapper").find("button").contains("Close").should("be.visible").click()
  })

  // Verify the PUT endpoint container opens correctly
  it("When PUT /user container is clicked, should open", () => {
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").should("have.class", "is-open")
    cy.get("#operations-user-updateProfile").find(".opblock-body").should("be.visible")
    // VuserID input field should initially be disabled
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("be.disabled")
    //Enable input fields by clicking 'Try it out'
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("not.be.disabled")
  })
 // Check enabling parameter input fields on clicking 'Try it out'
  it("When clicking 'try it out' button, parameter input fields should be enabled", () => {
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("be.disabled")
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("not.be.disabled")
  })
  // Validate invalid string input for userID
  it("When user fills a string for userID and tries endpoint warn user about invalid input", () =>{
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    // Input invalid string and attempt execution
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').type("invalid string");
    cy.get(".execute").click();
    // Input should be flagged as invalid  
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("have.class", "invalid");
     });
   
     // Validate execution without inputting userID
     it("When user tries endpoint without filling a userID, warn about invalid input", () => {
       cy.get("#operations-user-updateProfile").click();
       cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click();
       // Attempt execution without input
       cy.get(".execute").click();
       // Verify that the input is flagged as invalid
       cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("have.class", "invalid");
     });
   
     // Verify normal execution with valid userID input
     it("When user fill an integer for userID and tries endpoint, execute normally", () => {
       cy.get("#operations-user-updateProfile").click();
       cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click();
       // Input valid integer and execute the endpoint
       cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').type("42");
       cy.get(".execute").click();
       // Verify successful execution with status code 200
       cy.get("#operations-user-updateProfile > div:nth-child(2) > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.col.response-col_status").should("have.text", "200");
     });
})
