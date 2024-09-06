const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");
const { toDefaultValue, defaultValueSchemable } = require("sequelize/lib/utils");

// Modelo para validar e encaminhar os dados de funcionário para o banco de dados
const FuncionarioModel = sequelize.define("Funcionario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  
});

module.exports = FuncionarioModel;
