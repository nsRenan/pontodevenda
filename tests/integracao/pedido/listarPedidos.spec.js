const request = require("supertest");
const app = require("../../../src/servidor");


const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const limparPedidosCadastradosDoBancoDeDados = require('../../auxiliares/metodos/limparPedidosCadastradosDoBancoDeDados');

const cadastrarClienteTeste = require('../../auxiliares/metodos/cadastrarClienteTeste');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');
const cadastrarPedidosTeste = require('../../auxiliares/metodos/cadastrarPedidosTeste');

describe("Testando a listagem de pedidos - Integração", () => {
    let token;
    let pedido;
    let clienteID;

    beforeAll(async () => {
        token = await gerarToken();
        clienteID = await cadastrarClienteTeste(token);
        produtosCadastrados = await cadastrarProtudosTeste(token);

        await cadastrarPedidosTeste(token, clienteID, produtosCadastrados);
    });

    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test("Deve listar todos os pedidos cadastrados e retornar status 200", async () => {
        const resposta = await request(app).get("/pedido").set("Authorization", `Bearer ${token}`);
        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    pedido: expect.objectContaining({
                        id: expect.any(Number),
                        valor_total: expect.any(Number),
                        observacao: expect.any(String),
                        cliente_id: expect.any(Number),
                    }),
                    pedido_produtos: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            quantidade_produto: expect.any(Number),
                            valor_produto: expect.any(Number),
                            pedido_id: expect.any(Number),
                            produto_id: expect.any(Number)
                        }),
                    ]),
                }),
            ]));
    });

    test("Deve listar todos os pedidos cadastrados de um cliente especifico e retornar status 200", async () => {
        const resposta = await request(app)
            .get(`/pedido?cliente_id=${clienteID}`)
            .set("Authorization", `Bearer ${token}`);
        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    pedido: expect.objectContaining({
                        id: expect.any(Number),
                        valor_total: expect.any(Number),
                        observacao: expect.any(String),
                        cliente_id: expect.any(Number),
                    }),
                    pedido_produtos: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            quantidade_produto: expect.any(Number),
                            valor_produto: expect.any(Number),
                            pedido_id: expect.any(Number),
                            produto_id: expect.any(Number)
                        }),
                    ]),
                }),
            ]));
    });

    test("Deve retornar status 400 quando o cliente informado não existir", async () => {
        const resposta = await request(app)
            .get(`/pedido?cliente_id=999999`)
            .set("Authorization", `Bearer ${token}`);
        expect(resposta.status).toBe(400);
        expect(resposta.body).toEqual({
            mensagem: expect.any(String),
        });
    });

    test("Deve retornar status 400 quando o cliente informado é invalido", async () => {
        const resposta = await request(app)
            .get(`/pedido?cliente_id=`)
            .set("Authorization", `Bearer ${token}`);
        expect(resposta.status).toBe(400);
        expect(resposta.body).toEqual({
            mensagem: expect.any(String),
        });
    });

    test("Deve retornar status 200 quando não houver pedidos cadastrados", async () => {
        await limparPedidosCadastradosDoBancoDeDados();
        const resposta = await request(app)
            .get(`/pedido`)
            .set("Authorization", `Bearer ${token}`);
        expect(resposta.status).toBe(200);
        expect(resposta.body).toEqual({
            mensagem: expect.any(String),
        });
    });

});