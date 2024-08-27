const {DataTypes, Op, where} = require("sequelize")
const FuncionarioModel = require("../model/Funcionario")

module.exports = {
  list: async function () {
    const funcionarios = await FuncionarioModel.findAll()
    return funcionarios
  },
  
  save: async function (cpf, nome, telefone, login, senha) {
    const funcionario = await FuncionarioModel.create({
      cpf: cpf,
      nome: nome,
      telefone: telefone,
      login: login,
      senha: senha,
    })
    return funcionario
  },

  update: async function (id, cpf, nome, telefone, login, senha) {
    const funcionario = await FuncionarioModel.update({
      cpf: cpf,
      nome: nome,
      telefone: telefone,
      login: login,
      senha: senha}, {where: {id: id}})
  return funcionario
  },

  delete: async function (id) {
    return await FuncionarioModel.destroy({where: {id: id}})
  },

  getById: async function (id) {
    return await FuncionarioModel.findByPk(id)
  },

  getByName: async function(nome) {
    return await FuncionarioModel.findOne({where: {nome: { [Op.like]: '%' + nome + "%"}}})
  }
}