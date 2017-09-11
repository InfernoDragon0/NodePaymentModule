var phase2 = require('./phase2.js');

// retrieve transaction id than create settlement for that transaction


var promiseRetrieveIdTransaction = phase2.retrieveIdTransaction(transactionId);

promiseRetrieveIdTransaction.then((value)=>{
    if (value != null){
        console.log(value.transaction_id)
        console.log(value.merchant_id)
        console.log(value.branch_id)
        console.log(value.transaction_type)
        console.log(value.transaction_amount)

        if (value.transaction_type == 0){

        }else{
            res.send("transaction is not successful")
        }

    }else{
        console.log(err)
        res.send("fail to create settlement for transaction : "+ transactionId)
    }
})

var b = totalValue('40')
console.log(b)

function totalValue(value) {// see total value 
    var newValue = (value * 0.975) - 0.5
    // console.log(newValue);
    return newValue;
};

function commission(value) {
    var newCommission = (value * 0.025) + 0.5
    // console.log(newValue);
    return newCommission;
};

// Testing

// var promiseTest = phase2.test();

// var num;

// promiseTest.then((value) => {


//             if (value != null) {
//                 num = value;
//                 console.log(num)
//                 console.log('this worked')
//                 return num;
//             }
//             else {
//                 console.log('this does not work')
//             }
//         })

// console.log('num is ' + num)