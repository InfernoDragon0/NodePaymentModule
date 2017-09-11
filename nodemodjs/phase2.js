//retrieve all transactions

module.exports.retrieveTransactions = retrieveTransactions;

function retrieveTransactions() {
    return new Promise((resolve, reject) => {

        request(url + 'api/Transaction', function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

//retrieve transaction with an id

module.exports.retrieveIdTransaction = retrieveIdTransaction;

function retrieveIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {

        request(url + 'api/Transaction/transaction_id%3A' + transaction_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// for accounting

module.exports.retrieveMerchantTransaction = retrieveMerchantTransaction;

function retrieveMerchantTransaction(fk_merchant_id) {
    return new Promise((resolve, reject) => {

        request(url + 'api/Transaction/fk_merchant_id%3A' + transaction_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// for accounting

module.exports.retrieveBranchTransaction = retrieveBranchTransaction;

function retrieveBranchTransaction(fk_branch_id) {
    return new Promise((resolve, reject) => {

        request(url + 'api/Transaction/fk_branch_id%3A' + transaction_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// modify refund and chargeback
// retrieve than conditions to check than modified date

module.exports.modifyTransaction = modifyTransaction;

function modifyTransaction(transaction_id, transaction_type) {
    request.post(url + 'api/Transaction/transaction_id%3A',
        {
            form:
            {
                "$class": "org.acme.jenetwork.Transaction",
                "transaction_type": transaction_type
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

// insert transaction

module.exports.insertSettlement = insertSettlement;

function insertSettlement(fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount) {
    request.post(url + 'api/Settlement',
        {
            form:
            {
                "$class": "org.acme.jenetwork.Settlement",
                "fk_merchant_id": fk_merchant_id,
                "fk_branch_id": fk_branch_id,
                "fk_transaction_id": fk_transaction_id,
                "settlement_amount": settlement_amount
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

//confirm settlement

module.exports.confirmSettlement = confirmSettlement;

function confirmSettlement(settlement_id, transaction_complete) {
    request.post(url + 'api/Settlement/settlement_id%3A' + settlement_id,
        {
            form:
            {
                "$class": "org.acme.jenetwork.Settlement",
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

// retrieve settlement with an id

module.exports.retrieveIdSettlement = retrieveIdSettlement;

function retrieveIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {

        request(url + 'api/Settlement/settlement_id%3A' +settlement_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// retrieve all settlement

module.exports.retrieveSettlements = retrieveSettlements;

function retrieveSettlements() {
    return new Promise((resolve, reject) => {

        request(url + 'api/Settlement', function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// Testing

// module.exports.test = test;

// function test() {
//     return new Promise((resolve, reject) => {
//         a = 10
//         b = 10
//         c = a + b + 10
//         resolve(c)
//     })
// };
