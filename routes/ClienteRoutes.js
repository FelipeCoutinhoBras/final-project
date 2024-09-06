const express = require("express")
const router = express.Router()

const validaDados = require("../helpers/validaDados")
const validaToken = require('../helpers/validaToken')
const ClienteService = require('../servico/ClienteService')

router.get("/", validaToken.validaTokenFuncionario, async (req, res, next) => {
  let clientes = await ClienteService.list()
  if (clientes) {
    res.status(200).json(clientes)
  } else {
    res.status(500).json({msg: "Não há nenhum cliente cadastrado"})
  }
})

router.get("/:id", validaToken.validaTokenFuncionario, async (req, res, next)=> {
  let cliente = await ClienteService.getById(req.params.id)
  if (cliente) {
    res.status(200).json(cliente)
  } else{
    res.status(500).json({msg: "Cliente não localizado"})
  }
})

router.post("/", validaToken.validaTokenFuncionario, async (req, res, next)=>{
  let {cpf, nascimento, nome, telefone, email, login, senha} = req.body

  let novocliente = await ClienteService.save(cpf, nascimento, nome, telefone, email, login, senha)

  if(novocliente) {
    res.status(200).json(novocliente)
  } else{
    res.status(500).json({msg: "Erro ao cadastrar novo cliente"})
  }
})

router.put("/:id", validaToken.validaTokenCliente, async(req, res, next) => {
  let clienteId = req.params.id
  let {cpf, nascimento, nome, telefone, email, login, senha} = req.body

  let clienteAtualizado = await ClienteService.update(clienteId, cpf, nascimento, nome, telefone, email, login, senha)

  if (clienteAtualizado) {
    res.status(200).json({msg: "Cliente atualizado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao atualizar o cliente"})
  }
})

router.delete("/:id", validaToken.validaTokenFuncionario, async(req, res, next) => {
  let clienteId = req.params.id

  let clienteDeletado = await ClienteService.delete(clienteId)

  if(clienteDeletado) {
    res.status(200).json({msg: "Cliente deletado com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao deletar o cliente"})
  }
})

module.exports = router