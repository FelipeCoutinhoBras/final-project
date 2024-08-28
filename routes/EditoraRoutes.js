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

router.post("/", async (req, res, next)=>{
  let {nome, telefone, email} = req.body

  let novaeditora = await ClienteService.save(nome, telefone, email)

  if(novaeditora) {
    res.status(200).json(novaeditora)
  } else{
    res.status(500).json({msg: "Erro ao cadastrar nova editora"})
  }
})

router.put("/:id", async(req, res, next) => {
  let editoraId = req.params.id
  let {nome, telefone, email} = req.body

  let editoraAtualizada = await EditoraService.update(editoraId, nome, telefone, email)

  if (editoraAtualizada) {
    res.status(200).json({msg: "Editora atualizada com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar editora"})
  }
})

router.delete("/:id", async(req, res, next) => {
  let editoraId = req.params.id

  let editoraDeletado = await EditoraService.delete(editoraId)

  if(editoraDeletado) {
    res.status(200).json({msg: "Editora cancelada com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao deletar editora"})
  }
})


module.exports = router