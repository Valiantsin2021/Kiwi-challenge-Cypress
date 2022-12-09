describe('User opens Kiwi agregator website and performs search and checks the price', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#cookies_accept').should('be.be.visible').click({ force: true })
  })
  it('Performs UI flight search on Kiwi agregator and checks the prices are shown', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.get('[data-test="PlacePickerInputPlace-close"]').click()
    cy.get('[data-test="SearchField-input"').eq(0).type('Malaga').blur()
    cy.contains(
      '[data-test="PlacePickerRow-wrapper"] div',
      'Málaga, Spain'
    ).click({ force: true })
    cy.get('[data-test="SearchField-input"').eq(1).type('Stockholm').blur()
    cy.contains(
      '[data-test="PlacePickerRow-wrapper"] div',
      'Stockholm, Sweden'
    ).click({ force: true })
    cy.window().then(win => {
      cy.stub(win, 'open')
        .callsFake((url, target) => {
          expect(target).to.be.undefined
          return win.open.wrappedMethod.call(win, url, '_self')
        })
        .as('open')
      cy.get('[data-test="LandingSearchButton"]').click()
      cy.get('@open').should(
        'have.been.calledOnceWithExactly',
        '/en/search/results/malaga-spain/stockholm-sweden'
      )
      cy.go('back')
      cy.get('[data-test="LandingSearchButton"]').click()
      cy.contains('div', 'Select').eq(0).click()
      cy.get('[data-test="MagicLogin-GuestTextLink"]').click()
    })
  })
  it(`Uses request to shortcut the search flight on Kiwi agregator`, () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.visit({
      url: 'https://www.kiwi.com/booking',
      qs: {
        token: Cypress.env('token'),
        holdBags: 1
      }
    })
    cy.get('.ReservationBill-item-price')
      .should('be.visible')
      .should('not.be.empty')
    cy.get('[data-test="bookingBillCheckedBaggage"] > p')
      .eq(0)
      .should('be.visible')
      .and('have.text', 'Checked baggage')
    cy.get('[data-test="bookingBillCheckedBaggage"] span.length-7')
      .should('be.visible')
      .should('not.be.empty')
    cy.get('[data-test="Baggage-AddBlueRibbonBag"]').check({ force: true })
    cy.get('[data-test="bookingBillBlueribbonBags"] > p')
      .eq(0)
      .should('be.visible')
      .and('contain.text', 'Lost baggage protection')
    cy.get('[data-test="bookingBillBlueribbonBags"] p')
      .eq(1)
      .should('be.visible')
      .should('not.be.empty')
  })
})
