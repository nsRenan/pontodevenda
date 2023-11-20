const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');


const { clienteTeste } = require('../modelos/clienteTeste');

const cadastrarClienteTeste = async (token) => {
    await knex('clientes').del();
    const response = await request(app)
        .post('/cliente')
        .set("Authorization", `Bearer ${token}`)
        .send(clienteTeste);
    return response.body.id;
};

module.exports = cadastrarClienteTeste;