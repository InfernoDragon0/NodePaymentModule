//to update database , according to client ID to change token id
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";


var client_id1 = "1";
var newclientToken = "token 0";
var myquery = { client_id: client_id1 };
var newvalues = { client_id: client_id1, client_token_braintree: newclientToken };
//MongoClient.connect(url, function (err, db) {
//    if (err) throw err;
//    
//    db.collection("clientDetails").updateOne(myquery, newvalues, function (err, res) {
//        if (err) throw err;
//        console.log("1 record updated");
//        db.close();
//    });
//});


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("clientDetails").findOne({ client_id: client_id1 }, function (err1, result) {
        console.log("Attempthing to pdating Client ID : " + client_id1);
        console.log("Searching Client ID : " + client_id1);
        if (result == null) {
            console.log("Client ID :" + client_id1 + " does not existing, please add Client into database first");
            db.close();
        } else {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                db.collection("clientDetails").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("1 record updated");
                    console.log("---Updates---");
                    console.log("Updated Client ID : "+client_id1);
                    console.log("Update Client Token : "+newclientToken);
                    db.close();
                });
            });
        };


        db.close();
    });
});