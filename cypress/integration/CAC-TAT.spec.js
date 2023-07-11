/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
      cy.visit('/src/index.html')
    })
  
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  
    it('preenche os campos obrigatórios e envia o formulário', function(){
      const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
      
      cy.get('#firstName').type('Grazielle')
      cy.get('#lastName').type('Teste')
      cy.get('#email').type('graziteste@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})//utiliza o delay para quando digitar texto longo o teste não demorar para executar. Deve ser passado como segundo objeto de options (além da string que queremos digitar) com a propriedade = 0//
      cy.contains('button[type="submit"]', 'Enviar').click()
  
      //O ponto antes da palavra, identifica que é uma classe. Ex.: .success (classe success)//
      cy.get('.success').should('be.visible')
    })
  
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Grazielle')
      cy.get('#lastName').type('Teste')
      cy.get('#email').type('graziteste@gmail,com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button[type="submit"]', 'Enviar').click()
  
      //procura por mensagem de erro//
      cy.get('.error').should('be.visible')
    })
  
    it('verificar campo de telefone continua vazio quando preenchido com valor não numérico', function(){
      cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '')
  
    })
  
    it('exibe mensagem de erro ao marcar checkbox de telefone e não preencher campo', function(){
      cy.get('#firstName').type('Grazielle')
      cy.get('#lastName').type('Teste')
      cy.get('#email').type('graziteste@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button[type="submit"]', 'Enviar').click()
  
      cy.get('.error').should('be.visible')
    })
  
  
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName')
        .type('Grazielle')
        .should('have.value', 'Grazielle')
        .clear()
        .should('have.value', '')
      //preenche o campo, valida se o campo foi preenchido, limpa campo e valida se campo foi limpo//
      cy.get('#lastName')
        .type('Teste')
        .should('have.value', 'Teste')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('graziteste@gmail.com')
        .should('have.value', 'graziteste@gmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone-checkbox').check()
      cy.get('#phone')
        .type('31999887766')
        .should('have.value', '31999887766')
        .clear()
        .should('have.value', '')
    })
  
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button[type="submit"]', 'Enviar').click()
  
      cy.get('.error').should('be.visible')
    })
  
    it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit() //substitui os comandos de enviar formulário com sucesso preenchendo os campos
    })
  
    it('seleciona o produto (Youtube) por seu texto', function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })
  
    it('seleciona o produto (Mentoria) pelo seu valor', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })
  
    it('seleciona o produto (Blog) pelo seu índice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })
  
    it('marca tipo atendimento (Feedback)', function (){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })
  
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3) //verificar que o comprimento da lista existem 3 elementos
      .each(function($radio) { //each recebe uma função de callback que recebe cada um dos elementos que foi selecionado no radio
        cy.wrap($radio).check() //o wrap vai empacotar cada um dos elementos radio
        cy.wrap($radio).should('be.checked')
      })
    })
  
    it('marca ambos os checkboxes e desmarca o último', function(){
      cy.get('input[type="checkbox"]').check() //marcar ambos os checkboxes
      .should('be.checked') //verifica se todos os checkboxes foram marcados
      .last().uncheck() //pega último elemento checkbox e desmarca
      .should('not.be.checked') //verifica se último elemento foi desmarcado
    })
  
    it('seleciona um arquivo da pasta fixtures', function (){
      cy.get('input[type="file"]#file-upload') //# indica o id do seletor css
        .should('not.have.value') //verifica que não tem nenhum valor selecionado
        .selectFile('cypress/fixtures/example.json')
        //.should(function ($input)) -> pode substituir o .then
        .then(input => {
          console.log(input) //exibe dados no console ao ser inspecionado
          expect(input[0].files[0].name).to.equal('example.json') //verifica se o arquivo selecionado é o primeiro índice do input > files > name e se o nome do arquivo que foi feito o upload é exemple.json
        })
    })
  
    it('seleciona um arquivo simulando drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload') //# indica o id do seletor css
        .should('not.have.value') //verifica que não tem nenhum valor selecionado
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //primeiro select vai ser o arquivo e o segundo vai ser o objeto como se o usuário arrastasse o arquivo pra cima do input
        .should(function ($input){ //-> pode substituir o .then
          expect($input[0].files[0].name).to.equal('example.json') //verifica se o arquivo selecionado é o primeiro índice do input > files > name e se o nome do arquivo que foi feito o upload é exemple.json
        })
    })
  
    it('selecioan um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile') //pega a fixture e da um "apelido" pra ela
      cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile') // o @ identifica que é um alias
        .should(function (input){ //-> pode substituir o .then
          expect(input[0].files[0].name).to.equal('example.json')
      })
    })
  
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank') //pega o elemento ancora com id privacy e verifica se o elemento attr (atributo) do tipo target _blank
    })
  
    it('acessa a página da política de privacidade e então clicando no link', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target') //funcionalidade invoke remove o atributo .target_blank que abriria a página em outra aba, mas precisa estar no mesmo domínio/subdomínio
        .click()
      
      cy.contains('Talking About Testing').should('be.visible')
    })
  
    it('acessa a página da política de privacidade e então clicando no link', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target') //funcionalidade invoke remove o atributo .target_blank que abriria a página em outra aba, mas precisa estar no mesmo domínio/subdomínio
        .click()
      
      cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
    })
  })