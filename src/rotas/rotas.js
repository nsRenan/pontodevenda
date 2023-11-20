const { Router } = require('express');

const categoriaRotas = require('./categoriaRotas');
const loginRotas = require('./loginRotas');
const usuarioRotas = require('./usuarioRotas');
const clienteRotas = require('./clienteRotas');
const produtoRotas = require('./produtoRotas');
const pedidoRotas = require('./pedidoRotas');

const { validarAutenticacao } = require('../intermediarios/autenticação');

const rotas = Router();

// rotas acessiveis sem autenticação
rotas.use(categoriaRotas);
rotas.use(loginRotas);

// rotas acessiveis com (detalhe e atualização do usuario) 
//e sem autenticação (de cadastro de usuario)
rotas.use(usuarioRotas);

// rotas acessiveis apenas com autenticação
rotas.use(validarAutenticacao);

rotas.use(clienteRotas);
rotas.use(produtoRotas);
rotas.use(pedidoRotas);

module.exports = rotas;