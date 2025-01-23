import { defineConfig } from "cypress";
// has to be JS, TS bugs out for some reason
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
