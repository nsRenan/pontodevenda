const request = require('supertest');
const app = require('../../../src/servidor');
const knex = require('../../../src/bancodedados/conexao');

const { pedidoTesteCompleto, pedidoTesteCamposObrigatorios } = require('../../auxiliares/modelos/pedidoTeste');

const cadastrarPedidosTeste = async (token, cliente_id, produtosCadastrados) => {
    pedidoTesteCompleto.cliente_id = cliente_id;
    pedidoTesteCompleto.observacao = 'Pedido de teste';
    pedidoTesteCompleto.pedido_produtos.push(
        {
            produto_id: produtosCadastrados[0],
            quantidade_produto: 1
        });
    pedidoTesteCompleto.pedido_produtos.push({
        produto_id: produtosCadastrados[1],
        quantidade_produto: 1
    });

    pedidoTesteCamposObrigatorios.cliente_id = cliente_id;
    pedidoTesteCamposObrigatorios.observacao = 'Pedido de teste 2';
    pedidoTesteCamposObrigatorios.pedido_produtos.push(
        {
            produto_id: produtosCadastrados[0],
            quantidade_produto: 2
        });
    pedidoTesteCamposObrigatorios.pedido_produtos.push({
        produto_id: produtosCadastrados[1],
        quantidade_produto: 2
    });

    const resultado1 = await request(app)
        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send(pedidoTesteCompleto);


    const resultado2 = await request(app)
        .post('/pedido')
        .set('Authorization', `Bearer ${token}`)
        .send(pedidoTesteCamposObrigatorios);
    return [resultado1.body, resultado2.body, pedidoTesteCompleto, pedidoTesteCamposObrigatorios];
};

module.exports = cadastrarPedidosTeste;