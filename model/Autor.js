const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

// Modelo para validar e encaminhar os dados de autor para o banco de dados
const AutorModel = sequelize.define("Autor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pseudonimo: {
    type: DataTypes.STRING,
  },
});

module.exports = AutorModel;
