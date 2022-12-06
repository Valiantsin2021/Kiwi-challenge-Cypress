const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.kiwi.com/',
    env: {
      token:
        'E2E98QA6vGtKlaNT6T7tTclrKojUSxVZXQq9bxPKDM9Dy1wK0whnX412c5pGcie3NYMLwGjNkOUNwuQo4a51Qh6s-S25RFIU9FlbgN2x2qyg6sMsrcKEKR2b-Vi_vabtqdiFowwFMODrljmnUUfOrAld3QeN3BXYnHxe2OeEpt_y8aPrxFAeB1lzzeNR71AcDSx4rn_2yq4oNxcf5wEpeI8e6N4xZ39zDo0E2-iR3EMIKeyURdW3JPOybBIroD5rjFz-Hy2oU9sMB4Kp7Zx3T9gToX3bI4NcrheKfGFHeyVow4CAM9C_KFjH8N2aONlqv2iV4RWSFItbfzSwD2ltrlSsIRvF9pHKl68U_z2EJ5V5skumnb7u7LNPCcriZUweekIkhouIih4vYgvAV8iLrL6eDqqrf4VrjqNqZeh9eti1sGviOwx-Wbf7yCq_f0xGxuQbHjiY2l4NfVojsMs6kIw%3D%3D'
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    charts: true,
    reportPageTitle: 'Kiwi challange',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 50000
})
