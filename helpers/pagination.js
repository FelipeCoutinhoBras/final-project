const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    try {
      // Extrai os parâmetros de paginação da query string
      const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
      const pageSize = parseInt(req.query.pageSize) || 10; // Tamanho da página (default: 10)

      // Calcula o offset para a consulta
      const offset = (page - 1) * pageSize;

      // Adiciona os parâmetros de paginação à query
      req.pagination = {
        limit: pageSize,
        offset: offset
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = paginationMiddleware;