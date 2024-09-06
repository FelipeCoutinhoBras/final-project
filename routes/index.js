const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/bd");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const FuncionarioService = require("../servico/FuncionarioService");
const ClienteService = require("../servico/ClienteService");

const Autor = require("../model/Autor");
const Categoria = require("../model/Categoria");
const Cliente = require("../model/Cliente");
const Editora = require("../model/Editora");
const Emprestimo = require("../model/Emprestimo");
const Funcionario = require("../model/Funcionario");
const Livro = require("../model/Livro");

// Rota para o usuário logar no sistema
router.post("/login", async (req, res, next) => {
  const { user, login, senha } = req.body;

  try {
    let recuperaUsuario = await ClienteService.getLogin(login, senha);
    let payload = { user };

    if (recuperaUsuario) {
      payload.tipo = "cliente";
    } else {
      recuperaUsuario = await FuncionarioService.getLogin(login, senha);
      if (recuperaUsuario) {
        payload.tipo = "funcionario";

        const recuperaAdmin = await FuncionarioService.getAdmin(login, senha);
        if (recuperaAdmin) {
          payload.tipo = "admin";
        }
      }
    }

    if (!recuperaUsuario) {
      return res.status(401).json({ msg: "Usuário ou senha incorretos!" });
    }

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30min",
    });

    const mensagem =
      payload.tipo === "admin"
        ? "Seja Bem Vindo de Volta Admin"
        : "Login feito com sucesso!";
    res.json({ auth: true, token: token, msg: mensagem });
  } catch (error) {
    next(error); // Para lidar com erros no fluxo
  }
});

// Rota para popular as tabelas
router.get("/install", async (req, res) => {
  try {
    // Populando a tabela Livro
    await Livro.bulkCreate(
      [
        {
          titulo: "E assim que acaba",
          ano: "2000",
          descricao: "As escolhas corretas nas situações mais difíceis",
          estado: "disponivel",
        },
        {
          titulo: "A seleção",
          ano: "2001",
          descricao:
            "Desigualdade social e como algumas castas tem muito e outras tão poucos.",
          estado: "disponivel",
        },
        {
          titulo: "Mil beijos de garoto",
          ano: "2002",
          descricao: "O amor supera o tempo.",
          estado: "disponivel",
        },
        {
          titulo: "Até o verão terminar",
          ano: "2003",
          descricao: "A paixão que salvou uma vida.",
          estado: "disponivel",
        },
        {
          titulo: "Pequena coreografia do adeus",
          ano: "2004",
          descricao: "Os pais que acabam com a vida de sua filha.",
          estado: "disponivel",
        },
      ],
      { returning: true }
    );

    // Populando a tabela Autor
    await Autor.bulkCreate([
      { nome: "Collen Houver", pseudonimo: "Houver" },
      { nome: "Tillie Cole", pseudonimo: "Colezinha" },
      { nome: "Aline Bei", pseudonimo: "Velentins" },
      { nome: "Machado de Assis", pseudonimo: "Machadinho" },
      { nome: "William Shakespeare", pseudonimo: "Shakespeare" },
    ]);

    // Populando a tabela Categoria
    await Categoria.bulkCreate([
      { tipo: "Ficção" },
      { tipo: "Não Ficção" },
      { tipo: "Aventura" },
      { tipo: "Romance" },
      { tipo: "História" },
    ]);

    // Populando a tabela Cliente
    await Cliente.bulkCreate([
      {
        cpf: "51569907897",
        nascimento: "1990-01-01",
        nome: "Cliente 1",
        telefone: "18997190303",
        email: "cliente1@teste.com",
        login: "cliente1@teste.com",
        senha: "Senha!123",
      },
      {
        cpf: "67709865403",
        nascimento: "1991-02-02",
        nome: "Cliente 2",
        telefone: "11987600569",
        email: "cliente2@teste.com",
        login: "cliente2@teste.com",
        senha: "Senha!123",
      },
      {
        cpf: "46678909778",
        nascimento: "1992-03-03",
        nome: "Cliente 3",
        telefone: "18998184484",
        email: "cliente3@teste.com",
        login: "cliente3@teste.com",
        senha: "Senha!123",
      },
      {
        cpf: "45678912364",
        nascimento: "1993-04-04",
        nome: "Cliente 4",
        telefone: "18996030363",
        email: "cliente4@teste.com",
        login: "cliente4@teste.com",
        senha: "Senha!123",
      },
      {
        cpf: "34256709887",
        nascimento: "1994-05-05",
        nome: "Cliente 5",
        telefone: "14998077865",
        email: "cliente5@teste.com",
        login: "cliente5@teste.com",
        senha: "Senha!123",
      },
    ]);

    // Populando a tabela Editora
    await Editora.bulkCreate([
      { nome: "Hapers", telefone: "1133334444", email: "hapers11@gmail.com" },
      {
        nome: "HQ Editora",
        telefone: "1133334445",
        email: "editorahq@hotmail.com ",
      },
      { nome: "Silvas", telefone: "1133334446", email: "silvased@icloud.com" },
      {
        nome: "Houver Editora",
        telefone: "1133334447",
        email: "houvercollen@gmail.com",
      },
      { nome: "Rocco", telefone: "1133334448", email: "rcc01@hotmail.com" },
    ]);

    // Populando a tabela Funcionario
    await Funcionario.bulkCreate([
      {
        cpf: "98765432101",
        nome: "Felipe Admin",
        telefone: "21999999999",
        login: "admin@teste.com",
        senha: "Admin!123",
        isAdmin: true,
      },
      {
        cpf: "98765432102",
        nome: "Funcionario 2",
        telefone: "21999999998",
        login: "func2@teste.com",
        senha: "Senha!123",
        isAdmin: false,
      },
      {
        cpf: "98765432103",
        nome: "Funcionario 3",
        telefone: "21999999997",
        login: "func3@teste.com",
        senha: "Senha!123",
        isAdmin: false,
      },
      {
        cpf: "98765432104",
        nome: "Funcionario 4",
        telefone: "21999999996",
        login: "func4@teste.com",
        senha: "Senha!123",
        isAdmin: false,
      },
      {
        cpf: "98765432105",
        nome: "Funcionario 5",
        telefone: "21999999995",
        login: "func5@teste.com",
        senha: "Senha!123",
        isAdmin: false,
      },
    ]);

    // Populando a tabela Emprestimo (Assumindo que ClienteId, LivroId, FuncionarioId são chaves estrangeiras)
    await Emprestimo.bulkCreate([
      {
        data_emprestimo: "2024-01-01",
        data_devolucao: "2024-02-01",
        cliente: 1,
        LivroId: 1,
        FuncionarioId: 1,
      },
      {
        data_emprestimo: "2024-01-02",
        data_devolucao: "2024-02-02",
        cliente: 2,
        LivroId: 2,
        FuncionarioId: 2,
      },
      {
        data_emprestimo: "2024-01-03",
        data_devolucao: "2024-02-03",
        cliente: 3,
        LivroId: 3,
        FuncionarioId: 3,
      },
      {
        data_emprestimo: "2024-01-04",
        data_devolucao: "2024-02-04",
        cliente: 4,
        LivroId: 4,
        FuncionarioId: 4,
      },
      {
        data_emprestimo: "2024-01-05",
        data_devolucao: "2024-02-05",
        cliente: 5,
        LivroId: 5,
        FuncionarioId: 5,
      },
    ]);

    res.status(200).send("Registros inseridos com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao inserir registros no banco de dados.");
  }
});

module.exports = router;
