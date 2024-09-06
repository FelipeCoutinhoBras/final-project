const express = require("express");
const router = express.Router();

const validaDados = require("../helpers/validaDados");
const CategoriaService = require("../servico/CategoriaService");

// Rota para listar todos as categorias
router.get("/", async (req, res, next) => {
  let categorias = await CategoriaService.list();
  if (categorias) {
    res.status(200).json(categorias);
  } else {
    res.status(500).json({ msg: "Não há nenhuma categoria cadastrada" });
  }
});

// Rota para buscar uma categoria pelo seu ID
router.get("/:id", async (req, res, next) => {
  let categoria = await CategoriaService.getById(req.params.id);
  if (categoria) {
    res.status(200).json(categoria);
  } else {
    res.status(500).json({ msg: "Categoria não localizada" });
  }
});

// Rota para criar uma nova categoria
router.post("/", async (req, res, next) => {
  try {
    const tipo = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaCategoria.validate(tipo);

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se já existe uma categoria com o tipo fornecido

    const categoriaCadastrada = await CategoriaService.getByName(value.tipo);

    if (categoriaCadastrada) {
      return res.status(400).json({ msg: "Essa categoria já existe!" });
    } else {
      // Se a validação for bem-sucedida, salva o nova autor
      let novaCategoria = await CategoriaService.save(value.tipo);

      if (novaCategoria) {
        res.status(200).json(novaCategoria);
      } else {
        res.status(500).json({ msg: "Erro ao cadastrar a categoria" });
      }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

// Rota para editar uma categoria pelo seu ID
router.put("/:id", async (req, res, next) => {
  try {
    let categoriaId = req.params.id;
    let tipo = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaCategoria.validate(tipo);

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se já existe uma categoria com o tipo fornecido

    const categoriaCadastrada = await CategoriaService.getByName(value.tipo);

    if (categoriaCadastrada) {
      res
        .status(400)
        .json({
          msg: "Essa categoria já existe! Falha ao atualizar o cadastro.",
        });
    } else {
      // Se a validação for bem-sucedida, salva a nova categoria
      let categoriaAtualizada = await CategoriaService.update(
        categoriaId,
        value.tipo
      );

      if (categoriaAtualizada) {
        res.status(200).json(categoriaAtualizada);
      } else {
        res.status(500).json({ msg: "Categoria não localizada" });
      }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

// Rota para excluir uma categoria pelo seu ID
router.delete("/:id", async (req, res, next) => {
  let categoriaId = req.params.id;

  let categoriaDeletada = await AutorService.delete(categoriaId);

  if (categoriaDeletada) {
    res.status(200).json(categoriaDeletada);
  } else {
    res.status(500).json({ msg: "Categoria não localizada" });
  }
});

module.exports = router;
