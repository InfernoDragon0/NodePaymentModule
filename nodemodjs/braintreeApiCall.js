

var cvars = require('./commonvariables.js')

module.exports.btSearch = btSearch;

// search transactions

function btSearch(btTransactionId) {
    return new Promise((resolve, reject) => {
        var stream = cvars.gateway.transaction.search(function (search) {
            search.id().is(btTransactionId);
        }, function (err, response) {
            response.each(function (err, transaction) {
                resolve(transaction);
            });
        });
    }) // close promise
};

module.exports.btRefund = btRefund;

// refund entire amount with bt

function btRefund(btTransactionId) {
    return new Promise((resolve, reject) => {
        cvars.gateway.transaction.refund(btTransactionId, function (err, result) {
            if (err) {
                // console.log(err)
                resolve(err);
            } else {
                // console.log(result)
                resolve(result);
            }
        });
    }) // close promise
};

// refund partial amount with bt **

function btPartialRefund(btTransactionId, refundAmt) {
    // return new Promise((resolve, reject) => {
        cvars.gateway.transaction.refund(btTransactionId, refundAmt, function (err, result) {
            if (err) {
                // console.log(err)
                resolve(err);
            } else {
                // console.log(result)
                resolve(result);
            }
        });
    // }) // close promise
};
