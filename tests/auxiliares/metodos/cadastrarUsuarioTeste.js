const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');


const { usuarioTesteCompleto } = require('../modelos/usuarioTeste');

const cadastrarUsuarioTeste = async () => {
    await knex('usuarios').del();

    const response = await request(app).post('/usuario').send(usuarioTesteCompleto);
    return {
        id: response.body[0].id,
        nome: response.body[0].nome,
        email: response.body[0].email,
        senha: usuarioTesteCompleto.senha
    };
};

module.exports = cadastrarUsuarioTeste;