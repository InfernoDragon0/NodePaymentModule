/**
 * node JS file for customer related stuff
 */
const cvars = require("./commonvariables.js");

module.exports.chargeCard = chargeCard;
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

