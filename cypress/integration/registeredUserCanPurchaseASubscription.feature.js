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
      cy.get('iframe[name^="__privateStripeFrame5"]')
        .then($iframe => {
          const $body = $iframe.contents().find('body');
          cy.wrap($body)
            .find('input[name="cardnumber"]')
            .type('4242424242424242', { delay: 10 })
        })

      cy.get('iframe[name^="__privateStripeFrame6"]')
        .then($iframe => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name^="exp-date"]')
            .type("1220", { delay: 10 });
        });

      cy.get('iframe[name^="__privateStripeFrame7"]')
        .then($iframe => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name^="cvc"]')
            .type("123", { delay: 10 });
        });
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