var braintree = require('braintree'); //braintree payment gateway
var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
//var amount1 = "0"; //not yet

const express = require('express'); //express is good
const app  = express();
//const http = require('http'); //http stuff, not needed yet
//const fs = require('fs'); //filesystem, not needed yet
const port = 3000;

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "hczwym8pfvhkb6gm",
  publicKey: "ymkd4bvhhwrg48fz",
  privateKey: "0c913707bb92caa67f77b31dca2fcf4a"
});

/**
 * uses ejs engine to eval HTML files (to use <%= %> variables)
 */
app.engine('html', require('ejs').renderFile);

/**
 * evals js/css/img folders for JS/CSS/image files
 */
app.use(express.static('js'));
app.use(express.static('css'));
app.use(express.static('img'));

/**
 * on start at localhost:3000/pay/10.00 generate the token
 * we need to make this method into POST to prevent editting amount
 */
app.get('/pay/:amount', function(req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      console.log(response.clientToken);
      res.render(path.join(__dirname + '/index.html'),
    {
      clientoken : response.clientToken,
      amount: req.params['amount']
    });
  });
});

/**
 * listens to @port 3000
 */
app.listen(port);

/**
 * handles 404 errors here
 */
app.use(function (req, res, next) {
  res.status(404).send("You may not view this page.")
})

/**
 * Generates our client token together with sending the main page
 */

/**
 * not used yet, moving these to nodemodjs to be separate JS files, easier to maintain
 */
function getnonce() {
    app.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
  chargecard(nonceFromTheClient);
});
}
function chargecard (nonceFromTheClient){
gateway.transaction.sale({
  amount: "10.00",
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