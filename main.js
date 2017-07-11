var braintree = require('braintree');
var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path");
var amount1 = "0";

const express = require('express');
const app  = express();
const http = require('http');
const fs = require('fs');

const port = 3000;

var resp;
var clientoken;

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
 * on start at localhost:3000/ generate the token
 */
app.get('/', function(req, res) {
    resp = res;
    generatetoken();
});

/**
 * listens to @port 3000
 */
app.listen(port);

/**
 * handles 404 errors here
 */
app.use(function (req, res, next) {
  res.status(404).send("This directory does not exist!")
})

/**
 * Generates our client token together with sending the main page
 */
function generatetoken() { 
  gateway.clientToken.generate({}, function (err, response) {
      console.log(response.clientToken);
      resp.render(path.join(__dirname + '/index.html'),
    {
      clientoken : response.clientToken
    });
  });
}

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