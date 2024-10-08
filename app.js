const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")

const sequelizeDB = require('./helpers/bd')
const indexRouter = require('./routes/index');
const autorRoutes = require('./routes/AutorRoutes');
const categoriaRoutes = require('./routes/CategoriaRoutes');
const clienteRoutes = require('./routes/ClienteRoutes');
const editoraRoutes = require('./routes/EditoraRoutes');
const funcionarioRoutes = require('./routes/FuncionarioRoutes');
const livroRoutes = require('./routes/LivroRoutes');
const emprestimoRoutes = require('./routes/EmprestimoRoutes');
const validaToken = require("./helpers/validaToken")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/autor', validaToken.validaTokenFuncionario, autorRoutes);
app.use('/categoria', validaToken.validaTokenFuncionario, categoriaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/editora', validaToken.validaTokenFuncionario, editoraRoutes);
app.use('/funcionario', funcionarioRoutes)
app.use('/livro', livroRoutes)
app.use('/emprestimo', validaToken.validaTokenFuncionario, emprestimoRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
