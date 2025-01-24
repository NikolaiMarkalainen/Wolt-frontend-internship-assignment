import strings from "../../src/utils/localization";
interface formFields {
  venue: string;
  cartValue: string;
  latitude: string;
  longitude: string;
}

const inputField = {
  venue: '[data-test-id="venueSlug"]',
  cart: '[data-test-id="cartValue"]',
  lat: '[data-test-id="userLatitude"]',
  lon: '[data-test-id="userLongitude"]',
};

const inputFieldArray = Object.values(inputField);

function disabledButtonState() {
  let allFieldsFilled = true;
  for (const field of inputFieldArray) {
    cy.get(field)
      .find("input")
      .should("not.have.value", "")
      .then((value) => {
        if (!value.val()) allFieldsFilled = false;
      });
  }
  if (!allFieldsFilled) {
    cy.get(".input-field-buttons button")
      .contains(strings.en.DETAILS.BUTTON.CALCULATE)
      .should("be.disabled");
  } else {
    cy.get(".input-field-buttons button")
      .contains(strings.en.DETAILS.BUTTON.CALCULATE)
      .should("not.be.disabled")
      .click();
  }
}

function populateFormWithData(content: formFields) {
  cy.get(inputField.venue).find("input").type(content.venue);
  cy.get(inputField.cart).find("input").type(content.cartValue);
  cy.get(inputField.lat).find("input").type(content.latitude);
  cy.get(inputField.lon).find("input").type(content.longitude);
  disabledButtonState();
}

function verifyCalculationFields() {
  // receipt-item p to have value outside of eur
  for (let i = 0; i <= 3; i++) {
    cy.get(".receipt-item p")
      .eq(i)
      .should((paragraph) => {
        const text = paragraph.text().trim();
        expect(text).to.not.equal("EUR");
      });
  }
  cy.get(".receipt-item-end p").should("not.have.text", "EUR");
}

function clearFormFromData() {
  for (const field of inputFieldArray) {
    cy.get(field).find("input").clear();
  }
}

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
  it("Result failed", () => {
    //venue lat: 60.17012143, lon: 24.92813512
    const content: formFields = {
      venue: "home-assignment-venue-helsinki",
      cartValue: "12.30",
      latitude: "60.17012143",
      longitude: "24.82813512",
    };
    populateFormWithData(content);

    cy.get(".receipt-error").should(
      "include.text",
      strings.en.DETAILS.ERRORS.RECEIPT_ERROR,
    );
  });
  it("Result succeeded", () => {
    const content: formFields = {
      venue: "home-assignment-venue-helsinki",
      cartValue: "12.30",
      latitude: "60.17012143",
      longitude: "24.92813512",
    };
    populateFormWithData(content);
    verifyCalculationFields();
    const contentWithDistance: formFields = {
      venue: "home-assignment-venue-helsinki",
      cartValue: "150,23",
      latitude: "60.18512143",
      longitude: "24.92813512",
    };
    clearFormFromData();
    populateFormWithData(contentWithDistance);
    verifyCalculationFields();
    cy.get(inputField.cart).find("input");
  });
});
