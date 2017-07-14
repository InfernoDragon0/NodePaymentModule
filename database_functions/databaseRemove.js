
//to remove a single client from data base
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

    // client id to be deleted to be in the var
    var dele_client_id = "10";


    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //  var delete_client_id = { client_id: dele_client_id };

    db.collection("clientDetails").removeOne({client_id:dele_client_id}, function(err, obj) {
        if (err) throw err;
        console.log("1 Client removed from database");
        console.log("Client ID : "+dele_client_id);
        db.close();
    });
    });
