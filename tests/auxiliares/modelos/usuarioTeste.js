
const usuarioTesteCompleto = {
    nome: 'Usuário Teste',
    email: 'teste@gmail.com',
    senha: '123456'
}

const usuarioTesteSemEmail = {
    nome: 'Usuário Teste',
    senha: '123456'
}

const usuarioTesteSemNome = {
    email: 'teste@gmail.com',
    senha: '123456'
}

const usuarioTesteSemSenha = {
    nome: 'Usuário Teste',
    email: 'teste@gmail.com'
}

const usuarioTesteEmailInvalido = {
    nome: 'Usuário Teste',
    email: 'emailinvalido',
    senha: '123456'
}

const usuarioTesteEmailDuplicado = {
    nome: 'Usuário Teste de Email Duplicado',
    email: 'emailduplicado@gmail.com',
    senha: '123456'
}

const usuarioTesteSemConteudo = {
    nome: '',
    email: '',
    senha: ''
}

const usuarioTesteParaAtualizar = {
    nome: 'Usuário Teste Atualizado',
    email: 'novoemail@gmail.com',
    senha: 'novasenha'
}
const usuarioTesteEmailNaoCadastrado = {
    senha: 'senhanãocadastrada',
    email: 'usuarioTesteEmailNaoCadastrado@gmail.com'
}

const usuarioTesteSenhaInvalida = {
    senha: 'senhainvalida'
}
module.exports = {
    usuarioTesteCompleto,
    usuarioTesteSemEmail,
    usuarioTesteSemNome,
    usuarioTesteSemSenha,
    usuarioTesteEmailInvalido,
    usuarioTesteEmailDuplicado,
    usuarioTesteSemConteudo,
    usuarioTesteParaAtualizar,
    usuarioTesteEmailNaoCadastrado,
    usuarioTesteSenhaInvalida
}
