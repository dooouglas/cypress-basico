/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const TRHEE_SECONDS_IN_MS = 3000 // const = variavel

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        
        cy.clock()
        
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('douglas@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(TRHEE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()

        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('douglas@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TRHEE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        
        cy.get('#firstName').type('Douglas')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('douglas@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TRHEE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Douglas')
            .should('have.value', 'Douglas')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Lima')
            .should('have.value', 'Lima')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('douglas@exemplo.com')
            .should('have.value', 'douglas@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TRHEE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })  

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock() // congela o relogio do navegador
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(TRHEE_SECONDS_IN_MS) // avança no tempo 3seg sem que você precise aguardar 3seg durante o teste

        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube') // "should" é o que faz a verificação em si
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() { // "function" é uma função de callback 
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() { // "it" é um bloco de teste, dentro dele entre aspas fica o nome/descrição do teste
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload') //o ID #file-upload é opcional, serve para dar mais precisao ao que precisa ser selecionado, indicado para quando houver mais de 1 caixa de seleção
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile') //.as serve para definir um nome para o arquivo
        cy.get('input[type="file"]')
        .selectFile('@sampleFile') //o caminho do arquivo deve ser alterado para o mesmo nome definido no .as, e com um @ na frente
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show') // funcionalidade que exibe um elemento que esta escondido
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.') // uma condição a mais para "should", ex: "DEVE - estar visivel, E - conter a mensagem X"
        .invoke('hide') // esconde um elemento que esta sendo exibido
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20) // longText = o texto 0123456789 repetido 20x

        cy.get('#open-text-area')
        .invoke('val', longText) // val = value/valor / invoca o valor da area de texto (open-text-area) e define esse valor como o longtext citado a cima
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) { // essa função de callback deve/should receber a resposta do request feito 
            const { status, statusText, body } = response // variavel que desestrutura um objeto em javascript, no caso, propriedades de uma resposta api, entre chaves {}
            expect(status).to.equal(200) // outra forma de fazer verificações 
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it('encontre o gato escondido', function() {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
    })
})