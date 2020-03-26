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

	});
});