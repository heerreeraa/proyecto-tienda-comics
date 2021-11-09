const express = require("express");
const router = express.Router();

// INSERTAR PRODUCTOS -->
router.post("/", function (req, res) {
  let variablenombre = req.body.nombre;
  let variableprecio = req.body.precio;
  let db = req.app.locals.db;

  db.collection("productos").insertOne(
    {
      Nombre: variablenombre,
      Precio: variableprecio,
    },
    function (err, respuesta) {
      if (err !== undefined) {
        console.log(err), res.send({ mensaje: "Ha habido un error. " + err });
      } else {
        console.log(respuesta);
        console.log("Introducido correctamente");
      }
    }
  );
});
// <-- INSERTAR PRODUCTOS

// MOSTRAR PRODUCTOS -->
router.get("/", function (request, response) {
  let db = request.app.locals.db;
  db.collection("productos")
    .find()
    .toArray(function (err, datos) {
      if (err != undefined) {
        console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        console.log(datos);
        response.send(datos);
      }
    });
});
// <-- MOSTRAR PRODUCTOS

// MODAL DATOS DEL PRODUCTO CLICKADO  -->
router.put("/buscarNombre", function (request, response) {
  let variablenombre = request.body.nombre;
  let db = request.app.locals.db;

  db.collection("productos")
    .find({ Nombre: variablenombre })
    .toArray(function (err, datos) {
      if (err != undefined) {
        console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        console.log(datos);
        response.send(datos);
      }
    });
});
// <-- MODAL DATOS DEL PRODUCTO CLICKADO

module.exports = router;
