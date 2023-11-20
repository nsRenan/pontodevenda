const s3 = require("../backblaze/conexao");
const {PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const knex = require("../bancodedados/conexao");
require("dotenv").config();

const cadastrarNovoProduto = async (req) => {
  const body = req.body;
  const imagem = req.file;
  const { descricao, quantidade_estoque, valor, categoria_id } = body;
  if (imagem) {
    const imagemUpada = await uploadImagemProduto(req);
    return await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imagemUpada,
      })
      .returning(["*"]);
  }
  return await knex("produtos")
    .insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    })
    .returning(["*"]);
};

const selecionarCategoriaPorID = async (categoria_id) => {
  return await knex("categorias").where({ id: categoria_id }).first();
};

const selecionarProdutoPorCategoria = async (idCategoria) => {
  return await knex("produtos").where({ categoria_id: idCategoria });
};

const excluirProduto = async (id) => {
  return await knex("produtos").del().where({ id });
};

const uploadImagemProduto = async (req) => {
  const { file } = req;

  const upload = await s3
    .send(new PutObjectCommand({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    }))

  return  `https://${process.env.BACKBLAZE_BUCKET}.s3.${process.env.REGION}.backblazeb2.com/${file.originalname}`;
};

const selecionarProdutoPorId = async (idProduto) => {
  return await knex("produtos").where({ id: idProduto }).first();
};

const atualizarDadosProduto = async (req) => {
  const imagem = req.file;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  if (imagem) {
    const imagemUpada = await uploadImagemProduto(req);
    return await knex("produtos")
      .where("id", "=", id)
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imagemUpada,
      })
      .returning(["*"]);
  }
  return await knex("produtos")
    .where("id", "=", id)
    .update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    })
    .returning(["*"]);
};

const selecionarTodosProdutos = async () => {
  return await knex("produtos").select("*");
};

const excluirImagemProduto = async (path) => {
  await s3.send( new DeleteObjectCommand({ 
    Bucket: process.env.KEY_NAME, 
    Key: path 
  }));
};

const selecionarProdutoEmPedidos = async (id) => {
  return await knex("pedido_produtos").where({ produto_id: id }).first();
};

module.exports = {
  cadastrarNovoProduto,
  selecionarTodosProdutos,
  selecionarCategoriaPorID,
  selecionarProdutoPorCategoria,
  excluirProduto,
  selecionarProdutoPorId,
  atualizarDadosProduto,
  uploadImagemProduto,
  excluirImagemProduto,
  selecionarProdutoEmPedidos,
};
