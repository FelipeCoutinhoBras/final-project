const express = require('express')
const router = express.Router()

const validaDados = require("../helpers/validaDados")
const EmprestimoService = require("../servico/EmprestimoService")

router.get("/", async (req, res, next)=> {
  const livrosEmprestados = await EmprestimoService.list()

  if (livrosEmprestados) {
    res.status(200).json(livrosEmprestados)
  } else {
    res.status(500).json({msg: "Nenhum emprestimo localizado"})
  }
})

router.get("/:id", async (req, res, next)=>{
  const emprestimo = await EmprestimoService.getByPk(req.params.id) 

  if (emprestimo) {
    res.status(200).json(emprestimo)
  } else {
    res.status(500).json({msg: "Nenhum emprestimo localizado com este id"})
  }
})

router.post("/", async (req, res, next)=>{
  const {data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId} = req.body

  const novoEmprestimo = await EmprestimoService.save(data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId) 

  if(novoEmprestimo) {
    res.status(200).json(novoEmprestimo)
  } else {
    res.status(500).json({msg: "Erro ao cadastrar novo emprestimo"})
  }
})

router.put("/:id", async (req, res, next)=>{
  const emprestimoId = req.params.id

  const {data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId} = req.body

  const atualizaEmprestimo = await EmprestimoService.update(emprestimoId ,data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId) 

  if(atualizaEmprestimo) {
    res.status(200).json({msg: "Emprestimo atualizado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar o emprestimo"})
  }
})

router.delete("/:id", async (req, res, next)=> {
  const emprestimoId = req.params.id
  
  const emprestimoDeletado = await EmprestimoService.delete(emprestimoId)

  if(emprestimoDeletado) {
    res.status(200).json({msg: "Emprestimo deletado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao deletar o emprestimo"})
  }
})

module.exports = router