
var bt = require('./braintreeApiCall.js')
var api = require('./databaseApiCallp2.js')

// response all transaction

// /*TEST:*/ RetrieveTransactions(); /

module.exports.RetrieveTransactions = RetrieveTransactions;

function RetrieveTransactions() {
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
                console.log(value.body) // for checking
                resolve(value.body);
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    }) // close promise
};

function addMerchantNameToData() {
    return new Promise((resolve, reject) => {
        var openPromise = RetrieveTransactions()
        openPromise.then((data) => {
            for (var counter = 0; counter < data.length; counter++) {
                data[counter].fk_merchant_id
                var openAnotherPromise = api.retrieveIdMerchant(data[counter].fk_merchant_id)
                openAnotherPromise.then((data2) => {
                    data[counter].merchantName = data2.merchant_name
                })
            }
            resolve(data);
        })
    })
}

// retrieve unpaid transactions

module.exports.RetrieveUnpaid = RetrieveUnpaid;

// /*TEST:*/ RetrieveUnpaid(); /

function RetrieveUnpaid() {
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
                var arrayJson = [];
                for (var i = 0; i < value.body.length; i++) {
                    if ((value.body[i].transaction_type == 1 && value.body[i].transaction_complete == false) || (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == false) || (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false) || (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == true)) {
                        arrayJson.push(value.body[i])
                    }
                }
                console.log(arrayJson);
                resolve(arrayJson); // send rows of unpaid transactions that are not settled
            } else {
                console.log('passing on the error message')
                resolve(value);
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

// /*TEST:*/ functionName

function FullRefund(transactionId) {
    return new Promise((resolve, reject) => {
        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId); // check if the transaction can be refunded in our database

        promiseRetrieveIdTransaction.then((value) => {
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
                console.log("Retrieve transaction from our database successful\n")
                if (value.body.transaction_type == 1 && value.body.transaction_complete == false) {

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

                                    var form = {
                                        "fk_user_id": userId,
                                        "fk_merchant_id": merchantId,
                                        "fk_branch_id": branchId,
                                        "braintree_transaction_id": value.refundId,
                                        "transaction_amount": -value.amount,
                                        "transaction_type": 3
                                    }

                                    var promiseCreateTransaction = api.createTransaction(form) // add refund transaction to our database

                                    promiseCreateTransaction.then((value) => {
                                        // console.log(value.body);
                                        if (value.statusCode >= 200 && value.statusCode <= 299) {
                                            console.log('Step 4 : Inserted refund to our database\n')
                                            resolve(value);
                                        }
                                        else if (value.statusCode == 400) {
                                            console.log('Step 4: Fail to insert refund to our database\n')
                                            resolve(value);
                                        } else {
                                            console.log('Step 4: Could not establish proper connection with database\n')
                                            resolve(-1);
                                        }
                                    })
                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value.message);
                        }
                    });

                } else if (value.transaction_type == 3 || value.transaction_type == 6) {
                    console.log("transaction is already refunded")// transaction has been refunded in the database
                    resolve("transaction is already refunded") // can be resolved as something else
                } else {
                    console.log("transaction cannot be refunded")// either chargeback, or already completed -- if so, chargeback
                    resolve("transaction cannot be refunded") // can be resolved as something else
                }
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })
    })
};

// refund partial transaction

module.exports.PartialRefund = PartialRefund;

// /*TEST:*/ functionName

function PartialRefund(transactionId, refundAmount) {
    return new Promise((resolve, reject) => {
        var promiseRetrieveIdTransaction = api.retrieveIdTransaction(transactionId);// get transaction details with id

        promiseRetrieveIdTransaction.then((value) => {
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
                if (value.body.transaction_type == 1 && value.body.transaction_complete == false) {
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
                                        if (value.statusCode >= 200 && value.statusCode <= 299) {
                                            console.log("Step 4 : Inserted refund to our database\n")
                                            resolve(value)
                                        }
                                        else if (value.statusCode == 400) {
                                            console.log("Step 4: Fail to insert refund to our database\n")
                                            resolve(value)
                                        } else {
                                            console.log('Step 4: Could not establish proper connection with database\n')
                                            resolve(-1);
                                        }
                                    })

                                }

                            })

                        } else if (value.success == false) {
                            console.log(value.message)
                            resolve(value);
                        }
                    });

                } else if (value.transaction_type == 3) {
                    resolve("transaction is already refunded")
                } else {
                    resolve("transaction cannot be refunded")// either chargeback, or already completed -- if so, chargeback
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

// /*TEST:*/ functionName

function InsertSettlement(transactionId) {
    return new Promise((resolve, reject) => {

        var promiseRetrieveSettlements = api.retrieveSettlements(); // check if transaction has been settled
        promiseRetrieveSettlements.then((value) => {
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
                            console.log('Transaction record retrieved successfully\n')
                            console.log(value.body)

                            if ((value.body.transaction_type == 1 && value.body.transaction_complete == false) || (value.body.transaction_type == 5 && value.body.transaction_complete == false)) {
                                var form = {
                                    "fk_merchant_id": value.body.fk_merchant_id,
                                    "fk_branch_id": fk_branch_id,
                                    "fk_transaction_id": transactionId,
                                    "settlement_amount": commission(value.body.amount)
                                }

                                var promiseCreateSettlement = api.createSettlement(form); // create settlement record

                                promiseCreateSettlement.then((value) => {
                                    if (value.statusCode >= 200 && value.statusCode <= 299) {
                                        console.log('Insert settlement record successful\n')

                                        var form1 = {
                                            "transaction_id": transactionId
                                        }

                                        var promiseConfirmTransaction = api.confirmTransaction(form1);
                                        promiseConfirmTransaction.then((value) => {
                                            if (value == -1) {
                                                console.log('special errors')
                                                resolve(value)
                                            } else if (value.statusCode == 200) {
                                                resolve(value);
                                            } else {
                                                resolve(-1)
                                            }
                                        })


                                    } else if (value.statusCode == 400) {
                                        console.log('Failed to insert settlement for transaction\n')
                                        resolve(value)
                                    } else {
                                        console.log('Step 4: Could not establish proper connection with database\n')
                                        resolve(-1);
                                    }
                                })
                            } else if (value.body.transaction == 2 && value.body.transaction_complete == false) {
                                var form = {
                                    "fk_merchant_id": value.body.fk_merchant_id,
                                    "fk_branch_id": fk_branch_id,
                                    "fk_transaction_id": transactionId,
                                    "settlement_amount": commission(value.body.amount)
                                }

                                var promiseCreateSettlement = api.createSettlement(form); // create settlement record

                                promiseCreateSettlement.then((value) => {
                                    if (value.statusCode >= 200 && value.statusCode <= 299) {
                                        console.log('Insert settlement record successful\n')

                                        var form1 = {
                                            "transaction_id": transactionId
                                        }

                                        var promiseConfirmTransaction = api.confirmTransaction(form1);
                                        promiseConfirmTransaction.then((value) => {
                                            if (value == -1) {
                                                console.log('special errors')
                                                resolve(value)
                                            } else if (value.statusCode == 200) {
                                                resolve(value);
                                            } else {
                                                resolve(-1)
                                            }
                                        })


                                    } else if (value.statusCode == 400) {
                                        console.log('Failed to insert settlement for transaction\n')
                                        resolve(value)
                                    } else {
                                        console.log('Step 4: Could not establish proper connection with database\n')
                                        resolve(-1);
                                    }
                                })
                            } else if (value.body.transaction == 6 && value.body.transaction_complete == false) {
                                var form = {
                                    "fk_merchant_id": value.body.fk_merchant_id,
                                    "fk_branch_id": fk_branch_id,
                                    "fk_transaction_id": transactionId,
                                    "settlement_amount": commission(value.body.amount)
                                }

                                var promiseCreateSettlement = api.createSettlement(form); // create settlement record

                                promiseCreateSettlement.then((value) => {
                                    if (value.statusCode >= 200 && value.statusCode <= 299) {
                                        console.log('Insert settlement record successful\n')

                                        var form1 = {
                                            "transaction_id": transactionId
                                        }

                                        var promiseConfirmTransaction = api.confirmTransaction(form1);
                                        promiseConfirmTransaction.then((value) => {
                                            if (value == -1) {
                                                console.log('special errors')
                                                resolve(value)
                                            } else if (value.statusCode == 200) {
                                                resolve(value);
                                            } else {
                                                resolve(-1)
                                            }
                                        })


                                    } else if (value.statusCode == 400) {
                                        console.log('Failed to insert settlement for transaction\n')
                                        resolve(value)
                                    } else {
                                        console.log('Step 4: Could not establish proper connection with database\n')
                                        resolve(-1);
                                    }
                                })
                            }
                            else {
                                console.log("transaction cannot be refunded")
                                resolve(-1)
                            }



                        } else {
                            console.log('passing on the error message');
                            resolve(value);
                        }
                    })
                }
            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
};

function commission(value) {
    var newCommission = (value * 0.025) + 0.50
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

// /*TEST:*/ functionName

function GetSuccess(date1, date2) {
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

                for (var i = 0; i < value.body.length; i++) {
                    var money = 0;

                    var createTime = new Date(value.body[i].create_at)
                    createTime = createTime.getTime();

                    var dateStart = new Date(date1)
                    dateStart = dateStart.getTime();

                    var dateEnd = new Date(date2)
                    dateEnd = dateEnd.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body.transactioN_complete == false) { // convert date to epoch time
                        money = money + value.body[i].amount
                    }

                }
                resolve(money);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
}

// search successful earnings for merchants by time

module.exports.GetMerchantSuccess = GetMerchantSuccess;

// /*TEST:*/ functionName

function GetMerchantSuccess(date1, date2, merchantId) {
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

                for (var i = 0; i < value.body.length; i++) {
                    var money = 0;

                    var createTime = new Date(value.body[i].create_at)
                    createTime = createTime.getTime();

                    var dateStart = new Date(date1)
                    dateStart = dateStart.getTime();

                    var dateEnd = new Date(date2)
                    dateEnd = dateEnd.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body.transactioN_complete == false && value.body.fk_merchant_id == merchantId) { // convert date to epoch time
                        money = money + value.body[i].amount
                    }

                }
                resolve(money);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
}


// search settled earnings by time

module.exports.GetCompleted = GetCompleted;

// /*TEST:*/ functionName

function GetCompleted(date1, date2) {
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

                for (var i = 0; i < value.body.length; i++) {
                    var money = 0;

                    var createTime = new Date(value.body[i].create_at)
                    createTime = createTime.getTime();

                    var dateStart = new Date(date1)
                    dateStart = dateStart.getTime();

                    var dateEnd = new Date(date2)
                    dateEnd = dateEnd.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body.transactioN_complete == true) { // convert date to epoch time
                        money = money + value.body[i].amount
                    }

                }
                resolve(money);

            } else {
                console.log('passing on the error message')
                resolve(value);
            }
        })

    }) // close promise
}


// search settled earnings for merchants by time

module.exports.GetMerchantCompleted = GetMerchantCompleted;

// /*TEST:*/ functionName

function GetMerchantCompleted(date1, date2, merchantId) {
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

                for (var i = 0; i < value.body.length; i++) {
                    var money = 0;

                    var createTime = new Date(value.body[i].create_at)
                    createTime = createTime.getTime();

                    var dateStart = new Date(date1)
                    dateStart = dateStart.getTime();

                    var dateEnd = new Date(date2)
                    dateEnd = dateEnd.getTime();

                    if (createTime >= dateStart && createTime <= dateEnd && value.body.transactioN_complete == true && value.fk_merchant_id == merchantId) { // convert date to epoch time
                        money = money + value.body[i].amount
                    }

                }
                resolve(money);

            } else {
                console.log('passing on the error message')
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

                if (value.body.transaction_type == 1 && value.body.transaction_complete == true) {
                    console.log('transaction can be chargedback')

                    var form = {
                        "fk_merchant_id": value.body.fk_merchant_id,
                        "fk_branch_id": value.body.fk_branch_id,
                        "fk_transaction_id": value.body.transactionId,
                        "settlement_amount": commission(value.body.amount)
                    }

                    var promiseCreateSettlement = api.createSettlement(form);
                    promiseCreateSettlement.then((value) => {
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
                        } else if (value.statusCode >= 200 && value.statusCode <= 299) {
                            console.log(value.message)
                            resolve(value)
                        } else {
                            console.log('not properly connected to database')
                            resolve(-1)
                        }
                    })

                } else if (value.body.transaction_complete == false) {
                    console.log('transaction has not been paid and cannot be refunded')
                    resolve(value)
                } else {
                    console.log('transaction cannot be chargebacked')
                    resolve(value)
                }

            } else {
                console.log('passing on the error message')
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
                        holdAmt = holdAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == false) {
                        console.log('chargeback')
                        chargebackAmt = chargebackAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == false) {
                        console.log('refund')
                        refundAmt = refundAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == false) {
                        console.log('top-up')
                        topupAmt = topupAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == false) {
                        console.log('wallet payment')
                        walletPaymentAmt = walletPaymentAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == false) {
                        console.log('wallet refund')
                        walletRefundAmt = walletRefundAmt + value.body[i].amount
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
                        holdAmt = holdAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 2 && value.body[i].transaction_complete == true) {
                        console.log('chargeback')
                        chargebackAmt = chargebackAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 3 && value.body[i].transaction_complete == true) {
                        console.log('refund')
                        refundAmt = refundAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 4 && value.body[i].transaction_complete == true) {
                        console.log('top-up')
                        topupAmt = topupAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 5 && value.body[i].transaction_complete == true) {
                        console.log('wallet payment')
                        walletPaymentAmt = walletPaymentAmt + value.body[i].amount
                    }
                    if (value.body[i].transaction_type == 6 && value.body[i].transaction_complete == true) {
                        console.log('wallet refund')
                        walletRefundAmt = walletRefundAmt + value.body[i].amount
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

