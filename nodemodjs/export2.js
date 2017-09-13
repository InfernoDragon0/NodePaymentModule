var phase2 = require('./phase2.js');

// check if transaction is settled
// ? not sure needed or not

var promiseRetrieveSettlement = phase2.retrieveTransactionIdSettlement()

////////////////NOT USING///////////////// Simpler version ^
// also check if transaction is settled using fk transaction id

// function CheckSettlement(transactionid) {
//     return new Promise((resolve, reject) => {
//         var promiseRetrieveSettlements = phase2.retrieveSettlements();

//         promiseRetrieveSettlements.then((value) => {

//             if (value != null) {
//                 // json = {
//                 //     [{"settlement_id" : settlement_id,"fk_merchant_id","fk_branch_id","fk_transaction_id","transaction_complete","settlement_amount", "create_at" : create_at, "modified_at" : modified_at}],
//                 //     [{"settlement_id" : settlement_id,"fk_merchant_id","fk_branch_id","fk_transaction_id","transaction_complete","settlement_amount", "create_at" : create_at, "modified_at" : modified_at}],
//                 //     [{"settlement_id" : settlement_id,"fk_merchant_id","fk_branch_id","fk_transaction_id","transaction_complete","settlement_amount", "create_at" : create_at, "modified_at" : modified_at}]
//                 // }
//                 var stop;
//                 for (var i = 0, j = value.length; i < j; i++) {
//                     if (value[i].fk_transaction_id == transactionid)
//                         stop = i;
//                     break;
//                 }

//                 if (stop != 0) {
//                     var transaction = [];
//                     console.log(value[stop].settlement_id)
//                     console.log(value[stop].fk_merchant_id)
//                     console.log(value[stop].fk_branch_id)
//                     console.log(value[stop].fk_transaction_id)
//                     console.log(value[stop].transaction_complete)
//                     console.log(value[stop].settlement_amount)
//                     console.log(value[stop].create_at)
//                     console.log(value[stop].modified_at)
//                     transaction.push(value[stop].settlement_id, value[stop].fk_merchant_id, value[stop].fk_branch_id, value[stop].fk_transaction_id, value[stop].transaction_complete, value[stop].settlement_amount, value[stop].create_at, value[stop].modified_at)// modified at might be null
//                     resolve(transaction); // "settlement records are retrieved"

//                 }
//                 else {
//                     resolve('0') // res.send"no such transaction id found in settlement"
//                 }
//             }
//             else {
//                 resolve('-1') // res send "Invalid id to retrieve settlement records"
//             }
//         })
//     }) // close promise
// };

// retrieve transaction id than create settlement for that transaction

function CreateSettlementTransaction(transactionId) {

    var promiseRetrieveIdTransaction = phase2.retrieveIdTransaction(transactionId);

    promiseRetrieveIdTransaction.then((value) => {
        if (value != null) {
            // console.log(value.transaction_id)
            // console.log(value.merchant_id)
            // console.log(value.branch_id)
            // console.log(value.transaction_type)
            // console.log(value.transaction_amount)

            if (value.transaction_type == 0) { // check transaction is successful, money is with jungle element
                var fk_merchant_id = value.merchant_id
                var fk_branch_id = value.branch_id
                var fk_transaction_id = value.transaction_id
                var settlement_amount = commission(value.transaction_amount)
                phase2.insertSettlement(fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount);// transaction type must change to '5' (paid) here
                res.send("transaction are now settled")
            }
            if (value.transaction_type == 1) {
                res.send("transaction is still pending")
            }
            if (value.transaction_type == 2) {
                res.send("transaction is already chargebacked")
            }
            if (value.transaction_type == 3) {
                res.send("transaction is already refunded")
            }
            if (value.transaction_type == 4) {
                res.send("transaction for top-up only")
            }
            if (value.transaction_type == 5) {
                res.send("transaction is already settled")
            }
            else {
                res.send("something is miss! transaction cannot be settled")
            }

        } else {
            console.log(err)
            res.send("fail to create settlement for transaction : " + transactionId)
        }
    })//close promise

    function commission(value) {
        var newCommission = (value * 1.025) + 0.5
        // console.log(newValue);
        return newCommission;
    };

}; // close CreateSettlementTransaction

// check if transaction is chargeback

function CreateChargebackTransaction(transactionId, braintreeId) {
    var promiseRetrieveIdTransaction = phase2.retrieveIdTransaction(transactionId);

    promiseRetrieveIdTransaction.then((value) => {
        if (value != null) {
            if (value.transaction_type == 5) {
                console.log("transaction can be chargedback")
                
                var fk_transaction_id = value.transaction_id
                var fk_user_id = value.fk_user_id
                var fk_merchant_id = value.fk_merchant_id
                var fk_branch_id = value.fk_branch_id
                var settlement_amount = value.transaction_amount
                var transaction_type = value.transaction_type
                

                phase2.insertSettlement(fk_merchant_id, fk_branch_id, fk_transaction_id, settlement_amount);

                // modify transaction record
                // calculate transaction amount
                // settle later

                // either create new transaction (because different braintree id)
                //calculate earnings - chargeback
                // insert new settlement record


            }
            if (value.transaction_type == 2) {
                res.send("transaction is already chargebacked")
            }
            else {
                res.send("transaction cannot be chargedback")
            }
        } else {
            console.log(err)
            res.send("fail to create chargeback for transaction : " + transactionId)
        }
    })//close promise
};


function CreateRefundTransaction (){
    
}

function totalValue(value) {// see total value 
    var newValue = (value * 0.975) - 0.5
    // console.log(newValue);
    return newValue;
};

// Testing

// var promiseTest = phase2.test();

// var num;

// promiseTest.then((value) => {


//             if (value != null) {
//                 num = value;
//                 console.log(num)
//                 console.log('this worked')
//                 return num;
//             }
//             else {
//                 console.log('this does not work')
//             }
//         })

// console.log('num is ' + num)

