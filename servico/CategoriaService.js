const { DataTypes, Op } = require("sequelize");
const CategoriaModel = require("../model/Categoria");

module.exports = {
  // Lista todas as categorias
  list: async function (limit, offset) {
    const categorias = await CategoriaModel.findAll({
      limit: limit,
      offset: offset
    });
    return categorias;
  },

  // Cria uma nova categoria
  save: async function (tipo) {
    const categoriaObj = await CategoriaModel.create({ tipo: tipo });
    return categoriaObj;
  },

  // Atualiza uma categoria existente
  update: async function (id, tipo) {
    const categoriaExistente = await CategoriaModel.findByPk(id);
    if (!categoriaExistente) {
      return null; // Retorna null se a categoria não for encontrada
    }

    await CategoriaModel.update({ tipo: tipo }, { where: { id: id } });

    return await CategoriaModel.findByPk(id); // Retorna a categoria atualizada
  },

  // Remove uma categoria pelo ID
  delete: async function (id) {
    return await CategoriaModel.destroy({ where: { id: id } });
  },

  // Obtém uma categoria pelo ID
  getById: async function (id) {
    return await CategoriaModel.findByPk(id);
  },

  // Obtém uma categoria pelo tipo
  getByName: async function (tipo) {
    return await CategoriaModel.findOne({ where: { tipo: tipo } });
  },
};
