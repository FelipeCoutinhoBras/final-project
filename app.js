const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const dotenv = require("dotenv")
const bodyParser = require('body-parser')

const sequelizeDB = require('./helpers/bd')
const indexRouter = require('./routes/index');
const autorRoutes = require('./routes/AutorRoutes');
const categoriaRoutes = require('./routes/CategoriaRoutes');
const clienteRoutes = require('./routes/ClienteRoutes');
const editoraRoutes = require('./routes/EditoraRoutes');
const funcionarioRoutes = require('./routes/FuncionarioRoutes');

dotenv.config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/autor', autorRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/editora', editoraRoutes);
app.use('/funcionario', funcionarioRoutes)

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
  res.json({err, mensaegem: "Um erro desconhecido ocorreu"});
});

module.exports = app;
