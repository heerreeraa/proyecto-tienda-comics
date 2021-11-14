const express = require("express");
const router = express.Router();

// INSERTAR PRODUCTOS -->
router.post("/", function (req, res) {
  let variablenombre = req.body.nombre;
  let variableprecio = req.body.precio;
  let variableimagen = req.body.imagen;
  let variabletipo = req.body.tipo;
  let db = req.app.locals.db;
  console.log("TIPO " + variabletipo);
  db.collection("contador").insertOne(
    {
      Nombre: variablenombre,
      cont: 0
    }
  )
  db.collection("productos").insertOne(
    {
      Nombre: variablenombre,
      Precio: variableprecio,
      Imagen: variableimagen,
      Tipo: variabletipo,
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

// MOSTRAR PRODUCTOS COMICS -->
router.get("/comics", function (request, response) {
  let db = request.app.locals.db;
  db.collection("productos")
    .find({ Tipo: "comics" })
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
// <-- MOSTRAR PRODUCTOS COMICS

// MOSTRAR PRODUCTOS JUEGOS DE MESA -->
router.get("/juegosDeMesa", function (request, response) {
  let db = request.app.locals.db;
  db.collection("productos")
    .find({ Tipo: "juegosMesa" })
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
// <-- MOSTRAR PRODUCTOS JUEGOS DE MESA
// MOSTRAR PRODUCTOS JUEGOS DE CARTAS -->
router.get("/juegosDeCartas", function (request, response) {
  let db = request.app.locals.db;
  db.collection("productos")
    .find({ Tipo: "juegosCartas" })
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
// <-- MOSTRAR PRODUCTOS JUEGOS DE CARTAS
// MOSTRAR PRODUCTOS SNACKS -->
router.get("/snacks", function (request, response) {
  let db = request.app.locals.db;
  db.collection("productos")
    .find({ Tipo: "snacks" })
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
// <-- MOSTRAR PRODUCTOS SNACKS

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
  let variabletipo = request.body.tipo;
  let db = request.app.locals.db;
  var newvalues = {
    $set: {
      Precio: variableprecio,
      Imagen: variableurl,
      Tipo: variabletipo,
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
router.delete("/", function (request, response) {
  let variablenombre = request.body.nombre;

  let db = request.app.locals.db;

  db.collection("productos").deleteOne(
    {
      Nombre: variablenombre,
    },
    function (err, respuesta) {
      if (err !== undefined) {
        console.log(err), res.send({ mensaje: "Ha habido un error. " + err });
      } else {
        console.log(respuesta);
        console.log("Borrado correctamente");
      }
    }
  );
});

// MOSTRAR CLIENTES -->
router.get("/cargarClientes", function (request, response) {
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
// <-- MOSTRAR CLIENTES

// MODAL DATOS DEL PRODUCTO CLICKADO  -->
router.post("/venta", function (request, response) {
  let variablenombre = request.body.nombreCliente;
  let variablearray = request.body.arrayProductos2;
  let db = request.app.locals.db;
  console.log("AKI" + variablearray);
  db.collection("clientes")
    .find({ Nombre: variablenombre })
    .toArray(function (err, datos) {
      if (err != undefined) {
        console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        console.log(datos);
        // response.send(datos);
        let dni = datos[0].DNI;
        db.collection("ventas").insertOne(
          {
            DNI: dni,
            Productos: variablearray,
          },
          function (err, respuesta) {
            if (err !== undefined) {
              console.log(err),
                res.send({ mensaje: "Ha habido un error. " + err });
            } else {
              // console.log(respuesta);
              console.log("Introducido correctamente");
            }
          }
        );
      }
    });
});
// <-- MODAL DATOS DEL PRODUCTO CLICKADO
module.exports = router;
