const knex = require('../../../src/bancodedados/conexao');

const limparPedidosCadastradosDoBancoDeDados = async () => {
    await knex('pedido_produtos').delete();
    await knex('pedidos').delete();
};

module.exports = limparPedidosCadastradosDoBancoDeDados;