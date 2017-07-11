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
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/img')));

/**
 * listens to @port 3000
 */
app.listen(port);

/**
 * on start at localhost:3000/pay/10.00 generate the token
 * we need to make this method into POST to prevent editting amount
 * 
 * API Description: 
 * This is the credit card request function
 * 
 * amount: the amount to pay, 1 = $1.00
 * To use: send a request to localhost:3000/pay/(amount)
 * Example Request: /pay/300.00
 */
app.get('/pay', function(req, res) {
  if(!req.query.amount || req.query.amount < 0.01) {
        res.send("<p>Please use localhost:3000/pay?amount=0.01 or more</p>");
        return;
      }

    gateway.clientToken.generate({}, function (err, response) {
      console.log(response.clientToken);      

      res.render(path.join(__dirname + '/index.html'),
    {
      clientoken : response.clientToken,
      amount: req.query.amount
    });
  });
});

/**
 * handles 404 errors here
 * 
 * note that this has to be the last app.x function
 */
app.use(function (req, res, next) {
  res.status(404).send("You may not view this page. Please use localhost:3000/pay")
})

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