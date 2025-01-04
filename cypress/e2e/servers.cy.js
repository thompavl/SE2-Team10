describe("Servers Dropdown select", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/docs/");
  });

  it("The dropdown appears when cicking the pre-selected url under Servers", () => {
    //find the servers dropdown select
    cy.get(".servers").find("select").should("be.visible");
    //The 2 options should have the correct value
    cy.get(".servers")
      .find("select")
      .select("http://localhost:8080/api/v1")
      .should("have.value", "http://localhost:8080/api/v1");

    cy.get(".servers")
      .find("select")
      .select("https://se2-team10-rjmm.onrender.com/api/v1")
      .should("have.value", "https://se2-team10-rjmm.onrender.com/api/v1");

    //The selected option should appear in the input box
    cy.get(".servers").find("select").select("http://localhost:8080/api/v1");
    cy.get(".servers")
      .find("select")
      .should("contain", "http://localhost:8080/api/v1");

    cy.get(".servers")
      .find("select")
      .select("https://se2-team10-rjmm.onrender.com/api/v1");
    cy.get(".servers")
      .find("select")
      .should("contain", "https://se2-team10-rjmm.onrender.com/api/v1");
  });
});
