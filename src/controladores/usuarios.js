const {
  cadastrarNovoUsuario,
  selecionarDadosUsuarioLogado,
  atualizarDadosPerfilUsuario,
  selecionarUsuarioPorEmail,
} = require("../auxiliares/usuarios");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioCadastrado = await cadastrarNovoUsuario(nome, email, senha);

    return res.status(201).json(usuarioCadastrado);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const detalharPerfilUsuario = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;

    const retorno = await selecionarDadosUsuarioLogado(idUsuario);

    return res.status(200).send(retorno);
  } catch (error) {
    return res.status(400).send({ mensagem: error.message });
  }
};

const atualizarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {
    if (email !== req.usuario.email) {
      const usuario = await selecionarUsuarioPorEmail(email);

      if (usuario) {
        return res
          .status(400)
          .json({ mensagem: "O email informado já existe" });
      }
    }

    const atualizarUsuario = await atualizarDadosPerfilUsuario(
      nome,
      email,
      senha,
      id
    );

    return res.status(200).json(atualizarUsuario);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
};
