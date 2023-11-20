const {
  selecionarCategoriaPorID,
  selecionarProdutoPorId,
} = require("../auxiliares/produtos");
const { selecionarUsuarioPorEmail } = require("../auxiliares/usuarios");
const {
  selecionarClientePorId,
  selecionarClientePorEmail,
  selecionarClientePorCpf,
} = require("../auxiliares/clientes");

const verificarEmailDuplicado = async (req, res, next) => {
  const { email } = req.body;

  try {
    const emailEncontrado = await selecionarUsuarioPorEmail(email);

    if (emailEncontrado) {
      return res.status(403).json({ mensagem: "O email informado já existe" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarCategoria = async (req, res, next) => {
  const { categoria_id } = req.body;

  try {
    const categoriaEncontrada = await selecionarCategoriaPorID(categoria_id);

    if (!categoriaEncontrada) {
      return res.status(404).json({ mensagem: "Essa categoria não existe!" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarProduto = async (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id) || id > 2147483647 || id.indexOf(".") >= 0) {
    return res.status(404).json({ mensagem: "Esse produto não existe!" });
  }

  try {
    const produtoEncontrado = await selecionarProdutoPorId(id);
    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: "Esse produto não existe!" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarCliente = async (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id) || id > 2147483647 || id.indexOf(".") >= 0) {
    return res.status(404).json({ mensagem: "Esse cliente não existe!" });
  }

  try {
    const clienteEncontrado = await selecionarClientePorId(id);

    if (!clienteEncontrado) {
      return res.status(404).json({ mensagem: "Esse cliente não existe!" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarEmailClientePorId = async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const emailEncontrado = await selecionarClientePorEmail(email);
    const clienteEncontrado = await selecionarClientePorId(id);

    if (emailEncontrado && emailEncontrado.id !== clienteEncontrado.id) {
      return res.status(403).json({ mensagem: "O email informado já existe" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarCpfClientePorId = async (req, res, next) => {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const cpfEncontrado = await selecionarClientePorCpf(cpf);
    const clienteEncontrado = await selecionarClientePorId(id);

    if (cpfEncontrado && cpfEncontrado.id !== clienteEncontrado.id) {
      return res.status(403).json({ mensagem: "O cpf informado já existe" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarEmailCliente = async (req, res, next) => {
  const { email } = req.body;

  try {
    const emailEncontrado = await selecionarClientePorEmail(email);

    if (emailEncontrado) {
      return res.status(403).json({ mensagem: "O email informado já existe" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarCpfCliente = async (req, res, next) => {
  const { cpf } = req.body;

  try {
    const cpfEncontrado = await selecionarClientePorCpf(cpf);

    if (cpfEncontrado) {
      return res.status(403).json({ mensagem: "O cpf informado já existe" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarClienteNoBody = async (req, res, next) => {
  const { cliente_id } = req.body;

  try {
    const clienteEncontrado = await selecionarClientePorId(cliente_id);

    if (!clienteEncontrado) {
      return res.status(404).json({ mensagem: "Esse cliente não existe!" });
    }

    req.cliente = {
      nome: clienteEncontrado.nome,
      email: clienteEncontrado.email,
    };

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  verificarEmailDuplicado,
  verificarCategoria,
  verificarProduto,
  verificarCliente,
  verificarEmailClientePorId,
  verificarCpfClientePorId,
  verificarEmailCliente,
  verificarCpfCliente,
  verificarClienteNoBody,
};
