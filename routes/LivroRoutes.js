const express = require("express")
const router = express.Router()

const LivroService = require("../servico/LivroService")

router.get("/", async (req, res, next)=>{
  const livros = await LivroService.list()

  if (livros) {
    res.status(200).json(livros)
  } else {
    res.status(500).json({msg: "Nenhum livro foi localizado"})
  }
})

router.get("/:id", async (req, res, next)=>{
  const livro = await LivroService.getById(req.params.id)

  if(livro) {
    res.status(200).json(livro)
  } else {
    res.status(500).json({msg: "Livro não localizado!"})
  }
})

router.post("/", async (req, res, next)=>{
  const {titulo, ano, descricao, estado} = req.body

  const livro = await LivroService.save(titulo, ano, descricao, estado)
  
  if(livro) {
    res.status(200).json(livro)
  } else {
    res.status(500).json({msg: "Erro ao cadastrar novo livro!"})
  }
})

router.put("/:id", async (req, res, next)=>{
  const livroId = req.params.id
  const {titulo, ano, descricao, estado} = req.body

  const livroAtualizado = await LivroService.update(livroId,titulo, ano, descricao, estado)

  if (livroAtualizado) {
    res.status(200).json({msg: "Livro atualizado com sucesso!"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar o livro"})
  }
})

router.delete("/:id", async(req, res, next)=>{
  const livroId = req.params.id

  const livroDeletado = await LivroService.delete(livroId)

  if (livroDeletado) {
    res.status(200).json({msg: "Livro deletado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao deletar o livro"})
  }
})

module.exports = router