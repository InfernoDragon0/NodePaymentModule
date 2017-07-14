
// insert function with existing data check
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

var newclient_id = "5";
var newclientToken = "token 6";


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("clientDetails").findOne({ client_id: newclient_id }, function (err1, result) {
        console.log("Adding Client ID : " + newclient_id+" to database.");
        console.log("Searching Client ID : " + newclient_id);
        if (result == null) {
            console.log("No current Client ID : " +newclient_id);
            db.close();
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var newClientDetails = { client_id: newclient_id, client_token_braintree: newclientToken };
                db.collection("clientDetails").insertOne(newClientDetails, function (err, res) {
                    if (err) throw err;
                    console.log("1 new client added| Client ID : " + newclient_id);
                    db.close();
                });
            });

        } else {
            console.log("\\Error// Current Client ID : "+newclient_id+" is already assigned");
        };


        db.close();
    });
});
