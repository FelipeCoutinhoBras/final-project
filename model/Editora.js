const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

// Modelo para validar e encaminhar os dados de editora para o banco de dados
const EditoraModel = sequelize.define("Editora", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EditoraModel;
