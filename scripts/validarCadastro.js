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
        if (this.tipo == "nome") {
            const valido = this.validarNome()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "email") {
            const valido = this.validarEmail()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "senha") {
            const valido = this.validarSenha()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "confirmar-senha") {
            const valido = this.validarConfirmarSenha()
            if (valido) return true
            else return false
        }

        else if (this.tipo == "cpf") {
            const valido = this.validarCPF()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "cidade") {
            const valido = this.validarCidade()
            if (valido) return true
            else return false
        }
        else if (this.tipo == "endereco") {
            const valido = this.validarEndereco()
            if (valido) return true
            else return false
        }
    }

    validarCampoObrigatorio() {
        const value = this.element.value
        if (!value) return false
        else return true
    }

    validarNome() {
        if (!this.validarCampoObrigatorio()) return false;

        const value = this.element.value.trim();
        if (value.length >= 2) return true
        else return false
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

    validarCPF() {
        if (!this.validarCampoObrigatorio()) return false;

        let cpf = this.element.value.trim()
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) return false;

        if (/^(\d)\1{10}$/.test(cpf)) return false;

        function calcularDigito(cpfParcial) {
            let soma = 0;
            let peso = cpfParcial.length + 1;

            for (let i = 0; i < cpfParcial.length; i++) {
                soma += parseInt(cpfParcial[i]) * peso--;
            }

            let resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        }

        let digito1 = calcularDigito(cpf.substring(0, 9));
        if (digito1 !== parseInt(cpf[9])) return false;

        let digito2 = calcularDigito(cpf.substring(0, 10));
        if (digito2 !== parseInt(cpf[10])) return false;

        return true;
    }

    validarCidade() {
        if (!this.validarCampoObrigatorio()) return false;

        const value = this.element.value.trim();
        if (value.length >= 2) return true
        else return false
    }

    validarEndereco() {
        if (!this.validarCampoObrigatorio()) return false;

        const value = this.element.value.trim();
        if (value.length >= 4) return true
        else return false
    }

    validarConfirmarSenha() {
        if (!this.validarCampoObrigatorio()) return false;

        const inputSenha = document.querySelector("#senha").value
        const value = this.element.value.trim();

        if (value == inputSenha) return true
        else return false
    }
}

const form = document.querySelector("#form")

const inputNome = document.querySelector("#nome")
const erroMsgNome = document.querySelector(".msg-erro-nome")

const inputEmail = document.querySelector("#email")
const erroMsgEmail = document.querySelector(".msg-erro-email")

const inputSenha = document.querySelector("#senha")
const erroMsgSenha = document.querySelector(".msg-erro-senha")

const inputSenhaConfirm = document.querySelector("#confirmar-senha")
const erroMsgSenhaConfirm = document.querySelector(".msg-erro-confirmar-senha")

const inputCPF = document.querySelector("#cpf")
const erroMsgCPF = document.querySelector(".msg-erro-cpf")

const inputCidade = document.querySelector("#cidade")
const erroMsgCidade = document.querySelector(".msg-erro-cidade")

const inputEndereco = document.querySelector("#endereco")
const erroMsgEndereco = document.querySelector(".msg-erro-endereco")

const nomeObj = new inputFormulario(inputNome, "nome", erroMsgNome)
const emailObj = new inputFormulario(inputEmail, "email", erroMsgEmail)
const senhaObj = new inputFormulario(inputSenha, "senha", erroMsgSenha)
const senhaConfirmObj = new inputFormulario(inputSenhaConfirm, "confirmar-senha", erroMsgSenhaConfirm)
const cpfObj = new inputFormulario(inputCPF, "cpf", erroMsgCPF)
const cidadeObj = new inputFormulario(inputCidade, "cidade", erroMsgCidade)
const enderecoObj = new inputFormulario(inputEndereco, "endereco", erroMsgEndereco)

const inputsObj = [nomeObj, emailObj, senhaObj, senhaConfirmObj, cpfObj, cidadeObj, enderecoObj]

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


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formularioValido = true;

    inputsObj.forEach((input) => {
        const valido = validarCampo(input);
        if (!valido) formularioValido = false;
    });

    if (formularioValido) {
        const dados = {}

        inputsObj.forEach((input) => {
            if (input.tipo != "confirmar-senha") dados[input.tipo] = input.element.value
        })

        fetch('http://localhost:3333/cadastra_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then((res) => window.location.href = "/login.html")
            .catch((error) => console.log(error))
    }
});
