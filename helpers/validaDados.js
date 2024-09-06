const Joi = require("joi");

const schemaAutor  = Joi.object({
  nome: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).required().messages({
    "string.pattern.base": "O nome precisa ter no mínimo 3 letras.",
    "any.required": "O nome é obrigatório."
}),
  pseudonimo: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).messages({
    "string.pattern.base": "O pseudônimo precisa ter no mínimo 3 letras."
  }),
});

const schemaCategoria = Joi.object({
  tipo:  Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).required().messages({
    "string.pattern.base": "O tipo de categoria precisa ter no mínimo 3 letras.",
    "any.required": "O tipo de categoria é obrigatório."
  })
});

const schemaCliente = Joi.object({
  cpf: Joi.string().pattern(/^\d{11}$/).required().messages({
    "string.pattern.base": "O CPF deve conter 11 números.",
    "any.required": "O CPF é obrigatório."
  }),
  nascimento: Joi.date().required().iso().messages({
    "date.base": "A data de nascimento deve estar no formato (AAAA-MM-DD).",
    "any.required": "A data de nascimento é obrigatória."
  }),
  nome: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).required().messages({
    "string.pattern.base": "O nome precisa ter no mínimo 3 letras.",
    "any.required": "O nome é obrigatório."
}),
  telefone: Joi.string().pattern(/^\d{10,11}$/).required().messages({
    "string.pattern.base": "O telefone deve conter 10 a 11 números.",
    "any.required": "O telefone é obrigatório."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O e-mail deve ser válido (ex: teste@teste.com).",
    "any.required": "O e-mail é obrigatório."
  }),
  login: Joi.string().email().required().messages({
    "string.email": "O login deve ser válido (ex: teste@teste.com).",
    "any.required": "O login é obrigatório."
  }),
  senha: Joi.string().pattern(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\d\w\W]{8,}$/).required().messages({
    "string.pattern.base": "A senha deve deve conter 8 caracteres no mínimo, ter ao menos 1 caracter especial e 1 número.",
    "any.required": "A senha é obrigatória."
  }),
});

const schemaEditora = Joi.object({
  nome: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).required().messages({
    "string.pattern.base": "O nome precisa ter no mínimo 3 letras.",
    "any.required": "O nome é obrigatório."
}),
  telefone: Joi.string().pattern(/^\d{10,11}$/).required().messages({
    "string.pattern.base": "O telefone deve conter 10 a 11 números.",
    "any.required": "O telefone é obrigatório."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O e-mail deve ser válido (ex: teste@teste.com).",
    "any.required": "O e-mail é obrigatório."
  }),
});

const schemaEmprestimo = Joi.object({
  data_emprestimo: Joi.date().iso().required().messages({
    "date.base": "A data do empréstimo deve estar no formato (AAAA-MM-DD).",
    "any.required": "A data do empréstimo é obrigatória."
  }),
  data_devolucao: Joi.date().iso().required().messages({
    "date.base": "A data de devolução deve estar no formato (AAAA-MM-DD).",
    "any.required": "A data de devolução é obrigatória."
  }),
  cliente: Joi.number().integer().required().messages({
    "number.base": "O id do cliente deve ser um número.",
    "any.required": "O id do cliente é obrigatório."
  }),
  LivroId: Joi.number().integer().required().messages({
    "number.base": "O id do livro deve ser um número.",
    "any.required": "O id do livro é obrigatório."
  }),
  FuncionarioId: Joi.number().integer().required().messages({
    "number.base": "O id do funcionário deve ser um número.",
    "any.required": "O id do funcionário é obrigatório."
  }),
});

const schemaFuncionario = Joi.object({
  cpf: Joi.string().pattern(/^\d{11}$/).required().messages({
    "string.pattern.base": "O CPF deve conter 11 números.",
    "any.required": "O CPF é obrigatório."
  }),
  nome: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,30}$/).required().messages({
    "string.pattern.base": "O nome precisa ter no mínimo 3 letras.",
    "any.required": "O nome é obrigatório."
}),
  telefone: Joi.string().pattern(/^\d{10,11}$/).required().messages({
    "string.pattern.base": "O telefone deve conter 10 a 11 números.",
    "any.required": "O telefone é obrigatório."
  }),
  login: Joi.string().email().required().messages({
    "string.email": "O login deve ser válido (ex: teste@teste.com).",
    "any.required": "O login é obrigatório."
  }),
  senha: Joi.string().pattern(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\d\w\W]{8,}$/).required().messages({
    "string.pattern.base": "A senha deve deve conter 8 caracteres no mínimo, ter ao menos 1 caracter especial e 1 número.",
    "any.required": "A senha é obrigatória."
  }),
  isAdmin: Joi.boolean().messages({
    "boolean.base": "O valor de isAdmin deve ser true (verdadeiro) ou false (falso)."
  }),
});

const schemaLivro = Joi.object({
  titulo: Joi.string().pattern(/^(?=.*[a-zA-Z])[a-zA-Z ]{3,100}$/).required().messages({
    "string.pattern.base": "O título precisa ter no mínimo 3 letras.",
    "any.required": "O título é obrigatório."
  }),
  ano: Joi.string().pattern(/^\d{1,4}$/).required().messages({
    "string.pattern.base": "O ano do livro deve ser numérico.",
    "any.required": "O ano do livro é obrigatório."
  }),
  descricao: Joi.string().alphanum().min(3).required().messages({
    "string.alphanum": "A descrição precisa conter apenas letras e números.",
    "string.min": "A descrição precisa ter no mínimo 3 caracteres.",
    "any.required": "A descrição é obrigatória."
  }),
  estado: Joi.string().valid("disponivel", "emprestado").required().messages({
    "any.only": "O estado do livro deve ser 'disponivel' ou 'emprestado'.",
    "any.required": "O estado do livro é obrigatório."
  }),
});

module.exports = {schemaAutor, schemaCategoria, schemaCliente, schemaEditora, schemaEmprestimo, schemaFuncionario, schemaLivro};
