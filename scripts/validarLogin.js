const dominiosValidos = [
    "@gmail.com",
    "@outlook.com",
    "@hotmail.com",
    "@hotmail.com.br",
    "@yahoo.com",
    "@yahoo.com.br",
    "@live.com",
    "@live.com.br",
    "@icloud.com",
    "@uol.com.br"
];

const carecteresEspeciais = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[",
    "]", "{", "}", "|", ";", "'", ":", "\"", ",", ".", "<", ">", "/", "?", "`",
    "~"
]

const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

class inputFormulario {
    constructor(element, tipo, elementError) {
        this.element = element
        this.tipo = tipo
        this.elementError = elementError
    }

    validar() {
        if (this.tipo == "email") {
            const valido = this.validarEmail()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "senha") {
            const valido = this.validarSenha()
            if (valido) return true
            else return false
        }
    }

    validarCampoObrigatorio() {
        const value = this.element.value
        if (!value) return false
        else return true
    }

    validarEmail() {
        if (!this.validarCampoObrigatorio()) return false;

        const value = this.element.value.trim();
        const emailValido = dominiosValidos.some((dominio) => value.includes(dominio));

        if (!emailValido) return false
        return true;
    }

    validarSenha() {
        if (!this.validarCampoObrigatorio()) return false;

        const value = this.element.value.trim();
        const contemCaracterEspecial = carecteresEspeciais.some((caracter) => value.includes(caracter))
        const contemNumero = numeros.some((numero) => value.includes(numero))

        if (contemCaracterEspecial && contemNumero) return true
        else return false
    }
}

const form = document.querySelector("#form")
const msgLoginResult = document.querySelector("#login-result")

const inputEmail = document.querySelector("#email")
const erroMsgEmail = document.querySelector(".msg-erro-email")

const inputSenha = document.querySelector("#senha")
const erroMsgSenha = document.querySelector(".msg-erro-senha")

const emailObj = new inputFormulario(inputEmail, "email", erroMsgEmail)
const senhaObj = new inputFormulario(inputSenha, "senha", erroMsgSenha)

const inputsObj = [emailObj, senhaObj]

const validarCampo = (input) => {
    const valido = input.validar()
    if (valido) input.elementError.classList.add("erro-hidden")
    else {
        input.elementError.classList.remove("erro-hidden")
    }
    return valido
}

inputsObj.forEach((input) => {
    input.element.addEventListener("keyup", () => validarCampo(input))
})


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formularioValido = true;

    inputsObj.forEach((input) => {
        const valido = validarCampo(input);
        if (!valido) formularioValido = false;
    });

    if (formularioValido) {
        try {
            const dados = {}

            inputsObj.forEach((input) => {
                dados[input.tipo] = input.element.value
            })

            const res = await fetch('http://127.0.0.1:3333/autenticacaoUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })

            const json = await res.json()

            if (res.status === 200) window.location.href = "/carrinho.html"
            else if (res.status === 401) {
                msgLoginResult.textContent = json
                msgLoginResult.style.display = "flex"
            } else {
                msgLoginResult.textContent = "Erro inesperado"
                msgLoginResult.style.display = "flex"
            }

        } catch (error) {
            msgLoginResult.textContent = "Erro ao realizar login"
            msgLoginResult.style.display = "flex"
            console.error(error)
        }
    }

});