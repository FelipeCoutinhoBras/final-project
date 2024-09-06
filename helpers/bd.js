const Sequelize = require("sequelize");
require("dotenv").config();

// Configura a conexão com o banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Testa a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log("Conexão bem-sucedida!"))
  .catch((error) => console.log("Erro na conexão", error));

// Exporta a instância do Sequelize
module.exports = sequelize;
