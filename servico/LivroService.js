const {DataTypes, Op, where} = require("sequelize");
const LivroModel = require("../model/Livro");

module.exports = {
  list: async function() {
    const livros = await LivroModel.findAll()
    return livros
  },

  save: async function(titulo, ano, descricao, estado) {
    const livro = await LivroModel.create({
      titulo: titulo,
      ano: ano, 
      descricao: descricao,
      estado: estado
    })
    return livro
  },

  update: async function (id, titulo, ano, descricao, estado) {
    return await LivroModel.update({
      titulo: titulo, 
      ano: ano,
      descricao: descricao,
      estado: estado}, 
      {where: {id: id}})
  },

  delete: async function (id) {
    return await LivroModel.destroy({where: {
      id: id
    }})
  },

  getById: async function (id) {
    return await LivroModel.findByPk(id)
  },

  getByName: async function (titulo) {
    return await LivroModel.findOne({where: {
      titulo: {
        [Op.like]: "%" + titulo + "%"
      }
    }})
  }
}

