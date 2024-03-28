const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "z6ntx2",
  retries: {
    runMode: 1,
    openMode: 1,
  },
  env: {
    url: "https://mailfence.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/*.cy.js'
  },
});
