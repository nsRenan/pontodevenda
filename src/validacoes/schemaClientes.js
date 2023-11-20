const joi = require('joi');

const schemaClientes = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
    }),
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email é obrigatório",
        "string.email": "O campo email precisa ser um formato válido",
    }),
    cpf: joi.string().length(11).required().messages({
        "any.required": "O campo cpf é obrigatório",
        "string.empty": "O campo cpf é obrigatório",
        "string.length": "O campo cpf deve conter 11 caracteres"
    }),
    cep: joi.string().length(8).messages({
        "string.length": "O campo cep deve conter 8 caracteres"
    }),
    rua: joi.string(),
    numero: joi.string(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
});

module.exports = schemaClientes;