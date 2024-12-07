describe('test PUT endpoint', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs')
    cy.get(".btn").contains("Authorize").click()
    cy.get(".modal-ux").should("be.visible")
    cy.get(".auth-container").find("input").type("test-token")
    cy.get(".auth-btn-wrapper").find("button").contains("Authorize").click()
    cy.get(".auth-btn-wrapper").find("button").contains("Logout").should("be.visible")
    cy.get(".auth-btn-wrapper").find("button").contains("Close").should("be.visible").click()
  })
  it("When PUT /user container is clicked, should open", () => {
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").should("have.class", "is-open")
    cy.get("#operations-user-updateProfile").find(".opblock-body").should("be.visible")
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("be.disabled")
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("not.be.disabled")
  })

  it("When clicking 'try it out' button, parameter input fields should be enabled", () => {
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("be.disabled")
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("not.be.disabled")
  })

  it("When user fills a string for userID and tries endpoint warn user about invalid input", () =>{
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').type("invalid string")
    cy.get(".execute").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').should("have.class", "invalid")
  })

  it("When user fill an integer for userID and tries endpoint, execute normally", () => {
    cy.get("#operations-user-updateProfile").click()
    cy.get("#operations-user-updateProfile").find("button").contains("Try it out").click()
    cy.get("#operations-user-updateProfile").find('input[placeholder^="userID"]').type("42")
    cy.get(".execute").click()
    cy.get("#operations-user-updateProfile > div:nth-child(2) > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.col.response-col_status").should("have.text","200")
  })

})
