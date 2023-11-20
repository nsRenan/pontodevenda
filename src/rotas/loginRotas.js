const { Router } = require('express');

const { loginUsuario } = require('../controladores/login');
const schemaLogin = require('../validacoes/schemaLogin');
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');

const loginRotas = Router();

loginRotas.post('/login', validarCorpoRequisicao(schemaLogin), loginUsuario);


module.exports = loginRotas;