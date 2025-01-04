describe("Swagger UI Test for GET music-entity", () => {
  // Setup before each test
  beforeEach(() => {
    cy.visit("http://localhost:8080/docs");
  });
 // Test for initial state of GET/music-entity container
  it("Open the GET/music-entity Container and check the initial state", () => {
   // Open the container and verify it's open
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .should("have.class", "is-open");
    // Check that the body of the container is visible
    cy.get(".opblock-body").should("be.visible");
    // Verify input fields are initially disabled
    cy.get("input[placeholder='name']").should("be.disabled");
    cy.get("input[placeholder='date']").should("be.disabled");
  });

  // Test for enabling input fields and "Try it out" functionality
  it("Enabling the input fields and clicking on Try it out button", () => {
   // Open the container and click "Try it out"
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    // Verify input fields and dropdown are enabled
    cy.get("input[placeholder='name']").should("not.be.disabled");
    cy.get("input[placeholder='date']").should("not.be.disabled");
    cy.get("select").should("not.be.disabled");
  });

  // Test for handling empty fields during execution
  it("Check if Swagger does not allow clicking execute if add string item is empty", () => {
    // Open the container, enable fields, and attempt execution with empty inputs
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("button").contains("Execute").click();
    // Verify that "Add item" button is flagged as invalid
    cy.get("button")
      .contains("Add item")
      .should("have.class", "invalid button");
  });

  // Test for proper execution when all fields are filled
  it("Check if execute works when all fields have inputs & returns Curl , request Url", () => {
    // Open the container, enable fields, and fill in the inputs
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("input[placeholder='name']").type("test");
    cy.get("input[placeholder='date']").type("2018-03-20T09:12:28Z");
    cy.get("tr[data-param-name='type']").find("select").select(1);
    cy.get("button").contains("Add item").click();
    // Execute the request and verify Curl and request URL are visible
    cy.get("button").contains("Execute").click();
    cy.get("h4").contains("Curl").should("be.visible");
    cy.get(".request-url").should("be.visible");
  });
  // Test for clearing Curl and request URL using the Clear button
  it("Check if Curl & Request Url go away after clicking on the Clear Button", () => {
    // Open the container, enable fields, and fill in the inputs
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("input[placeholder='name']").type("test");
    cy.get("input[placeholder='date']").type("2018-03-20T09:12:28Z");
    cy.get("tr[data-param-name='type']").find("select").select(1);
    cy.get("button").contains("Add item").click();
    // Execute the request and verify Curl and request URL are visible
    cy.get("button").contains("Execute").click();
    cy.get("h4").contains("Curl").should("be.visible");
    cy.get(".request-url").should("be.visible");
    // Click the Clear button and verify Curl and request URL are removed
    cy.get("button").contains("Clear").click();
    cy.get("h4").contains("Curl").should("not.exist");
    cy.get(".request-url").should("not.exist");
  });
});
