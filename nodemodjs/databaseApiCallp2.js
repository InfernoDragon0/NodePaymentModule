const request = require('superagent');
const databaseConfig = require("./config/databaseConfig.js");

const url = `${databaseConfig.url}`
const primaryKey =  `${databaseConfig.primary_key}`

function createToken() {
    return new Promise((resolve, reject) => {
        request.post(url + '/account/token')
            .set('Content-Type', 'application/json')
            .send({ "primary_key": primaryKey })
            .end((err, res) => {
                if (res.statusCode >= 200 && res.statusCode <= 299) {
                    console.log('\n Retrieve Token: Successful\n')
                    resolve(res.body.token);
                }
                else if (res.statusCode == 401) {
                    console.log('\n Retrieve Token: Unauthorized\n')
                    resolve(res);
                }
                else {
                    console.log('\n Retrieve Token: Could not establish proper connection with database\n')
                    resolve(-1)
                }
            })
    });
}

// /*TEST:*/ createToken(); //

// Find all transaction records
// Step 1: Connect to JE database with token
// Step 2: Retrieve all transactions from JE database

// /*TEST:*/ retrieveTransactions(); //

module.exports.retrieveTransactions = retrieveTransactions;

function retrieveTransactions() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retrieve Transaction: Transaction details retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retrieve Transaction: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retrieve Transaction: Transaction not found\n')
                            resolve(res);
                        }else {
                            console.log('Retrieve Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Add transaction record
// Step 1: retrieve token
// Step 2: insert transaction into database

//   "fk_user_id": 0,
//   "fk_merchant_id": 0,
//   "fk_branch_id": 0,
//   "braintree_transaction_id": "string",
//   "transaction_amount": 0,
//   "transaction_type": 0

// /*TEST:*/ createTransaction(1, 10, 123, 'work', 50.00, 2); //

module.exports.createTransaction = createTransaction;

function createTransaction(fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount, transaction_type) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "braintree_transaction_id": braintree_transaction_id, // string
                        "transaction_amount": transaction_amount, // integer
                        "transaction_type": transaction_type // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Find transaction records by ID
// Step 1: Retrieve token
// Step 2: Retrieve transaction details from database by id

// /*TEST:*/ retrieveIdTransaction('8c31804e-2807-4b50-7795-08d4ffd71ce7'); /

module.exports.retrieveIdTransaction = retrieveIdTransaction;
    
function retrieveIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/transaction/' + transaction_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retreive ID Transaction: Transaction record retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retreive ID Transaction: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retreive ID Transaction: Transaction not found\n')
                            resolve(res);
                        }else{
                            console.log('Retreive ID Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Delete transaction record by ID
// Step 1: Retrieve token
// Step 2: Delete transaction from database by id

// /*TEST:*/ deleteIdTransaction('145a54d4-204b-4769-94ae-08d4fa64f6e5'); /

module.exports.deleteIdTransaction = deleteIdTransaction;

function deleteIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.delete(url + '/transaction/' + transaction_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Delete ID Transaction: Successfully deleted Transaction\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Delete ID Transaction: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Delete ID Transaction: Transaction not found\n')
                            resolve(res);
                        }else{
                            console.log('Delete ID Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Find all settlements records
// Step 1: Retrieve token
// Step 2: Retrieve settlement records from JE database

// /*TEST:*/ retrieveSettlements(); /

module.exports.retrieveSettlements = retrieveSettlements;

function retrieveSettlements() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/settlement')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retrieve Settlements: Settlement details retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retrieve Settlements: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retrieve Settlements: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Retrieve Settlements: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Add settlement record
// Step 1: Retrieve token
// Step 2: Add settlement records into JE database

//   "fk_merchant_id": 0,
//   "fk_branch_id": 0,
//   "fk_transaction_id": 0,
//   "settlement_amount": 0


// /*TEST:*/ createSettlement(2, 2, "afsdfjsfjfofjsd", 28.75); 

module.exports.createSettlement = createSettlement;

function createSettlement(fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/settlement')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .send({
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "fk_transaction_id": fk_transaction_id, // integer
                        "settlement_amount": settlement_amount // integer
                    })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Settlement: Settlement Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Settlement: Invalid Settlement body\n')
                            resolve(res);
                        }else{
                            resolve(-1)
                        }
                    })
        })
    });
}

// Find settlement records by ID
// Step 1: Retrieve token
// Step 2: Retrieve settlement records from JE database by id

// /*TEST:*/ createToken();

module.exports.retrieveIdSettlement = retrieveIdSettlement;

function retrieveIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/settlement/' + settlement_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retrieve ID Settlement: Settlement record retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retrieve ID Settlement: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retrieve ID Settlement: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Retrieve ID Settlement: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Delete settlement record by ID
// Step 1: Retrieve token
// Step 2: Delete settlement record from JE database by id

// /*TEST:*/ createToken();

module.exports.deleteIdSettlement = deleteIdSettlement;

function deleteIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.delete(url + '/settlement/' + settlement_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Delete ID Settlement: Successfully deleted Settlement\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Delete ID Settlement: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Delete ID Settlement: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Delete ID Settlement: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Update a transaction to completed status
// Step 1: Retrieve token
// Step 2: update confirmation to JE database by transaction id

/*
var form = {
    "transaction_id": 0
}
*/

// /*TEST:*/ createToken();

module.exports.confirmTransaction = confirmTransaction;

function confirmTransaction(transaction_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.put(url + '/transaction/completed')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .send({ "transaction_id": transaction_id }) // "settlement_id" : `${settlement_id}`
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Confirm Transaction: Updated transaction\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Confirm Transaction: Invalid transaction\n')
                            resolve(res);
                        }else{
                            console.log('Confirm Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Find all merchants
// Step 1: Retrieve token
// Step 2: Retrieve merchant records from JE database

// /*TEST:*/ retrieveMerchants(); /

module.exports.retrieveMerchants = retrieveMerchants;

function retrieveMerchants() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/merchant')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retrieve Merchants: Merchant records retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retrieve Merchants: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retrieve Merchants: Merchant not found\n')
                            resolve(res);
                        }else{
                            console.log('Retrieve Merchants: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Create merchant records in JE database
// Step 1: Retrieve token
// Step 2: Create merchant records


    // "merchant_name": "string",
    // "company_name": "string",
    // "first_name": "string",
    // "last_name": "string",
    // "email": "string",
    // "merchant_url": "string",
    // "mobile_number": "string",
    // "password": "string"


// /*TEST:*/ createMerchant(merchant_name, company_name, first_name, last_name, email, merchant_url, mobile_number, password); /

module.exports.createMerchant = createMerchant;

function createMerchant(merchant_name, company_name, first_name, last_name, email, merchant_url, mobile_number, password) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/merchant')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "merchant_name": merchant_name, // string
                        "company_name": company_name, // string
                        "first_name": first_name, // string
                        "last_name": last_name, // string
                        "email": email, // string
                        "merchant_url": merchant_url, // string
                        "mobile_number": mobile_number, // string
                        "password": password
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Merchant: Merchant account creation succeeded\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Merchant: Invalid Merchant body\n')
                            resolve(res);
                        }else {
                            console.log('Create Merchant: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Retrieve merchant details from JE database by id
// Step 1: Retrieve token
// Step 2: Retrieve merchant details

// /*TEST:*/ retrieveIdMerchant(11); /

module.exports.retrieveIdMerchant = retrieveIdMerchant;

function retrieveIdMerchant(merchantId) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.get(url + '/merchant/' + merchantId)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Merchant record retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: User not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Get All Branch Account
// Step 1: Connect to JE database with token
// Step 2: Retrieve all branch accounts from JE database

// /*TEST:*/ retrieveBranches(); / 

module.exports.retrieveBranches = retrieveBranches;

function retrieveBranches() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                        request.get(url + '/branch')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + value)
                        .end((err, res) => {
                            if (res.statusCode >= 200 && res.statusCode <= 299) {
                                console.log('Retrieve Branches: Merchant’s Branch account retrieve succeeded\n')
                                resolve(res);
                            }
                            else if (res.statusCode == 400) {
                                console.log('Retrieve Branches: Invalid\n')
                                resolve(res);
                            }
                            else if (res.statusCode == 404) {
                                console.log('Retrieve Branches: Branch not found\n')
                                resolve(res);
                            }else {
                                console.log('Retrieve Branches: Could not establish proper connection with database\n')
                                resolve(-1)
                            }
                        })
        })
    });
}

// Create branch records in JE database
// Step 1: Retrieve token
// Step 2: Create branch records

    // "branch_name": "string",
    // "branch_address": "string",
    // "branch_phone": "string",
    // "branch_url": "string",
    // "first_name": "string",
    // "last_name": "string",
    // "email": "string",
    // "mobile_number": "string",
    // "password": "string"
  

// /*TEST:*/ createBranch(branch_name, branch_address, branch_phone, branch_url, first_name, last_name, email, mobile_number, password); /

module.exports.createBranch = createBranch;

function createBranch(branch_name, branch_address, branch_phone, branch_url, first_name, last_name, email, mobile_number, password) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/branch')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "branch_name": branch_name, // string
                        "branch_address": branch_address, // string
                        "branch_phone": branch_phone, // string
                        "branch_url": branch_url, // string
                        "first_name": first_name, // string
                        "last_name": last_name, // string
                        "email": email, // string
                        "mobile_number": mobile_number, // string
                        "password": password // string
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Branch: Merchant’s Branch account creation succeeded\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Branch: Merchant’s Branch account creation failed\n')
                            resolve(res);
                        }else {
                            console.log('Create Branch: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Find branch account by ID
// Step 1: Retrieve token
// Step 2: Retrieve branch account from JE database by id

// /*TEST:*/ retrieveIdBranch(17); /

module.exports.retrieveIdBranch = retrieveIdBranch;

function retrieveIdBranch(branch_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {


                request.get(url + '/branch/' + branch_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Retrieve ID Branch: Branch account retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Retrieve ID Branch: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Retrieve ID Branch: Branch account not found\n')
                            resolve(res);
                        }else{
                            console.log('Retrieve ID Branch: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

// Add transaction record
// Step 1: retrieve token
// Step 2: insert transaction into database

// 1 - Credit Card Payment
// 2 - Credit Card Chargeback
// 3 - Credit Card Refund

// 4 - Wallet Top-Up
// 5 - Walley Payment
// 6 - Wallet Refund

module.exports.createTransactionCreditPayment = createTransactionCreditPayment; // positive amount
module.exports.createTransactionCreditChargeback = createTransactionCreditChargeback; // negative amount
module.exports.createTransactionCreditRefund = createTransactionCreditRefund; // negative amount
module.exports.createTransactionWalletTopup = createTransactionWalletTopup; // positive amount
module.exports.createTransactionWalletPayment = createTransactionWalletPayment; // positive amount
module.exports.createTransactionWalletRefund = createTransactionWalletRefund; // negative amount

function createTransactionCreditPayment(fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "braintree_transaction_id": braintree_transaction_id, // string
                        "transaction_amount": transaction_amount, // integer
                        "transaction_type": 1 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

function createTransactionCreditChargeback(fk_user_id, fk_merchant_id, fk_branch_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "transaction_amount": -transaction_amount, // integer
                        "transaction_type": 2 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

function createTransactionCreditRefund(fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "braintree_transaction_id": braintree_transaction_id, // string
                        "transaction_amount": -transaction_amount, // integer
                        "transaction_type": 3 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

function createTransactionWalletTopup(fk_user_id, braintree_transaction_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "braintree_transaction_id": braintree_transaction_id, // string
                        "transaction_amount": transaction_amount, // integer
                        "transaction_type": 4 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

function createTransactionWalletPayment(fk_user_id, fk_merchant_id, fk_branch_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "transaction_amount": transaction_amount, // integer
                        "transaction_type": 5// integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

function createTransactionWalletRefund(fk_user_id, fk_merchant_id, fk_branch_id, transaction_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value) 
                    .send({
                        "fk_user_id": fk_user_id, // integer
                        "fk_merchant_id": fk_merchant_id, // integer
                        "fk_branch_id": fk_branch_id, // integer
                        "transaction_amount": -transaction_amount, // integer
                        "transaction_type": 6 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Create Transaction: Transaction Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Create Transaction: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Create Transaction: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

/* |||||   ||| /|||||||||\ /|||||||||\  |||    ||| /||||||| ||||||||| */
/* ||||||  ||| |||     |||     |||      |||    ||| |||      |||       */
/* ||| ||| ||| |||     |||     |||      |||    ||| |||||||| ||||||||| */
/* |||  |||||| |||     |||     |||      |||    |||      ||| |||       */
/* |||    |||| \|||||||||/     |||      \||||||||/ |||||||/ ||||||||| */

/////////////////////////////////////////////////////////////////////////////////////

// Update a settlement record 

    // "fk_merchant_id": 0,
    // "fk_branch_id": 0,
    // "fk_transaction_id": 0,
    // "settlement_amount": 0

//   /*TEST:*/ updateIdSettlement(settlement_id, fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount);

// module.exports.updateIdSettlement = updateIdSettlement;

function updateIdSettlement(settlement_id, fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
                request.put(url + '/settlement/' + settlement_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + value)
                    .send({
                        "fk_merchant_id": 0, // integer
                        "fk_branch_id": 0, // integer
                        "fk_transaction_id": 0, // integer
                        "settlement_amount": 0 // integer
                      })
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Update ID Settlement: Updated settlement\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Update ID Settlement: Invalid Settlement body\n')
                            resolve(res);
                        }else{
                            console.log('Update ID Settlement: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
        })
    });
}

///////////////////////////////////////////////////////////////////////////////////

// Update settlement to completed status

    // "settlement_id": 0

/*TEST:*/ 

// module.exports.confirmSettlement = confirmSettlement;

// function confirmSettlement(settlement_id) {
//     return new Promise((resolve, reject) => {
//         var promiseCreateToken = createToken();
//         promiseCreateToken.then((value) => {

//                 request.put(url + '/settlement/completed')
//                     .set('Content-Type', 'application/json')
//                     .set('Accept', 'application/json')
//                     .set('Authorization', 'Bearer ' + value)
//                     .send({ "settlement_id": settlement_id }) // integer
//                     .end((err, res) => {
//                         if (res.statusCode >= 200 && res.statusCode <= 299) {
//                             console.log('Updated settlement\n')
//                             resolve(res);
//                         }
//                         else if (res.statusCode == 400) {
//                             console.log('Invalid settlement\n')
//                             resolve(res);
//                         }
//                     })
//         })
//     });
// }