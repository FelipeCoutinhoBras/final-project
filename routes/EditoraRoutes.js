const express = require("express")
const router = express.Router()

const validaDados = require("../helpers/validaDados")
const EditoraService = require('../servico/EditoraService')

router.get("/", async (req, res, next) => {
  let editoras = await EditoraService.list()
  if (editoras) {
    res.status(200).json(editoras)
  } else {
    res.status(500).json({msg: "Não há nenhuma editora cadastrada"})
  }
})

router.get("/:id", async (req, res, next)=> {
  let editora = await EditoraService.getById(req.params.id)
  if (editora) {
    res.status(200).json(editora)
  } else{
    res.status(500).json({msg: "Editora não localizada"})
  }
})

router.post("/", async (req, res, next)=>{
  try {
    let { nome, telefone, email } = req.body;

    // Validação dos dados usando Joi
    const { error, value } = validaDados.schemaEditora.validate({ nome, telefone, email });

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    // Se a validação for bem-sucedida, verifica se já existe uma editora com o nome fornecido

    const editoraCadastrada = await EditoraService.getByName(value.nome)

    if (editoraCadastrada) {
      return res.status(400).json({msg: "Já existe uma editora cadastrada com este mesmo nome!" });
    }  else {

      
          // Se a validação for bem-sucedida, salva a nova editora
          let novaeditora = await EditoraService.save(value.nome, value.telefone, value.email);
      
          if (novaeditora) {
            res.status(200).json(novaeditora);
          } else {
            res.status(500).json({ msg: "Erro ao cadastrar nova editora" });
          }
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
});

router.put("/:id", async(req, res, next) => {
  try {
    let editoraId = req.params.id
    let {nome, telefone, email} = req.body
  
    // Validação dos dados usando Joi
    const {error, value} = validaDados.schemaEditora.validate({nome, telefone, email })

    // Se a validação falhar, retorna um erro
    if (error) {
      return res.status(400).json({msg: error.details[0].message})
    }

    let editoraAtualizada = await EditoraService.update(editoraId, value.nome, value.telefone, value.email)
  
    if (editoraAtualizada) {
      res.status(200).json({msg: "Editora atualizada com sucesso"})
    } else {
      res.status(500).json({msg: "Erro ao atualizar editora"})
    }
  } catch (err) {
    next(err); // Encaminha o erro para o middleware de tratamento de erros
  }
})

router.delete("/:id", async(req, res, next) => {
  let editoraId = req.params.id

  let editoraDeletado = await EditoraService.delete(editoraId)

  if(editoraDeletado) {
    res.status(200).json({msg: "Editora cancelada com sucesso"})
  } else {
    res.status(500).json({msg: "Erro ao deletar editora"})
  }
})


module.exports = router