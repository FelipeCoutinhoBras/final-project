const express = require("express")
const router = express.Router()

const FuncionarioService = require("../servico/FuncionarioService")

router.get("/", async (req, res, next)=> {
  let funcionarios = await FuncionarioService.list()
  res.status(200).json(funcionarios)
});

router.get("/:id", async (req, res, next)=>{
  let funcionario = await FuncionarioService.getById(req.params.id)
  if(funcionario) {
    res.status(200).json(funcionario)
  } else {
    res.status(500).json({msg: "Funcionario não encontrado"})
  }
});

router.post("/", async (req, res, next)=>{
  let {cpf, nome, telefone, login, senha} = req.body

  let novofuncionario = await FuncionarioService.save(cpf, nome, telefone, login, senha)

  if (novofuncionario) {
    res.status(200).json(novofuncionario)
  } else {
    res.status(500).json({msg: "Erro ao cadastrar novo funcionário"})
  }
});

router.put("/:id", async (req, res, next)=>{
  let funcionarioId = req.params.id
  let {cpf, nome, telefone, login, senha} = req.body

  let funcionarioAtualizado = await FuncionarioService.update(funcionarioId, cpf, nome, telefone, login, senha)

  if (funcionarioAtualizado) {
    res.status(200).json({msg: "Funcionário atualizado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar o funcionário"})
  }
})

router.delete("/:id", async (req, res, next)=>{
  let funcionarioId = req.params.id

  let funcionarioDeletado = await FuncionarioService.delete(funcionarioId) 

  if(funcionarioDeletado) {
    res.status(200).json({msg: "Funcionário deletado com sucesso"})
  } else{
    res.status(500).json({msg: "Erro ao deletar o funcionário"})
  }
})

module.exports = router