const express = require("express")
const router = express.Router()

const validaDados = require("../helpers/validaDados")
const validaToken = require('../helpers/validaToken')
const FuncionarioService = require("../servico/FuncionarioService")

router.get("/", validaToken.validaTokenAdmin,  async (req, res, next)=> {
  let funcionarios = await FuncionarioService.list()
  if(funcionarios) {
    res.status(200).json(funcionarios)
  } else {
    res.status(500).json({msg: "Não há nenhum funcionário cadastrado"})
  }
});

router.get("/:id", validaToken.validaTokenAdmin, async (req, res, next)=>{
  let funcionario = await FuncionarioService.getById(req.params.id)
  if(funcionario) {
    res.status(200).json(funcionario)
  } else {
    res.status(500).json({msg: "Funcionario não encontrado"})
  }
});

router.post("/", validaToken.validaTokenAdmin, async (req, res, next)=>{
  let {cpf, nome, telefone, login, senha, isAdmin} = req.body

  let novofuncionario = await FuncionarioService.save(cpf, nome, telefone, login, senha, isAdmin)

  if (novofuncionario) {
    res.status(200).json(novofuncionario)
  } else {
    res.status(500).json({msg: "Erro ao cadastrar novo funcionário"})
  }
});

router.put("/:id", validaToken.validaTokenFuncionario, async (req, res, next)=>{
  let funcionarioId = req.params.id
  let {cpf, nome, telefone, login, senha, isAdmin} = req.body

  let funcionarioAtualizado = await FuncionarioService.update(funcionarioId, cpf, nome, telefone, login, senha, isAdmin)

  if (funcionarioAtualizado) {
    res.status(200).json({msg: "Funcionário atualizado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar o funcionário"})
  }
})

router.delete("/:id", validaToken.validaTokenAdmin, async (req, res, next)=>{
  let funcionarioId = req.params.id

  let funcionarioDeletado = await FuncionarioService.delete(funcionarioId) 

  if(funcionarioDeletado) {
    res.status(200).json({msg: "Funcionário deletado com sucesso"})
  } else{
    res.status(500).json({msg: "Erro ao deletar o funcionário"})
  }
})

module.exports = router