const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

const FuncionarioModel = sequelize.define("Funcionario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cpf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
});

module.exports = FuncionarioModel;
