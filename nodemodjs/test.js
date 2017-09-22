



function getValue1() {
    return new Promise((resolve, reject) => {
        var value1 = [
            {
                "transaction_id": 6,
                "merchant_id": 5,
                "transaction_amount": 100.00,
                "create_at": "datestring"
            },
            {
                "transaction_id": 5,
                "merchant_id": 4,
                "transaction_amount": 123.00,
                "create_at": "datestring"
            },
            {
                "transaction_id": 3,
                "merchant_id": 4,
                "transaction_amount": 100.00,
                "create_at": "datestring"
            },
            {
                "transaction_id": 2,
                "merchant_id": 5,
                "transaction_amount": 321.00,
                "create_at": "datestring"
            },
            {
                "transaction_id": 1,
                "merchant_id": 3,
                "transaction_amount": -100.00,
                "create_at": "datestring"
            },
            {
                "transaction_id": 7,
                "merchant_id": 3,
                "transaction_amount": 600.00,
                "create_at": "datestring"
            }
        ]
        resolve(value1)
    })
}

function getValue2() {
    return new Promise((resolve, reject) => {
        var value2 = [
            {
                "merchant_id": 4,
                "merchant_name": "fintech consortium",
            },
            {
                "merchant_id": 5,
                "merchant_name": "caleb inc",
            },
            {
                "merchant_id": 3,
                "merchant_name": "da pian",
            }
        ]
        resolve(value2)
    })
}

// function merge() {
//     return new Promise((resolve, reject) => {
//         var promiseGetValue1 = getValue1();
//         promiseGetValue1.then((value1) => {

//             var promiseGetValue2 = getValue2();
//             promiseGetValue2.then((value2) => {


//                 for (var i = 0; i < value1.length; i++) {
//                     for (var a = 0; a < value2.length; a++) {
//                         if (value1[i].user_id == value2[a].user_id) {
//                             value1[i].merchant_name = value2[a].merchant_name
//                         }
//                     }
//                 }
//                 console.log(value1)
//                 resolve(value1)
//             })

//         })
//     })
// }

function yolo() {
    return new Promise ((resolve, reject)=>{
    var promiseGetValue1 = getValue1();
    promiseGetValue1.then((value1) => {
        var array = []
        var array1 = []
        var stop = 0;
                
                    for (var a = 0; a < value1.length; a++) { // transaction counter     
                    
                            array.push(value1[a].merchant_id)
                }
                
            // console.log(array)
            var unique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; })


            for (var b = 0; b< unique.length; b++){
                var promiseLetsMerge = letsMerge(unique[b]);
                promiseLetsMerge.then((value)=>{


                    // console.log(value)                    
                    array1.push(value)
                    stop ++
                    if(stop === unique.length){
                        console.log(array1)
                        resolve.apply(array1)
                    }
                })
            }

    })
})
};

yolo();

function letsMerge(merchant_idd){
    return new Promise ((resolve, reject)=>{
    openPromise1 = getValue1()
    openPromise1.then((transaction_result)=>{
        openPromise2 = getValue2()
            openPromise2.then((merchant_names)=>{
                var body = {
                    "merchant_id": 0,
                    "merchant_name": 0,
                    "settlement_amount": 0,
                    "transaction_ids": {}
                }
                // body.settlement_amount = 0
                var amount=0
                var newArray = []
                for(var counter = 0 ; counter < transaction_result.length;counter ++){
                    if(transaction_result[counter].merchant_id == merchant_idd){
                        body.merchant_id =merchant_idd
                        amount = amount +transaction_result[counter].transaction_amount
                        newArray.push(transaction_result[counter].transaction_id)
                    
                        // console.log()
                        // body.settlement_amount = body.settlement_amount+transaction_result.transaction_amount
                    }
                    for(var counter2 = 0 ; counter2 <merchant_names.length ; counter2++){
                        if(transaction_result[counter].merchant_id = merchant_names[counter2].merchant_id ){
                            body.merchant_name=merchant_names[counter2].merchant_name
                        }
                    }
                }
                body.transaction_ids =newArray
                body.settlement_amount = amount
                // console.log('total Amount :'+amount)
                // console.log(body)
                resolve(body)
                // resolve("1")
            })
    })
})
}

// letsMerge(3)
// letsMerge(4)
// letsMerge(5)

// function letsMerge(merchant_idd){
//     return new Promise ((resolve, reject)=>{
//     openPromise1 = getValue1()
//     openPromise1.then((transaction_result)=>{
//         openPromise2 = getValue2()
//             openPromise2.then((merchant_names)=>{
//                 var body = {
//                     "merchant_id": 0,
//                     "merchant_name": 0,
//                     "settlement_amount": 0,
//                     "transaction_ids": {}
//                 }
//                 // body.settlement_amount = 0
//                 var amount=0
//                 var newArray = []
//                 for(var counter = 0 ; counter < transaction_result.length;counter ++){
//                     if(transaction_result[counter].merchant_id == merchant_idd){
//                         body.merchant_id =merchant_idd
//                         amount = amount +transaction_result[counter].transaction_amount
//                         newArray.push(transaction_result[counter].transaction_id)
                    
//                         // console.log()
//                         // body.settlement_amount = body.settlement_amount+transaction_result.transaction_amount
//                     }
//                     for(var counter2 = 0 ; counter2 <merchant_names.length ; counter2++){
//                         if(transaction_result[counter].merchant_id = merchant_names[counter2].merchant_id ){
//                             body.merchant_name=merchant_names[counter2].merchant_name
//                         }
//                     }
//                 }
//                 body.transaction_ids =newArray
//                 body.settlement_amount = amount
//                 console.log('total Amount :'+amount)
//                 console.log(body)
//                 resolve(body)
//             })
//     })
// })
// }
// money = array[c].settlement_amount
// array[c].total_amount = money
// money = 0;

// money = array[c].settlement_amount + value1[a].transaction_amount
//         array[c].settlement_amount = money
//         money = 0;