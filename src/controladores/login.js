const {
  selecionarUsuarioPorEmail,
  verificarSenhaCorreta,
} = require("../auxiliares/usuarios");
const gerarTokenLogin = require("../auxiliares/token");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioConsultado = await selecionarUsuarioPorEmail(email);

    if (!usuarioConsultado) {
      return res.status(400).json({ mensagem: "Email e/ou senha inválidos" });
    }

    const senhaCorreta = await verificarSenhaCorreta(email, senha);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email e/ou senha inválidos" });
    }

    const token = await gerarTokenLogin(email);

    const { senha: _, ...dadosUsuario } = usuarioConsultado;

    return res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  loginUsuario,
};
