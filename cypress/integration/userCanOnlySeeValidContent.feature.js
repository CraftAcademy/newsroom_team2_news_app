describe("Article view:", () => {
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
      method: "GET",
      url: "http://localhost:3000/api/articles/1",
      response: "fixture:specific_article_1.json"
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:subscriber_login.json",
      headers: {
        uid: "subscriber@mail.com"
      }
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/auth/validate_token?uid=subscriber@mail.com",
      response: "fixture:subscriber_login.json",
      headers: {
        uid: "subscriber@mail.com"
      }
    });
    cy.visit("/");
  });

  it("Not logged will be able to read free articles but not premium articles", () => {
    cy.get("#1")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
    cy.get(".article")
      .within(() => {
        cy.get(".spec-title").should("contain", "Free Article");
      })
    cy.get(".article")
      .should("not.contain", "...")
      .and("not.contain", 'This article require a premium membership.')

    cy.get('button')
      .contains("Back")
      .click()

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
        cy.get(".spec-content").should("contain", "...");
        cy.get('p').should("contain", 'This article require a premium membership.')
      })
  });

  it('Authenticated user that is NOT a SUBSCRIBER can only read free articles but not premium articles', () => {
    cy.window()
      .then(window => {
        window.store.dispatch(
          {
            type: "AUTHENTICATE",
            payload: { currentUser: { email: 'thomas@craft.com', role: '' } }
          }
        )
      })

    cy.get("#1")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
    cy.get(".article")
      .within(() => {
        cy.get(".spec-title").should("contain", "Free Article");
      })
    cy.get(".article")
      .should("not.contain", "...")
      .and("not.contain", 'This article require a premium membership.')

    cy.get('button')
      .contains("Back")
      .click()

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
        cy.get(".spec-content").should("contain", "...");
        cy.get('p').should("contain", 'This article require a premium membership.')
      })
  });

  it('Authenticated user that is a SUBSCRIBER can se full length of all articles', () => {
    cy.get("button")
      .contains("Login")
      .click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("subscriber@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Sign in")
        .click();
    });

    cy.get("#1")
      .last()
      .within(() => {
        cy.get("button")
          .contains("Read More")
          .click();
      });
    cy.get(".article")
      .within(() => {
        cy.get(".spec-title").should("contain", "Free Article");
      })
    cy.get(".article")
      .should("not.contain", "...")
      .and("not.contain", 'This article require a premium membership.')

    cy.get('button')
      .contains("Back")
      .click()

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
