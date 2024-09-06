const { DataTypes, Op } = require("sequelize");
const FuncionarioModel = require("../model/Funcionario");

module.exports = {
  // Lista todos os funcionários
  list: async function () {
    return await FuncionarioModel.findAll();
  },

  // Adiciona um novo funcionário
  save: async function (cpf, nome, telefone, login, senha, isAdmin) {
    return await FuncionarioModel.create({
      cpf,
      nome,
      telefone,
      login,
      senha,
      isAdmin,
    });
  },

  // Atualiza um funcionário existente
  update: async function (id, cpf, nome, telefone, login, senha, isAdmin) {
    const funcionarioExistente = await FuncionarioModel.findByPk(id);
    if (!funcionarioExistente) {
      return null; // Retorna null se o funcionário não for encontrado
    }

    await FuncionarioModel.update(
      { cpf, nome, telefone, login, senha, isAdmin },
      { where: { id } }
    );

    return await FuncionarioModel.findByPk(id); // Retorna o funcionário atualizado
  },

  // Remove um funcionário pelo ID
  delete: async function (id) {
    return await FuncionarioModel.destroy({ where: { id } });
  },

  // Obtém um funcionário pelo ID
  getById: async function (id) {
    return await FuncionarioModel.findByPk(id);
  },

  // Obtém um funcionário pelo nome (parcial)
  getByName: async function (nome) {
    return await FuncionarioModel.findOne({
      where: { nome: { [Op.like]: `%${nome}%` } },
    });
  },

  // Verifica se o login e senha pertencem a um administrador
  getAdmin: async function (login, senha) {
    const funcionario = await FuncionarioModel.findOne({
      where: { [Op.and]: [{ login }, { senha }, { isAdmin: 1 }] },
    });
    return funcionario || null;
  },

  // Verifica se o login e senha pertencem a um funcionário
  getLogin: async function (login, senha) {
    return await FuncionarioModel.findOne({
      where: { [Op.and]: [{ login }, { senha }] },
    });
  },

  // Verifica se o login já está cadastrado
  getLoginCadastrado: async function (login) {
    return await FuncionarioModel.findOne({ where: { login } });
  },

  // Obtém um funcionário pelo CPF
  getByCPF: async function (cpf) {
    return await FuncionarioModel.findOne({ where: { cpf } });
  },
};
