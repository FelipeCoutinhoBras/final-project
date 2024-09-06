const express = require("express");
const router = express.Router();

const validaDados = require("../helpers/validaDados");
const validaToken = require("../helpers/validaToken");
const ClienteService = require("../servico/ClienteService");
const paginationMiddleware = require('../helpers/pagination');

// Rota para listar todos os clientes
router.get("/", validaToken.validaTokenFuncionario, paginationMiddleware(ClienteService.list), async (req, res, next) => {
  try {
    const { limit, offset } = req.pagination;
    const clientes = await ClienteService.list(limit, offset); // Passe os parâmetros de paginação

    if (clientes) {
      res.status(200).json(clientes);
    } else {
      res.status(404).json({ msg: "Nenhum cliente encontrado" });
    }
  } catch (err) {
    next(err);
  }
});

// Rota para buscar um cliente pelo seu ID
router.get(
  "/:id",
  validaToken.validaTokenFuncionario,
  async (req, res, next) => {
    let cliente = await ClienteService.getById(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(500).json({ msg: "Cliente não localizado" });
    }
  }
);

// Rota para criar um novo cliente
router.post("/", validaToken.validaTokenFuncionario, async (req, res, next) => {
  try {
    let { cpf, nascimento, nome, telefone, email, login, senha } = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaCliente.validate({
      cpf,
      nascimento,
      nome,
      telefone,
      email,
      login,
      senha,
    });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se já existe um cliente com o cpf ou login fornecido

    const cpfCadastrado = await ClienteService.getByCPF(value.cpf);
    const loginCadastrado = await ClienteService.getLoginCadastrado(
      value.login
    );

    if (cpfCadastrado) {
      return res.status(400).json({ msg: "Esse cliente já existe!" });
    } else if (loginCadastrado) {
      return res
        .status(400)
        .json({ msg: "Esse login já existe! Tente outro." });
    } else {
      // Se a validação for bem-sucedida, salva o novo cliente
      let novocliente = await ClienteService.save(
        value.cpf,
        value.nascimento,
        value.nome,
        value.telefone,
        value.email,
        value.login,
        value.senha
      );

      if (novocliente) {
        res.status(200).json(novocliente);
      } else {
        res.status(500).json({ msg: "Erro ao cadastrar novo cliente" });
      }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

// Rota para atualizar cliente pelo seu ID
router.put("/:id", validaToken.validaTokenCliente, async (req, res, next) => {
  try {
    let clienteId = req.params.id;
    let { cpf, nascimento, nome, telefone, email, login, senha } = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaCliente.validate({
      cpf,
      nascimento,
      nome,
      telefone,
      email,
      login,
      senha,
    });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se já existe um cliente com o login fornecido

    const loginCadastrado = await ClienteService.getLoginCadastrado(
      value.login
    );

    if (loginCadastrado) {
      return res
        .status(400)
        .json({ msg: "Esse login já existe! Tente outro." });
    } else {
      // Se a validação for bem-sucedida, salva o cliente atualizado
      let clienteAtualizado = await ClienteService.update(
        clienteId,
        value.cpf,
        value.nascimento,
        value.nome,
        value.telefone,
        value.email,
        value.login,
        value.senha
      );

      if (clienteAtualizado) {
        res.status(200).json({ msg: "Cliente atualizado com sucesso" });
      } else {
        res.status(500).json({ msg: "Erro ao atualizar o cliente" });
      }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

// Rota para excluir cliente pelo seu ID
router.delete(
  "/:id",
  validaToken.validaTokenFuncionario,
  async (req, res, next) => {
    let clienteId = req.params.id;

    let clienteDeletado = await ClienteService.delete(clienteId);

    if (clienteDeletado) {
      res.status(200).json({ msg: "Cliente deletado com sucesso" });
    } else {
      res.status(500).json({ msg: "Erro ao deletar o cliente" });
    }
  }
);

module.exports = router;
