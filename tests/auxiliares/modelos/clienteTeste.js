
const clienteTeste = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: "12345678981",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}

const clienteTesteSemConteudo = {
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "Rua Principal",
    numero: "",
    bairro: "",
    cidade: "",
    estado: ""
}

const clienteTesteEmailInvalido = {
    email: "emailinvalido",
}

const clienteCamposObrigatorios = {
    nome: "José Silva",
    email: "jose.silva@email.com",
    cpf: "12345668901"
}

const clienteCamposObrigatoriosNaoPreenchidos = {
    nome: "",
    email: "",
    cpf: ""
}
const clienteEmailExistente = {
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "12345678999",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}

const clienteCpfExistente = {
    nome: "Francisco Silva",
    email: "francisco.silva@email.com",
    cpf: "12345678901",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}


const clienteTesteSemNome = {
    nome: "",
    email: "joao.silva@email.com",
    cpf: "12345678981",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}

const clienteTesteSemEmail = {
    nome: "João Silva",
    email: "",
    cpf: "12345678981",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}


const clienteTesteCompletoEmailInvalido = {
    nome: "João Silva",
    email: "emailinvalido",
    cpf: "12345678981",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}

const clienteTesteCPFInvalido = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: '185.644.484.874-84',
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}


const clienteTesteCEPInvalido = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: "12345678981",
    cep: "12345678-121",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}


const clienteTesteParaAtualizar = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    cpf: "12345678981",
    cep: "12345678",
    rua: "Rua Principal",
    numero: "123",
    bairro: "Bairro Central",
    cidade: "Natal",
    estado: "RN"
}

const listaDeClientesCompletos = [
    {
        nome: "Teste",
        email: "teste@gmail.com",
        cpf: "12345678901",
        cep: "12345678",
        rua: "Rua teste",
        numero: "123",
        bairro: "Bairro teste",
        cidade: "Cidade teste",
        estado: "Estado teste",
    },
    {
        nome: "Teste2",
        email: "test2@gmail.com",
        cpf: "12345678902",
        cep: "12345679",
        rua: "Rua teste2",
        numero: "123",
        bairro: "Bairro teste2",
        cidade: "Cidade teste2",
        estado: "Estado teste2",
    },
]

module.exports = {
    clienteTeste,
    clienteTesteSemConteudo,
    clienteTesteEmailInvalido,
    clienteCamposObrigatorios,
    clienteCamposObrigatoriosNaoPreenchidos,
    clienteEmailExistente,
    clienteCpfExistente,
    clienteTesteSemNome,
    clienteTesteSemEmail,
    clienteTesteCompletoEmailInvalido,
    clienteTesteCPFInvalido,
    clienteTesteCEPInvalido,
    clienteTesteParaAtualizar,
    listaDeClientesCompletos
}