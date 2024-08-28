const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");
const ClienteModel = require("./Cliente");
const AutorModel = require("./Autor");
const FuncionarioModel = require("./Funcionario");
const CategoriaModel = require("./Categoria");
const EmprestimoModel = require("./Emprestimo")

const LivroModel = sequelize.define("Livro", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 2024,
    },
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("disponivel", "emprestado"),
    allowNull: false,
  },
});

LivroModel.belongsTo(AutorModel, {
  foreignKey: "autor",     allowNull: false,
});

LivroModel.hasMany(AutorModel, {
  foreignKey: "livro",     allowNull: false,
});

LivroModel.belongsToMany(FuncionarioModel, { through: EmprestimoModel }, {foreignKey: "funcionario",     allowNull: false,});

FuncionarioModel.belongsToMany(LivroModel, { through: EmprestimoModel });

module.exports = LivroModel;
