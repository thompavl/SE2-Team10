describe("Search bar", () => {
  // Set up before each test case
  beforeEach(() => {
    cy.visit("http://localhost:8080/docs/");
  });
  // Test to verify the default value of the search inpu
  it("The search should have '/api-docs' as the default value", () => {
    // Check that the search input has the default value '/api-docs'
    cy.get("input.download-url-input").should("have.value", "/api-docs");
  });

  // Test to verify error handling when an incorrect value is entered
  it("Swagger throws an error if input is not '/api-docs' after clicking explore", () => {
   // Clear the input, enter an invalid value, and click the explore button
    cy.get("input.download-url-input").clear().type("/api-docs123");
    cy.get("button.download-url-button").click();
    // Check that the error message is displayed
    cy.get(".loading-container").should(
      "contain",
      "Failed to load API definition."
    );
  });
    // Test to ensure the API documentation reloads with a correct input
  it("API documentation re-appears after giving '/api-docs' as input", () => {
    // Clear the input, enter the correct value, and click the explore button
    cy.get("input.download-url-input").clear().type("/api-docs");
    cy.get("button.download-url-button").click();
    // API documentation should reappear
    cy.get(".information-container").should("be.visible");
  });
});
