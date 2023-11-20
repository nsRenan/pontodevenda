const request = require('supertest');
const app = require('../../../src/servidor');

const gerarToken = require('../../auxiliares/metodos/gerarToken');
const limparDadosDoBancoDeDados = require('../../auxiliares/metodos/limparDadosDoBancoDeDados');
const cadastrarProtudosTeste = require('../../auxiliares/metodos/cadastrarProtudosTeste');
const cadastrarClienteTeste = require('../../auxiliares/metodos/cadastrarClienteTeste');
const cadastrarPedidosTeste = require('../../auxiliares/metodos/cadastrarPedidosTeste');

describe('Testando a exclusão de produtos por id - Integração', () => {
    let token = null;
    let produtosCadastrados = null;
    let produtoCadastradoParaExcluir = null;
    let clienteId;
    beforeAll(async () => {

        token = await gerarToken();
        produtosCadastrados = await cadastrarProtudosTeste(token);
        clienteId = await cadastrarClienteTeste(token);
        await cadastrarPedidosTeste(token, clienteId, produtosCadastrados);
    });

    afterAll(async () => {
        await limparDadosDoBancoDeDados();
    });

    test('Não deve excluir o produto sem informar o id e deve retornar 404', async () => {
        const response = await request(app)
            .del('/produto')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(404);
    });

    test('Não deve excluir o produto sem informar o token e deve retornar 401', async () => {
        const response = await request(app)
            .del(`/produto/${produtosCadastrados[0]}`)
            .set('Authorization', '')
            .send();
        expect(response.status).toBe(401);
    });


    test('Não Deve excluir o produto que está presente em um pedido e deve retornar 400', async () => {
        const response = await request(app)
            .del(`/produto/${produtosCadastrados[0]}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining(
                {
                    mensagem: expect.any(String)
                }
            )
        );
    });

    test('Deve excluir o produto e retornar 204', async () => {
        const response = await request(app)
            .del(`/produto/${produtosCadastrados[2]}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
    });

    test('Não deve excluir o produto inexistente e retornar 404', async () => {
        const response = await request(app)
            .del(`/produto/${produtosCadastrados[2] + 99}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(404);
    });

});