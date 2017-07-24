


/**
 * node JS file for customer related stuff
 */
const cvars = require("./commonvariables.js");
var BTDatabasefunction = require("./BTCosmosDB");
module.exports.chargeCard = chargeCard;
module.exports.openCustomerPayPage = openCustomerPayPage;
module.exports.createCustomer = createCustomer;

/**
 * API Description: 
 * This is process payment method for single card charges
 * 
 * amount: the amount to pay, 1 = $1.00
 * nonce: the card token to be charged
 * To use: send a request to localhost:3000/processpayment via POST
 * Example Request: /processpayment + POSTDATA{ amount: 50.00, nonce: "x", customertoken: "12345678" }
 * 
 * @param {*double} amount 
 * @param {*string} nonce 
 * @param {*var} res 
 */
function chargeCard (amount,nonce,customertoken,merchantid,res) {
    //use merchantid for database stuff
    cvars.gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
        customerId: customertoken,
        options: {
            storeInVaultOnSuccess: true, //store the card with this customer on successful payment
            submitForSettlement: true //must submit for settlement to process payment, can set to false to settle later within 7 days
        }
    }, function (err, result) { //we can send the whole RESULT so that the bot can manually use the json data
        if(!err){
            if (result.success) {
                res.send("Payment of $" + amount + " has been made successfully. Thank you!");
                //TODO: database stuff
                //database.addTransaction(customerid, merchantid, amountpaid, receiptid(to be exposed)) ***
                
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
                //TODO: database stuff

                //database.addCustomer(customerid, customertoken) *** check if customer token exist, if exist try not to overwrite
                BTDatabasefunction.insertNewCustomer(clientID,result.customer.id);
            }
            else {
                res.send("Error occurred creating customer: " + result);
            }
        
        }
        else {
            res.send("API Error occurred: " + err);
        }
    });
}

/**
 * API Description:
 * Finds a customer, if found, open the page
 * 
 * 
 * 
 * @param {*string} customerToken the customertoken to retrieve card details from
 */
function openCustomerPayPage(sess,amount,customerToken,merchantid,res,page) {
    cvars.gateway.customer.find(customerToken, function(err, customer) {
        if(!err){
            cvars.gateway.clientToken.generate({customerId: customerToken}, function (err, response) {
            console.log(response.clientToken);      
            sess.customer = customerToken;
            console.log("customer is " + sess.customer);
            res.render(page,
            {
            clientoken : response.clientToken,
            amount: amount,
            merchantid: merchantid
            });
        });
    }
        else {
            res.send("<p>Customer ID is not found, please try again. Error: " + err.type + " - " + err.message + "</p>");
            //this should not happen, but if customertoken got removed somehow, this will happen
            //maybe add a new token to this client if this happens
            console.log(err)
            
        };
});
}

