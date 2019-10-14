var arreglos = require("./arreglos");
module.exports = function lexicografico(cadena) {
  if (cadena != undefined) {
    var codigo = cadena.toLowerCase();
    var tabla = [];
    var ToksTable = [];
    let aux = "";
    var token = "";
    var flag = false;
    for (let i = 0; i < codigo.length; i++) {
      if (arreglos.alfabeto.indexOf(codigo[i]) != -1) {
        aux += codigo[i];
        flag = true;
        if (arreglos.caracteres.indexOf(codigo[i + 1]) != -1) {
          if (flag) {
            flag = false;
            if (arreglos.words.indexOf(aux) != -1) {
              token = arreglos.tokens[arreglos.words.indexOf(aux)];

              tabla.push({
                lexema: aux,
                token: token
              });
              ToksTable.push(token);
            } else {
              token = "identificador";
              tabla.push({
                lexema: aux,
                token: token
              });
              ToksTable.push(token);
            }
          }
          ++i;
          token = "";
          aux = codigo[i];
        }
      }
      if (arreglos.numero.indexOf(codigo[i]) != -1) {
        aux += codigo[i];
        if (arreglos.caracteres.indexOf(codigo[i + 1]) != -1) {
          if (flag) {
            token = "identificador";
            flag = false;
            tabla.push({
              lexema: aux,
              token: token
            });
            ToksTable.push(token);
          } else {
            token = "num";
            tabla.push({
              lexema: aux,
              token: token
            });
            ToksTable.push(token);
          }
          ++i;
          token = "";
          aux = codigo[i];
        }
      }

      if (codigo[i] === " " || arreglos.caracteres.indexOf(codigo[i]) != -1) {
        if (arreglos.words.indexOf(aux) != -1) {
          token = arreglos.tokens[arreglos.words.indexOf(aux)];
          tabla.push({
            lexema: aux,
            token: token
          });
          ToksTable.push(token);
          flag = false;
        } else if (arreglos.caracteres.indexOf(codigo[i]) != -1) {
          var algo = codigo[i] + codigo[i + 1];
          flag = false;
          if (arreglos.caracteres.indexOf(algo) != -1) {
            tabla.push({
              lexema: algo,
              token: algo
            });
            ToksTable.push(algo);
            i++;
          } else {
            tabla.push({
              lexema: codigo[i],
              token: codigo[i]
            });
            ToksTable.push(codigo[i]);
            flag = false;
          }

          flag = false;
        } else {
          if (aux != "" && aux != " ") {
            if (!isNaN(Number(aux))) {
              tabla.push({
                lexema: aux,
                token: "num"
              });
              ToksTable.push("num");
            } else {
              tabla.push({
                lexema: aux,
                token: "identificador"
              });
              ToksTable.push("identificador");
              flag = false;
            }
          }
        }
        aux = "";
        token = "";
      }
    }
    return tabla;
  }
  else{
    return "Si te escucho pero no recibo"
  }

  //this.sintactico();
};
