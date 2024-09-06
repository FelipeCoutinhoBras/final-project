const express = require("express");
const router = express.Router();

const validaDados = require("../helpers/validaDados");
const EmprestimoService = require("../servico/EmprestimoService");
const LivroService = require("../servico/LivroService");

//Rota para listar todos os emprestimos
router.get("/", async (req, res, next) => {
  const livrosEmprestados = await EmprestimoService.list();

  if (livrosEmprestados) {
    res.status(200).json(livrosEmprestados);
  } else {
    res.status(500).json({ msg: "Nenhum emprestimo localizado" });
  }
});

//Rota para buscar um livro pelo seu ID
router.get("/:id", async (req, res, next) => {
  const emprestimo = await EmprestimoService.getByPk(req.params.id);

  if (emprestimo) {
    res.status(200).json(emprestimo);
  } else {
    res.status(500).json({ msg: "Nenhum emprestimo localizado com este id" });
  }
});

//Rota para criar um novo livro
router.post("/", async (req, res, next) => {
  try {
    const { data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId } =
      req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaEmprestimo.validate({
      data_emprestimo,
      data_devolucao,
      cliente,
      LivroId,
      FuncionarioId,
    });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se o livro já foi emprestado
    const livroEmprestado = await LivroService.getLivroEmprestado(
      value.LivroId
    );

    if (livroEmprestado) {
      return res.status(400).json({ msg: "Este livro já foi emprestado!" });
    } else {
      // Se a validação for bem-sucedida, salva o novo emprestimo
      const novoEmprestimo = await EmprestimoService.save(
        value.data_emprestimo,
        value.data_devolucao,
        value.cliente,
        value.LivroId,
        value.FuncionarioId
      );

      if (novoEmprestimo) {
        res.status(200).json(novoEmprestimo);
      } else {
        res.status(500).json({ msg: "Erro ao cadastrar novo emprestimo" });
      }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

//Rota para atualizar um livro pelo seu ID
router.put("/:id", async (req, res, next) => {
  try {
    const emprestimoId = req.params.id;
    const { data_emprestimo, data_devolucao, cliente, LivroId, FuncionarioId } =
      req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaEmprestimo.validate({
      data_emprestimo,
      data_devolucao,
      cliente,
      LivroId,
      FuncionarioId,
    });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, salva o emprestimo atualizado
    const atualizaEmprestimo = await EmprestimoService.update(
      emprestimoId,
      value.data_emprestimo,
      value.data_devolucao,
      value.cliente,
      value.LivroId,
      value.FuncionarioId
    );

    if (atualizaEmprestimo) {
      res.status(200).json({ msg: "Emprestimo atualizado com sucesso" });
    } else {
      res.status(500).json({ msg: "Erro ao atualizar o emprestimo" });
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

//Rota para deletar um livro pelo seu ID
router.delete("/:id", async (req, res, next) => {
  const emprestimoId = req.params.id;

  const emprestimoDeletado = await EmprestimoService.delete(emprestimoId);

  if (emprestimoDeletado) {
    res.status(200).json({ msg: "Emprestimo deletado com sucesso" });
  } else {
    res.status(500).json({ msg: "Erro ao deletar o emprestimo" });
  }
});

module.exports = router;
