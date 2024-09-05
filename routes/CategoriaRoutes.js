const express = require('express')
const router = express.Router()

const CategoriaService = require('../servico/CategoriaService')

router.get("/", async (req, res, next) => {
  let categorias = await CategoriaService.list()
  if (categorias) {
    res.status(200).json(categorias)
  } else {
    res.status(500).json({msg: "Não há nenhuma categoria cadastrada"})
  }

})

router.get("/:id", async (req, res, next)=> {
  let categoria = await CategoriaService.getById(req.params.id)
  if (categoria) {
    res.status(200).json(categoria)
  } else{
    res.status(500).json({msg: "Categoria não localizada"})
  }
})

router.post("/", async(req, res, next) => {
  let novaCategoria = await CategoriaService.save(req.body)

  if (novaCategoria) {
    res.status(200).json(novaCategoria)
  } else {
    res.status(500).json({msg: "Erro ao cadastrar categoria"})
  }
})

router.put("/:id", async(req, res, next) => {
  let categoriaId = req.params.id
  let tipo = req.body

  let categoriaAtualizada = await CategoriaService.update(categoriaId, tipo)

  if (categoriaAtualizada) {
    res.status(200).json(categoriaAtualizada)
  } else {
    res.status(500).json({msg: "Categoria não localizada"})
  }
})

router.delete("/:id", async(req, res, next) => {
  let categoriaId = req.params.id

  let categoriaDeletada = await AutorService.delete(categoriaId)

  if(categoriaDeletada) {
    res.status(200).json(categoriaDeletada)
  } else {
    res.status(500).json({msg: "Categoria não localizada"})
  }
})

module.exports = router
