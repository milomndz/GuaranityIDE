import { Component } from "@angular/core";
import { DataService } from "./services/data.service";
import { saveAs } from "file-saver";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "guaranity-ide";
  public codigoFull: string = "";
  public code: string = "";
  public especiales = [
    "if",
    "elseif",
    "else",
    "for",
    "while",
    "function",
    "loop",
    "int",
    "float",
    "char",
    "boolean",
    "string",
    "array",
    "var",
    "function",
    "openfile",
    "readfile",
    "closefile",
    "true",
    "false",
    "read",
    "print",
    "return"
  ];
  public caracteres = [
    ";",
    "{",
    "}",
    "<",
    ">",
    "==",
    "<=",
    ">=",
    "!=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "++",
    "--",
    "=",
    "#",
    "[",
    "]",
    "(",
    ")"
  ];
  public tabla = [];
  todo = [
    {
      title: "var",
      class: "var",
      disabled: false,
      img: "./assets/equals.fw.png",
      condition: true
    },
    {
      title: "",
      class: "instruccion",
      disabled: false,
      condition: true
    },
    {
      title: "if",
      class: "if",
      disabled: false,
      condition: true
    },
    {
      title: "else",
      class: "else",
      disabled: false,
      condition: false
    },
    {
      title: "elseif",
      class: "elseif",
      disabled: false,
      condition: true
    },
    {
      title: "while",
      class: "while",
      disabled: false,
      condition: true
    },
    {
      title: "for",
      class: "for",
      disabled: false,
      condition: true
    },
    {
      title: "func",
      class: "function",
      disabled: false,
      condition: true
    }
  ];

  done = [];

  prueba() {
    this.code = "";
    this.codigoFull = "";
    let inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].className == "if1") {
        this.code += "if(" + inputs[i].value + "){\n";
        this.codigoFull += "if ( " + inputs[i].value + " ) { ";
      }
      if (inputs[i].className == "endif1") {
        this.code += "}\n";
        this.codigoFull += "}";
      }
      if (inputs[i].className == "elseif1") {
        this.code += "elseif(" + inputs[i].value + "){\n";
        this.codigoFull += "elseif ( " + inputs[i].value + " ){ ";
      }
      if (inputs[i].className == "endelseif1") {
        this.code += "}\n";
        this.codigoFull += "}";
      }
      if (inputs[i].className == "else1") {
        this.code += "else {\n";
        this.codigoFull += "else { ";
      }
      if (inputs[i].className == "endelse1") {
        this.code += "}\n";
        this.codigoFull += "}";
      }
      if (inputs[i].className == "instruccion1") {
        this.code += inputs[i].value + "\n";
        this.codigoFull += inputs[i].value + " ";
      }
      if (inputs[i].className == "while1") {
        this.code += "while(" + inputs[i].value + "){\n";
        this.codigoFull += "while ( " + inputs[i].value + " ) { ";
      }
      if (inputs[i].className == "endwhile1") {
        this.code += "}\n";
        this.codigoFull += "} ";
      }
      if (inputs[i].className == "for1") {
        this.code += "for(" + inputs[i].value + "){\n";
        this.codigoFull += "for ( " + inputs[i].value + " ) { ";
      }
      if (inputs[i].className == "endfor1") {
        this.code += "}\n";
        this.codigoFull += "}";
      }
      if (inputs[i].className == "var1") {
        this.code += "var " + inputs[i].value + ";\n";
        this.codigoFull += "var " + inputs[i].value + " ;";
      }
      if (inputs[i].className == "function1") {
        this.code += "function(" + inputs[i].value + "){\n";
        this.codigoFull += "function" + inputs[i].value + " { ";
      }
      if (inputs[i].className == "endfunction1") {
        this.code += "}\n";
        this.codigoFull += "}";
      }
    }

    console.log(this.splitCode());
    this.saveFile();
  }

  splitCode() {
    return this.codigoFull.split(" ", this.codigoFull.length);
  }

  lexicografico() {
    this.prueba();
    var codigo = this.splitCode();
    for (var i = 0; i < codigo.length - 1; i++) {
      var token = "";
      if (this.especiales.indexOf(codigo[i]) != -1) {
        token += codigo[i] + "Token";
        this.tabla.push({
          lexema: codigo[i],
          token: token
        });
      } else if (this.caracteres.indexOf(codigo[i]) != -1) {
        token += codigo[i] + "Token";
        this.tabla.push({
          lexema: codigo[i],
          token: token
        });
      } else {
        if (codigo[i] == " ") {
        }
        if (!isNaN(Number(codigo[i]))) {
          this.tabla.push({
            lexema: codigo[i],
            token: "numero"
          });
        } else {
          this.tabla.push({
            lexema: codigo[i],
            token: "identificador"
          });
        }
      }
    }
    this.createTable();
  }

  printTexto(texto) {
    var parrafo = document.createElement("p");
    var textCode = document.createTextNode(texto);
    parrafo.appendChild(textCode);
    document.getElementById("tabla1").appendChild(parrafo);
  }

  createTable() {
    this.clearTable();
    var col = document.createElement("tr");
    var row1 = document.createElement("th");
    var textrow1 = document.createTextNode("Lexema");
    var row2 = document.createElement("th");
    var textrow2 = document.createTextNode("Token");
    row1.appendChild(textrow1);
    row2.appendChild(textrow2);
    col.appendChild(row1);
    col.appendChild(row2);
    document.getElementById("tabla1").appendChild(col);

    for (var i = 0; i < this.tabla.length; i++) {
      var col = document.createElement("tr");
      var row1 = document.createElement("td");
      var textrow1 = document.createTextNode(this.tabla[i].lexema);
      var row2 = document.createElement("td");
      var textrow2 = document.createTextNode(this.tabla[i].token);
      row1.appendChild(textrow1);
      row2.appendChild(textrow2);
      col.appendChild(row1);
      col.appendChild(row2);
      document.getElementById("tabla1").appendChild(col);
    }
  }

  clearTable() {
    var list = document.getElementById("tabla1");

    // As long as <ul> has a child node, remove it
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }

  insertarEnd(clase, num) {
    if (clase == " if ") {
      this.done.splice(num + 1, 0, {
        title: "end if",
        class: "endif",
        disabled: false,
        condition: false
      });
    }
    if (clase == " else ") {
      this.done.splice(num + 1, 0, {
        title: "end else",
        class: "endelse",
        disabled: false,
        condition: false
      });
    }
    if (clase == " elseif ") {
      this.done.splice(num + 1, 0, {
        title: "end elseif",
        class: "endelseif",
        disabled: false,
        condition: false
      });
    }
    if (clase == " for ") {
      this.done.splice(num + 1, 0, {
        title: "end for",
        class: "endfor",
        disabled: false,
        condition: false
      });
    }
    if (clase == " while ") {
      this.done.splice(num + 1, 0, {
        title: "end while",
        class: "endwhile",
        disabled: false,
        condition: false
      });
    }
    if (clase == " func ") {
      this.done.splice(num + 1, 0, {
        title: "end function",
        class: "endfunction",
        disabled: false,
        condition: false
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.item.element);
      this.insertarEnd(
        event.item.element.nativeElement.textContent,
        event.currentIndex
      );
      copyArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex,
        event.previousIndex
      );
    }
  }

  saveFile() {
    var blob = new Blob([this.code], { type: "text/plain" });
    saveAs(blob, "prueba.guat");
  }
}
