const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
  //Aki pillas variables
  let variablenombre = req.body.nombre;
  let variableapellido = req.body.apellido;
  let variabledni = req.body.dni;
  let variabletel = req.body.tel;
  let db = req.app.locals.db;

  //Aki haces la sentencia a la base de datos
  db.collection("clientes").insertOne(
    {
      DNI: variabledni,
      Nombre: variablenombre,
      Apellido: variableapellido,
      Telefono: variabletel,
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
  db.collection("clientes")
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
