const express = require('express')
const router = express.Router()

const validaDados = require("../helpers/validaDados")
const AutorService = require('../servico/AutorService')

router.get("/", async (req, res, next) => {
  let autores = await AutorService.list()

  if (autores) {
    res.status(200).json(autores)
  } else {
    res.status(500).json({msg: "Não há nenhum autor cadastrado"})
  }
})

router.get("/:id", async (req, res, next)=> {
  let autor = await AutorService.getById(req.params.id)
  if (autor) {
    res.status(200).json(autor)
  } else{
    res.status(500).json({msg: "Autor não localizado"})
  }
})

router.post("/", async(req, res, next) => {
  try {
    const {nome, pseudonimo} = req.body

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaAutor.validate({ nome, pseudonimo });
  
    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    // Se a validação for bem-sucedida, verifica se já existe um autor com o nome fornecido

    const autorCadastrado = await AutorService.getByName(value.nome, value.pseudonimo)

    if (autorCadastrado) {
      res.status(400).json({msg: "Esse autor já existe!" });
    }

    // Se a validação for bem-sucedida, e o autor não existir, cadastra o novo autor
    let novoautor = await AutorService.save(value.nome, value.pseudonimo);
  
    if (novoautor) {
      res.status(200).json(novoautor);
    } else {
      res.status(500).json({msg: "Erro ao cadastrar novo autor" });
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
  });
  
router.put("/:id", async(req, res, next) => {
  try {
    let autorId = req.params.id
    let {nome, pseudonimo} = req.body
  
    // Validação dos dados usando Joi
    const {error, value} = validaDados.schemaAutor.validate({ nome, pseudonimo });
  
    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({msg: error.details[0].message})
    }

    // Se a validação for bem-sucedida, verifica se já existe um autor com o nome fornecido

    const autorCadastrado = await AutorService.getByName(value.nome, value.pseudonimo)

    if (autorCadastrado) {
      return res.status(400).json({msg: "Esse autor já existe! Atualização não autorizada." });
    }
    
  
    // Se a validação for bem-sucedida, salva o novo autor
    let editoraAtualizada = await AutorService.update(autorId, value.nome, value.pseudonimo)
  
    if (editoraAtualizada) {
      res.status(200).json({msg: "Autor atualizado com sucesso"})
    } else {
      res.status(500).json({msg: "Erro ao atualizar o autor"})
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
})
  
router.delete("/:id", async(req, res, next) => {
  let autorId = req.params.id

  let autorDeletado = await AutorService.delete(autorId)

  if(autorDeletado) {
    res.status(200).json({msg: "Autor deletado com sucesso"})
  } else {
    res.status(500).json({msg: "Autor não localizado"})
  }
})

module.exports = router