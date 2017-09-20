const request = require('superagent');

url = 'http://898c16d9.ngrok.io/api'

function createToken() {
    return new Promise((resolve, reject) => {
        
        var primary_key = "NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=="
        request.post(url + '/account/token')
            .set('Content-Type', 'application/json')
            .send({ "primary_key": primary_key })
            .end((err, res) => {
                if (res.statusCode == 200) {
                    console.log('\nSuccessful\n')
                    resolve(res);
                }
                else if (res.statusCode == 401) {
                    console.log('\nUnauthorized\n')
                    resolve(res);
                }
                else {
                    console.log('\nCould not establish proper connection with database\n')
                    resolve(-1)
                }
            })
    });
}

// /*TEST:*/ createToken(); /

// Find all transaction records
// Step 1: Connect to JE database with token
// Step 2: Retrieve all transactions from JE database

// /*TEST:*/ retrieveTransactions(); //

module.exports.retrieveTransactions = retrieveTransactions;

function retrieveTransactions() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Transaction details retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Transaction not found\n')
                            resolve(res);
                        }else {
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish proper connection with database\n')
                resolve(value)
            }
        })
    });
}

// Add transaction record
// Step 1: retrieve token
// Step 2: insert transaction into database

/*
var form = {
    "fk_user_id": 7,
    "fk_merchant_id": 56,
    "fk_branch_id": 1,
    "braintree_transaction_id": 'stringbraintree',
    "transaction_amount": -200,
    "transaction_type": 2
}
*/

// /*TEST:*/ createTransaction(form); /

module.exports.createTransaction = createTransaction;

function createTransaction(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.post(url + '/transaction')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token) 
                    .send(form)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Transaction Response\n')
                            console.log(res.body)
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid Transaction body\n')
                            resolve(res);
                        }else {
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish proper connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/transaction/' + transaction_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Transaction record retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Transaction not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.delete(url + '/transaction/' + transaction_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Successfully deleted Transaction\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Transaction not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/settlement')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Settlement details retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
        })
    });
}

// Add settlement record
// Step 1: Retrieve token
// Step 2: Add settlement records into JE database


var form = {
    "fk_merchant_id": 56,
    "fk_branch_id": 1,
    "fk_transaction_id": '8c31804e-2807-4b50-7795-08d4ffd71ce7',
    "settlement_amount": -200
}


// /*TEST:*/ createSettlement(form); // to be retested

module.exports.createSettlement = createSettlement;

function createSettlement(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.post(url + '/settlement')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(form)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Settlement Response\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid Settlement body\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/settlement/' + settlement_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Settlement record retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.delete(url + '/settlement/' + settlement_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Successfully deleted Settlement\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Settlement not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.put(url + '/transaction/completed')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({ "transaction_id": transaction_id }) // "settlement_id" : `${settlement_id}`
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Updated transaction\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid transaction\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/merchant')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Merchant records retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Merchant not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
        })
    });
}

// Create merchant records in JE database
// Step 1: Retrieve token
// Step 2: Create merchant records


/*
var form = {
  "merchant_name": "caleb inc",
  "company_name": "caleb inc",
  "first_name": "caleb",
  "last_name": "cheong",
  "email": "calebcheong98@gmail.com",
  "merchant_url": "hhtps://www.calbee.com",
  "mobile_number": "67873442",
  "password": "password"
}
*/

// /*TEST:*/ createMerchant(form); /

module.exports.createMerchant = createMerchant;

function createMerchant(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.post(url + '/merchant')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token) // step 1
                    .send(form)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Merchant account creation succeeded\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid Merchant body\n')
                            resolve(res);
                        }else {
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish proper connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/merchant/' + merchantId)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
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
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                        request.get(url + '/branch')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + token)
                        .end((err, res) => {
                            if (res.statusCode >= 200 && res.statusCode <= 299) {
                                console.log('Step 2: Merchant’s Branch account retrieve succeeded\n')
                                resolve(res);
                            }
                            else if (res.statusCode == 400) {
                                console.log('Step 2: Invalid\n')
                                resolve(res);
                            }
                            else if (res.statusCode == 404) {
                                console.log('Step 2: Branch not found\n')
                                resolve(res);
                            }else {
                                console.log('Step 2: Could not establish proper connection with database\n')
                                resolve(-1)
                            }
                        })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish proper connection with database\n')
                resolve(value)
            }
        })
    });
}

// Create branch records in JE database
// Step 1: Retrieve token
// Step 2: Create branch records


/*
var form = {
  "branch_name": "thaddeus 1",
  "branch_address": "pasir ris",
  "branch_phone": "50965898",
  "branch_url": "habibi.com",
  "first_name": "thaddeus",
  "last_name": "tan",
  "email": "thaddeus0905@gmail.com",
  "mobile_number": "68403392",
  "password": "werwerw"
}
*/

// /*TEST:*/ createBranch(form); /

module.exports.createBranch = createBranch;

function createBranch(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.post(url + '/branch')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token) // step 1
                    .send(form)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Merchant’s Branch account creation succeeded\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Merchant’s Branch account creation failed\n')
                            resolve(res);
                        }else {
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish proper connection with database\n')
                resolve(value)
            }
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

            if (value.statusCode == 200) {
                console.log('Step 1: Successful\n')
                var token = value.body.token

                request.get(url + '/branch/' + branch_id)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        if (res.statusCode >= 200 && res.statusCode <= 299) {
                            console.log('Step 2: Branch account retrieved successfully\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 400) {
                            console.log('Step 2: Invalid ID supplied\n')
                            resolve(res);
                        }
                        else if (res.statusCode == 404) {
                            console.log('Step 2: Branch account not found\n')
                            resolve(res);
                        }else{
                            console.log('Step 2: Could not establish proper connection with database\n')
                            resolve(-1)
                        }
                    })
            }
            else if (value.statusCode == 401) {
                console.log('Step 1: Unauthorized\n')
                resolve(value); 
            }
            else {
                console.log('Step 1: Could not establish connection with database\n')
                resolve(value)
            }
        })
    });
}

/* |||||   ||| /|||||||||\ /|||||||||\  |||    ||| /||||||| ||||||||| */
/* ||||||  ||| |||     |||     |||      |||    ||| |||      |||       */
/* ||| ||| ||| |||     |||     |||      |||    ||| |||||||| ||||||||| */
/* |||  |||||| |||     |||     |||      |||    |||      ||| |||       */
/* |||    |||| \|||||||||/     |||      \||||||||/ |||||||/ ||||||||| */

//works but not in use // in case kenneth want primary key out of create token

// var promiseCreateToken = createToken(primary_key);

// promiseCreateToken.then((value)=>{
//     // console.log(value.statusCode)
//     if (value.statusCode == 200){
//     var promiseRetrieveTransactions = retrieveTransactions(value.body.token);
//     promiseRetrieveTransactions.then((value1)=>{
//         res.send(value);
//     })

//     }
//     else if (value.statusCode == 401){
//         res.send("Unauthorized");
//     }
//     else {
//         console.log(err)
//         res.send(err)
//     }

// })

// var primaryKey = "NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=="

// createToken(primaryKey);

// function createToken(primary_key) {
//     return new Promise((resolve, reject) => {

//         request.post(url + '/account/token')
//             .set('Content-Type', 'application/json')
//             .send({ "primary_key": primary_key })
//             .end((err, res) => {
//                 if (res.statusCode == 200) {
//                     console.log('Successful\n')
//                     resolve(res);
//                 }
//                 else if (res.statusCode == 401) {
//                     console.log('Unauthorized\n')
//                     resolve(res);
//                 }
//             })
//     });
// }

//retrieve all transactions

// module.exports.retrieveTransactions = retrieveTransactions;

// function retrieveTransactions(token) {
//     return new Promise((resolve, reject) => {
//       request.get(url + '/transaction')
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json')
//         .set('Authorization', 'Bearer ' + token)
//         .end((err, res) => {
//             if(res.statusCode == 200){
//                 console.log('Transaction details retrieved successfully\n')
//                 resolve(res.body);
//             }
//             else if(res.statusCode = 400){
//                 console.log('Invalid\n')
//                 resolve(res.statusCode);
//             }
//             else if(res.statusCode == 404){
//                 console.log('Transaction not found\n')
//                 resolve(res.statusCode);
//             }
//         })
//       });
//     }

/////////////////////////////////////////////////////////////////////////////////////

// Update a settlement record // ? why need this
/*
var form = {
    "fk_merchant_id": 0,
    "fk_branch_id": 0,
    "fk_transaction_id": 0,
    "settlement_amount": 0
  }
  */

  /*TEST:*/ 

// module.exports.updateIdSettlement = updateIdSettlement;

// function updateIdSettlement(settlement_id, form) {
//     return new Promise((resolve, reject) => {
//         var promiseCreateToken = createToken();
//         promiseCreateToken.then((value) => {
//             if (value.statusCode == 200) {
//                 var token = value.body.token
//                 request.put(url + '/settlement/' + settlement_id)
//                     .set('Content-Type', 'application/json')
//                     .set('Accept', 'application/json')
//                     .set('Authorization', 'Bearer ' + token)
//                     .send(form)
//                     .end((err, res) => {
//                         if (res.statusCode == 200) {
//                             console.log('Updated settlement\n')
//                             resolve(res);
//                         }
//                         else if (res.statusCode == 400) {
//                             console.log('Invalid Settlement body\n')
//                             resolve(res);
//                         }else{
//                             console.log('Step 2: Could not establish proper connection with database\n')
//                             resolve(-1)
//                         }
//                     })
//             }
//             else if (value.statusCode == 401) {
//                 console.log('Step 1: Unauthorized\n')
//                 resolve(value.message); 
//             }
//             else {
//                 console.log('Step 1: Could not establish connection with database\n')
//                 resolve(value)
//             }
//         })
//     });
// }

///////////////////////////////////////////////////////////////////////////////////

// Update settlement to completed status
/*
var form = {
    "settlement_id": 0
}
*/

/*TEST:*/ 

// module.exports.confirmSettlement = confirmSettlement;

// function confirmSettlement(settlement_id) {
//     return new Promise((resolve, reject) => {
//         var promiseCreateToken = createToken();
//         promiseCreateToken.then((value) => {
//             if (value.statusCode == 200) {
//                 console.log('Step 1: Successful\n')
//                 var token = value.body.token

//                 request.put(url + '/settlement/completed')
//                     .set('Content-Type', 'application/json')
//                     .set('Accept', 'application/json')
//                     .set('Authorization', 'Bearer ' + token)
//                     .send({ "settlement_id": settlement_id }) // "settlement_id" : `${settlement_id}`
//                     .end((err, res) => {
//                         if (res.statusCode == 200) {
//                             console.log('Updated settlement\n')
//                             resolve(res);
//                         }
//                         else if (res.statusCode == 400) {
//                             console.log('Invalid settlement\n')
//                             resolve(res);
//                         }
//                     })
//             }
//             else if (value.statusCode == 401) {
//                 resolve("Unauthorized"); // or value.body.message
//             }
//             else {
//                 console.log("error with token\n")
//                 resolve(value)
//             }
//         })
//     });
// }