const knex = require('../../../src/bancodedados/conexao');

const limparDadosDoBancoDeDados = async () => {
    await knex('pedido_produtos').delete();
    await knex('pedidos').delete();
    await knex('produtos').delete();
    await knex('clientes').delete();
    await knex('usuarios').delete();
};

module.exports = limparDadosDoBancoDeDados;