const { DataTypes, Op } = require("sequelize");
const EditoraModel = require("../model/Editora");

module.exports = {
  // Lista todas as editoras
  list: async function () {
    const editoras = await EditoraModel.findAll();
    return editoras;
  },

  // Cria uma nova editora
  save: async function (nome, telefone, email) {
    const editora = await EditoraModel.create({
      nome: nome,
      telefone: telefone,
      email: email,
    });
    return editora;
  },

  // Atualiza uma editora existente
  update: async function (id, nome, telefone, email) {
    const editoraExistente = await EditoraModel.findByPk(id);
    if (!editoraExistente) {
      return null; // Retorna null se a editora não for encontrada
    }

    await EditoraModel.update({ nome, telefone, email }, { where: { id: id } });

    return await EditoraModel.findByPk(id); // Retorna a editora atualizada
  },

  // Remove uma editora pelo ID
  delete: async function (id) {
    return await EditoraModel.destroy({ where: { id: id } });
  },

  // Obtém uma editora pelo ID
  getById: async function (id) {
    return await EditoraModel.findByPk(id);
  },

  // Obtém uma editora pelo nome
  getByName: async function (nome) {
    return await EditoraModel.findOne({
      where: { nome: { [Op.like]: "%" + nome + "%" } },
    });
  },
};
