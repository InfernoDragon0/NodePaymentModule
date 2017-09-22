
var bt = require('./braintreeApiCall.js')
var api = require('./databaseApiCallp2.js')

module.exports.RetrieveTransactions = RetrieveTransactions;
module.exports.RetrieveUnsettle = RetrieveUnsettle;



// response all transaction

// /*TEST:*/ RetrieveTransactions(); //

function RetrieveTransactions() {
    return new Promise((resolve, reject) => {

        var promiseRetrieveTransactions = api.retrieveTransactions();
        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                    
                var promiseRetrieveMerchants = api.retrieveMerchants();
                promiseRetrieveMerchants.then((data) => {
                for (var i = 0; i < value.body.length; i++) {                    
                        for (var a = 0; a < data.body.length; a++) {
                            if(value.body[i].fk_merchant_id == value.body[a].merchant_id){
                            value.body[i].merchant_name = data.body[a].merchant_name
                            }
                        }
                    }
                    resolve(value);
                })
            } else {
                console.log(value);
                resolve(value);
            }
        })
    }) // close promise
};

// function addMerchantNameToData() {
//     return new Promise((resolve, reject) => {
//         var openPromise = RetrieveTransactions()
//         openPromise.then((data) => {
//             for (var counter = 0; counter < data.length; counter++) {
//                 data[counter].fk_merchant_id
//                 var openAnotherPromise = api.retrieveIdMerchant(data[counter].fk_merchant_id)
//                 openAnotherPromise.then((data2) => {
//                     data[counter].merchantName = data2.merchant_name
//                 })
//                 console.log(data)
//             }
//             console.log(data)
//             resolve(data);
//         })
//     })
// }

// retrieve unpaid transactions

// /*TEST:*/ RetrieveUnsettle(); //

function RetrieveUnsettle() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();
        promiseRetrieveTransactions.then((value) => {

            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];

                var promiseRetrieveIdMerchant = api.retrieveIdMerchant(value.body[i].fk_merchant_id);
                promiseRetrieveIdMerchant.then((data) => {
                    for (var i = 0; i < value.body.length; i++) {
                        if ((value.body[i].transaction_type == 1) || (value.body[i].transaction_type == 2) || (value.body[i].transaction_type == 5) || (value.body[i].transaction_type == 6)) {
                        for (var a = 0; a < data.body.length; a++) {
                            value.body[i].merchant_name = data.body[a].merchant_name
                        }
                        arrayJson.push(value.body[i])
                    }
                }
                    console.log (arrayJson)
                    resolve(arrayJson)
                })

                // for (var i = 0; i < value.body.length; i++) {
                //     if ((value.body[i].transaction_type == 1) || (value.body[i].transaction_type == 2) || (value.body[i].transaction_type == 5) || (value.body[i].transaction_type == 6)) {

                //         arrayJson.push(value.body[i])
                //     }
                // }
                // console.log(arrayJson);
                // resolve(arrayJson); // send rows of unpaid transactions that are not settled

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};

// retrieve unpaid transactions by merchants

// /*TEST:*/ RetrieveMerchantUnsettle(); //

function RetrieveMerchantUnsettle() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = RetrieveUnsettle();
        promiseRetrieveTransactions.then((value) => {
            var json = {
                "merchant_id": '',
                "merchantEarnings": 0
            };
            for (i = 0; i < value.body.length; i++) {
                value.body[i].by_id = 0;
                if (value.body[i].fk_merchant_id != value.body[i].by_id) {
                    value.body[i].by_id = merchantId
                }
            }
        })

    }) // close promise
};


// retrieve paid transactions 

module.exports.RetrievePaid = RetrievePaid;

// /*TEST:*/ RetrievePaid(); /

function RetrievePaid() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_complete == true) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};


// retrieve all successful transactions // for refunds

module.exports.RetrieveSuccessTransaction = RetrieveSuccessTransaction;

// /*TEST:*/ RetrieveSuccessTransaction();

function RetrieveSuccessTransaction() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if ((value.body[i].transaction_type == 1 && value.body[i].transaction_complete == false) || (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false)) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};


// retrieve settled transactions // for chargeback

module.exports.RetrievePaymentTransaction = RetrievePaymentTransaction;

// /*TEST:*/ functionName

function RetrievePaymentTransaction() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if ((value.body[i].transaction_type == 1 && value.body[i].transaction_complete == true) || (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == true)) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};


// retrieve all chargebacked transactions

module.exports.RetrieveChargeback = RetrieveChargeback;

// /*TEST:*/ functionName

function RetrieveChargeback() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == true) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};


// retrieve all wallet payment transactions

module.exports.RetrievePayment = RetrievePayment;

// /*TEST:*/ functionName

function RetrievePayment() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};


// refund full transaction

module.exports.FullRefund = FullRefund;

/*TEST:*/ FullRefund('a8d8634c-df6f-454e-c4b3-08d5018d5f26')

function FullRefund(transactionId) {
    return new Promise((resolve, reject) => {
        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // check if the transaction can be refunded in our database

        promiseRetrieveIdTransaction.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                if (value.body.transaction_type == 1 && value.body.is_transaction_completed == false) {

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
                                if (!value) {
                                    resolve(-1)
                                } else {
                                    console.log("search refundId from bt transaction \n")

                                    var promiseCreateTransaction = api.createTransaction(userId, merchantId, branchId, value.refundId, value.amount) // add refund transaction to our database

                                    promiseCreateTransaction.then((value) => {

                                        console.log(value)
                                        resolve(value);

                                    })
                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value.message);
                        }
                    });

                }else {
                    console.log("transaction already refunded or cannot be refunded")// either refunded, chargeback, or already completed -- if so, chargeback
                    resolve(-1) // can be resolved as something else
                }
            } else {
                resolve(value);
            }
        })
    })
};

// refund partial transaction

module.exports.PartialRefund = PartialRefund;

// /*TEST:*/ PartialRefund('8d498a2e-071c-4ffd-b9f7-08d50188ec28',30.00)

function PartialRefund(transactionId, refundAmount) {
    return new Promise((resolve, reject) => {
        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId);// get transaction details with id

        promiseRetrieveIdTransaction.then((value) => {
             if (value.statusCode >= 200 && value.statusCode <= 299) {
                if (value.body.transaction_type == 1 ) {
                    // console.log(value.body.braintree_transaction_id)

                    var promiseBtPartialRefund = bt.btPartialRefund(value.body.braintree_transaction_id, refundAmount);

                    promiseBtPartialRefund.then((value) => {
                        if (value.success == true) {
                            console.log("Successfully refunded in braintree\n")
                            var promiseBtSearch = bt.btSearch(brainId); // search braintree for refund transaction

                            promiseBtSearch.then((value) => {
                                if (!value) {
                                    resolve(-1)
                                } else {
                                    console.log("search refundId from bt transaction \n")

                                    console.log(value.refundId.length)
                                    var length = value.refundId.length - 1

                                    var form = {
                                        "fk_user_id": userId,
                                        "fk_merchant_id": merchantId,
                                        "fk_branch_id": branchId,
                                        "braintree_transaction_id": value.refundId[length],
                                        "transaction_amount": -refundAmount,
                                        "transaction_type": 3
                                    }

                                    var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database

                                    promiseCreateTransaction.then((value) => {
                                        // console.log(value.body);
                                        resolve(value)
                                    })

                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value);
                        }
                    });

                } else {
                    resolve(-1)// either chargeback, or already completed -- if so, chargeback
                }
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    }) // close promise
};

// insert settlement record for transactions about to be settled

module.exports.InsertSettlement = InsertSettlement;

// /*TEST:*/ InsertSettlement("90da4e8c-0c7c-4a8f-c4b4-08d5018d5f26")

function InsertSettlement(transactionId) {
    return new Promise((resolve, reject) => {

        var promiseRetrieveSettlements = api.retrieveSettlements(); // check if transaction has been settled
        promiseRetrieveSettlements.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var arg = false;
                var row = 0;
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].fk_transaction_id == transactionId) {
                        row = i;
                        arg = true;
                        break;
                    }
                }
                if (arg == true) {
                    console.log("this transaction is already settled\n")
                    resolve("this transaction is already settled\n") // can be changed
                } else if (arg == false) {
                    var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // search for transaction detail from our transaction database

                    promiseRetrieveIdTransaction.then((value) => {
                        if (value.statusCode >= 200 && value.statusCode <= 299) {

                                var money = parseFloat(commission(value.body.transaction_amount)).toFixed(2);
                               
                                console.log ("value.body.fk_merchant_id :"+value.body.fk_merchant_id  )
                                console.log ("value.body.fk_branch_id :"+value.body.fk_branch_id )
                                console.log ("transactionId :"+transactionId )
                                console.log(money)
                                var promiseCreateSettlement = api.createSettlement(value.body.fk_merchant_id, value.body.fk_branch_id, transactionId, money); // create settlement record
                                promiseCreateSettlement.then((value) => {
                                    if (value.statusCode >= 200 && value.statusCode <= 299) {

                                        var promiseConfirmTransaction = api.confirmTransaction(transactionId);
                                        promiseConfirmTransaction.then((value) => {
                                            resolve(value)
                                        })

                                    } else {
                                        resolve(value);
                                    }
                                })

                            
                            
                        } else {
                            resolve(value);
                        }
                    })
                }
            } else {
                resolve(value);
            }
        })

    }) // close promise
};

function commission(value) {
    var newCommission = (value * 0.975) - 0.50
    
    // console.log(newValue);
    return newCommission;
};


// retrieve refund transactions

module.exports.RetrieveRefund = RetrieveRefund;

// /*TEST:*/ functionName

function RetrieveRefund() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value == -1) {
                console.log('special errors')
                resolve(value)
            } else if (value.statusCode == 401) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 200) {
                var arrayJson = []
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == false) {
                        arrayJson.push(value[i]);
                    }
                }
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    }) // close promise
};


// retrieve refunded transactions

module.exports.RetrieveRefunded = RetrieveRefunded;

// /*TEST:*/ functionName

function RetrieveRefunded() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value == -1) {
                console.log('special errors')
                resolve(value)
            } else if (value.statusCode == 401) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 200) {
                var arrayJson = []
                for (var i = 0; i < value.body.length; i++) {
                    if ((value.body[i].transaction_type == 3 && value.body[i].transaction_complete == true) || (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == true)) {
                        arrayJson.push(value[i]);
                    }
                }
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    }) // close promise
};


// retrieve refund transactions

module.exports.RetrieveWalletRefund = RetrieveWalletRefund;

// /*TEST:*/ functionName

function RetrieveWalletRefund() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value == -1) {
                console.log('special errors')
                resolve(value)
            } else if (value.statusCode == 401) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 200) {
                var arrayJson = []
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == false) {
                        arrayJson.push(value[i]);
                    }
                }
                resolve(arrayJson);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    }) // close promise
};

// search successful earnings by time

module.exports.GetSuccess = GetSuccess;

// /*TEST:*/ GetSuccess('1/1/2017','9/22/2017')//

function GetSuccess(date1, date2){  // month - day - year
    return new Promise((resolve, reject) => {

        var dateStart = new Date(date1)
        dateStart = dateStart.getTime();
    
        var dateEnd = new Date(date2)
        dateEnd = dateEnd.getTime();
    
        var dateNow = new Date()
        dateNow = dateNow.getTime();

        if(dateEnd > dateNow){
            console.log('Get Credit Card Payment: End date is more than current date')
            resolve(-1)
            return;
        }

        var promiseRetrieveTransactions = api.retrieveTransactions();
        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 200) {
                var money = 0;
                for (var i = 0; i < value.body.length; i++) {

                    var createTime = new Date(value.body[i].created_at)
                    createTime = createTime.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body.is_transaction_complete == false) { // convert date to epoch time
                        money = money + value.body[i].transaction_amount
                    }
                }
                resolve(money);

            } else {
                resolve(value);
            }
        })

    }) // close promise
}

// search successful earnings for merchants by time

module.exports.GetMerchantSuccess = GetMerchantSuccess;

// /*TEST:*/ GetMerchantSuccess('1/1/2017', '21/9/2017', 10) //

function GetMerchantSuccess(date1, date2, merchantId) {
    return new Promise((resolve, reject) => {


        var dateStart = new Date(date1)
        dateStart = dateStart.getTime();
    
        var dateEnd = new Date(date2)
        dateEnd = dateEnd.getTime();
    
        var dateNow = new Date()
        dateNow = dateNow.getTime();

        if(dateEnd > dateNow){
            console.log('Get Credit Card Payment: End date is more than current date')
            resolve(-1)
            return;
        }

        var promiseRetrieveTransactions = api.retrieveTransactions();
        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {
                var money = 0;
                for (var i = 0; i < value.body.length; i++) {

                    var createTime = new Date(value.body[i].created_at)
                    createTime = createTime.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body[i].is_transaction_complete == false && value.body[i].fk_merchant_id == merchantId) { // convert date to epoch time
                        money = money + value.body[i].transaction_amount
                    }

                }
                resolve(money);

            } else {
                resolve(value);
            }
        })

    }) // close promise
}


// search settled earnings by time

module.exports.GetCompleted = GetCompleted;

// /*TEST:*/ GetCompleted()

function GetCompleted(date1, date2) { // month - day - year
    return new Promise((resolve, reject) => {
        
                var dateStart = new Date(date1)
                dateStart = dateStart.getTime();
            
                var dateEnd = new Date(date2)
                dateEnd = dateEnd.getTime();
            
                var dateNow = new Date()
                dateNow = dateNow.getTime();
        
                if(dateEnd > dateNow){
                    console.log('Get Payment Completed: End date is more than current date')
                    resolve(-1)
                    return;
                }
        
                var promiseRetrieveTransactions = api.retrieveTransactions();
                promiseRetrieveTransactions.then((value) => {
                    if (value.statusCode >= 200 && value.statusCode <= 200) {
                        var money = 0;
                        for (var i = 0; i < value.body.length; i++) {
        
                            var createTime = new Date(value.body[i].created_at)
                            createTime = createTime.getTime();
        
                            if (createTime >= dateStart && createTime <= dateEnd && value.body.is_transaction_complete == true) { // convert date to epoch time
                                money = money + value.body[i].transaction_amount
                            }
                        }
                        resolve(money);
        
                    } else {
                        resolve(value);
                    }
                })
        
            }) // close promise
        }


// search settled earnings for merchants by time

module.exports.GetMerchantCompleted = GetMerchantCompleted;

// /*TEST:*/ GetMerchantCompleted

function GetMerchantCompleted(date1, date2, merchantId) { // month - day - year
    return new Promise((resolve, reject) => {
        
        
                var dateStart = new Date(date1)
                dateStart = dateStart.getTime();
            
                var dateEnd = new Date(date2)
                dateEnd = dateEnd.getTime();
            
                var dateNow = new Date()
                dateNow = dateNow.getTime();
        
                if(dateEnd > dateNow){
                    console.log('Get Credit Card Payment: End date is more than current date')
                    resolve(-1)
                    return;
                }
        
                var promiseRetrieveTransactions = api.retrieveTransactions();
                promiseRetrieveTransactions.then((value) => {
                    if (value.statusCode >= 200 && value.statusCode <= 299) {
                        var money = 0;
                        for (var i = 0; i < value.body.length; i++) {
        
                            var createTime = new Date(value.body[i].created_at)
                            createTime = createTime.getTime();
        
                            if (createTime >= dateStart && createTime <= dateEnd && value.body[i].is_transaction_complete == true && value.body[i].fk_merchant_id == merchantId) { // convert date to epoch time
                                money = money + value.body[i].transaction_amount
                            }
        
                        }
                        resolve(money);
        
                    } else {
                        resolve(value);
                    }
                })
        
            }) // close promise
}


// insert chargeback to settlement

module.exports.InsertChargeback = InsertChargeback;

// /*TEST:*/ functionName

function InsertChargeback(transactionId) {
    new Promise((resolve, reject) => {

        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId);

        promiseRetrieveIdTransaction.then((value) => {
            if (value.statusCode >= 200 && value.statusCode <= 299) {

                if (value.body.transaction_type == 1 && value.body.is_transaction_complete == true) {
                    console.log('Insert Chargeback: Transaction can be chargedback')

                    var promiseCreateSettlement = api.createSettlement(value.body.fk_merchant_id, value.body.fk_branch_id, value.body.transactionId, commission(value.body.transaction_amount));
                    promiseCreateSettlement.then((value) => {
                        if (value.statusCode >= 200 && value.statusCode <= 299) {
                            resolve(value)
                        } else {
                            console.log('Insert Chargeback: Not properly connected to database')
                            resolve(-1)
                        }
                    })

                } else {
                    console.log('Insert Chargeback: Transaction cannot be chargebacked')
                    resolve(-1)
                }

            } else {
                resolve(value);
            }
        })

    })// close promise
};

/* |||||   ||| /|||||||||\ /|||||||||\  |||    ||| /||||||| ||||||||| */
/* ||||||  ||| |||     |||     |||      |||    ||| |||      |||       */
/* ||| ||| ||| |||     |||     |||      |||    ||| |||||||| ||||||||| */
/* |||  |||||| |||     |||     |||      |||    |||      ||| |||       */
/* |||    |||| \|||||||||/     |||      \||||||||/ |||||||/ ||||||||| */

// Calculate earnings of all unpaid transaction 

module.exports.GetUnpaidEarnings = GetUnpaidEarnings;

// /*TEST:*/ GetUnpaidEarnings();

function GetUnpaidEarnings() {

    var promiseRetrieveTransactions = api.retrieveTransactions();

    promiseRetrieveTransactions.then((value) => {
        return new Promise((resolve, reject) => {
            if (value == -1) {
                console.log('special errors')
                resolve(value)
            } else if (value.statusCode == 401) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 200) {
                var holdAmt = 0;
                var chargebackAmt = 0;
                var refundAmt = 0;
                var topupAmt = 0;
                var walletPaymentAmt = 0;
                var walletRefundAmt = 0;

                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 1 && value.body[i].transaction_complete == false) {
                        console.log('successful')
                        holdAmt = holdAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == false) {
                        console.log('chargeback')
                        chargebackAmt = chargebackAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == false) {
                        console.log('refund')
                        refundAmt = refundAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == false) {
                        console.log('top-up')
                        topupAmt = topupAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false) {
                        console.log('wallet payment')
                        walletPaymentAmt = walletPaymentAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == false) {
                        console.log('wallet refund')
                        walletRefundAmt = walletRefundAmt + value.body[i].transaction_amount
                    }
                }
                var total = holdAmt + chargebackAmt + refundAmt + walletPaymentAmt + walletRefundAmt
                resolve(total);
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    })
};

// Calculate earnings of all paid transaction 

module.exports.GetPaidEarnings = GetPaidEarnings;

// /*TEST:*/ functionName

function GetPaidEarnings() {

    var promiseRetrieveTransactions = api.retrieveTransactions();

    promiseRetrieveTransactions.then((value) => {
        return new Promise((resolve, reject) => {
            if (value == -1) {
                console.log('special errors')
                resolve(value)
            } else if (value.statusCode == 401) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value)
            } else if (value.statusCode == 200) {
                var holdAmt = 0;
                var chargebackAmt = 0;
                var refundAmt = 0;
                var topupAmt = 0;
                var walletPaymentAmt = 0;
                var walletRefundAmt = 0;

                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 1 && value.body[i].transaction_complete == true) {
                        console.log('successful')
                        holdAmt = holdAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == true) {
                        console.log('chargeback')
                        chargebackAmt = chargebackAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == true) {
                        console.log('refund')
                        refundAmt = refundAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == true) {
                        console.log('top-up')
                        topupAmt = topupAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == true) {
                        console.log('wallet payment')
                        walletPaymentAmt = walletPaymentAmt + value.body[i].transaction_amount
                    }
                    if (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == true) {
                        console.log('wallet refund')
                        walletRefundAmt = walletRefundAmt + value.body[i].transaction_amount
                    }
                }
                var total = holdAmt + chargebackAmt + refundAmt + walletPaymentAmt + walletRefundAmt
                resolve(total);
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    })
};


/* |||||   ||| /|||||||||\ /|||||||||\  |||    ||| /||||||| ||||||||| */
/* ||||||  ||| |||     |||     |||      |||    ||| |||      |||       */
/* ||| ||| ||| |||     |||     |||      |||    ||| |||||||| ||||||||| */
/* |||  |||||| |||     |||     |||      |||    |||      ||| |||       */
/* |||    |||| \|||||||||/     |||      \||||||||/ |||||||/ ||||||||| */


// retrieve all wallet top-up transactions
// not needed

// function RetrieveTopup() {
//     return new Promise((resolve, reject) => {
//         var promiseRetrieveTransactions = api.retrieveTransactions();

//         promiseRetrieveTransactions.then((value) => {
//             if (value == -1) {
//                 console.log('special errors')
//                 resolve(value)
//             } else if (value.statusCode == 401) {
//                 console.log(value.message)
//                 resolve(value)
//             } else if (value.statusCode == 400) {
//                 console.log(value.message)
//                 resolve(value)
//             } else if (value.statusCode == 404) {
//                 console.log(value.message)
//                 resolve(value)
//             } else if (value.statusCode == 200) {
//                 var arrayJson = [];
//                 for (var i = 0; i < value.body.length; i++) {
//                     if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == false) { // check if need to be false for transaction complete
//                         arrayJson.push(value.body[i]);
//                     }
//                 }
//                 console.log(arrayJson);
//                 resolve(arrayJson);

//             } else {
//                 console.log('passing on the error message')
//                 resolve(value);
//             }
//         })

//     }) // close promise
// };

