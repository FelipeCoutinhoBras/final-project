const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")
const jwt = require("jsonwebtoken")
const SECRET = "aslmcodncwonds"

const FuncionarioService = require("../servico/FuncionarioService")
const ClienteService = require('../servico/ClienteService')

router.get("/", async (req, res)=>{
  await sequelize.sync({force: true})
  res.json({msg: "Hello World"})
})

router.post("/login", async (req, res, next) => {
  const { user, login, senha } = req.body;

  try {
    let recuperaUsuario = await ClienteService.getLogin(login, senha);
    let payload = { user };

    if (recuperaUsuario) {
      payload.tipo = 'cliente';
    } else {
      recuperaUsuario = await FuncionarioService.getLogin(login, senha);
      if (recuperaUsuario) {
        payload.tipo = 'funcionario';

        const recuperaAdmin = await FuncionarioService.getAdmin(login, senha);
        if (recuperaAdmin) {
          payload.tipo = 'admin';
        }
      }
    }

    if (!recuperaUsuario) {
      return res.status(401).json({ msg: "Usuário ou senha incorretos!" });
    }

    const token = jwt.sign(payload, SECRET, {
      expiresIn: '30min'
    });

    const mensagem = payload.tipo === 'admin' ? "Seja Bem Vindo de Volta Admin" : "Login feito com sucesso!";
    res.json({ auth: true, token: token, msg: mensagem });

  } catch (error) {
    next(error); // Para lidar com erros no fluxo
  }
})


module.exports = router