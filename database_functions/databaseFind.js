var mongo = require('mongodb');

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

    // search client id var ( to be changed in final product)
    var seachclient_id = "101";

    // running find function
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("clientDetails").findOne({client_id:seachclient_id}, function(err, result) {
        if (err) throw err;
        console.log("searching client id:"+seachclient_id);
            //braking up received string into client_id and client_token
        var retrieved_client_id = result["client_id"];
        var retrieved_client_token = result["client_token_braintree"];
            //for testing purpose
            console.log("---");
            console.log("---");
            console.log("return data from server");
            console.log("Client ID :" + retrieved_client_id);
            console.log("Corresponding token :" + retrieved_client_token);
        db.close();
      });
    });

