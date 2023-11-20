const express = require("express");
const rotas = require("./rotas/rotas");

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(rotas);


module.exports = app;
