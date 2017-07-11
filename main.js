var braintree = require('braintree');
var ejs = require('ejs');
var amount1 = "0";

const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

var resp;
var clientoken;
// start local host



http.createServer(function(req,res) {
    console.log("Server running on Port" +port )
  res.writeHead(200, {'Content-Type': 'text/html'});
  //since we are in a request handler function
  //we're using readFile instead of readFileSync
  fs.readFile('testIndex.html', 'utf-8', function(err, content) {
    if (err) {
      res.end('error occurred');
      return;
    }
    generatetoken();  //here you assign temp variable with needed value

    content = content +"fkyou";
    var renderedHtml = ejs.render(content, {clientoken: clientoken});  //get redered HTML code
    res.end(renderedHtml);
  });
}).listen(3000);











var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "hczwym8pfvhkb6gm",
  publicKey: "ymkd4bvhhwrg48fz",
  privateKey: "0c913707bb92caa67f77b31dca2fcf4a"
});
function generatetoken (){
   
  gateway.clientToken.generate({}, function (err, response) {
      clientoken = response.clientToken;
    console.log(clientoken);

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

function createcustomer(){
    var firstName1
    var lastName1
    var phone1

    gateway.customer.create({
  firstName: firstName1,
  lastName: lastName1,
  phone: phone1
}, function (err, result) {
  result.success;
  // true

  result.customer.id;
  // e.g. 494019
});
}

function findcustomer (){
    var theCustomerId
    gateway.customer.find(theCustomerId, function(err, customer) {
        if(err==0){
            chargecard(customer);
        }
        else {
            console.log(err)
        };
});
}


