const jwt = require("jsonwebtoken");
const chaveSecreta = require("../chaveSecreta");
const { selecionarUsuarioPorEmail } = require("./usuarios");

const gerarTokenLogin = async (email) => {
  const usuarioConsultado = await selecionarUsuarioPorEmail(email);
  return await jwt.sign({ id: usuarioConsultado.id }, chaveSecreta, {
    expiresIn: "8h",
  });
};

module.exports = gerarTokenLogin;
