Cypress._.times (3, function(){
    it.only('testa a página da política de privacidade de forma independente', function(){
        cy.visit('/src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})

//"cypress open --config viewportWidth=410 viewportHeight=860", -> comando que simula rodar testes em dispositivo móvel
//"cypress run --config viewportWidth=410 viewportHeight=860", -> comando que simula rodar testes em dispositivo móvel em modo headles