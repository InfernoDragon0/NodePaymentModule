var mongo = require('mongodb');



//const http = require('http');
//const fs = require('fs');
//const hostname = '127.0.0.1';
//const port = 3000;

//fs.readFile('Home.html',  (err,html) => {
//	if(err){
//		throw err;
//	}
//	const server = http.createServer((req,res) => {
//	 	res.statusCode = 200;
//	 	res.setHeader('Content-type','text/html');
//	 	res.write(html);
//	 	res.end();
//	});
//
//	server.listen(port, hostname, () => {
//		console.log('Server started on port ' +port);
//	});
//});



// insert new client data into mongoDB
function insertDB(){
    // new client id with new token to be here
    var newclient_id = "5";
    var newclientToken = "432141dsadsa341fdsfdsfsdfsd3431";

    //connect to Mlab / Mongodb Server
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";


    //codes to insert client data according to the variables above
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var newClientDetails = { client_id: newclient_id, client_token_braintree: newclientToken };
    db.collection("clientDetails").insertOne(newClientDetails, function(err, res) {
        if (err) throw err;
        console.log("1 new client added| Client ID =" + newclient_id);
        db.close();
    });
    });

};

// find not wokring
//seach existing data into mongoDB
function findDB(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

    // search client id
    var seachclient_id = "1";


    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
  
    db.collection("clientDetails").find({client_id:seachclient_id}).pretty();
        console.log(result);
        db.close();
    });

};
//dele not working
// delete client data into mongoDB
function deleteDB(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";

    // client id to be deleted to be in the var
    var dele_client_id = "2";


    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
  //  var delete_client_id = { client_id: dele_client_id };

    db.collection("customers").removeOne({client_id:dele_client_id}, function(err, obj) {
        if (err) throw err;
        console.log("1 client removed from database : client id = "+dele_client_id);
        db.close();
    });
    });

};

//update data base test not in use for final product
function updateDB(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://test:test@ds147842.mlab.com:47842/jedbprototype";


    var client_id1 = "1";
    var clientToken = "432141341fdsfdsfsdfsd3431";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { client_id: client_id1 };
    var newvalues = { client_id: client_id1, client_token_braintree: clientToken };
    db.collection("clientDetails").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 record updated");
        db.close();
    });
    });

};




