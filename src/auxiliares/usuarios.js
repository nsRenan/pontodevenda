const knex = require("../bancodedados/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const selecionarUsuarioPorID = async (idUsuario) => {
  return await knex("usuarios").where({ id: idUsuario }).first();
};

const selecionarUsuarioPorEmail = async (email) => {
  return await knex("usuarios").where({ email }).first();
};

const criptografarSenhaUsuario = async (senha) => {
  return await bcrypt.hash(senha, 10);
};

const verificarSenhaCorreta = async (email, senha) => {
  const usuario = await selecionarUsuarioPorEmail(email);
  return await bcrypt.compare(senha, usuario.senha);
};

const cadastrarNovoUsuario = async (nome, email, senha) => {
  const senhaCriptografada = await criptografarSenhaUsuario(senha);
  const usuarioCadastrado = await knex("usuarios")
    .insert({
      nome,
      email,
      senha: senhaCriptografada,
    })
    .returning(["id", "nome", "email"]);
  return usuarioCadastrado;
};

const selecionarDadosUsuarioLogado = async (idUsuario) => {
  const usuario = await selecionarUsuarioPorID(idUsuario);

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
};

const atualizarDadosPerfilUsuario = async (nome, email, senha, id) => {
  const senhaCriptografada = await criptografarSenhaUsuario(senha);
  const atualizarUsuario = await knex("usuarios")
    .where("id", "=", id)
    .update({
      nome,
      email,
      senha: senhaCriptografada,
    })
    .returning(["id", "nome", "email"]);

  return atualizarUsuario;
};

module.exports = {
  selecionarUsuarioPorID,
  cadastrarNovoUsuario,
  criptografarSenhaUsuario,
  selecionarDadosUsuarioLogado,
  selecionarUsuarioPorEmail,
  atualizarDadosPerfilUsuario,
  verificarSenhaCorreta,
};
