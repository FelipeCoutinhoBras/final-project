const jwt = require("jsonwebtoken");
const SECRET = "aslmcodncwonds";

module.exports = {
  // Token para validação de clientes
  validaTokenCliente: (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res
          .status(401)
          .json({ msg: "Sem autorização! Faça o login primeiro." });
      }

      let tokenValidate = token.split(" ")[1];
      jwt.verify(tokenValidate, SECRET, (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ msg: "Token inválido ou expirado." });
        }

        if (
          decoded.tipo === "cliente" ||
          decoded.tipo === "funcionario" ||
          decoded.tipo === "admin"
        ) {
          req.user = decoded;
          next(); // Permite acesso à rota
        }
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(403)
        .json({
          err,
          msg: "Sem autorização! Apenas clientes têm acesso a essa rota.",
        });
    }
  },
  // Token para validação de funcionários
  validaTokenFuncionario: (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res
          .status(401)
          .json({ msg: "Sem autorização! Faça o login primeiro." });
      }

      let tokenValidate = token.split(" ")[1];
      jwt.verify(tokenValidate, SECRET, (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ msg: "Token inválido ou expirado." });
        }

        if (decoded.tipo === "cliente") {
          return res
            .status(403)
            .json({
              msg: "Sem autorização! Apenas funcionários têm acesso a essa rota.",
            });
        } else if (decoded.tipo === "funcionario" || decoded.tipo === "admin") {
          req.user = decoded;
          next(); // Permite acesso à rota
        }
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(403)
        .json({
          err,
          msg: "Sem autorização! Apenas funcionários têm acesso a essa rota.",
        });
    }
  },

  validaTokenAdmin: (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res
          .status(401)
          .json({ msg: "Sem autorização! Faça o login primeiro." });
      }

      let tokenValidate = token.split(" ")[1];
      jwt.verify(tokenValidate, SECRET, (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ msg: "Token inválido ou expirado." });
        }

        if (decoded.tipo === "cliente" || decoded.tipo === "funcionario") {
          return res
            .status(403)
            .json({
              msg: "Sem autorização! Apenas administradores têm acesso a essa rota.",
            });
        } else if (decoded.tipo === "admin") {
          req.user = decoded;
          next(); // Permite acesso à rota
        }
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(403)
        .json({
          err,
          msg: "Sem autorização! Apenas administradores têm acesso a essa rota.",
        });
    }
  },
};
