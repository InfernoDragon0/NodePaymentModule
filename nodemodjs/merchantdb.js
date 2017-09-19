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
    
    // getBranch();