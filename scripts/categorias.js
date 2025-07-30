const categoriasContainer = document.querySelector(".categorias-container")

const initialize = async () => {
    try {
        const res = await fetch("http://127.0.0.1:3333/listaCategorias")
        const categorias = await res.json()

        categorias.forEach((categoria) => {
            categoriasContainer.innerHTML += `
            <div class="card-categoria">
                <img src=${categoria.imagem_url} alt=${categoria.nome} class="img-card-categoria">
                    <p>${categoria.nome}</p>
                    <a href="categoria.html?id=${categoria.id}" class="botao-ver-produtos">Ver produtos</a>
            </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
}

initialize()