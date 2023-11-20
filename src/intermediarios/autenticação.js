const jwt = require("jsonwebtoken");
const knex = require("../bancodedados/conexao");
const chaveSecreta = require("../chaveSecreta");

require("dotenv").config();

const validarAutenticacao = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, chaveSecreta);

    const usuarioEncontrado = await knex("usuarios").where({ id }).first();

    if (!usuarioEncontrado) {
      return res.status(404).json("Usuario não encontrado");
    }

    req.usuario = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
    };

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  validarAutenticacao,
};
