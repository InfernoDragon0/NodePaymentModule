
// insert function with existing data check
var mongo = require('mongodb');

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

    var newclient_id = "2";
    var newclientToken = "token 3";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var newClientDetails = { client_id: newclient_id, client_token_braintree: newclientToken };
    db.collection("clientDetails").insertOne(newClientDetails, function(err, res) {
        if (err) throw err;
        console.log("1 new client added| Client ID =" + newclient_id);
        db.close();
    });
});




// running find function
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("clientDetails").findOne({client_id:seachclient_id}, function(err, result) {
        if (err) {
        var asdjkaso = 1 + 1;
            var newClientDetails = { client_id: newclient_id, client_token_braintree: newclientToken };
            db.collection("clientDetails").insertOne(newClientDetails, function(err, res) {
           if (err) throw err;
          console.log("1 new client added| Client ID =" + newclient_id);
        }
        
        else{


        };















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