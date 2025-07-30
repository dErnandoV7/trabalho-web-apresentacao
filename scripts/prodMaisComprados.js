const prodMaisComprados = document.querySelector(".maiscomprados-container")

const initializeDown = async () => {
    try {
        const res = await fetch("http://127.0.0.1:3333/maiscomprados")
        const produtos = await res.json()

        produtos.forEach((produto) => {
            prodMaisComprados.innerHTML += `
                <div class="card-produto">
                    <img src=${produto.imagem_url} alt=${produto.categoria}>
                    <p class="descricao-produto">
                        ${produto.nome}
                    </p>
                    <a href="produto.html?id=${produto.id}" class="ver-produto">
                        Ver produto
                    </a>
                    <a href="#" class="add-carrinho">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

initializeDown()