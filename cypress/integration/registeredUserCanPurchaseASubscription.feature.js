describe('Registered and logged in user can purchase a subscription', () => {
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

    cy.route({
      method: 'POST',
      url: "http://localhost:3000/api/subscriptions",
      response: { status: 'paid' }
    }).as('purchase')

    cy.visit("/");
    cy.window()
      .then(window => {
        window.store.dispatch(
          {
            type: "AUTHENTICATE",
            payload: { currentUser: { email: 'thomas@craft.com', role: '' } }
          }
        )
      })
    cy.get("#2")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
  });

  it('by clicking Buy Subscription', () => {
    cy.get('button').contains('Buy Subscription').click()
    cy.get('form[id="subscription-form"]')
      .should('be.visible')
    cy.get('form[id="subscription-form"]').within(() => {
      
      cy.typeInStripeElement('cardnumber', '4242424242424242')
      cy.typeInStripeElement('exp-date', '1220')
      cy.typeInStripeElement('cvc', '123')

      cy.get('button').contains('Submit payment').click()
    })
    cy.wait('@purchase')
    cy.get('h2[id="message"]').should('contain', "Thank you for your business!")

    cy.get("#2")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
    cy.get(".article")
      .within(() => {
        cy.get(".spec-title").should("contain", "Premium Article");
      })
    cy.get(".article")
      .should("not.contain", "...")
      .and("not.contain", 'This article require a premium membership.')

  });
});