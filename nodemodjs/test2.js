// var date = new Date('04/12/2012 07:00')
// date = date.getTime();

// console.log(date)

var api = require('./databaseApiCallp2.js')

var func = require('./admindb.js')

function test() {
    return new Promise((resolve, reject)=>{
    var promiseRetrieveTransactions = func.RetrieveTransactions();
    promiseRetrieveTransactions.then((value) => {
        console.log(value)

        var array = []
        for (var i = 0; i < value.length; i++) {
        var tId = value[i].transaction_id
        var uId = value[i].fk_user_id
        var mId = value[i].fk_merchant_id
        var bId = value[i].fk_branch_id
        var cTime = value[i].create_at
        var tAmount = value[i].transaction_amount
        var tType = value[i].transaction_type

            var promiseRetrieveIdMerchant = api.retrieveIdMerchant(mId);

            promiseRetrieveIdMerchant.then((value) => {
                if(value.merchant_id == mId){
                    var mName = value.merchant_name

                    var data = {
                        "transaction_id" : tId,
                        "user_id" : uId,
                        "merchant_id" : mId,
                        "merchant_name" : mName,
                        "create_at" : cTime,
                        "transaction_amount" : tAmount,
                        "transaction_type" : tType
                    }
                    array.push(data)
                    console.log(data)
                }
            })

        }
        

    })
})
}


test();