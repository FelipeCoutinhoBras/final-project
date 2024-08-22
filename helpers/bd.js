const Sequelize = require("sequelize");

const sequelize = new Sequelize('projeto', 'userProject', 'user', {
  host:'127.0.0.1',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established sucessfully!"))
  .catch((error) => console.log("Erro na conexão com o banco de dados", error));

module.exports = sequelize;
