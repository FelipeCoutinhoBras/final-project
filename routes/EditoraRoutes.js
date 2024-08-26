const express = require("express")
const router = express.Router()

const EditoraService = require('../servico/EditoraService')

router.get("/", async (req, res, next) => {
  let editoras = await EditoraService.list()
  res.status(200).json(editoras)
})

router.get("/:id", async (req, res, next)=> {
  let editora = await EditoraService.getById(req.params.id)
  if (editora) {
    res.status(200).json(editora)
  } else{
    res.status(500).json({msg: "Editora não localizado"})
  }
})

router.put("/:id", async(req, res, next) => {
  let editoraId = req.params.id
  let {nome, telefone, email} = req.body

  let editoraAtualizada = await EditoraService.update(editoraId, nome, telefone, email)

  if (editoraAtualizada) {
    res.status(200).json(editoraAtualizada)
  } else {
    res.status(500).json()
  }
})

router.delete("/:id", async(req, res, next) => {
  let editoraId = req.params.id

  let editoraDeletado = await EditoraService.delete(editoraId)

  if(editoraDeletado) {
    res.status(200).json(editoraDeletado)
  } else {
    res.status(500).json()
  }
})


module.exports = router