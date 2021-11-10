const express = require("express");
const router = express.Router();

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
