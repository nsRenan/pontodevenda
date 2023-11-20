require("dotenv").config();

const request = require("supertest");
const app = require("../../../src/servidor");

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarClienteTeste = require('../../auxiliares/metodos/cadastrarClienteTeste');

describe("Testando o detalhamento de clientes - Integração", () => {
    let token;
    let idClienteTeste;
    beforeAll(async () => {
        token = await gerarToken();
        idClienteTeste = await cadastrarClienteTeste(token);
    });
    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test("Deve retornar status 200 ao buscar um cliente", async () => {
        const response = await request(app)
            .get(`/cliente/${idClienteTeste}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String),
                cpf: expect.any(String),
                cep: expect.any(String),
                rua: expect.any(String),
                numero: expect.any(String),
                bairro: expect.any(String),
                cidade: expect.any(String),
                estado: expect.any(String)
            }
        );

    });

    test("Deve retornar status 401 ao buscar um cliente sem token", async () => {
        const response = await request(app)
            .get(`/cliente/${idClienteTeste}`);
        expect(response.status).toBe(401);
    });

    test("Deve retornar status 401 ao buscar um cliente com token inválido", async () => {
        const response = await request(app)
            .get(`/cliente/${idClienteTeste}`)
            .set("Authorization", `Bearer tokeninvalido`);
        expect(response.status).toBe(400);
    });

    test("Deve retornar status 400 ao buscar um cliente com id inválido", async () => {
        const response = await request(app)
            .get(`/cliente/0`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test("Deve retornar status 400 ao buscar um cliente com id inexistente", async () => {
        const response = await request(app)
            .get(`/cliente/999999`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
    });


});