const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');


const { ps5, xboxOne, nintendoSwitch, leiteSemLactose } = require('../modelos/produtoTeste');

const cadastrarProtudosTeste = async (token) => {
    await knex('produtos').del();

    responsePs5 = await request(app)
        .post('/produto')
        .set("Authorization", `Bearer ${token}`)
        .send(ps5);
    responseXboxOne = await request(app)
        .post('/produto')
        .set("Authorization", `Bearer ${token}`)
        .send(xboxOne);

    responseNintendoSwitch = await request(app)
        .post('/produto')
        .set("Authorization", `Bearer ${token}`)
        .send(nintendoSwitch);

    responseLeiteSemLactose = await request(app)
        .post('/produto')
        .set("Authorization", `Bearer ${token}`)
        .send(leiteSemLactose);

    return [responsePs5.body[0].id, responseXboxOne.body[0].id, responseNintendoSwitch.body[0].id, responseLeiteSemLactose.body[0].id];
};

module.exports = cadastrarProtudosTeste;