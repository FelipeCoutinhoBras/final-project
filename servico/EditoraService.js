const {DataTypes, Op, where} = require("sequelize");
const EditoraModel = require("../model/Editora");

module.exports = {
  list: async function() {
    const editoras = await EditoraModel.findAll()
    return editoras
  },

  save: async function(nome, telefone, email) {
    const editora = await EditoraModel.create({
      nome: nome,
      telefone: telefone, 
      email: email})
    return editora
  },

  update: async function(id, nome, telefone, email) {
      // Verificar se a editora existe antes de atualizar
  const editoraExistente = await EditoraModel.findByPk(id);
  if (!editoraExistente) {
    return null; // Retorna null se a editora não for encontrada
  }

  // Atualiza a editora se ela for encontrada
  await EditoraModel.update(
    {
      nome: nome,
      telefone: telefone, 
      email: email
    }, 
    { where: { id: id }}
  );

  // Retorna a editora atualizada
  return await EditoraModel.findByPk(id);
  },

  delete: async function(id) {
    return await EditoraModel.destroy({
      where: { id: id}
    })
  },

  getById: async function (id) {
    return await EditoraModel.findByPk(id)
  },

  getByName: async function (nome) {
    return await EditoraModel.findOne({where: {nome: { [Op.like]: '%' + nome + "%"}}})
  }
}


