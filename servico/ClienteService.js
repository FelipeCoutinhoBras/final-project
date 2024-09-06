const {DataTypes, Op, where} = require("sequelize");
const ClienteModel = require("../model/Cliente");

module.exports = {
  list: async function() {
    const clientes = await ClienteModel.findAll()
    return clientes
  },

  save: async function(cpf, nascimento, nome, telefone, email, login, senha) {
    const cliente = await ClienteModel.create({
      cpf: cpf,
      nascimento: nascimento, 
      nome: nome,
      telefone: telefone, 
      email: email,
      login: login, 
      senha: senha}
    )
    return cliente
  },

  update: async function(id, cpf, nascimento, nome, telefone, email, login, senha) {
  // Verificar se o cliente existe antes de atualizar
  const clienteExistente = await ClienteModel.findByPk(id);
  if (!clienteExistente) {
    return null; // Retorna null se o autor não for encontrado
  }

  // Atualiza o cliente se ele for encontrado
  await ClienteModel.update(
    {
      cpf: cpf,
      nascimento: nascimento, 
      nome: nome,
      telefone: telefone, 
      email: email,
      login: login, 
      senha: senha}, {where: { id: id}}
  );

  // Retorna o cliente atualizado
  return await ClienteModel.findByPk(id);
  },

  delete: async function(id) {
    return await ClienteModel.destroy({
      where: { id: id}
    })
  },

  getById: async function (id) {
    return await ClienteModel.findByPk(id)
  },

  getByName: async function (nome) {
    return await ClienteModel.findOne({where: {nome: { [Op.like]: '%' + nome + "%"}}})
  },

  getLogin: async function(login, senha) {
    return await ClienteModel.findOne({where: {[Op.and]: [{login: login}, {senha: senha}]}})
  }
};
