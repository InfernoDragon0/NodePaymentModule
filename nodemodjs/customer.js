/**
 * node JS file for customer related stuff
 */
const cvars = require("./commonvariables.js");

module.exports.chargeCard = chargeCard;
module.exports.findCustomer = findCustomer;
module.exports.createCustomer = createCustomer;

function chargeCard (amount,nonce, res) {
      cvars.gateway.transaction.sale({
  amount: amount,
  paymentMethodNonce: nonce,
  options: {
    submitForSettlement: true
  }
}, function (err, result) { //we can send the whole RESULT so that the bot can manually use the json data
    if(!err){
        if (result.success) {
            res.send("Payment of $" + amount + " has been made successfully. Thank you!");
        }
        else if (!result.success && result.transaction) {
            res.send(result.transaction.status + ": " + result.transaction.processorResponseText);
        }
        else {
            res.send(result.errors.deepErrors());
        }
        console.log(result);
    } else {
        res.send(err);
        console.log(err);
    }
  });
}


/**
 * API Description:
 * Creates a customer token for the clientID that is given and stores it in the database
 * @param {*int} clientID the client's ID to link with the customertoken
 */
function createCustomer(clientID) {
    var firstName1
    var lastName1
    var phone1

    gateway.customer.create({
  firstName: firstName1,
  lastName: lastName1,
  phone: phone1
}, function (err, result) {

    if (!err) {
        result.success;
        // true

        result.customer.id;
        // e.g. 494019

        //TODO: MongoDB connection to update database with clientID and customertoken
    }
  
});
}

function findCustomer() {
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

