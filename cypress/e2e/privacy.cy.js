Cypress._.times(3, ()=>{
    it('Visitando a página de privacidade', ()=>{
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})