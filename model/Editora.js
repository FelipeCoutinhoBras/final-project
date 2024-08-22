const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = EditoraModel;
