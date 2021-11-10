const express = require("express");
const mongodb = require("mongodb");
const clientes = require("./routes/backclientes");
const productos = require("./routes/backproductos");

let app = express();
app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/clientes", clientes);
app.use("/productos", productos);

let MongoClient = mongodb.MongoClient;
MongoClient.connect("mongodb+srv://admin:1234@clusteranimesf.c7mrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function (err, client) {
    if (err !== undefined) {
        console.log(err);
    } else {
        app.locals.db = client.db("tienda");
    }
});

