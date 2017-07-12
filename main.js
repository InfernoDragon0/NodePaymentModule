
var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
//var amount1 = "0"; //not yet
const cvars = require("./nodemodjs/commonvariables.js");

const express = require('express'); //express is good
const app  = express();
const customer = require('./nodemodjs/customer.js');
//const http = require('http'); //http stuff, not needed yet
//const fs = require('fs'); //filesystem, not needed yet
const port = 3000;

/**
 * uses ejs engine to eval HTML files (to use <%= %> variables)
 */
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json()); // supporting POST data
app.use(bodyParser.urlencoded({ extended: true })); // supportting POST data

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
 * on start at localhost:3000/pay?amount=10.00 generate the token
 * TODO: we need to make this method into POST to prevent editting amount
 * 
 * API Description: 
 * This is the credit card request function
 * 
 * amount: the amount to pay, 1 = $1.00
 * customer: the token from the customer
 * To use: send a request to localhost:3000/pay?amount=(amount)&customer=(token)
 * Example Request: /pay?amount=300.00
 */
app.get('/pay', function(req, res) {
  if(!req.query.amount || req.query.amount < 0.01) {
        res.send("<p>Please use localhost:3000/pay?amount=0.01 or more</p>");
        return;
      }

    cvars.gateway.clientToken.generate({}, function (err, response) {
      console.log(response.clientToken);      

      res.render(path.join(__dirname + '/index.html'),
    {
      clientoken : response.clientToken,
      amount: req.query.amount
    });
  });
});

app.post('/processpayment', function(req, res) {
  console.log("amount is " + req.body.amount);  
  console.log("nonce is " + req.body.nonce);
  
  
  if(!req.body.amount || !req.body.nonce) {
      res.send("<p>Please provide amount and nonce</p>");
      return;
  }
  customer.chargeCard(req.body.amount,req.body.nonce,res);
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