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

  update: async function (id, tipo) {
    // Verificar se a categoria existe antes de atualizar
    const categoriaExistente = await CategoriaModel.findByPk(id);
    if (!categoriaExistente) {
      return null; // Retorna null se a categoria não for encontrada
    }
  
    // Atualiza a categoria se ela for encontrada
    await CategoriaModel.update(
      {
        tipo: tipo,
      }, 
      { where: { id: id }}
    );
  
    // Retorna a categoria atualizada
    return await CategoriaModel.findByPk(id);
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