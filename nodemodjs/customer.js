/**
 * node JS file for customer related stuff
 */
const cvars = require("./commonvariables.js");

module.exports.chargeCard = chargeCard;
module.exports.findCustomer = findCustomer;
module.exports.createCustomer = createCustomer;

/**
 * API Description: 
 * This is process payment method for single card charges
 * 
 * amount: the amount to pay, 1 = $1.00
 * nonce: the card token to be charged
 * To use: send a request to localhost:3000/processpayment via POST
 * Example Request: /processpayment + POSTDATA{ amount: 50.00, nonce: "x" }
 * 
 * @param {*double} amount 
 * @param {*string} nonce 
 * @param {*var} res 
 */
function chargeCard (amount,nonce, res) {
    cvars.gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
            submitForSettlement: true //must submit for settlement to process payment, can set to false to settle later
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
 * We do not need to store customer details on braintree as MongoDB will store the customer details already
 * 
 * Call this upon Bot receiving a new account creation
 * When calling this more than once, the API will check if there is an existing
 * customerToken. If there is, the returned customer token will be ignored.
 * 
 * Braintree side will store the client's name as clientID
 * 
 * @param {*string} clientID the client's ID to link with the customertoken
 * @param {*var} res the res
 */
function createCustomer(clientID,res) {
    cvars.gateway.customer.create({firstName: clientID }, function (err, result) {
        if (!err) {
            if (result.success) {
                res.send("<p>Customer Token is: " + result.customer.id + "</p><p> Created for client ID " + clientID + "</p>");
            }
            else {
                res.send("Error occurred creating customer: " + result);
            }
        //TODO: MongoDB connection to CHECK and update database with clientID and customertoken
        }
        else {
            res.send("API Error occurred: " + err);
        }
    });
}

/**
 * API Description:
 * Creates a customer token for the clientID that is given and stores it in the database
 * We do not need to store customer details on braintree as MongoDB will store the customer details already
 * 
 * Call this upon Bot receiving a new account creation 
 * @param {*string} customerToken the customertoken to retrieve card details from
 */
function findCustomer(customerToken) {
    cvars.gateway.customer.find(customerToken, function(err, customer) {
        if(err==0){
            chargecard(customer);
        }
        else {
            console.log(err)
        };
});
}

