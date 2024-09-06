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
  try {
    let {cpf, nome, telefone, login, senha, isAdmin} = req.body

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaFuncionario.validate({ cpf, nome, telefone, login, senha, isAdmin});
  
    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    // Se a validação for bem-sucedida, verifica se já existe um funcionario com o cpf ou login fornecido

    const cpfCadastrado = await FuncionarioService.getByCPF(value.cpf)
    const loginCadastrado = await FuncionarioService.getLoginCadastrado(value.login)

    if (cpfCadastrado) {
      return res.status(400).json({msg: "Esse funcionario já existe!" });
    } else if (loginCadastrado) {
      return res.status(400).json({msg: "Esse login já existe! Tente outro."});
    }

    // Se a validação for bem-sucedida, salva o novo funcionario
    let novofuncionario = await FuncionarioService.save(value.cpf, value.nome, value.telefone, value.login, value.senha, value.isAdmin)

    if (novofuncionario) {
      res.status(200).json(novofuncionario)
    } else {
      res.status(500).json({msg: "Erro ao cadastrar novo funcionário"})
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

router.put("/:id", validaToken.validaTokenFuncionario, async (req, res, next)=>{
  try {
    let funcionarioId = req.params.id
    let {cpf, nome, telefone, login, senha, isAdmin} = req.body
  
    // Validação dos dados usando Joi
    const {error, value} = validaDados.schemaFuncionario.validate({ cpf, nome, telefone, login, senha, isAdmin });
  
    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({msg: error.details[0].message})
    }

    // Se a validação for bem-sucedida, verifica se já existe um cliente com o login fornecido
    const loginCadastrado = await FuncionarioService.getLoginCadastrado(value.login)

    if (loginCadastrado) {
      return res.status(400).json({msg: "Esse login já existe! Tente outro."});
    }
  
    // Se a validação for bem-sucedida, salva o funcionario atualizado
    let funcionarioAtualizado = await FuncionarioService.update(funcionarioId, value.cpf, value.nome, value.telefone, value.login, value.senha, value.isAdmin)

    if (funcionarioAtualizado) {
      res.status(200).json({msg: "Funcionário atualizado com sucesso"})
    } else {
      res.status(500).json({msg: "Erro ao atualizar o funcionário"})
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
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