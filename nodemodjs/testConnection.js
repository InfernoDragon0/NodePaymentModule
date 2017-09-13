const request = require('superagent');

var url = 'http://858585d5.ngrok.io/api'

createToken('NnGUnatosykldCDs6mss5Ma4tBGlb6Wyue912JLQ==');
function createToken(primary_key) {
    return new Promise((resolve, reject) => {
        request.post(url + '/account/token')
            .set('Content-Type', 'application/json')
            .send({ "primary_key": primary_key })
            .end((err, res) => {
                console.log(res.statusCode);
                if (res.statusCode >= 200 && res.statusCode < 299) {
                    console.log("haha"+res.body.token);
                    resolve(res.body.token)
                }
                else if (res.statusCode == 401) {
                        console.log('Unauthorized')
                        resolve('unauthorized')
                }
                else {
                    console.log('err =', err);
                    reject(err)
                }
            })
    });
}



// function sendMessage() {
//     return new Promise((resolve, reject) => {

//         var arg1 = "NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=="
//         var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVuaXF1ZV9uYW1lIjoiSm9ob3JCYWhydSBEZXZlbG9wZXIgQWNjZXNzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiaWF0IjoxNTA1Mjc4ODQxLCJuYmYiOjE1MDUyNzg4NDEsImV4cCI6MTUwNTUzODA0MSwianRpIjoiYzg4NjY2YjBjYzUwNDMxNWJiNmJjZGFlZjU3NzdlZjcifQ.JmbRpirEK7jBiZpCXsOfLmBhAoIp_0KuZ_b_Rpgkm6frkY6i7tU_NWWu8X3UH7paz06WrkNPQNTJZ578IJSHP7iXsrmA8RS7TnE7ljp8qINekTsf11UT57bnbX_mqoqD399HqZraMysb1TtSkv46dmRqS2p7OkeNbeySRTMNngCPQrV25_t14WWQA7TqkpowoS_X4sZ_dZdtDQf_n48uwVN6_YE8lWm2i1richc4iAPu2U99CvebG0UvHX_8aFxO__LJ_vpC4-EK6op9ZvCy5TnW34bNgorAavyW4GYAQzzWZh_An7y7-dilrs_GU5sNshDL5diUzHoYvNfoGG4ldA"
//         request.post(url + '/transaction')
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json')
//             .set('Authorization', 'Bearer ' + token)
//             .send({
//                 "fk_user_id": 2,
//                 "fk_merchant_id": 2,
//                 "fk_branch_id": 2,
//                 "braintree_transaction_id": "string",
//                 "transaction_amount": 2,
//                 "transaction_type": 2
//             })
//             .end((err, res) => {
//                 if (err) {
//                     console.log('err =', err);
//                     reject(err)
//                 } else {
//                     console.log(res.body);
//                     //resolve(res.text)
//                 }
//             })
//     });
// }

function sendMessage() {
    return new Promise((resolve, reject) => {
        var transaction_id = '81807032-4f95-41d7-94ad-08d4fa64f6e5'
        var arg1 = "NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ=="
        var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVuaXF1ZV9uYW1lIjoiSm9ob3JCYWhydSBEZXZlbG9wZXIgQWNjZXNzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiaWF0IjoxNTA1Mjc4ODQxLCJuYmYiOjE1MDUyNzg4NDEsImV4cCI6MTUwNTUzODA0MSwianRpIjoiYzg4NjY2YjBjYzUwNDMxNWJiNmJjZGFlZjU3NzdlZjcifQ.JmbRpirEK7jBiZpCXsOfLmBhAoIp_0KuZ_b_Rpgkm6frkY6i7tU_NWWu8X3UH7paz06WrkNPQNTJZ578IJSHP7iXsrmA8RS7TnE7ljp8qINekTsf11UT57bnbX_mqoqD399HqZraMysb1TtSkv46dmRqS2p7OkeNbeySRTMNngCPQrV25_t14WWQA7TqkpowoS_X4sZ_dZdtDQf_n48uwVN6_YE8lWm2i1richc4iAPu2U99CvebG0UvHX_8aFxO__LJ_vpC4-EK6op9ZvCy5TnW34bNgorAavyW4GYAQzzWZh_An7y7-dilrs_GU5sNshDL5diUzHoYvNfoGG4ldA"
        request.delete(url + '/transaction/' + transaction_id)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) {
                    console.log('err =', err);
                    reject(err)
                } else {
                    console.log(res.body);
                    //resolve(res.text)
                }
            })
    });
}

// sendMessage();


function retrieveTransactions() {
    return new Promise((resolve, reject) => {

        request(url + '/transaction', function (error, response, body) {
            if (response.code >= 200 <= 299) {
                console.log('Transaction details retrieved successfully')
                resolve(JSON.parse(body));
            }
            if (response.code >= 400) {
                console.log('Invalid')
                resolve(JSON.parse(body));
            }
            if (response.code <= 499) {
                console.log('Transaction not found')
                resolve(JSON.parse(body));
            }
            else {
                console.log('error:', error);
                resolve('0');// DataType: Failed to Fetch
            }
        })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer' + token);
    })// close promise
};