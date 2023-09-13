Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Lucas').should('contain.value', 'Lucas')
    cy.get('#lastName').type('Vilela').should('contain.value', 'Vilela')
    cy.get('#email').type('vilelalucas500@gmail.com').should('contain.value', 'vilelalucas500@gmail.com')
    cy.get('#open-text-area').type('Teste', { delay: 0 }).should('contain.value', 'Teste')
    cy.contains('button', 'Enviar').click()
    
})