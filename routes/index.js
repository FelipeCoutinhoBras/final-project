const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const AutorService = require("../servico/AutorService")
const CategoriaService = require("../servico/CategoriaService")
const ClienteService = require("../servico/ClienteService")

router.get("/", async (req, res)=>{
  await sequelize.sync({force: true})
  res.json({msg: "Hello World"})
})

module.exports = router