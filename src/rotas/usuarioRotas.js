const { Router } = require('express');

const { cadastrarUsuario, detalharPerfilUsuario, atualizarPerfilUsuario } = require('../controladores/usuarios');
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');
const { validarAutenticacao } = require('../intermediarios/autenticação');
const { verificarEmailDuplicado } = require('../intermediarios/validacoes');
const schemaCadastro = require('../validacoes/schemaCadastro');


const usuarioRotas = Router();


usuarioRotas.post('/usuario', verificarEmailDuplicado, validarCorpoRequisicao(schemaCadastro), cadastrarUsuario);
usuarioRotas.get('/usuario', validarAutenticacao, detalharPerfilUsuario);
usuarioRotas.put('/usuario', validarAutenticacao, validarCorpoRequisicao(schemaCadastro), atualizarPerfilUsuario);


module.exports = usuarioRotas;


