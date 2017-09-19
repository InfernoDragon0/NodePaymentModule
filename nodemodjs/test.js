


var bt = require('./braintreeApiCall.js')
var api = require('./databaseApiCallp2.js')
// refund full transaction

    function FullRefund(transactionId) {
        return new Promise((resolve, reject) => {
            var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // check if the transaction can be refunded in our database
    
            promiseRetrieveIdTransaction.then((value) => {
                if (value.statusCode == 200) {
                    console.log("Retrieve transaction from our database successful\n")
                    if (value.body.transaction_type == 1 || value.body.transaction_type == 4) {
    
                        var brainId = value.body.braintree_transaction_id;
                        var userId = value.body.fk_user_id;
                        var merchantId = value.body.fk_merchant_id;
                        var branchId = value.body.fk_branch_id;

                        var promiseBtRefund = bt.btRefund(brainId); // refund braintree transaction
    
                        promiseBtRefund.then((value) => {
                             if (value.success == true) {
                                console.log("Successfully refunded in braintree\n")

                                var promiseBtSearch = bt.btSearch(brainId); // search braintree for refund transaction
    
                                promiseBtSearch.then((value) => {
                                    console.log(value);
                                    if (value.id = brainId) {
                                        console.log("search refundId from bt transaction \n")
    
                                        var form = {
                                            "fk_user_id": userId,
                                            "fk_merchant_id": merchantId,
                                            "fk_branch_id": branchId,
                                            "braintree_transaction_id": value.refundId,
                                            "transaction_amount": value.amount,
                                            "transaction_type": 3
                                        }

                                        console.log(form);
    
                                        // var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database
    
                                        // promiseCreateTransaction.then((value) => {
                                        //     // console.log(value.body);
                                        //     if (value.statusCode == 200) {
                                        //         console.log("Step 4 : Inserted refund to our database\n")
                                        //         resolve("Inserted refund to our database");
                                        //     }
                                        //     else if (value.statusCode == 400) {
                                        //         console.log("Step 4: Fail to insert refund to our database\n")
                                        //         resolve("Step 4: Fail to insert refund to our database\n");
                                        //     } else {
                                        //         console.log(value)
                                        //         resolve(value);
                                        //     }
                                        // })
                                    }else{
                                        console.log("no such id found in braintree database\n")
                                        resolve("No such id found in braintree database");
                                    }
                                })
    
                            } else if (value.success == false) {
                                console.log(value.message)
                                resolve(value.message);
                            } else {
                                console.log(value.message)
                              resolve(value.message)
                            }
                        });
    
                    } else if (value.transaction_type == 3) {
                        console.log("transaction is already refunded")// transaction has been refunded in the database
                        resolve("transaction is already refunded")
                    } else {
                        console.log("transaction cannot be refunded")// either chargeback, or already completed -- if so, chargeback
                        resolve("transaction cannot be refunded")
                    }
                } else if (value.statusCode == 400) {
                    console.log("Error retrieving from our database\n")
                    resolve(value.message)
                } else if (value.statusCode == 404) {
                    console.log("Error retrieving from our database\n")
                    resolve(value.message)
                } else if (value == "Unauthorized") {
                    resolve("Unauthorized User")
                } else {
                    console.log(value)
                    resolve(value)
                }
            })
        })
    };

// FullRefund('0c2a1539-ed83-43be-ff2d-08d4fe4af9f9')


function addTransaction(){
var form = {
    "fk_user_id": 0,
    "fk_merchant_id": 0,
    "fk_branch_id": 0,
    "braintree_transaction_id": "brcekbvr",
    "transaction_amount": 250.00,
    "transaction_type": 1
}

var promiseCreateTransaction = api.createTransaction(form);

promiseCreateTransaction.then((value)=>{
    console.log(value)
})

}

// addTransaction();

// get branches after login

function getBranch(merchantId){

    var promiseRetrieveIdMerchant = api.retrieveIdMerchant(merchantId)

    promiseRetrieveIdMerchant.then((value)=>{
        if (value == -1){
            console.log('special errors')
        }else if (value.statusCode == 401){
            console.log('Unauthorised')
        }else if (value.statusCode == 400){
            console.log(value.message)
        }else if (value.statusCode == 404){
            console.log(value.message)
        }else if (value.statusCode == 200){
            
            var promiseRetrieveBranches = api.retrieveBranches();

            promiseRetrieveBranches.then((value)=>{
                if (value == -1){
                    console.log('special errors')
                }else if (value.statusCode == 401){
                    console.log('Unauthorised')
                }else if (value.statusCode == 400){
                    console.log(value.message)
                }else if (value.statusCode == 404){
                    console.log(value.message)
                }else if (value.statusCode == 200){
                    
                    var array = []
                    for (var i = 0; i < value.body.length; i++ ){
                        if (value.body[i].merchant_id == merchantId){
                            array.push(value.body[i])
                        }
                    }
                    console.log(array)
                }
            })

        }
    })

}

getBranch();
