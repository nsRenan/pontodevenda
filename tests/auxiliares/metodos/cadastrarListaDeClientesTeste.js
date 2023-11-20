const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');


const { listaDeClientesCompletos } = require('../modelos/clienteTeste');

const cadastrarListaDeClientesTeste = async (token) => {
    await request(app)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send(listaDeClientesCompletos[0]);
    await request(app)
        .post('/cliente')
        .set('Authorization', `Bearer ${token}`)
        .send(listaDeClientesCompletos[1]);

};

module.exports = cadastrarListaDeClientesTeste;