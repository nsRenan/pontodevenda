const { Router } = require('express');

const { verificarCliente, verificarEmailClientePorId, verificarCpfClientePorId, verificarEmailCliente, verificarCpfCliente } = require('../intermediarios/validacoes');
const { cadastrarCliente, editarDadosCliente, listarClientes, detalharCliente } = require('../controladores/clientes');

const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');
const schemaClientes = require('../validacoes/schemaClientes');


const clienteRotas = Router();

clienteRotas.post('/cliente', validarCorpoRequisicao(schemaClientes),
    verificarEmailCliente, verificarCpfCliente, cadastrarCliente);

clienteRotas.put('/cliente/:id', verificarCliente,
    validarCorpoRequisicao(schemaClientes),
    verificarEmailClientePorId, verificarCpfClientePorId, editarDadosCliente);

clienteRotas.get('/cliente', listarClientes);

clienteRotas.get('/cliente/:id', verificarCliente, detalharCliente);


module.exports = clienteRotas;