const joi = require('joi');

const schemaPedido = joi.object({
  cliente_id: joi.number().positive().integer().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "number.base": "O campo cliente_id deve ser um número válido",
    "number.positive": "O campo cliente_id deve ser um número positivo",
    "number.integer": "O campo cliente_id deve ser um número inteiro"
  }),
  observacao: joi.string().default(''),
  pedido_produtos: joi.array().items(
    joi.object({
      produto_id: joi.number().positive().integer().required().messages({
        "any.required": "O campo produto_id é obrigatório",
        "number.base": "O campo produto_id deve ser um número válido",
        "number.positive": "O campo produto_id deve ser um número positivo",
        "number.integer": "O campo produto_id deve ser um número inteiro"
      }),
      quantidade_produto: joi.number().positive().integer().required().messages({
        "any.required": "O campo quantidade_produto é obrigatório",
        "number.base": "O campo quantidade_produto deve ser um número válido",
        "number.positive": "O campo quantidade_produto deve ser um número positivo",
        "number.integer": "O campo quantidade_produto deve ser um número inteiro"
      })
    })
  )
    .min(1)
    .required()
    .messages({
      "any.required": "O campo pedido_produtos é obrigatório",
      "array.base": "O campo pedido_produtos deve ser um array válido",
      "array.excludes": "O array contém um valor que faz parte da lista de exclusão",
      "array.includesRequiredBoth": `Esperava-se que alguns valores estivessem presentes 
      na matriz e estão faltando. Esse erro acontece quando temos uma mistura de esquemas rotulados e não rotulados.`,
      "array.includesRequiredKnowns": `Esperava-se que alguns valores estivessem presentes na matriz e estão faltando. 
      Esse erro acontece quando temos apenas esquemas rotulados.`,
      "array.includesRequiredUnknowns": `Esperava-se que alguns valores estivessem presentes na matriz e estão faltando. 
      Esse erro acontece quando temos apenas esquemas não rotulados.`,
      "array.includes": "O valor não corresponde a nenhum dos tipos permitidos para esse array",
      "array.min": "O array tem menos elementos do que o mínimo permitido"
    })
});

module.exports = schemaPedido;