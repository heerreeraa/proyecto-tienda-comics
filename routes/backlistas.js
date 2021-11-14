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
  let nombreCliente = request.body.Nombre;
  // console.log(nombreCliente);
  // BUSCAR CLIENTES POR NOMBRES EN CLIENTES
  db.collection("clientes")
    .find({ Nombre: nombreCliente })
    .toArray(function (err, datos) {
      if (err != undefined) {
        // console.log(err);
        response.send({ mensaje: "error: " + err });
      } else {
        let dniventa = datos[0].DNI;
        // console.log(dniventa);
        // BUSCAR DNI EN VENTAS
        db.collection("ventas")
          .find({ DNI: dniventa })
          .toArray(function (err, vent) {
            if (err != undefined) {
              // console.log(err);
              response.send({ mensaje: "error: " + err });
            } else {
              if (vent.length === 0) {
                response.send(
                  "El cliente seleccionado no ha realizado ninguna venta (aún ;)"
                );
              } else {
                // console.log(vent);
                response.send(vent);
              }
            }
          });
      }
    });
});
module.exports = router;

// router.get("/contadorProductos", function (request, response) {
//   let db = request.app.locals.db;
//   let arrayProductos = [];
//   db.collection("productos")
//     .find()
//     .toArray(function (err, datos) {
//       if (err != undefined) {
//         // console.log(err);
//       } else {
//         db.collection("contador").insertOne();
//         for (i = 0; i < datos.length; i++) {
//           const nombreProducto = datos[i].Nombre;
//           arrayProductos.push(nombreProducto);
//           for (i = 0; i < arrayProductos.length; i++) {}
//         }

//         console.log({ arrayProductos });
//         // console.log(arrayProductos);
//       }
//     });
// });
module.exports = router;
