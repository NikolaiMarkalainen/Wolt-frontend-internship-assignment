const fin = {
  TITLE: "Tilauksen hintaarvio laskuri",
  DETAILS: {
    TITLE: "Tilauksen tiedot",
    VENUE: "Tapahtumapaikan tunnus",
    CART: "Ostoskorin arvo",
    LATITUDE: "Käyttäjän leveysaste",
    LONGITUDE: "Käyttäjän pituusaste",
    BUTTON: {
      LOCATION: "Hae sijainti",
      CALCULATE: "Laske toimitushinta",
    },
    ERRORS: {
      INPUT_CART: "Väärä hinta ostoskorille",
      VENUE_SLAG: "Tapahtumapaikkaa ei löydy",
      COORDINATES: {
        LATITUDE: "Virheelliset arvot leveysasteelle",
        LONGITUDE: "Virheelliset arvot pituusasteelle",
      },
      NOT_FOUND: "Error, something broke!",
      RECEIPT_ERROR: "Failed at generating the Receipt !",
    },
  },
  RECEIPT: {
    TITLE: "Hinnan erittely",
    CART: "Ostoskorin arvo",
    DELIVERY: {
      FEE: "Toimitusmaksu",
      DISTANCE: "Toimitusetäisyys",
    },
    SMALL_CHARGE: "Pienen tilauksen lisämaksu",
    TOTAL: "Kokonaishinta",
  },
};

export default fin;
