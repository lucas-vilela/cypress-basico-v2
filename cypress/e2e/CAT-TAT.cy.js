/// <reference types="Cypress"/>

describe('Central de atendimento ao cliente TAT', function(){
    this.beforeEach(()=>{
        cy.visit('src/index.html')
    })


    it('Verifica o título da aplicação.', function() {
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Escreve o nome', function(){
        cy.get('#firstName').type('Lucas')
    })
})
