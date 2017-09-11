
var phase1 = require ('./phase1.js');

var promiseRetrieveUser = phase1.retrieveUser(username);

//method #1

promiseRetrieveUser.then((value) => {

            var json = value

        if (json != null) {
            console.log(json.user_id)
            console.log(json.username)
            console.log(json.first_name)
            console.log(json.last_name)
            console.log(json.email)
            console.log(json.password)
            console.log(json.created_at)
            console.log(json.modified_at)
            console.log(json.mobile_number)
            console.log(json.fk_user_status_code)
            res.send( "'" + username + "' details are retrieved");
        }
        else {
            res.send("Invalid username to retrieve customer details");
        }
    }).catch(err)

// method #2

var promiseRetrieveIdUser = phase1.retrieveIdUser(id);

promiseRetrieveIdUser.then((value) => {

    var json = value;

    if (json != null) {
        console.log(json.user_id)
        console.log(json.username)
        console.log(json.first_name)
        console.log(json.last_name)
        console.log(json.email)
        console.log(json.password)
        console.log(json.created_at)
        console.log(json.modified_at)
        console.log(json.mobile_number)
        console.log(json.fk_user_status_code)
        res.send( "'" + id + "' details are retrieved");
    }
    else {
        res.send("Invalid id to retrieve customer details");
    }
}).catch(err)


//insert braintree account

phase1.insertBraintree(braintree_user_id, fk_user_id, braintree_token);

//retrieve braintree token

var promiseRetrieveIdBraintree = phase1.retrieveIdBraintree(id);

promiseRetrieveIdBraintree.then((value) => {

    var json = value;

    if (json != null) {
        console.log(json.braintree_user_id)
        console.log(json.fk_user_id)
        console.log(json.braintree_token)
        res.send( "'" + id + "' details are retrieved");
    }
    else {
        res.send("Invalid id to retrieve braintree details");
    }
}).catch(err)

// insert transactions

phase1.insertTransaction( fk_user_id, fk_merchant_id, fk_branch_id, braintree_transaction_id, transaction_amount, transaction_type)

//update payment successful

phase1.updateSuccessTransaction(transaction_id, braintree_transaction_id, transaction_type);

//update transaction when refund or chargeback

phase1.updateStatusTransaction(transaction_id, transaction_amount, transaction_type);

// check wallet amount

var promiseCheckWallet = phase1.checkWallet(wallet_id);

promiseRetrieveIdBraintree.then((value) => {
    
        var json = value;
    
        if (json != null) {
            console.log(json.wallet_amount)
            res.send( "'" + id + "' wallet is retrieved");
        }
        else {
            res.send("Invalid id to retrieve wallet information");
        }
    }).catch(err)

// top up wallet

phase1.topupWallet(wallet_id, wallet_amount);

// * remember to add in top up transaction



// testing area //

// var obj = {
//     "data": [
//         ["X", "Y", "Z"],
//         ["52", "23", "10"],
//         ["46", "65", "32"]
//     ]
// };

// console.log(obj.data.length)

// function test (a,b,c){
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }

// test('1')