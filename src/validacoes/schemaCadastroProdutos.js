const joi = require("joi");

const schemaCadastroProduto = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao é obrigatório",
  }),
  quantidade_estoque: joi.number().integer().min(0).required().messages({
    "any.required": "O campo quantidade de estoque é obrigatório",
    "string.empty": "O campo quantidade de estoque é obrigatório",
    "number.min": "O campo quantidade de estoque não pode ser negativo",
    "number.base": "O campo quantidade de estoque precisa ser um numero inteiro",
    "number.integer": "O campo quantidade de estoque precisa ser um numero inteiro",
  }),
  valor: joi.number().integer().min(1).required().messages({
    "any.required": "O campo valor é obrigatório",
    "string.empty": "O campo valor é obrigatório",
    "number.min": "O campo valor não pode ser menor ou igual a zero",
    "number.base": "O campo valor precisa ser um numero inteiro",
    "number.integer": "O campo valor precisa ser um numero inteiro",
  }),
  categoria_id: joi.number().integer().required().messages({
    "any.required": "O campo do id de categoria  é obrigatório",
    "string.empty": "O campo do id de categoria  é obrigatório",
    "number.base": "O campo categoria id precisa ser um numero de id valido",
    "number.integer": "O campo categoria id precisa ser um numero de id valido",
  }),
});

module.exports = schemaCadastroProduto;