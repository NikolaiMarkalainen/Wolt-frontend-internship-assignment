import strings from "../../src/utils/localization";

const inputField = {
  venue: '[data-test-id="venueSlug"]',
  cart: '[data-test-id="cartValue"]',
  lat: '[data-test-id="userLatitude"]',
  lon: '[data-test-id="userLongitude"]',
};

describe("generic flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("Localization tests", () => {
    const languages = [
      {
        id: "finlang",
        title: strings.fin.TITLE,
        card: strings.fin.DETAILS.TITLE,
        venue: strings.fin.DETAILS.VENUE,
        cart: strings.fin.DETAILS.CART,
        latitude: strings.fin.DETAILS.LATITUDE,
        longitude: strings.fin.DETAILS.LONGITUDE,
      },
      {
        id: "englang",
        title: strings.en.TITLE,
        card: strings.en.DETAILS.TITLE,
        venue: strings.en.DETAILS.VENUE,
        cart: strings.en.DETAILS.CART,
        latitude: strings.en.DETAILS.LATITUDE,
        longitude: strings.en.DETAILS.LONGITUDE,
      },
    ];

    languages.forEach(
      // include used for p tag because of invisible spaces
      ({ id, title, card, venue, cart, latitude, longitude }) => {
        cy.get(`#${id}`).click();
        cy.get(".header h3").should("have.text", title);
        cy.get(".input-field-header").should("have.text", card.trim());
        cy.get(inputField.venue).find("p").should("include.text", venue);
        cy.get(inputField.cart).find("p").should("include.text", cart);
        cy.get(inputField.lat).find("p").should("include.text", latitude);
        cy.get(inputField.lon).find("p").should("include.text", longitude);
        cy.get(".input-field-header").should("have.text", card);
      },
    );
  });
  it("Sending works", () => {
    //venue lat: 60.17012143, lon: 24.92813512
    const content = {
      venue: "home-assignment-venue-helsinki",
      cartValue: "12.30",
      latitude: "60.17012143",
      longitude: "24.82813512",
    };
    function disabledButtonState() {
      cy.get(".input-field-buttons button")
        .contains(strings.en.DETAILS.BUTTON.CALCULATE)
        .should("be.disabled");
    }

    cy.get(inputField.venue).find("input").type(content.venue);
    disabledButtonState();
    cy.get(inputField.cart).find("input").type(content.cartValue);
    disabledButtonState();
    cy.get(inputField.lat).find("input").type(content.latitude);
    disabledButtonState();
    cy.get(inputField.lon).find("input").type(content.longitude);
    cy.get(".input-field-buttons button")
      .contains(strings.en.DETAILS.BUTTON.CALCULATE)
      .should("not.be.disabled")
      .click();
  });
});
