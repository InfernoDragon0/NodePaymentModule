


// var bt = require('./braintreeApiCall.js')
// var api = require('./databaseApiCallp2.js')
// // refund full transaction

// function FullRefund(transactionId) {
//     return new Promise((resolve, reject) => {
//     var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // check if the transaction can be refunded in our database

//     promiseRetrieveIdTransaction.then((value) => {
//         if (value.statusCode == 200) {
//             console.log("Retrieve transaction from our database successful\n")
//             if (value.body.transaction_type == 1 || value.body.transaction_type == 4) {

//                 var brainId = value.body.braintree_transaction_id;
//                 var userId = value.body.fk_user_id;
//                 var merchantId = value.body.fk_merchant_id;
//                 var branchId = value.body.fk_branch_id;

//                 var promiseBtRefund = bt.btRefund(brainId); // refund braintree transaction

//                 promiseBtRefund.then((value) => {
//                     if(!value){
//                         console.log(err);
//                         res.send(err);
//                     }
//                     else if (value.success == true) {
//                         console.log("Successfully refunded in braintree\n")                        
//                         var promiseBtSearch = bt.btSearch(brainId); // search braintree for refund transaction

//                         promiseBtSearch.then((value)=>{
//                             if (!value){
//                                 console.log(err)
//                             }else{
//                                 console.log("search refundId from bt transaction \n")

//                                 var form = {
//                                     "fk_user_id": userId,
//                                     "fk_merchant_id": merchantId,
//                                     "fk_branch_id": branchId,
//                                     "braintree_transaction_id": value.refundId,
//                                     "transaction_amount": value.amount,
//                                     "transaction_type": 3
//                                 }

//                                 var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database

//                                 promiseCreateTransaction.then((value)=>{
//                                     // console.log(value.body);
//                                     if (value.statusCode == 200) {
//                                         console.log("Step 4 : Inserted refund to our database\n")
//                                         resolve("Inserted refund to our database");
//                                     }
//                                     else if (value.statusCode == 400) {
//                                         console.log("Step 4: Fail to insert refund to our database\n")
//                                         resolve("Step 4: Fail to insert refund to our database\n");
//                                     }else{
//                                         console.log(err)
//                                         resolve(err);
//                                     }
//                                 })
//                             }

//                         })

//                     } else if (value.success == false) {
//                         console.log(value.message)
//                         resolve(value.message);
//                     }
//                 });

//             } else if (value.transaction_type == 3) {
//                 console.log("transaction is already refunded")// transaction has been refunded in the database
//                 resolve("transaction is already refunded")
//             } else {
//                 console.log("transaction cannot be refunded")// either chargeback, or already completed -- if so, chargeback
//                 resolve("transaction cannot be refunded")
//             }
//         } else if (value.statusCode == 400) {
//             console.log("Error retrieving from our database\n")
//             resolve(value.message)
//         } else if (value.statusCode == 404) {
//             console.log("Error retrieving from our database\n")
//             resolve(value.message)
//         } else if (value == "Unauthorized") {
//             resolve("Unauthorized User")
//         } else {
//             console.log(err)
//             resolve(err)
//         }
//     })    
// })
// };

// FullRefund('4ec15667-ca27-495b-2953-08d4fb4cc841')


// function myfunction(num) {
//     return new Promise((resolve, reject) => {

//         if (num == 1) {
//             resolve('changed to a')
//         } else if (num == 2) {
//             resolve('changed to b')
//         } else {
//             resolve('changed to c')
//         }
//     })
// };


// function test(numb){
// return new Promise((resolve,reject)=>{
// var promiseMyFunction = myfunction(numb);

// var obj = 'string';

// promiseMyFunction.then((value)=>{
//  obj = value;
// });
// resolve (obj);

// })
// };

// var promiseYolo = test(1)

// promiseYolo.then((value)=>{
//     console.log(value)
// })

var num = ["11111","12345","3","5"]

var arrayJson = [{"eyes": "12345"},{"eyes": "11111"},{"eyes": "22222"},{"eyes": "33333"}]

for (var a = 0; a< arrayJson.length; a++){

    for (var b = 0; b< 4; b++){
        console.log(b)
    if(arrayJson[a].eyes==num[b]){
        console.log("it works")
    }
}
    // console.log(String(arrayJson[a].eyes))

}