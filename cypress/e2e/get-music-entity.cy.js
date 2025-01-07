describe("Swagger UI Test for GET music-entity", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/docs");
  });

  it("Open the GET/music-entity Container and check the initial state", () => {
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .should("have.class", "is-open");

    cy.get(".opblock-body").should("be.visible");

    cy.get("input[placeholder='name']").should("be.disabled");
    cy.get("input[placeholder='date']").should("be.disabled");
  });

  it("Enabling the input fields and clicking on Try it out button", () => {
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("input[placeholder='name']").should("not.be.disabled");
    cy.get("input[placeholder='date']").should("not.be.disabled");
    cy.get("select").should("not.be.disabled");
  });

  it("Check if Swagger does not allow clicking execute if add string item is empty", () => {
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("button").contains("Execute").click();
    cy.get("button")
      .contains("Add item")
      .should("have.class", "invalid button");
  });

  it("Check if execute works when all fields have inputs & returns Curl , request Url", () => {
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("input[placeholder='name']").type("test");
    cy.get("input[placeholder='date']").type("2018-03-20T09:12:28Z");
    cy.get("tr[data-param-name='type']").find("select").select(1);
    cy.get("button").contains("Add item").click();

    cy.get("button").contains("Execute").click();
    cy.get("h4").contains("Curl").should("be.visible");
    cy.get(".request-url").should("be.visible");
  });
  it("Check if Curl & Request Url go away after clicking on the Clear Button", () => {
    cy.get("#operations-music-entity-getMusicEntities")
      .click()
      .find("button")
      .contains("Try it out")
      .click();
    cy.get("input[placeholder='name']").type("test");
    cy.get("input[placeholder='date']").type("2018-03-20T09:12:28Z");
    cy.get("tr[data-param-name='type']").find("select").select(1);
    cy.get("button").contains("Add item").click();

    cy.get("button").contains("Execute").click();
    cy.get("h4").contains("Curl").should("be.visible");
    cy.get(".request-url").should("be.visible");

    cy.get("button").contains("Clear").click();
    cy.get("h4").contains("Curl").should("not.exist");
    cy.get(".request-url").should("not.exist");
  });
});
