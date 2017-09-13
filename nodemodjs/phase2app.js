
const cvars = require("./commonvariables.js");

//// FOR ALL CHARGEBACK

function RetrieveDisputes(transactionid, res) {
    cvars.gateway.disputes.search(transactionid, )
};

var stream = gateway.dispute.search(function (search) {
    search.customerId().is("the_customer_id");
}, function (err, response) {
    response.each(function (err, dispute) {
        console.log(dispute.amount);
    });
});


/**
* API Description:
* This is retrieve disputes for every single day
 * @param {*var} res
*
*/

function RetrieveDailyChargeback(res) {

    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    var stream = cvars.gateway.transaction.search(function (search) {
        search.disputeDate().min(yesterday);
    });

    if (stream != null){
        var body = JSON.parse(search.disputeDate().min(yesterday))
        res.send(body);
    }else{
        console.log(err);
        res.send(err);
    }

};


/**
* API Description:
* This is retrieve transactions created for every single day
*
*/

var today = new Date();
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

var stream = gateway.transaction.search(function (search) {
  search.createdAt().min(yesterday);
});


