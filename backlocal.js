const express = require("express");
const mongodb = require("mongodb");
const clientes = require("./routes/backclientes");

let app = express();
app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/clientes", clientes);

let MongoClient = mongodb.MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017/", function (err, client) {
  if (err !== undefined) {
    console.log(err);
  } else {
    app.locals.db = client.db("tienda");
  }
});
