//please use main.js only for app.x so that it is cleaner
/**
 * Split the modules into parts, for node sided JS please put in 
 * nodemodjs and use module.exports to #include functions here
 * 
 * For client sided JS please put in js folder
 * 
 * Remember, this is an API so calls should not rely too much on html
 */

var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
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
app.use(session({
  secret: 'whatsecretshallweuse kitten',//session secret to sign sessions
  resave: true, //force save
  saveUninitialized: true,
  /*cookie: { secure: true }*/})); //secure needs HTTPS, cookies will not be stored if running from HTTP with this option
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

app.get('/', function(req, res) { //base page
    res.render(path.join(__dirname + '/Home.html'));        
});

/**
 * on start at localhost:3000/pay?amount=10.00 generate the token
 * Requires Bot to send the query via POST
 * 
 * API Description: 
 * This is the credit card request function
 * 
 * amount: the amount to pay, 1 = $1.00
 * customer: the token from the customer
 * To use: send a request to localhost:3000/pay?amount=(amount)&customer=(token)
 * Example Request: /pay?amount=300.00
 */
app.get('/pay', function(req, res) { //change to app.post once debug finish
  if(!req.query.amount || req.query.amount < 0.01 || !req.query.customer) { //change to req.body if POST
        res.send("<p>Please use localhost:3000/pay?amount=0.01&customer=someid or more</p>");
        return;
      }
    var sess = req.session;
    
    cvars.gateway.clientToken.generate({customerId: req.query.customer}, function (err, response) {
      console.log(response.clientToken);      
      sess.customer = req.query.customer;
       console.log("customer is " + sess.customer);
      res.render(path.join(__dirname + '/index.html'),
    {
      clientoken : response.clientToken,
      amount: req.query.amount
    });
  });
});

/**
 * processpayment handler, customer.chargeCard for details
 */
app.post('/processpayment', function(req, res) {
  if(!req.body.amount || !req.body.nonce || !req.session.customer) {
      res.send("<p>Please provide amount, nonce and customer token</p>");
      return;
  }
  customer.chargeCard(req.body.amount,req.body.nonce,req.session.customer,res);
});

/**
 * create customer handler, customer.createCustomer for details
 */
app.get("/create/customer", function(req, res) {
  if(!req.query.clientid) {
      res.send("<p>Please provide clientid</p>");
      return;
  }
  customer.createCustomer(req.query.clientid,res);
});

/**
 * handles 404 errors here
 * 
 * note that this has to be the last app.x function
 */
app.use(function (req, res, next) {
  res.status(404).send("You may not view this page. Please use localhost:3000/pay")
});