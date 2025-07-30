const produtosCarrinho = document.querySelectorAll(".registro-produto")
const confirmarEditBtn = document.querySelector(".confirmar-edit")

confirmarEditBtn.addEventListener("click", () => {
    produtosCarrinho.forEach((produto) => {
        const inputValue = produto.querySelector("input").value

        if (inputValue <= 0) produto.remove()
    })
})
