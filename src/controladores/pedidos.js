
const knex = require("../bancodedados/conexao");
const enviarEmail = require("../servicos/nodemailer");
const {
  selecionarClientePorId,
  listarPedidosTodosOuPorCliente,
} = require("../auxiliares/clientes");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  const { nome: nomeRemetente, email: emailRemetente } = req.usuario;
  const { nome, email } = req.cliente;

  try {
    let erros = [];
    let valorTotal = 0;

    for (const item of pedido_produtos) {
      let produtoCorrente = await knex("produtos")
        .where("id", "=", item.produto_id)
        .first();

      if (!produtoCorrente) {
        erros.push({
          mensagem: `Não existe produto para o produto_id informado: ${item.produto_id}`,
        });

        continue;
      }

      if (item.quantidade_produto > produtoCorrente.quantidade_estoque) {
        erros.push({
          mensagem: `A quantidade solicitada: ${item.quantidade_produto} para o produto de ID: ${produtoCorrente.id}
        é maior que a quantidade atual em estoque: ${produtoCorrente.quantidade_estoque}`,
        });

        continue;
      }

      valorTotal += produtoCorrente.valor * item.quantidade_produto;

      item.valor_produto = produtoCorrente.valor;
      item.quantidade_estoque = produtoCorrente.quantidade_estoque;
    }

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const pedido = await knex("pedidos")
      .insert({
        cliente_id: cliente_id,
        observacao: observacao,
        valor_total: valorTotal,
      })
      .returning("*");

    for (const item of pedido_produtos) {
      await knex("pedido_produtos").insert({
        pedido_id: pedido[0].id,
        produto_id: item.produto_id,
        quantidade_produto: item.quantidade_produto,
        valor_produto: item.valor_produto,
      });

      let quantidadeReduzida =
        item.quantidade_estoque - item.quantidade_produto;

      await knex("produtos").where("id", "=", item.produto_id).update({
        quantidade_estoque: quantidadeReduzida,
      });
    }

    const assunto = "Notificação do pedido";

    const texto = `Pedido efetuado com sucesso. Valor total do pedido: R$${pedido[0].valor_total / 100
      }`;

    enviarEmail(nomeRemetente, emailRemetente, nome, email, assunto, texto);

    return res.status(201).json({ mensagem: "Pedido efetuado com sucesso" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;
  let listaDePedidos = [];
  try {
    if (cliente_id !== undefined) {
      if (cliente_id === "") {
        return res
          .status(400)
          .json({
            mensagem: "Caso informado, o id do cliente não pode ser vazio",
          });
      }
      const clienteExistente = await selecionarClientePorId(cliente_id);
      if (clienteExistente === undefined) {
        return res
          .status(400)
          .json({ mensagem: "O cliente informado não existe" });
      }
      listaDePedidos = await listarPedidosTodosOuPorCliente(cliente_id);
    } else {
      listaDePedidos = await listarPedidosTodosOuPorCliente();
    }

    if (listaDePedidos.length === 0) {
      return res.status(200).json({ mensagem: "Não há pedidos cadastrados" });
    }
    return res.status(200).json(listaDePedidos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarPedido,
  listarPedidos,
};
