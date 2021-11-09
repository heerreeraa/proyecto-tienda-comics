const express = require("express");
const router = express.Router();

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
module.exports = router;
