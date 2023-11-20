const { Router } = require('express');

const { listarCategorias } = require('../controladores/categorias');

const categoriaRotas = Router();

categoriaRotas.get('/categoria', listarCategorias);


module.exports = categoriaRotas;