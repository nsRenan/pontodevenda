const { Router } = require('express');

const { cadastrarPedido, listarPedidos } = require('../controladores/pedidos');
const { verificarClienteNoBody } = require('../intermediarios/validacoes');
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');
const schemaPedido = require('../validacoes/schemaPedido');


const pedidoRotas = Router();

pedidoRotas.post('/pedido', validarCorpoRequisicao(schemaPedido), verificarClienteNoBody, cadastrarPedido);
pedidoRotas.get('/pedido', listarPedidos);

module.exports = pedidoRotas;
