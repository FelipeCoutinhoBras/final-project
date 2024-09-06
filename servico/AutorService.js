const { DataTypes, Op } = require("sequelize");
const AutorModel = require("../model/Autor");

module.exports = {
  // Lista todos os autores
  list: async function (limit, offset) {
    const autores = await AutorModel.findAll({
      limit: limit,
      offset: offset
    });
    return autores;
  },

  // Cria um novo autor
  save: async function (nome, pseudonimo) {
    const autor = await AutorModel.create({
      nome: nome,
      pseudonimo: pseudonimo,
    });
    return autor;
  },

  // Atualiza um autor existente
  update: async function (id, nome, pseudonimo) {
    const autorExistente = await AutorModel.findByPk(id);
    if (!autorExistente) {
      return null; // Retorna null se o autor não for encontrado
    }

    await AutorModel.update(
      { nome: nome, pseudonimo: pseudonimo },
      { where: { id: id } }
    );

    return await AutorModel.findByPk(id); // Retorna o autor atualizado
  },

  // Deleta um autor pelo ID
  delete: async function (id) {
    return await AutorModel.destroy({ where: { id: id } });
  },

  // Obtém um autor pelo ID
  getById: async function (id) {
    return await AutorModel.findByPk(id);
  },

  // Obtém um autor pelo nome (com pesquisa parcial)
  getByName: async function (nome) {
    return await AutorModel.findOne({
      where: { nome: { [Op.like]: "%" + nome + "%" } },
    });
  },
};
