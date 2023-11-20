const {
  editarDadosDoCliente,
  selecionarClientePorId,
  selecionarClientes,
  cadastrarClienteUtilitarios,
} = require("../auxiliares/clientes");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const cadastrandoCliente = await cadastrarClienteUtilitarios(
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    );

    return res.status(201).json(cadastrandoCliente);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const editarDadosCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const clienteAtualizado = await editarDadosDoCliente(
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      id
    );

    return res.status(200).json(clienteAtualizado);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await selecionarClientes();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await selecionarClientePorId(id);
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarCliente,
  editarDadosCliente,
  listarClientes,
  detalharCliente,
};
