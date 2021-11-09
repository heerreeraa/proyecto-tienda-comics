const express = require("express");
const router = express.Router();

// INSERTAR PRODUCTOS -->
router.post("/", function (req, res) {
  let variablenombre = req.body.nombre;
  let variableprecio = req.body.precio;
  let variableimagen = req.body.imagen;
  let db = req.app.locals.db;

  db.collection("productos").insertOne(
    {
      Nombre: variablenombre,
      Precio: variableprecio,
      Imagen: variableimagen,
    },
    function (err, respuesta) {
      if (err !== undefined) {
        console.log(err), res.send({ mensaje: "Ha habido un error. " + err });
      } else {
        // console.log(respuesta);
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

router.put("/", function (request, response) {
  let variablenombre = request.body.nombre;
  let variableprecio = request.body.precio;
  let variableurl = request.body.imagen;
  let db = request.app.locals.db;
  var newvalues = {
    $set: {
      Precio: variableprecio,
      Imagen: variableurl,
    },
  };
  db.collection("productos").updateOne(
    {
      Nombre: variablenombre,
    },
    newvalues,
    function (err, respuesta) {
      if (err !== undefined) {
        console.log(err), res.send({ mensaje: "Ha habido un error. " + err });
      } else {
        console.log(respuesta);
        console.log("Modificado correctamente");
      }
    }
  );
});
module.exports = router;
