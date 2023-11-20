const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const { after } = require('node:test');
let token;

describe("Testando a atualização de usuários - Integração", () => {

    beforeAll(async () => {
        token = await gerarToken();
    });
    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });
    test("Deve retornar status 200 ao detalhar perfil do usuario. Retorna code 200.", async () => {
        const response = await request(app).get("/usuario").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String)
            })
        );
    });
    test("Não deve retornar status 401 ao detalhar perfil sem informar o token. Retorna code 400", async () => {
        const response = await request(app).get("/usuario").set("Authorization", '');
        expect(response.status).toBe(401);
    });
});