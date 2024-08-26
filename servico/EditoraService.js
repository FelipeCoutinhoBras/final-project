const {DataTypes, Op, where} = require("sequelize");
const EditoraModel = require("../model/Editora");

module.exports = {
  list: async function() {
    const editoras = await EditoraModel.listAll()
    return editoras
  },

  save: async function(nome, telefone, email) {
    const editora = await EditoraModel.create({
      nome: nome,
      telefone: telefone, 
      email: email})
    return editora
  },

  update: async function(nome, telefone, email) {
    const editora = await EditoraModel.update({
      nome: nome,
      telefone: telefone, 
      email: email}, {where: { id: id}}
    )
    return editora
  },

  delete: async function(id) {
    return await EditoraModel.destroy({
      where: { id: id}
    })
  },

  getById: async function (id) {
    return await EditoraModel.findByPk(id)
  },

  getByName: async function (nome) {
    return await EditoraModel.findOne({where: {nome: { [Op.like]: '%' + nome + "%"}}})
  }
}


