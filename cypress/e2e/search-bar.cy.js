describe("Search bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/docs/");
  });

  it("The search should have '/api-docs' as the default value", () => {
    cy.get("input.download-url-input").should("have.value", "/api-docs");
  });

  it("Swagger throws an error if input is not '/api-docs' after clicking explore", () => {
    cy.get("input.download-url-input").clear().type("/api-docs123");
    cy.get("button.download-url-button").click();
    cy.get(".loading-container").should(
      "contain",
      "Failed to load API definition."
    );
  });

  it("API documentation re-appears after giving '/api-docs' as input", () => {
    cy.get("input.download-url-input").clear().type("/api-docs");
    cy.get("button.download-url-button").click();
    cy.get(".information-container").should("be.visible");
  });
});
