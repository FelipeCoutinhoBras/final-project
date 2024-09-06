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
    // Verificar se o livro existe antes de atualizar
    const livroExistente = await LivroModel.findByPk(id);
    if (!livroExistente) {
      return null; // Retorna null se o livro não for encontrado
    }

    // Atualiza o livro se ele for encontrado
    await LivroModel.update({
      titulo: titulo, 
      ano: ano,
      descricao: descricao,
      estado: estado}, 
      {where: {id: id}})
    
    // Retorna o livro atualizado
    return await LivroModel.findByPk(id);
  },

  delete: async function (id) {
    return await LivroModel.destroy({where: {
      id: id
    }})
  },

  getById: async function (id) {
    return await LivroModel.findByPk(id)
  },

  getLivroEmprestado: async function (id) {
    const livroEmprestado = await LivroModel.findOne({where: {[Op.and]: [{id: id}, {estado: "emprestado"}]}})
    return livroEmprestado
  },

  getByName: async function (titulo) {
    return await LivroModel.findOne({where: {
      titulo: {
        [Op.like]: "%" + titulo + "%"
      }
    }})
  },

}

