var express = require("express");
var Router = express.Router();
var lexicografico = require("./lexicografico");

Router.post("/lexi", function(request, response) {
  var query1 = request.body.var1;
  var code = lexicografico(query1);
  response.send(code);
});

Router.post("/all", function(req, res) {
  res.send("sirvo");
  var codigo = req.bodyparser.codigo;
  res.send(codigo);
});

Router.all("*", function(req, res) {
  res.send("No se encontro el recurso solicitado");
  res.end();
});

module.exports = Router;
