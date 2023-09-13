/// <reference types="Cypress"/>

// const { it } = require("mocha")

describe('Central de atendimento ao cliente TAT', function () {
    this.beforeEach(() => {
        cy.visit('src/index.html')
    })

    it('Verifica o título da aplicação.', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche obrigatórios e envia com sucesso', function () {

        cy.clock() // congela o relógio do navegador

        cy.get('#firstName').type('Lucas').should('contain.value', 'Lucas')
        cy.get('#lastName').type('Vilela').should('contain.value', 'Vilela')
        cy.get('#email').type('vilelalucas500@gmail.com').should('contain.value', 'vilelalucas500@gmail.com')
        cy.get('#open-text-area').type('Teste', { delay: 0 }).should('contain.value', 'Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')

        cy.tick(3000)

        cy.get('.success > strong').should('not.be.visible')
    })

    it('Preenche obrigatórios e envia com erro no email', function () {
        cy.get('#firstName').type('Lucas').should('contain.value', 'Lucas')
        cy.get('#lastName').type('Vilela').should('contain.value', 'Vilela')
        cy.get('#email').type('vilelalucas500@gmailcom').should('contain.value', 'vilelalucas500@gmailcom')
        cy.get('#open-text-area').type('Teste').should('contain.value', 'Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('Valida que não foi digitado valor textual', function () {
        cy.get('#phone').type('abc').should('contain.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Lucas').should('contain.value', 'Lucas')
        cy.get('#lastName').type('Vilela').should('contain.value', 'Vilela')
        cy.get('#email').type('vilelalucas500@gmail.com').should('contain.value', 'vilelalucas500@gmail.com')
        cy.get('#open-text-area').type('Teste').should('contain.value', 'Teste')
        cy.get('#phone-checkbox').check().then(() => {
            cy.contains('button', 'Enviar').click()
            cy.get('.phone-label-span').should('be.visible')
            cy.get('.error > strong').should('be.visible')

        })
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Lucas').should('contain.value', 'Lucas')
        cy.get('#lastName').type('Vilela').should('contain.value', 'Vilela')
        cy.get('#email').type('vilelalucas500@gmail.com').should('contain.value', 'vilelalucas500@gmail.com')
        cy.get('#phone').type('123456789', { delay: 0 }).should('contain.value', '123456789')

        cy.get('#firstName').type('Lucas').clear().should('have.value', '')
        cy.get('#lastName').type('Vilela').clear().should('have.value', '')
        cy.get('#email').type('vilelalucas500@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('123456789', { delay: 0 }).clear().should('have.value', '')

    })

    it('Verifica erro direto', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it('Seleciona um produto(YouTube) pelo texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto(Mentoria) pelo valor', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto(Blog) pelo índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get(':nth-child(4) > input')
            .check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').each((radio) => {
            cy.wrap(radio)
                .check()
                .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const long_text = Cypress._.repeat('Lorem Ipsum ', 10)

        cy.get('#open-text-area')
            .invoke('val', long_text)
            .should('have.value', long_text)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')

            })
    });

    it('cat', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    });

})
