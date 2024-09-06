const express = require("express");
const router = express.Router();

const validaDados = require("../helpers/validaDados");
const validaToken = require("../helpers/validaToken");
const LivroService = require("../servico/LivroService");

// Rota para listar todos os livros
router.get("/", validaToken.validaTokenCliente, async (req, res, next) => {
  const livros = await LivroService.list();

  if (livros) {
    res.status(200).json(livros);
  } else {
    res.status(500).json({ msg: "Não há nenhum livro cadastrado ainda" });
  }
});

// Rota para buscar um livro pelo ID
router.get("/:id", validaToken.validaTokenCliente, async (req, res, next) => {
  const livro = await LivroService.getById(req.params.id);

  if (livro) {
    res.status(200).json(livro);
  } else {
    res.status(500).json({ msg: "Livro não localizado!" });
  }
});

// Rota para criar um novo livro
router.post("/", validaToken.validaTokenFuncionario, async (req, res, next) => {
  try {
    const { titulo, ano, descricao, estado } = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaLivro.validate({
      titulo,
      ano,
      descricao,
      estado,
    });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, salva o novo livro
    const livro = await LivroService.save(
      value.titulo,
      value.ano,
      value.descricao,
      value.estado
    );

    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(500).json({ msg: "Erro ao cadastrar novo livro!" });
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

// Rota para atualizar o livro pelo ID
router.put(
  "/:id",
  validaToken.validaTokenFuncionario,
  async (req, res, next) => {
    try {
      const livroId = req.params.id;
      const { titulo, ano, descricao, estado } = req.body;

      // Validação dos dados usando Joi
      const { error, value } = validaDados.schemaLivro.validate({
        titulo,
        ano,
        descricao,
        estado,
      });

      // Se a validação falhar, retorna um erro
      if (error) {
        return res.status(400).json({ msg: error.details[0].message });
      }

      // Se a validação for bem-sucedida, salva o livro atualizado
      const livroAtualizado = await LivroService.update(
        livroId,
        value.titulo,
        value.ano,
        value.descricao,
        value.estado
      );

      if (livroAtualizado) {
        res.status(200).json({ msg: "Livro atualizado com sucesso!" });
      } else {
        res.status(500).json({ msg: "Erro ao atualizar o livro" });
      }
    } catch (error) {
      // Encaminha o erro para o middleware de tratamento de erros
      next(err);
    }
  }
);

// Rota para atualizar o deletar pelo ID
router.delete(
  "/:id",
  validaToken.validaTokenFuncionario,
  async (req, res, next) => {
    const livroId = req.params.id;

    const livroDeletado = await LivroService.delete(livroId);

    if (livroDeletado) {
      res.status(200).json({ msg: "Livro deletado com sucesso" });
    } else {
      res.status(500).json({ msg: "Erro ao deletar o livro" });
    }
  }
);

module.exports = router;
