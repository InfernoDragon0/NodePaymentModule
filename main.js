var braintree = require('braintree');
var amount1 = "0";

const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

var resp;
// start local host
fs.readFile('testIndex.html',  (err,html) => {
	if(err){
		throw err;
	}
	const server = http.createServer((req,res) => {
        resp = res;
	 	res.statusCode = 200;
	 	res.setHeader('Content-type','text/html');
	 	var token = generatetoken();
         res.write(html);
         console.log(token);
	 	res.end();
	});

	server.listen(port, hostname, () => {
		console.log('Server started on port ' +port);
	});
});


var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "hczwym8pfvhkb6gm",
  publicKey: "ymkd4bvhhwrg48fz",
  privateKey: "0c913707bb92caa67f77b31dca2fcf4a"
});
function generatetoken (){
   
  gateway.clientToken.generate({}, function (err, response) {
    console.log(response.clientToken);

});
}
function getnonce(){
    app.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
  chargecard(nonceFromTheClient);
});
}
function chargecard (nonceFromTheClient){
gateway.transaction.sale({
  amount: amount1,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
    if(err==0){
        console.log(result);
    }else{
        console.log(err);
    }
});
}
