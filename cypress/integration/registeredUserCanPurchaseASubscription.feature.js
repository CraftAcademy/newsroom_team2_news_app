describe('registered user can purchase a subscription', () => {
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
      response: "fixture:specific_article_2.json"
		});
		cy.visit("/");
		cy.get("#2")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
	});

	it('by clickin Buy Subscription', () => {
		cy.get('button').contains('Buy Subscription').click()
		cy.get('form[id="subscription-form"]').should('be.visible')
	});
});