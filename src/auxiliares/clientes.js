const knex = require("../bancodedados/conexao");
require("dotenv").config();

const selecionarClientes = async () => {
  return await knex("clientes").select("*");
};

const selecionarClientePorId = async (id) => {
  return await knex("clientes").where({ id }).first();
};

const selecionarClientePorEmail = async (email) => {
  return await knex("clientes").where({ email }).first();
};

const selecionarClientePorCpf = async (cpf) => {
  return await knex("clientes").where({ cpf }).first();
};

const editarDadosDoCliente = async (
  nome,
  email,
  cpf,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  estado,
  id
) => {
  const editarCliente = await knex("clientes")
    .where("id", "=", id)
    .update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    })
    .returning([
      "id",
      "nome",
      "email",
      "cpf",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ]);

  return editarCliente;
};

const cadastrarClienteUtilitarios = async (
  nome,
  email,
  cpf,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  estado
) => {
  const cadastrandoCliente = await knex("clientes")
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning("*");

  const novoCliente = cadastrandoCliente[0];

  Object.keys(novoCliente).forEach((key) => {
    novoCliente[key] = novoCliente[key] || "";
  });

  return novoCliente;
};

const listarPedidosTodosOuPorCliente = async (cliente_id) => {
  try {
    const pedidos = await knex("pedidos")
      .select(
        "pedidos.id as pedidos_id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",

        "pedido_produtos.id as pedido_produtos_id",
        "pedido_produtos.quantidade_produto",
        "pedido_produtos.valor_produto",
        "pedido_produtos.pedido_id",
        "pedido_produtos.produto_id"
      )
      .join("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
      // adicionando o where para filtrar por cliente_id, somente se o cliente_id for informado
      .modify(function (queryBuilder) {
        if (cliente_id) {
          queryBuilder.where({ "pedidos.cliente_id": cliente_id });
        }
      });

    if (pedidos.length === 0) {
      return [];

    } else {
      const pedidosFormatados = [
        {
          pedido: {
            id: pedidos[0].pedidos_id,
            valor_total: pedidos[0].valor_total,
            observacao: pedidos[0].observacao,
            cliente_id: pedidos[0].cliente_id,
          },
          pedido_produtos: [],
        },
      ];

      pedidos.forEach((pedidoLinha) => {
        const pedidoEncontrado = pedidosFormatados.find(
          (pedidoFormatado) =>
            pedidoFormatado.pedido.id === pedidoLinha.pedidos_id
        );

        if (!pedidoEncontrado) {
          pedidosFormatados.push({
            pedido: {
              id: pedidoLinha.pedidos_id,
              valor_total: pedidoLinha.valor_total,
              observacao: pedidoLinha.observacao,
              cliente_id: pedidoLinha.cliente_id,
            },
            pedido_produtos: [],
          });
        }


        const pedidoProdutoEncontrado = pedidosFormatados.find(
          (pedidoFormatado) =>
            pedidoFormatado.pedido.id === pedidoLinha.pedidos_id
        );

        if (pedidoLinha.pedido_produtos_id) {
          pedidoProdutoEncontrado.pedido_produtos.push({
            id: pedidoLinha.pedido_produtos_id,
            quantidade_produto: pedidoLinha.quantidade_produto,
            valor_produto: pedidoLinha.valor_produto,
            pedido_id: pedidoLinha.pedido_id,
            produto_id: pedidoLinha.produto_id,
          });
        }
      });

      return pedidosFormatados;
    }

  } catch (error) {
    console.error(error.message);
    throw new Error(error.message, error.status);
  }
};

module.exports = {
  selecionarClientes,
  selecionarClientePorId,
  selecionarClientePorEmail,
  selecionarClientePorCpf,
  editarDadosDoCliente,
  cadastrarClienteUtilitarios,
  listarPedidosTodosOuPorCliente,
};
