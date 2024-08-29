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
    return await EmprestimoModel.update(
      {
        data_emprestimo: data_emprestimo,
        data_devolucao: data_devolucao,
        cliente: cliente,
        LivroId: LivroId,
        FuncionarioId: FuncionarioId,
        FuncionarioId,
      },
      { where: { id: id } }
    );
  },

  delete: async function (id) {
    return await EmprestimoModel.destroy({where: {id: id}})
  },

  getByPk: async function (id) {
    return await EmprestimoModel.findById(id)
  }
};
