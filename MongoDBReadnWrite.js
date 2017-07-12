var mongo = require('mongodb');
var mysql = require('mysql');


const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('Home.html',  (err,html) => {
	if(err){
		throw err;
	}
	const server = http.createServer((req,res) => {
	 	res.statusCode = 200;
	 	res.setHeader('Content-type','text/html');
	 	res.write(html);
	 	res.end();
	});

	server.listen(port, hostname, () => {
		console.log('Server started on port ' +port);
	});
});






function updateDB(){

    var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/jungleElementsDB";


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




