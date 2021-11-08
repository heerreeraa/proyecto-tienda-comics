let db;
let MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb+srv://admin:1234@clusteranimesf.c7mrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err, client) {
    if (err !== undefined) {
        console.log(err);
    } else {
        app.locals.db = client.db('tienda');
    }
});