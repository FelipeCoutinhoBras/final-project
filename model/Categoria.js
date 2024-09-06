const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");
const LivroModel = require("./Livro");

// Modelo para validar e encaminhar os dados de categoria para o banco de dados
const CategoriaModel = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

LivroModel.belongsTo(CategoriaModel, {
  foreignKey: "categoria",
  allowNull: false,
});

module.exports = CategoriaModel;
