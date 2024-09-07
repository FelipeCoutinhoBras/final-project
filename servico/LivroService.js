const { DataTypes, Op } = require("sequelize");
const LivroModel = require("../model/Livro");

module.exports = {
  // Lista todos os livros
  list: async function (limit, offset) {
    const livros = await LivroModel.findAll({
      limit: limit,
      offset: offset
    });
    return livros;
  },

  listEmprestados: async function(limit, offset) {
    const livros = await LivroModel.findAll({
      limit: limit,
      offset: offset,
      where: { estado: "emprestado" } 
    });
    return livros;
  },

  // Adiciona um novo livro
  save: async function (titulo, ano, descricao, estado, autor, categoria) {
    return await LivroModel.create({
      titulo: titulo,
      ano: ano,
      descricao: descricao,
      estado: estado,
      autor: autor, 
      categoria: categoria
    });
  },

  // Atualiza um livro existente
  update: async function (id, titulo, ano, descricao, estado, autor, categoria) {
    const livroExistente = await LivroModel.findByPk(id);
    if (!livroExistente) {
      return null; // Retorna null se o livro não for encontrado
    }

    await LivroModel.update(
      {
        titulo: titulo,
        ano: ano,
        descricao: descricao,
        estado: estado,
        autor: autor, 
        categoria: categoria
      },
      {
        where: { id },
      }
    );

    return await LivroModel.findByPk(id); // Retorna o livro atualizado
  },

  // Remove um livro pelo ID
  delete: async function (id) {
    return await LivroModel.destroy({ where: { id } });
  },

  // Obtém um livro pelo ID
  getById: async function (id) {
    return await LivroModel.findByPk(id);
  },

  // Verifica se o livro está emprestado pelo ID
  getLivroEmprestado: async function (id) {
    return await LivroModel.findOne({
      where: { [Op.and]: [{ id }, { estado: "emprestado" }] },
    });
  },

  // Obtém um livro pelo título (parcial)
  getByName: async function (titulo) {
    return await LivroModel.findOne({
      where: { titulo: { [Op.like]: `%${titulo}%` } },
    });
  },
};
