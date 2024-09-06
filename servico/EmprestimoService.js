const { DataTypes, Op } = require("sequelize");
const EmprestimoModel = require("../model/Emprestimo");
const { getByName } = require("./LivroService");

module.exports = {
  list: async function () {
    const emprestimos = await EmprestimoModel.findAll();
    return emprestimos;
  },

  save: async function (data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId) {
    const novoEmprestimo = await EmprestimoModel.create(
      {
        data_emprestimo: data_emprestimo,
        data_devolucao: data_devolucao,
        cliente: cliente,
        LivroId: LivroId,
        FuncionarioId: FuncionarioId,
      });
    return novoEmprestimo;
  },

  update: async function (id, data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId) {
    // Verificar se o emprestimo existe antes de atualizar
    const emprestimoExistente = await EmprestimoModel.findByPk(id);
    if (!emprestimoExistente) {
      return null; // Retorna null se o emprestimo não for encontrado
    }
  
    // Atualizao o emprestimo se ele for encontrado
    await EmprestimoModel.update(
      {
        data_emprestimo: data_emprestimo,
        data_devolucao: data_devolucao,
        cliente: cliente,
        LivroId: LivroId,
        FuncionarioId: FuncionarioId,}, {where: { id: id}}
    );
  
    // Retorna o emprestimo atualizado
    return await EmprestimoModel.findByPk(id);
  },

  delete: async function (id) {
    return await EmprestimoModel.destroy({where: {id: id}})
  },

  getByPk: async function (id) {
    return await EmprestimoModel.findById(id)
  }
};
