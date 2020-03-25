describe("Base user can only ", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/articles",
        response: "fixture:articles_index.json"
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/articles/2",
        response: "fixture:specific_article.json"
      });
      cy.visit("/");
    });

    it("user can navigate to article", () => {
        cy.get("#2")
          .last()
          .within(() => {
            cy.get("button")
              .contains("Read More")
              .click();
          });
          cy.get(".article")
          .last()
          .within(() => {
            cy.get(".spec-title").should("contain", "Toilet");
            cy.get(".spec-content").should(
              "contain",
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            );
          });
        
      });
  });