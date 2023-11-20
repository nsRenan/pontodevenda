const request = require("supertest");
const app = require("../../../src/servidor");

const gerarToken = require("../../auxiliares/metodos/gerarToken");
const limparDadosDoBancoDeDados = require("../../auxiliares/metodos/limparDadosDoBancoDeDados");
const cadastrarListaDeClientesTeste = require("../../auxiliares/metodos/cadastrarListaDeClientesTeste");


describe("Testando a listagem dos  clientes - Integração", () => {
    let token = null;

    beforeAll(async () => {
        token = await gerarToken();
        await cadastrarListaDeClientesTeste(token);
    });

    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test("Deve retornar status 200 ao listar todos os clientes cadastrados.", async () => {
        const response = await request(app)
            .get(`/cliente`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: expect.any(String),
                    email: expect.any(String),
                    cpf: expect.any(String),
                    cep: expect.any(String),
                    rua: expect.any(String),
                    numero: expect.any(String),
                    bairro: expect.any(String),
                    cidade: expect.any(String),
                    estado: expect.any(String),
                })
            ])
        );
    });

    test("Deve retornar status 401 ao listar todos os clientes sem token.", async () => {
        const response = await request(app)
            .get(`/cliente`);
        expect(response.status).toBe(401);
    });
});