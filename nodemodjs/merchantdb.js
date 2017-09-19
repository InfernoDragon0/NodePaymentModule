// response specific transaction

function RetrieveMerchantTransactions(merchantId) {

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
                if (value.body[i].fk_merchant_id == merchantId) {
                    arrayJson.push(value.body[i]);
                }
            }
            res.send(arrayJson);

        } else {
            console.log('passing on the error message')
            resolve(value);
        }
    })

};

// response specific branch

var branchId = 'branchId';

var promiseRetrieveTransactions = api.retrieveTransactions();

promiseRetrieveTransactions.then((value) => {
    if (value.statusCode == 200) {
        for (var i = 0; i < value.body.length; i++) {
            if (value[i].fk_branch_id == branchId) {
                arrayJson.push(value[i]);
            }
        }
        res.send(arrayJson);

    } else if (value.statusCode == 400) {
        res.send(value.message)
    } else if (value.statusCode == 404) {
        res.send(value.message)
    } else if (value == "Unauthorized") {
        res.send("Unauthorized User")
    } else {
        console.log(err)
        res.send(err)
    }
})