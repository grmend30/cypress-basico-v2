Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ //fillMandatoryFieldsAndSubmit é o comando personalizado que vai preencher os campos obrigatórios e submeter//
    cy.get('#firstName').type('Grazielle')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('graziteste@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button[type="submit"]', 'Enviar').click()
})
