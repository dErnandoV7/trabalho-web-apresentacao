const produtoElement = document.querySelector("#produto")
const initialize = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    try {
        const res = await fetch(`http://127.0.0.1:3333/produto?id=${id}`)
        const produto = await res.json()
        let caracteristicasProduto = JSON.parse(produto.caracteristicas)
        caracteristicasProduto = caracteristicasProduto.map((caracteristica) => `<li> <strong>${caracteristica[0]}: </strong>${caracteristica[1]}</li>`).join("\n")
        const imgsProduto = produto.images_url.split(" ")

        
        produtoElement.innerHTML = `
                <div id="part1">
                    <div class="img-main">
                        <img src=${produto.imagem_url} alt="">
                        <span>Alta qualidade</span>
                    </div>
                    <div class="desc-main">
                        <div>
                            <h1 class="nome">${produto.nome}</h1>
                            <h2 class="preco">
                                <strong>R$</strong> ${produto.preco}
                            </h2>
                            <div class="imgs-produto">
                                <img src=${imgsProduto[0]} alt="">
                                <img src=${imgsProduto[1]} alt="">
                                <img src=${imgsProduto[2]} alt="">
                            </div>
                        </div>
                        <div>
                            <p class="btn-add-carrinho">Adicionar <i class="fa-solid fa-cart-shopping"></i></p>
                        </div>
                    </div>
                </div>
                <div id="part2">
                    <div class="descricao">
                        <h3>Descrição do produto</h3>
                        <p>${produto.descricao}</p>
                    </div>
                    <div class="caracteristicas">
                        <h3>Características</h3>
                        <ul>
                        ${caracteristicasProduto}
                        </ul>
                    </div>
                </div>
        `

    } catch (error) {
        console.log(error)
    }
}

initialize()