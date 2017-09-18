
var bt = require('./braintreeApiCall.js')
var api = require('./databaseApiCallp2.js')

// response all transaction

function RetrieveTransactions() {
    return new Promise((resolve, reject) => {
    var promiseRetrieveTransactions = api.retrieveTransactions();

    promiseRetrieveTransactions.then((value) => {
        if (value.statusCode == 200) {
            console.log(value.body) // for checking
            resolve(value.body)
        } else if (value.statusCode == 400) {
            console.log(value.message)
            resolve(value.message)
        } else if (value.statusCode == 404) {
            console.log(value.message)
            resolve(value.message)
        } else if (value == "Unauthorized") {
            resolve("Unauthorized User")
        } else {
            console.log(value)
            resolve(value)
        }
    })
    }) // close promise
};

// retrieve unpaid transactions //old

// function RetrieveUnpaid() {
//     return new Promise((resolve, reject) => {
//         var promiseRetrieveTransactions = api.retrieveTransactions();

//         promiseRetrieveTransactions.then((value) => {
//             if (value.statusCode == 200) {
//                 var arrayJson = []
//                 for (var i = 0; i < value.body.length; i++) {
//                     if (value.body[i].transaction_type == 1 || value.body[i].transaction_type == 2) {
//                         arrayJson.push(value.body[i]);
//                     }
//                 }
//                 console.log(arrayJson);
//                 resolve(arrayJson);

//             } else if (value.statusCode == 400) {
//                 console.log(value.message)
//                 resolve(value.message)
//             } else if (value.statusCode == 404) {
//                 console.log(value.message)
//                 resolve(value.message)
//             } else if (value == "Unauthorized") {
//                 resolve("Unauthorized User")
//             } else {
            //     console.log(value)
            //     resolve(value)
            // }
//         })

//     }) // close promise
// };

// retrieve upaid transactions

function RetrieveUnpaid() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                    var arrayJson = [];
                    for (var i = 0; i< value.body.length; i++){
                    if ((value.body[i].transaction_type == 1 && value.body[i].transaction_complete == false )||( value.body[i].transaction_type == 2 && value.body[i].transaction_complete == false)) {
                        arrayJson.push(value.body[i])
                    }
                }
                    console.log(arrayJson);
                    resolve(arrayJson); // send rows of unpaid transactions that are not settled
                    
            } else if (value.statusCode == 400) {
                console.log("Step 1: Invalid\n")
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log("Step 1: Transaction not found\n")
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};


// retrieve paid transactions 

function RetrievePaid() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_complete == true) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

// retrieve all succesful transactions

function RetrieveSuccess() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 1 && value.body[i].transaction_complete == false) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

// retrieve all refunded transactions

function RetrieveRefund() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == true) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

// retrieve all chargebacked transactions

function RetrieveChargeback() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == true) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

// retrieve all wallet top-up transactions

function RetrieveTopup() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == false) { // check if need to be false for transaction complete
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

// retrieve all wallet payment transactions

function RetrievePayment() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false) {
                        arrayJson.push(value.body[i]);
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                console.log(value.message)
                resolve(value.message)
            } else if (value.statusCode == 404) {
                console.log(value.message)
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })

    }) // close promise
};

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
                                if (!value) {
                                    console.log(err)
                                } else {
                                    console.log("search refundId from bt transaction \n")

                                    var form = {
                                        "fk_user_id": userId,
                                        "fk_merchant_id": merchantId,
                                        "fk_branch_id": branchId,
                                        "braintree_transaction_id": value.refundId,
                                        "transaction_amount": value.amount,
                                        "transaction_type": 3
                                    }

                                    var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database

                                    promiseCreateTransaction.then((value) => {
                                        // console.log(value.body);
                                        if (value.statusCode == 200) {
                                            console.log("Step 4 : Inserted refund to our database\n")
                                            resolve("Inserted refund to our database");
                                        }
                                        else if (value.statusCode == 400) {
                                            console.log("Step 4: Fail to insert refund to our database\n")
                                            resolve("Step 4: Fail to insert refund to our database\n");
                                        } else {
                                            console.log(value)
                                            resolve(value);
                                        }
                                    })
                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value.message);
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

// FullRefund('4ec15667-ca27-495b-2953-08d4fb4cc841')


// refund partial transaction

function partialRefund(transactionId, refundAmount) {
    return new Promise((resolve, reject) => {
        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId);// get transaction details with id

        promiseRetrieveIdTransaction.then((value) => {
            if (value.statusCode == 200) {
                if (value.body.transaction_type == 1 || value.body.transaction_type == 4) {
                    // console.log(value.body.braintree_transaction_id)

                    var promiseBtPartialRefund = bt.btPartialRefund(value.body.braintree_transaction_id, refundAmount);

                    promiseBtPartialRefund.then((value) => {
                         if (value.success == true) {
                            console.log("Successfully refunded in braintree\n")
                            var promiseBtSearch = bt.btSearch(brainId); // search braintree for refund transaction

                            promiseBtSearch.then((value) => {
                                if (!value) {
                                    console.log(err)
                                } else {
                                    console.log("search refundId from bt transaction \n")

                                    console.log(value.refundId.length)
                                    var length = value.refundId.length - 1

                                    var form = {
                                        "fk_user_id": userId,
                                        "fk_merchant_id": merchantId,
                                        "fk_branch_id": branchId,
                                        "braintree_transaction_id": value.refundId[length],
                                        "transaction_amount": refundAmount,
                                        "transaction_type": 3
                                    }

                                    var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database

                                    promiseCreateTransaction.then((value) => {
                                        // console.log(value.body);
                                        if (value.statusCode == 200) {
                                            console.log("Step 4 : Inserted refund to our database\n")
                                            resolve(value.message)
                                        }
                                        else if (value.statusCode == 400) {
                                            console.log("Step 4: Fail to insert refund to our database\n")
                                            resolve(value.message)
                                        } else {
                                            console.log(value)
                                            resolve(value)
                                        }
                                    })

                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value.message);
                        }
                    });

                } else if (value.transaction_type == 3) {
                    resolve("transaction is already refunded")
                } else {
                    resolve("transaction cannot be refunded")// either chargeback, or already completed -- if so, chargeback
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
    }) // close promise
};

// insert settlement record for transactions about to be settled

function insertSettlement(transactionId) {
    return new Promise((resolve, reject) => {

        var promiseRetrieveSettlements = api.retrieveSettlements(); // check if transaction has been settled
        promiseRetrieveSettlements.then((value) => {
            if (value.statusCode == 200) {
                var arg = false;
                var row = 0;
                for (var i = 0; i < value.body.length; i++) {
                    if (value.body[i].fk_transaction_id == transactionId) {
                        row = i;
                        arg = true;
                        break;
                    }
                }
                if (arg === true) {
                    console.log("this transaction is already settled\n")
                    resolve("this transaction is already settled\n")
                } else if (arg === false) {
                    var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // search for transaction detail from our transaction database

                    promiseRetrieveIdTransaction.then((value) => {
                        if (value.statusCode == 200) {
                            console.log('Transaction record retrieved successfully\n')
                            console.log(value.body)

                            var form = {
                                "fk_merchant_id": value.body.fk_merchant_id,
                                "fk_branch_id": fk_branch_id,
                                "fk_transaction_id": transactionId,
                                "settlement_amount": commission(parseInt(value.body.amount))
                            }

                            var promiseCreateSettlement = api.createSettlement(form); // create settlement record

                            promiseCreateSettlement.then((value) => {
                                if(value.statusCode == 200){
                                    console.log('Insert settlement record successful\n')
                                    resolve(value.body)
                                }else{
                                    console.log('Failed to insert settlement for transaction\n')
                                    resolve(value.message)
                                }
                            })

                        }
                        else if (value.statusCode == 400) {
                            console.log('Invalid ID supplied\n')
                            resolve(value.message);
                        }
                        else if (value.statusCode == 404) {
                            console.log('Transaction not found\n')
                            resolve(value.message);
                        }
                    })
                }
            } else if (value.statusCode == 400) {
                console.log('fail to connect to settlement table\n')
                resolve(value.message)
            } else {
                resolve(value)
            }
        })

    }) // close promise
};

function commission(value){
    var newCommission = (value * 0.025) + 0.50
    // console.log(newValue);
    return newCommission;
    };

// var form = {
//     "fk_user_id": 0,
//     "fk_merchant_id": 0,
//     "fk_branch_id": 0,
//     "braintree_transaction_id": "string",
//     "transaction_amount": 0,
//     "transaction_type": 0
// }

// var promiseCreateTransaction = api.createTransaction(form);

// promiseCreateTransaction.then((value) => {
//     if (value.statusCode == 200) {
//         res.send(value.body)
//     } else if (value.statusCode == 400) {
//         res.send(value.message)
//     } else if (value == "Unauthorized") {
//         res.send("Unauthorized User")
//     } else {
//         console.log(err)
//         res.send(err)
//     }
// })

// retrieve refund transactions

function RetrieveRefund() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = []
                for (var i = 0; i < value.body.length; i++) {
                    if (value[i].transaction_type == 3) {
                        arrayJson.push(value[i]);
                    }
                }
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                resolve(value.message)
            } else if (value.statusCode == 404) {
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })


    }) // close promise
};

// retrieve chargeback transactions

function RetrieveChargeback() {
    return new Promise((resolve, reject) => {
        var promiseRetrieveTransactions = api.retrieveTransactions();

        promiseRetrieveTransactions.then((value) => {
            if (value.statusCode == 200) {
                var arrayJson = []
                for (var i = 0; i < value.body.length; i++) {
                    if (value[i].transaction_type == 2) {
                        arrayJson.push(value[i]);
                    }
                }
                resolve(arrayJson);

            } else if (value.statusCode == 400) {
                resolve(value.message)
            } else if (value.statusCode == 404) {
                resolve(value.message)
            } else if (value == "Unauthorized") {
                resolve("Unauthorized User")
            } else {
                console.log(value)
                resolve(value)
            }
        })
    }) // close promise
};

// Calculate earnings of all transaction 

// var promiseRetrieveTransactions = api.retrieveTransactions();

// promiseRetrieveTransactions.then((value) => {
//     if (value.statusCode == 200) {
//         var pendingAmt;
//         var holdAmt;
//         var chargebackAmt;
//         var refundAmt;
//         var topupAmt;
//         var walletPaymentAmt;
//         var completedAmt;

//         for (var i = 0; i < value.body.length; i++) {
//             if (value[i].transaction_type == 1) {
//                 console.log('successful')
//             }
//             if (value[i].transaction_type == 2) {
//                 console.log('chargeback')
//             }
//             if (value[i].transaction_type == 3) {
//                 console.log('refund')
//             }
//             if (value[i].transaction_type == 4) {
//                 console.log('top-up')
//             }
//             if (value[i].transaction_type == 5) {
//                 console.log('wallet payment')
//             }
//             if (value[i].transaction_type == 6) {
//                 console.log('completed')
//             }
//         }
//         var total =
//             res.send(total);

//     } else if (value.statusCode == 400) {
//         res.send(value.message)
//     } else if (value.statusCode == 404) {
//         res.send(value.message)
//     } else if (value == "Unauthorized") {
//         res.send("Unauthorized User")
//     } else {
//         console.log(err)
//         res.send(err)
//     }
// })

// insert transactions

/* |||||   ||| /|||||||||\ /|||||||||\  |||    ||| /||||||| ||||||||| */
/* ||||||  ||| |||     |||     |||      |||    ||| |||      |||       */
/* ||| ||| ||| |||     |||     |||      |||    ||| |||||||| ||||||||| */
/* |||  |||||| |||     |||     |||      |||    |||      ||| |||       */
/* |||    |||| \|||||||||/     |||      \||||||||/ |||||||/ ||||||||| */

