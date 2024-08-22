const {DataTypes, Op} = require("sequelize");
const CategoriaModel = require('../model/Categoria')

module.exports = {
  list: async function () {
    const categorias = await CategoriaModel.findAll()
    return categorias
  },
  
  save: async function (tipo) {
    const categoriaObj = await CategoriaModel.create({
      tipo: tipo
    })
    return categoriaObj
  },

  update: async function (id, categoria) {
    return await CategoriaModel.update({ tipo: categoria }, {where: {
      id: id
    }})
  },

  delete: async function (id) {
    return await CategoriaModel.destroy({where: {
      id: id
    }})
  },

  getById: async function (id) {
    return await CategoriaModel.findByPk(id)
  },

  getByName: async function (tipo) {
    return await AutorModel.findOne({where: {tipo: tipo}})
  }


}