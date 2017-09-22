// var date = new Date()
// date = date.getTime();

// console.log(date)


//  GET MERCHANT NAME

// var api = require('./databaseApiCallp2.js')

// function test() {
//     return new Promise((resolve, reject)=>{

//         var promise = api.retrieveTransactions();
//         promise.then((value1)=>{
//             console.log(value1)
//             var promise2 = api.retrieveMerchants();
//         promise.then((value2)=>{
//             for(var i = 0; i< value1.body.length; i++){
//                 for (var a = 0; a< value2.body.length; a++){
//                 if(value1.body[i].fk_merchant_id == value2.body[a].merchant_id){
//                     value1.body[i].merchant_name = value2.body[a].merchant_name
//                 }
//             }
//             }resolve(value1);
//         })
//         })
    
// }) // close promise
// }

// test();

function retrieveTransactions(){
    return new Promise((resolve, reject) => {
        var fakedata = { "body" : [
            {
                "transaction_id": "8d498a2e-071c-4ffd-b9f7-08d50188ec28",
                "fk_user_id": 1,
                "fk_merchant_id": 1,
                "fk_branch_id": 1,
                "braintree_transaction_id": "ABC-12345",
                "created_at": "2017-08-22T15:09:53.124686",
                "modified_at": "2017-08-22T15:12:14.582885",
                "transaction_amount": 30,
                "transaction_type": 1,
                "is_transaction_complete": true
            },
            {
                "transaction_id": "a8d8634c-df6f-454e-c4b3-08d5018d5f26",
                "fk_user_id": 1,
                "fk_merchant_id": 1,
                "fk_branch_id": 1,
                "braintree_transaction_id": "ABC-12345",
                "created_at": "2017-08-22T15:41:44.101732",
                "modified_at": "2017-08-22T15:41:44.10184",
                "transaction_amount": 30,
                "transaction_type": 1,
                "is_transaction_complete": false
            },
            {
                "transaction_id": "90da4e8c-0c7c-4a8f-c4b4-08d5018d5f26",
                "fk_user_id": 2,
                "fk_merchant_id": 2,
                "fk_branch_id": 2,
                "braintree_transaction_id": "ABC-12345",
                "created_at": "2017-08-22T15:45:27.831063",
                "modified_at": "2017-08-22T15:45:27.831077",
                "transaction_amount": 30,
                "transaction_type": 2,
                "is_transaction_complete": false
            },
            {
                "transaction_id": "90da4e8c-0c7c-4a8f-c4b4-08d5018d5f26",
                "fk_user_id": 2,
                "fk_merchant_id": 2,
                "fk_branch_id": 2,
                "braintree_transaction_id": "ABC-12345",
                "created_at": "2017-08-22T15:45:27.831063",
                "modified_at": "2017-08-22T15:45:27.831077",
                "transaction_amount": 50,
                "transaction_type": 2,
                "is_transaction_complete": false
            },
            {
                "transaction_id": "90da4e8c-0c7c-4a8f-c4b4-08d5018d5f26",
                "fk_user_id": 3,
                "fk_merchant_id": 1,
                "fk_branch_id": 2,
                "braintree_transaction_id": "ABC-12345",
                "created_at": "2017-08-22T15:45:27.831063",
                "modified_at": "2017-08-22T15:45:27.831077",
                "transaction_amount": 50,
                "transaction_type": 2,
                "is_transaction_complete": false
            }
        ],
        "statusCode" : 200}        
        resolve(fakedata)
    })
}

function retrieveSettlements(){
    return new Promise((resolve, reject) => {
        var fakedata = { 
            "body" : [
            {
                "settlement_id": 1,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T15:52:07.269461",
                "modified_at": "2017-09-22T15:52:07.269682"
            },
            {
                "settlement_id": 2,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T15:54:19.987141",
                "modified_at": "2017-09-22T15:54:19.987157"
            },
            {
                "settlement_id": 3,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T15:54:45.96288",
                "modified_at": "2017-09-22T15:54:45.962885"
            },
            {
                "settlement_id": 4,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T15:55:47.502024",
                "modified_at": "2017-09-22T15:55:47.50203"
            },
            {
                "settlement_id": 5,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T15:56:03.415476",
                "modified_at": "2017-09-22T15:56:03.41548"
            },
            {
                "settlement_id": 6,
                "fk_merchant_id": 5,
                "fk_branch_id": 4,
                "fk_transaction_id": 324234234,
                "is_transaction_complete": false,
                "settlement_amount": 400,
                "created_at": "2017-09-22T16:03:13.542197",
                "modified_at": "2017-09-22T16:03:13.542201"
            }
        ]
        ,
        "statusCode" : 200}        
        resolve(fakedata)
    })
}


function retrieveMerchants(){
    return new Promise((resolve, reject) => {
        var fakedata = { 
            "body" : [
                {
                    "merchant_id": 1,
                    "merchant_name": "fintech consortium",
                    "company_name": "fintech consortium",
                    "first_name": "thaddeus",
                    "last_name": "tan",
                    "email": "thaddeus0905@gmail.com",
                    "merchant_url": "thaddeus.com",
                    "mobile_number": "9890321",
                    "password": "10000:k0Onmn/hoz4d1v6rWQQHEYGtGp0lvWjm9HxKH+N2FsU=:Mb7wep2QUCucXzKYsCILAi1W15dljm+fh/WN2HyVmx8nZ2lzzGe5ZEfG1yrDdx3HaPPRogus8QDdAWXOt5JJkg==",
                    "created_at": "2017-09-20T12:30:40.584927",
                    "modified_at": "2017-09-20T12:30:40.585168",
                    "fk_merchant_status_code": 0,
                    "branches": []
                },
                {
                    "merchant_id": 2,
                    "merchant_name": "caleb inc",
                    "company_name": "caleb inc",
                    "first_name": "caleb",
                    "last_name": "cheong",
                    "email": "calebcheong98@gmail.com",
                    "merchant_url": "hhtps://www.calbee.com",
                    "mobile_number": "67873442",
                    "password": "10000:5Kkw+wfa8/cV1d0/bi/Sk9UqJcGZ6B1blyeS3m28aN4=:jfUgz61j+iA9sxb6VGkyM+4+PvdjV0FWnOEFD653cXwDkniRkhWqzBUcUTjK1L276mWsZu8wNGDs/C8thZsRwg==",
                    "created_at": "2017-09-20T12:32:33.825041",
                    "modified_at": "2017-09-20T12:32:33.825061",
                    "fk_merchant_status_code": 0,
                    "branches": []
                }
            ]            
        ,
        "statusCode" : 200}        
        resolve(fakedata)
    })
}


function retrieveBranches(){
    return new Promise((resolve, reject) => {
        var fakedata = { 
            "body" : [
                {
                    "branch_id": 16,
                    "merchant_id": 0,
                    "branch_name": "caleb 1",
                    "branch_address": "pasir ris",
                    "branch_phone": "50965898",
                    "branch_url": "google.com",
                    "first_name": "caleb",
                    "last_name": "cheong",
                    "email": "calebcheong@gmail.com",
                    "mobile_number": "68403392",
                    "password": "10000:j5ceNo1JegOaAXD10wVHhLD8T04kHczvS3/R/r3ENPA=:Up4zoczuquZxRxZN98R9KT+0X32901jCYhYD61P6Baf6BwcQIxODuFVMn21T+LrIEb1n9RcWy5MrdKKwZ1nUlA==",
                    "created_at": "2017-09-20T12:48:37.510196",
                    "modified_at": "2017-09-20T12:48:37.510298",
                    "fk_branch_status_code": 0
                },
                {
                    "branch_id": 17,
                    "merchant_id": 0,
                    "branch_name": "thaddeus 1",
                    "branch_address": "pasir ris",
                    "branch_phone": "50965898",
                    "branch_url": "habibi.com",
                    "first_name": "thaddeus",
                    "last_name": "tan",
                    "email": "thaddeus0905@gmail.com",
                    "mobile_number": "68403392",
                    "password": "10000:F2uQXlXqPVJ1LyRLdfO3durfqJlOcnyh+unR/Z0q9Jo=:kA21sUqK0uofNsoNoAHDYYReJnByAybIqpgmzyryqzqwGThugLKXgsU1Kzx+8O+aGk8kRwTm9v+PkyEZI4p9bg==",
                    "created_at": "2017-09-20T12:49:35.729315",
                    "modified_at": "2017-09-20T12:49:35.729327",
                    "fk_branch_status_code": 0
                }
            ]                     
        ,
        "statusCode" : 200}        
        resolve(fakedata)
    })
}

function retrieveUsers(){
    return new Promise((resolve, reject) => {
        var fakedata = { 
            "body" : [
                {
                    "user_id": 2,
                    "username": "kennetham",
                    "first_name": "Kenneth",
                    "last_name": "Ham",
                    "email": "k@contoso.com",
                    "mobile_number": "12345678",
                    "password": "10000:OKB85zH8Dnh6vVbthWFn1G0CXXswledMfRuJuZw/4YE=:vgPh+JAvdhZRg3lK8zPi9dRmPiTCOcNUFyeju03Ku5WOFi0aoVHq1CfcyhCKjPVi7AoH2a/2AAxmaFKNJ93ApA==",
                    "created_at": "2017-08-29T13:30:03.410966",
                    "modified_at": "2017-08-29T13:34:06.45114",
                    "fk_user_status_code": 0
                },
                {
                    "user_id": 3,
                    "username": "caleb123",
                    "first_name": "caleb",
                    "last_name": "cheong",
                    "email": "caleb@gmail.com",
                    "mobile_number": "84828482",
                    "password": "10000:n56gy4fSmiDowngUKsb4/D4cTMd/Oe82C0yLG3I5zHs=:OAmrSHzbidT0fQe3sJ2FPMpXEa8359uhnDAEPXMLDOpEKD87HJdc/DnNURsdHo+KNRF2yK5pcSglciHZ2MXx9w==",
                    "created_at": "2017-09-13T14:47:37.242017",
                    "modified_at": "2017-09-13T14:47:37.24223",
                    "fk_user_status_code": 0
                },
                {
                    "user_id": 4,
                    "username": "caleb12345",
                    "first_name": "caleb",
                    "last_name": "cheong",
                    "email": "caleb@gmail.com",
                    "mobile_number": "84828482",
                    "password": "10000:UfItc9860HB6zKcbsGumpPy48j/aiyEYTY2O7qZNWeU=:iBWFFyGNH5nfB20Hikdplvf+ZGRVVhPqw/bQ3YZl/ZS30UCJzxnsAuFoKA1LMiFD3nrX2AC5wRBzbLTQjk7AdQ==",
                    "created_at": "2017-09-13T15:38:54.848955",
                    "modified_at": "2017-09-13T15:38:54.848971",
                    "fk_user_status_code": 0
                },
                {
                    "user_id": 5,
                    "username": "Hou",
                    "first_name": "Hou",
                    "last_name": "Liang",
                    "email": "hou@gmail.com",
                    "mobile_number": "96876870",
                    "password": "10000:WHZxaJ8kpR3wi25BSQmadGf5lPYuiwdXodIrXQ3OcjE=:cGtoZoM3g3IrQ2bRD1Dl+ROfLbdmwDiFYQ8VcW+gJfVFVu0OYlJjDz8lbgz93ujUIIQL4ryy2+J6yqbeoeX6tg==",
                    "created_at": "2017-09-20T11:26:44.489317",
                    "modified_at": "2017-09-20T11:26:44.489512",
                    "fk_user_status_code": 0
                }
            ]                            
        ,
        "statusCode" : 200}        
        resolve(fakedata)
    })
}

function createTransaction (uId,mId,bId,btId,tAmt,tType){
    return new Promise((resolve, reject) => {
    var transaction = {  "fk_user_id": uId,
    "fk_merchant_id": mId,
    "fk_branch_id": bId,
    "braintree_transaction_id": btId,
    "transaction_amount": tAmt,
    "transaction_type": tType}

        var array = {"body" : []}
        array.body.push(transaction)
    
    resolve(array.body)
})
}

function createSettlement (mId,bId,tId,sAmt){
    return new Promise((resolve, reject) => {
    var settlement = {    
    "fk_merchant_id": 0,
    "fk_branch_id": 0,
    "fk_transaction_id": 0,
    "settlement_amount": 0
}

        var array = {"body" : []}
        array.body.push(transaction)
    
    resolve(array.body)
})
}

function retrieveIdTransaction (transactionId){
    return new Promise((resolve, reject) => {
 var promiseRetrieveTransaction = retrieveTransactions();
 promiseRetrieveTransaction.then((value)=>{
    for (var i = 0; i< value.body.length; i++){
         if(value.body[i].transaction_id == transactionId){
             resolve(value.body[i])
         }
     }
 })
})
}

// var promise = retrieveIdTransaction('a8d8634c-df6f-454e-c4b3-08d5018d5f26')

// promise.then((value)=>{
//     console.log(value)
// })

 
function yolo() {
    return new Promise ((resolve, reject)=>{
    var promiseRetrieveTransaction = retrieveTransactions();
    promiseRetrieveTransaction.then((value1) => {
        var array = []
        var array1 = []
        var stop = 0;
                
                    for (var a = 0; a < value1.body.length; a++) { // transaction counter     
                    
                            array.push(value1.body[a].fk_merchant_id)
                }
                
            var unique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
                console.log(unique)

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
    openPromise1 = retrieveTransactions()
    openPromise1.then((transaction_result)=>{
        openPromise2 = retrieveMerchants()
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
                for(var counter = 0 ; counter < transaction_result.body.length;counter ++){
                    if(transaction_result.body[counter].fk_merchant_id == merchant_idd){
                        body.merchant_id =merchant_idd
                        amount = amount +transaction_result.body[counter].transaction_amount
                        newArray.push(transaction_result.body[counter].transaction_id)
                    
                        // console.log()
                        // body.settlement_amount = body.settlement_amount+transaction_result.body.transaction_amount
                    }
                    for(var counter2 = 0 ; counter2 <merchant_names.body.length ; counter2++){
                        if(transaction_result.body[counter].merchant_id = merchant_names.body[counter2].merchant_id ){
                            body.merchant_name=merchant_names.body[counter2].merchant_name
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