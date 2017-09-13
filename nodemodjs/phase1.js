module.exports.retrieveUser = retrieveUser;

//method #1
// for retrieve user with username
// use case - when logging in

function retrieveUser(username) {
    return new Promise((resolve, reject) => {

        request(url + 'api/User/username%3A' + username, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

//method #2
// for retrieve user with id
// use case - after session is created

module.exports.retrieveIdUser = retrieveIdUser;

function retrieveIdUser(user_id) {
    return new Promise((resolve, reject) => {
        request(url + 'api/User/user_id%3A' + user_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// ? assuming there is an insert user // not added to export

// function insertUser(user_id, username, first_name, last_name, email, password, created_at, mobile_number, fk_user_status_code) {
//     request.post(url + 'api/User',
//         {
//             form:
//             {
//                 "user_id": user_id,
//                 "first_name": first_name,
//                 "last_name": last_name,
//                 "email": email,
//                 "password" : password,
//                 "created_at" : created_at,
//                 "mobile_number" : mobile_number,
//                 "fk_user_status_code" : fk_user_status_code
//             }
//         }, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//         });
// };

function insertUser(username, first_name, last_name, email, password, mobile_number, fk_user_status_code) {
    request.post(url + 'api/User',
        {
            form:
            {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password" : password,
                "mobile_number" : mobile_number,
                "fk_user_status_code" : fk_user_status_code
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

// modify user * might not make name modifiable // not added to export

// function modifyUser(user_id, username, first_name, last_name, email, password, modified_at, mobile_number, fk_user_status_code) {
//     request.post(url + 'api/User/user_id%3A' + user_id,
//         {
//             form:
//             {
//                 "user_id": user_id,
//                 "first_name": first_name,
//                 "last_name": last_name,
//                 "email": email,
//                 "password" : password,
//                 "modified_at" : modified_at,
//                 "mobile_number" : mobile_number,
//                 "fk_user_status_code" : fk_user_status_code
//             }
//         }, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//         });
// };

// modify user * might not make name modifiable // not added to export

function modifyUser(user_id, username, first_name, last_name, email, password, mobile_number, fk_user_status_code) {
    request.post(url + 'api/User/user_id%3A' + user_id,
        {
            form:
            {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password" : password,
                "mobile_number" : mobile_number,
                "fk_user_status_code" : fk_user_status_code
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

//for function insert Braintree

// module.exports.insertBraintree = insertBraintree;

// function insertBraintree(braintree_user_id, fk_user_id, braintree_id, braintree_token) {
//     request.post(url + 'api/Braintree',
//         {
//             form:
//             {
//                 "braintree_user_id": braintree_user_id,
//                 "fk_user_id": fk_user_id,
//                 "braintree_id": braintree_id,
//                 "braintree_token": braintree_token
//             }
//         }, function (error, response, body) {
//             if (error) {
//                 console.log('error:', error); // Print the error if one occurred 
//                 return;
//             }
//             console.log('body:', body);
//         });
// };

//for function insert Braintree

module.exports.insertBraintree = insertBraintree;

function insertBraintree(braintree_user_id, fk_user_id, braintree_token) {
    request.post(url + 'api/Braintree',
        {
            form:
            {
                "braintree_user_id": braintree_user_id,
                "fk_user_id": fk_user_id,
                "braintree_token": braintree_token
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

module.exports.retrieveIdBraintree = retrieveIdBraintree;

function retrieveIdBraintree(fk_user_id) {
    return new Promise((resolve, reject) => {
        request(url + 'api/Braintree/fk_user_id%3A' + id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// haven't add refund

// insert transaction

// module.exports.insertTransaction = insertTransaction;

// function insertTransaction(transaction_id, fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, created_at, transaction_amount, transaction_type) {
//     request.post(url + 'api/Transaction',
//         {
//             form:
//             {
//                 "transaction_id": transaction_id,
//                 "fk_user_id": fk_user_id,
//                 "fk_merchant_id": fk_merchant_id,
//                 "fk_branch_id": fk_branch_id,
//                 "braintree_transaction_id": braintree_transaction_id,
//                 "created_at": created_at,
//                 "transaction_amount": transaction_amount,
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

// insert transaction

module.exports.insertTransaction = insertTransaction;

function insertTransaction( fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount, transaction_type) {
    request.post(url + 'api/Transaction',
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
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

// update payment to success when braintree sends a unique id

module.exports.updateSuccessTransaction = updateSuccessTransaction;

function updateSuccessTransaction(transaction_id, braintree_transaction_id, transaction_type) {
    request.post(url + 'api/Transaction/transaction_id%3A' + transaction_id,
        {
            form:
            {
                "braintree_transaction_id": braintree_transaction_id,
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

// update transaction when refund or chargeback

// module.exports.updateStatusTransaction = updateStatusTransaction;

// function updateStatusTransaction(transaction_id, modified_at, transaction_amount, transaction_type) {
//     request.post(url + 'api/Transaction/transaction_id%3A' + transaction_id,
//         {
//             form:
//             {
//                 "modified_at": modified_at,
//                 "transaction_amount": transaction_amount,
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

// update transaction when refund or chargeback

module.exports.updateStatusTransaction = updateStatusTransaction;

function updateStatusTransaction(transaction_id, transaction_amount, transaction_type) {
    request.post(url + 'api/Transaction/transaction_id%3A' + transaction_id,
        {
            form:
            {
                "transaction_amount": transaction_amount,
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

//check wallet amount

module.exports.checkWallet = checkWallet;

function checkWallet(wallet_id) {
    return new Promise((resolve, reject) => {

        request(url + 'api/Wallet/wallet_id%3A' + wallet_id, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
            resolve(JSON.parse(body));
        });
    })
};

// add funds into customer wallet

module.exports.topupWallet = topupWallet;

function topupWallet(wallet_id, wallet_amount) {
    request.post(url + 'api/Wallet/wallet_id%3A' + wallet_id,
        {
            form:
            {
                "wallet_amount" : wallet_amount
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });

};

// * remember to add in top up transaction
