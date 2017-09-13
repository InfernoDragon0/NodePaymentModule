//retrieve all transactions
var request = require('request');
module.exports.retrieveTransactions = retrieveTransactions;

// retrieveSettlements()

var url = 'http://858585d5.ngrok.io/api'
 
var promiseGetToken = getToken();
promiseGetToken.then((value)=>{
    console.log("hahaa"+value)
})

function getToken() {
    return new Promise((resolve, reject) => {

    request.post(url + '/account/token',
        {
            form:
            {
                "primary_key": 'NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=='
            }
        }, function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Transaction Response')
                console.log("stuff is here :"+JSON.stringify(body));
                resolve(body);
            }
            if (response.code >= 400) {
                console.log('Invalid Transaction body')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Post
            }
        });
})
};


function retrieveTransactions() {
    return new Promise((resolve, reject) => {

        request(url + '/transaction', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Transaction details retrieved successfully')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Transaction not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Fetch
            }
        });
    })// close promise
};

// create new transaction
/**
 * @param fk_user_id
 * @param fk_merchant_id
 * @param fk_branch_id
 * @param {*string} braintree_transaction_id
 * @param transaction_amount
 * @param transaction_type
 */

module.exports.createTransaction = createTransaction;

function createTransaction(fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount, transaction_type) {
    request.post(url + '/transaction',
        {
            form:
            {
                "fk_user_id": fk_user_id,
                "fk_merchant_id": fk_merchant_id,
                "fk_branch_id": fk_branch_id,
                "braintree_transaction_id": braintree_transaction_id,
                "transaction_amount": transaction_amount,
                "transaction_type": transaction_type
            }
        }, function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Transaction Response')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid Transaction body')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Post
            }
        });
};

//retrieve transaction with an id

module.exports.retrieveIdTransaction = retrieveIdTransaction;

function retrieveIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {

        request(url + '/transaction/{' + transaction_id + '}', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Transaction record retrieved successfully')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid ID supplied')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Transaction not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');
            }
        });
    })//close promise
};

// delete transaction with id

module.exports.deleteIdTransaction = deleteIdTransaction;

function deleteIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {

        request(url + 'delete/transaction/{' + transaction_id + '}', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Successfully deleted Transaction')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid ID supplied')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Transaction not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');
            }
        });
    })//close promise
};

// retrieve all settlement

module.exports.retrieveSettlements = retrieveSettlements;

function retrieveSettlements() {
    return new Promise((resolve, reject) => {

        request(url + 'get/settlement', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Settlement details retrieved successfully')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Settlement not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Fetch
            }
        });
    })//close promise
};

// insert new settlement
/**
 * @param fk_transaction_id
 * @param settlement_amount
 */

module.exports.insertSettlement = insertSettlement;

function insertSettlement(fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount) {
    request.post(url + 'post/settlement',
        {
            form:
            {
                "fk_merchant_id": fk_merchant_id,
                "fk_branch_id": fk_branch_id,
                "fk_transaction_id": fk_transaction_id,
                "settlement_amount": settlement_amount
            }
        }, function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Settlement Response')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid Settlement body')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Post
            }
        });
};

// retrieve settlement with an id

module.exports.retrieveIdSettlement = retrieveIdSettlement;

function retrieveIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {

        request(url + 'get/settlement/{' + settlement_id + '}', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Settlement details retrieved successfully')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Settlement not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Fetch
            }
        });
    })// close promise
};

// update settlement with an id // used post

module.exports.updateIdSettlement = updateIdSettlement;

function updateIdSettlement(settlement_id, fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount) {
    return new Promise((resolve, reject) => {
        request.post(url + 'put/settlement/{' + settlement_id + '}',
            {
                form:
                {
                    "fk_merchant_id": fk_merchant_id,
                    "fk_branch_id": fk_branch_id,
                    "fk_transaction_id": fk_transaction_id,
                    "settlement_amount": settlement_amount
                }
            }, function (error, response, body) {
                if (response.code >= 200 <= 299) {
                    console.log('Updated settlement')
                    resolve(JSON.parse(body));
                }
                if (response.code >= 400) {
                    console.log('Invalid Settlement body')
                    resolve(JSON.parse(body));
                }
                else {
                    console.log('error:', error);
                    resolve('0');// DataType: Failed to Update
                }
            });
    })// close promise
};

// delete settlement with id

module.exports.deleteIdSettlement = deleteIdSettlement;

function deleteIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {

        request(url + 'delete/settlement/{' + settlement_id + '}', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Successfully deleted Settlement')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid ID supplied')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Settlement not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');
            }
        });
    })//close promise
};

// for accounting
//can't be used

// module.exports.retrieveMerchantTransaction = retrieveMerchantTransaction;

// function retrieveMerchantTransaction(fk_merchant_id) {
//     return new Promise((resolve, reject) => {

//         request(url + 'api/Transaction/fk_merchant_id%3A' + transaction_id, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//             resolve(JSON.parse(body));
//         });
//     })
// };

// for accounting
// can't be used

// module.exports.retrieveBranchTransaction = retrieveBranchTransaction;

// function retrieveBranchTransaction(fk_branch_id) {
//     return new Promise((resolve, reject) => {

//         request(url + 'api/Transaction/fk_branch_id%3A' + transaction_id, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//             resolve(JSON.parse(body));
//         });
//     })
// };

// modify transaction
// can't be used

// module.exports.modifyTransaction = modifyTransaction;

// function modifyTransaction(transaction_id, transaction_type) {
//     request.post(url + 'api/Transaction/transaction_id%3A',
//         {
//             form:
//             {
//                 "transaction_type": transaction_type
//             }
//         }, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//         });
// };

//confirm settlement

module.exports.confirmSettlement = confirmSettlement;

function confirmSettlement(settlement_id, transaction_complete) {
    request.post(url + 'api/Settlement/settlement_id%3A' + settlement_id,
        {
            form:
            {
                "transaction_complete": transaction_complete,
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

// retrieve settlement with a transaction id
//can't be used

// module.exports.retrieveTransactionIdSettlement = retrieveTransactionIdSettlement;

// function retrieveTransactionIdSettlement(fk_transaction_id) {
//     return new Promise((resolve, reject) => {

//         request(url + 'api/Settlement/fk_transaction_id%3A' +fk_transaction_id, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//             resolve(JSON.parse(body));
//         });
//     })
// };
