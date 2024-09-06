const {DataTypes, Op} = require("sequelize");
const AutorModel = require("../model/Autor");

module.exports = {
  list: async function() {
    const autores = await AutorModel.findAll()
    return autores
  },
  
  save: async function (nome, pseudonimo) {
    const autor = await AutorModel.create({
      nome: nome,
      pseudonimo: pseudonimo
    })
    return autor
  },

  update: async function (id, nome, pseudonimo) {
  // Verificar se o autor existe antes de atualizar
  const autorExistente = await AutorModel.findByPk(id);
  if (!autorExistente) {
    return null; // Retorna null se o autor não for encontrado
  }

  // Atualiza o autor se ela for encontrado
  await AutorModel.update(
    {
      nome: nome,
      pseudonimo: pseudonimo, 
    }, 
    { where: { id: id }}
  );

  // Retorna o autor atualizada
  return await AutorModel.findByPk(id);
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