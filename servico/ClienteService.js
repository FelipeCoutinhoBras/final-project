const { DataTypes, Op } = require("sequelize");
const ClienteModel = require("../model/Cliente");

module.exports = {
  // Lista todos os clientes
  list: async function (limit, offset) {
    const clientes = await ClienteModel.findAll({
      limit: limit,
      offset: offset
    });
    return clientes;
  },

  // Cria um novo cliente
  save: async function (cpf, nascimento, nome, telefone, email, login, senha) {
    const cliente = await ClienteModel.create({
      cpf: cpf,
      nascimento: nascimento,
      nome: nome,
      telefone: telefone,
      email: email,
      login: login,
      senha: senha,
    });
    return cliente;
  },

  // Atualiza um cliente existente
  update: async function (
    id,
    cpf,
    nascimento,
    nome,
    telefone,
    email,
    login,
    senha
  ) {
    const clienteExistente = await ClienteModel.findByPk(id);
    if (!clienteExistente) {
      return null; // Retorna null se o cliente não for encontrado
    }

    await ClienteModel.update(
      { cpf, nascimento, nome, telefone, email, login, senha },
      { where: { id: id } }
    );

    return await ClienteModel.findByPk(id); // Retorna o cliente atualizado
  },

  // Remove um cliente pelo ID
  delete: async function (id) {
    return await ClienteModel.destroy({ where: { id: id } });
  },

  // Obtém um cliente pelo ID
  getById: async function (id) {
    return await ClienteModel.findByPk(id);
  },

  // Obtém um cliente pelo nome
  getByName: async function (nome) {
    return await ClienteModel.findOne({
      where: { nome: { [Op.like]: "%" + nome + "%" } },
    });
  },

  // Obtém um cliente pelo CPF
  getByCPF: async function (cpf) {
    return await ClienteModel.findOne({ where: { cpf: cpf } });
  },

  // Verifica se já existe um cliente com o login fornecido
  getLoginCadastrado: async function (login) {
    return await ClienteModel.findOne({ where: { login: login } });
  },

  // Verifica login e senha do cliente
  getLogin: async function (login, senha) {
    return await ClienteModel.findOne({
      where: { [Op.and]: [{ login: login }, { senha: senha }] },
    });
  },
};
