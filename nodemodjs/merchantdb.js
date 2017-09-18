// response specific transaction

var merchantId = 'merchantId';

var promiseRetrieveTransactions = api.retrieveTransactions();

promiseRetrieveTransactions.then((value)=>{
    if (value.statusCode == 200){
        for(var i = 0; i < value.body.length ; i ++){
            if(value[i].fk_merchant_id == merchantId){
                arrayJson.push(value[i]);
            }
        }
        res.send(arrayJson);
        
    }else if (value.statusCode == 400){
        res.send(value.message)
    }else if (value.statusCode == 404){
        res.send(value.message)
    }else if (value == "Unauthorized"){
        res.send("Unauthorized User")
    }else{
        console.log(err)
        res.send(err)
    }
})

// response specific branch

var branchId = 'branchId';

var promiseRetrieveTransactions = api.retrieveTransactions();

promiseRetrieveTransactions.then((value)=>{
    if (value.statusCode == 200){
        for(var i = 0; i < value.body.length ; i ++){
            if(value[i].fk_branch_id == branchId){
                arrayJson.push(value[i]);
            }
        }
        res.send(arrayJson);
        
    }else if (value.statusCode == 400){
        res.send(value.message)
    }else if (value.statusCode == 404){
        res.send(value.message)
    }else if (value == "Unauthorized"){
        res.send("Unauthorized User")
    }else{
        console.log(err)
        res.send(err)
    }
})