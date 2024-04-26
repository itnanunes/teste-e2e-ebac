class ProdutosPage{

visitarUrl(){
    cy.visit('produtos')
}

    buscarProduto(){
    //código
    }

    buscarProdutoLista(nomeProduto){
        cy.get('.product-block')
    .contains(nomeProduto) //busca pelo nome
    .click() 
    }

    BuscarProdutoBarra(nomeProduto){
        // quando é um name coloca entre []
        // quando é uma classe coloca um .
        // quando tem varios elementos com o mesmo nome coloca "eq(posição do elemento): 0: primeiro | 1: segunno ..."
        cy.get ('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()

    }

    VisitarProduto(nomeProduto){
        // interpolação
        //cy.visit(`produtos/${nomeProduto}`)
        // Colocando o ifem de forma automatica nos espaços
        const urlFormatada = nomeProduto.replace (/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }

    addProdutoCarrinho(nomeProduto){
       
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Orange').click()
        cy.get('.input-text').clear().type(2)
        cy.get('.single_add_to_cart_button').click()

    }
    addProdutoCarrinhoOtimizando(tamanho, cor, quantidade){
       
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

    }
}

export default new ProdutosPage()
