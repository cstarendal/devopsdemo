describe('Staging smoke', () => {
  it('loads and shows Hello World', () => {
    const base = Cypress.env('STAGING_URL') as string
    cy.visit(base)
    cy.contains('Hello World').should('be.visible')
    cy.findByRole('img', { name: /smiley/i })
    cy.findByRole('img', { name: /heart/i })
  })
})

