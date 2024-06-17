/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

      /// Fazendo login utilizando fixture
     cy.fixture('perfil').then((dados) => {
     cy.login(dados.usuario, dados.senha)})

     // Buscando e adicionando produtos com massa de dados
     cy.fixture('produtos').then(dados =>{
        produtosPage.BuscarProdutoBarra(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinhoOtimizando(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade )

        produtosPage.BuscarProdutoBarra(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinhoOtimizando(
            dados[1].tamanho, 
            dados[1].cor, 
            dados[1].quantidade )

        produtosPage.BuscarProdutoBarra(dados[2].nomeProduto)
        produtosPage.addProdutoCarrinhoOtimizando(
            dados[2].tamanho, 
            dados[2].cor, 
            dados[2].quantidade )

        produtosPage.BuscarProdutoBarra(dados[3].nomeProduto)
        produtosPage.addProdutoCarrinhoOtimizando(
            dados[3].tamanho, 
            dados[3].cor, 
            dados[3].quantidade )

        })
       // Fazendo checkout
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
         // Preenchendo o formulário usando comandos customizados
        cy.formularioCheckout('Itnã', 'Santana', 'Rua do piriquito', 'Salvador', '40020-680', '7199308-5996')
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()

        // Finalizando a compra
        cy.get('#place_order').click()

        // Validação

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    })
})