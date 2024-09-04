const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");
const EmprestimoModel = require("./Emprestimo");

const ClienteModel = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nascimento: {
    type: DataTypes.DATE,
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
  email: {
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
  }
});

ClienteModel.hasMany(EmprestimoModel, {
  foreignKey: "cliente", allowNull: false,
});

module.exports = ClienteModel;
