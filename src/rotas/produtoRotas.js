const { Router } = require('express');

const { cadastrarProduto, editarDadosProduto, listarProduto, detalharProduto, excluirProdutoPorId } = require('../controladores/produtos');
const { verificarCategoria, verificarProduto } = require('../intermediarios/validacoes');
const { extrairJSON } = require('../intermediarios/body');
const schemaCadastroProduto = require('../validacoes/schemaCadastroProdutos');
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');

const multer = require('../intermediarios/multer');

const produtoRotas = Router();


produtoRotas.post('/produto', multer.single('imagem'), extrairJSON, validarCorpoRequisicao(schemaCadastroProduto), cadastrarProduto);
produtoRotas.put('/produto/:id', multer.single('imagem'), extrairJSON, verificarProduto, validarCorpoRequisicao(schemaCadastroProduto), verificarCategoria, editarDadosProduto)
produtoRotas.get('/produto', listarProduto);
produtoRotas.get('/produto/:id', verificarProduto, detalharProduto)
produtoRotas.delete('/produto/:id', verificarProduto, excluirProdutoPorId)

module.exports = produtoRotas;   