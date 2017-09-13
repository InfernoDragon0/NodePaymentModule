const request = require('superagent');

var url = 'http://858585d5.ngrok.io/api'

console.log('\n')// leave a space in the console

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

createToken();

function createToken() {
    return new Promise((resolve, reject) => {

        var primary_key = "NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=="
        request.POST(url + '/account/token')
            .set('Content-Type', 'application/json')
            .send({ "primary_key": primary_key })
            .end((err, res) => {
                if (res.statusCode == 200) {
                    console.log('Successful\n')
                    resolve(res);
                }
                else if (res.statusCode == 401) {
                    console.log('Unauthorized\n')
                    resolve(res);
                }
            })
    });
}

// Find all transaction records

module.exports.retrieveTransactions = retrieveTransactions;

function retrieveTransactions() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.GET(url + '/transaction')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Transaction details retrieved successfully\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Transaction not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Add transaction record

module.exports.createTransaction = createTransaction;

function createTransaction(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.POST(url + '/transaction')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(form)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Transaction Response\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid Transaction body\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Find transaction records by ID

module.exports.retrieveIdTransaction = retrieveIdTransaction;

function retrieveIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.GET(url + '/transaction/'+ transaction_id)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Transaction record retrieved successfully\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid ID supplied\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Transaction not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Delete transaction record by ID

module.exports.deleteIdTransaction = deleteIdTransaction;

function deleteIdTransaction(transaction_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.DELETE(url + '/transaction/' + transaction_id)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 204) {
                        console.log('Successfully deleted Transaction\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid ID supplied\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Transaction not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

//Find all settlements records

module.exports.retrieveSettlements = retrieveSettlements;

function retrieveSettlements() {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.GET(url + '/settlement')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Settlement details retrieved successfully\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Settlement not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Add settlement record

module.exports.createSettlement = createSettlement;

function createSettlement(form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.POST(url + '/settlement')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(form)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Settlement Response\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid Settlement body\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Find settlement records by ID

module.exports.retrieveIdSettlement = retrieveIdSettlement;

function retrieveIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.GET(url + '/settlement/'+ settlement_id)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Settlement record retrieved successfully\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid ID supplied\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Settlement not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Update a settlement record

module.exports.updateIdSettlement = updateIdSettlement;

function updateIdSettlement(settlement_id, form) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.PUT(url + '/settlement/' + settlement_id)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(form)
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Updated settlement\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid Settlement body\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Delete settlement record by ID

module.exports.deleteIdSettlement = deleteIdSettlement;

function deleteIdSettlement(settlement_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.DELETE(url + '/settlement/' + settlement_id)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    if (res.statusCode == 204) {
                        console.log('Successfully deleted Settlement\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid ID supplied\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 404) {
                        console.log('Settlement not found\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}

// Update an completed status

module.exports.confirmSettlement = confirmSettlement;

function confirmSettlement(settlement_id) {
    return new Promise((resolve, reject) => {
        var promiseCreateToken = createToken();
        promiseCreateToken.then((value) => {
            if (value.statusCode == 200) {
                var token = value.body.token
                request.PUT(url + '/settlement/completed')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({ "settlement_id" : `${settlement_id}`}) // check with caleb
                .end((err, res) => {
                    if (res.statusCode == 200) {
                        console.log('Updated settlement\n')
                        resolve(res);
                    }
                    else if (res.statusCode == 400) {
                        console.log('Invalid settlement\n')
                        resolve(res);
                    }
                })
            }
            else if (value.statusCode == 401) {
                resolve("Unauthorized");
            }
            else {
                console.log(err)
                resolve(err)
            }
        })
    });
}





var form = {
    "fk_merchant_id": 0,
    "fk_branch_id": 0,
    "fk_transaction_id": 0,
    "settlement_amount": 0
  }

// .send({primary_key: `${arg1}`}, {order_id: `${arg2}`})