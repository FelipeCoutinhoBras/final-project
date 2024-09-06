const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

// Modelo para validar e encaminhar os dados de emprestimo para o banco de dados
const EmprestimoModel = sequelize.define("Emprestimo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data_emprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_devolucao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = EmprestimoModel;
