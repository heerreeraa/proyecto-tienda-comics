const express = require("express");
const mongodb = require("mongodb");
const clientes = require("./routes/backclientes");
const productos = require("./routes/backproductos");
const listas = require("./routes/backlistas");

let app = express();
app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/clientes", clientes);
app.use("/productos", productos);
app.use("/listas", listas);

let MongoClient = mongodb.MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:1234@clusteranimesf.c7mrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (err, client) {
    if (err !== undefined) {
      console.log("Error al conectarse con Mongo Atlas");
      console.log(err);
      MongoClient.connect("mongodb://127.0.0.1:27017/", function (err, client) {
        if (err !== undefined) {
          console.log("Error al conectarse a la base de datos local");
          console.log(err);
        } else {
          console.log("BASE DE DATOS LOCAL RUNNING");
          app.locals.db = client.db("tienda");
        }
      });
    } else {
      console.log("BASE DE DATOS ATLAS RUNNING");
      app.locals.db = client.db("tienda");
    }
  }
);
