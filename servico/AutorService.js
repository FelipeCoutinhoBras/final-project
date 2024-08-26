const {DataTypes, Op} = require("sequelize");
const AutorModel = require("../model/Autor");

module.exports = {
  list: async function() {
    const autores = await AutorModel.findAll()
    return autores
  },
  
  save: async function (obj) {
    const autor = await AutorModel.create({
      nome: obj.nome,
      pseudonimo: obj.pseudonimo
    })
    return autor
  },

  update: async function (id, nome, pseudonimo) {
    return await AutorModel.update({nome: nome, pseudonimo: pseudonimo}, {
      where: {id: id}
    })
  },

  delete: async function (id) {
    return await AutorModel.destroy({where: {
      id: id
    }})
  },

  getById: async function (id) {
    return await AutorModel.findByPk(id)
  },
  
  getByName: async function (nome) {
    return await AutorModel.findOne({where: {nome: { [Op.like]: '%' + nome + "%"}}})
  }

}