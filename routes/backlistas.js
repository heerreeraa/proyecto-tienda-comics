const express = require("express");
const router = express.Router();

router.get("/cargarClientes", function (request, response) {
  let db = request.app.locals.db;
  db.collection("clientes")
    .find()
    .toArray(function (err, datos) {
      if (err != undefined) {
        // console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        // console.log(datos);
        response.send(datos);
      }
    });
});

router.post("/mostrarVentas", function (request, response) {
  let db = request.app.locals.db;
  let nombreCliente = request.body.nombre;
  db.collection("clientes")
    .find({Nombre: nombreCliente})
    .toArray(function (err, datos) {
      if (err != undefined) {
        // console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        console.log(datos);
        response.send(datos);
        // let dniCliente = datos.DNI;
      }
    });
});
module.exports = router;
