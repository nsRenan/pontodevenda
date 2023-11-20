const {
  selecionarCategoriaPorID,
  cadastrarNovoProduto,
  selecionarTodosProdutos,

  selecionarProdutoPorCategoria,
  selecionarProdutoPorId,
  selecionarProdutoEmPedidos,

  excluirProduto,
  atualizarDadosProduto,
} = require("../auxiliares/produtos");

const { excluirImagemProduto } = require("../auxiliares/produtos");

const cadastrarProduto = async (req, res) => {
  try {
    const body = req.body;
    const { categoria_id } = body;

    const categoriaSelecionada = await selecionarCategoriaPorID(categoria_id);

    if (!categoriaSelecionada) {
      return res.status(400).send("Informe uma categoria valida");
    }
    const produtoCadastrado = await cadastrarNovoProduto(req);
    return res.status(201).send(produtoCadastrado);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editarDadosProduto = async (req, res) => {
  try {
    const atualizarProduto = await atualizarDadosProduto(req);
    return res.status(200).json(atualizarProduto);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const listarProduto = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    if (!categoria_id) {
      const produtosSelecionados = await selecionarTodosProdutos();
      return res.status(200).send(produtosSelecionados);
    }

    const produtosSelecionadosPorCategoria =
      await selecionarProdutoPorCategoria(categoria_id);

    return res.status(200).send(produtosSelecionadosPorCategoria);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await selecionarProdutoPorId(id);
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    // validação na exclusão de produto
    const checarProdutoVinculado = await selecionarProdutoEmPedidos(id);

    if (checarProdutoVinculado) {
      return res.status(400).json({
        mensagem:
          "Não é possível apagar o produto pois o mesmo já está vinculado a um pedido",
      });
    }

    // Aprimorar exclusão de produto
    const produto = await selecionarProdutoPorId(id);

    if (produto.produto_imagem) {
      const urlCortada = produto.produto_imagem.split(".com/")[1];
      await excluirImagemProduto(urlCortada);
    }

    await excluirProduto(id);

    return res.status(200).json({ mensagem: "Produto excluído com sucesso!" });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarProduto,
  editarDadosProduto,
  listarProduto,
  detalharProduto,
  excluirProdutoPorId,
};
