const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');

const { usuarioTesteCompleto } = require('../modelos/usuarioTeste');

const gerarToken = async () => {
    await knex('usuarios').del();
    await request(app).post('/usuario').send(usuarioTesteCompleto);
    const response = await request(app).post('/login').send({
        email: usuarioTesteCompleto.email,
        senha: usuarioTesteCompleto.senha
    });
    return response.body.token;
};

module.exports = gerarToken;