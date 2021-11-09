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

router.put("/buscarDni", function (request, response) {
  let variabledni = request.body.dni;
  let db = request.app.locals.db;
  db.collection("clientes")
    .find({ DNI: variabledni })
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
router.put("/", function (request, response) {
  let variabledni = request.body.dni;
  let variablenombre = request.body.nombre;
  let variableapellido = request.body.apellido;
  let variabletel = request.body.tel;
  let db = request.app.locals.db;
  var newvalues = {
    $set: {
      Nombre: variablenombre,
      Apellido: variableapellido,
      Telefono: variabletel,
    },
  };
  db.collection("clientes").updateOne(
    {
      DNI: variabledni,
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
router.delete("/", function (request, response) {
  let variabledni = request.body.dni;
  let variablenombre = request.body.nombre;
  let variableapellido = request.body.apellido;
  let variabletel = request.body.tel;
  let db = request.app.locals.db;

  db.collection("clientes").deleteOne(
    {
      DNI: variabledni,
    },
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
