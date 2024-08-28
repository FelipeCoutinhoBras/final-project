const express = require('express')
const router = express.Router()

const AutorService = require('../servico/AutorService')

router.get("/", async (req, res, next) => {
  let autores = await AutorService.list()
  res.status(200).json(autores)
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
  let novoautor = await AutorService.save(req.body)

  if (novoautor) {
    res.status(200).json(novoautor)
  } else {
    res.status(500).json({msg: "Errom ao cadastrar novo autor"})
  }
}) 

router.put("/:id", async(req, res, next) => {
  let autorId = req.params.id
  let {nome, pseudonimo} = req.body

  let autorAtualizado = await AutorService.update(autorId, nome, pseudonimo)

  if (autorAtualizado) {
    res.status(200).json({msg: "Autor atualizado com sucesso"})
  } else {
    res.status(500).json({msg: "Errom ao atualizar o autor"})
  }
})

router.delete("/:id", async(req, res, next) => {
  let autorId = req.params.id

  let autorDeletado = await AutorService.delete(autorId)

  if(autorDeletado) {
    res.status(200).json({msg: "Autor deletado com sucesso"})
  } else {
    res.status(500).json({msg: "Errom ao deletar autor"})
  }
})

module.exports = router