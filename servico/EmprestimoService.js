const { DataTypes, Op } = require("sequelize");
const EmprestimoModel = require("../model/Emprestimo");

module.exports = {
  // Lista todos os empréstimos
  list: async function (limit, offset) {
    const emprestimos = await EmprestimoModel.findAll({
      limit: limit,
      offset: offset
    });
    return emprestimos;
  },

  // Cria um novo empréstimo
  save: async function (
    data_emprestimo,
    data_devolucao,
    cliente,
    LivroId,
    FuncionarioId
  ) {
    const novoEmprestimo = await EmprestimoModel.create({
      data_emprestimo,
      data_devolucao,
      cliente,
      LivroId,
      FuncionarioId,
    });
    return novoEmprestimo;
  },

  // Atualiza um empréstimo existente
  update: async function (
    id,
    data_emprestimo,
    data_devolucao,
    cliente,
    LivroId,
    FuncionarioId
  ) {
    const emprestimoExistente = await EmprestimoModel.findByPk(id);
    if (!emprestimoExistente) {
      return null; // Retorna null se o empréstimo não for encontrado
    }

    await EmprestimoModel.update(
      { data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId },
      { where: { id } }
    );

    return await EmprestimoModel.findByPk(id); // Retorna o empréstimo atualizado
  },

  // Remove um empréstimo pelo ID
  delete: async function (id) {
    return await EmprestimoModel.destroy({ where: { id } });
  },

  // Obtém um empréstimo pelo ID
  getByPk: async function (id) {
    return await EmprestimoModel.findByPk(id);
  },
};
