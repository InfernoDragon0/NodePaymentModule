const azure = require('azure-storage')
const customer = require('./customer.js');
var BTDatabaseFunction = require("./BTCosmosDB");
// connection to queue 1
let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=calebqueue1hashcreation;AccountKey=fNArUQy/Z3uvwhPUefMeYes/bv/FkuckFlJ40xzBxS8CfaBdUBJHQa8F7S0vsHmVPHqpqzCWDtpj15bx1kIhSA==;EndpointSuffix=core.windows.net'

module.exports.sendBotTransactionDetailsToTable = sendBotTransactionDetailsToTable;
module.exports.searchQueue1Storage = searchQueue1Storage;


var retryOperations = new azure.ExponentialRetryPolicyFilter();
var entGen = azure.TableUtilities.entityGenerator;

function sendBotTransactionDetailsToTable(genHash, address, payment, merchantID, clientID) {
    var tDetails = {
        PartitionKey: entGen.String('transactionDetail4Hash'),
        //rowkey in the future will be hash, in order to avoid colision
        RowKey: entGen.String(genHash),
        hashAssociated: entGen.String(genHash),
        savedAddress: entGen.String(address),
        paymentAmt: entGen.String(payment),
        merchantId: entGen.String(merchantID),
        clientId: entGen.String(clientID),
        timeStamp1: entGen.String(Date.now())

    }
    let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
    tableSvc.createTableIfNotExists('b2sTransactionDetails', function (error, result, response) {
        if (!error) {
            let tDetailsBuffer = new Buffer(JSON.stringify(tDetails)).toString('base64');
            tableSvc.insertEntity('b2sTransactionDetails', tDetails, function (error, result, response) {
                if (!error) {
                    console.log("Entity insertion Succesful!");
                    console.log("-----");
                    // console.log ("Table : "+ tableName);
                    // console.log("Associated Hash/RowKey :" + RowKey);
                    console.log("Entity inserted: " + tDetails);
                    // console.log("-----");
                    // console.log("test");
                    // console.log("-----");
                    // console.log(result);
                    // console.log("-----");
                    // console.log(response);
                }
                else {
                    console.log(error);
                }
            });
            // Table exists or created
        }
        else {
            console.log(error);
        }
    });


};

//sendBotTransactionDetailsToTable("genhash1","address1","payment1","merchantID-1","clientID-1");

function searchQueue1Storage(hash,res,sess,page) {
    let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
    tableSvc.retrieveEntity('b2sTransactionDetails', 'transactionDetail4Hash', hash, function (error, result, response) {
        if (!error) {
            // result contains the entity
            console.log("Search Result");
            console.log(result);
            var q2payment= result.paymentAmt._;
            var q2merchant=result.merchantId._;
            var q2clientid=result.clientId._;
            var q2savedAddress=result.savedAddress._;
            var TimeoutTimer =result.timeStamp1._+300000; // 5minutes
            var timeNow = Date.now();
            // console.log("result time test :" +testTime);
            // console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());
            // console.log("Date.now :" +Date.now());
            // console.log("Time.now :" +Time.now());
            if(timeNow<TimeoutTimer){
            var cpromise = BTDatabaseFunction.findBTtoken(q2clientid);
            cpromise.then(function(customertoken) {
                customer.openCustomerPay(sess, q2payment, customertoken, q2merchant, res, page, q2savedAddress); //find customer, if customer not found overwrite but this should not happen
               
                console.log("vars are " + customertoken + " q2payment " + q2payment + " q2merchant " + q2merchant + "q2address " + q2savedAddress);
        console.log(TimeoutTimer);
            console.log(result.timeStamp1._ );
            console.log(Date.now());     
        }); 
        }else{
            console.log(" HASH TIMED OUT ");  
            console.log(TimeoutTimer);
            console.log(result.timeStamp1._ )
            console.log(Date.now()); 
            console.log(Date.now(1000));
             }
        
        }
        else{
            console.log("error has occured");
            console.log(error);
            // console.log("Error: Entity not found");
            // console.log("Hash Token: "+hash);
            if(result==null){
                console.log("Error: Entity not found");
                console.log("Hash Token: "+hash);
            }
        };
    });
};

// searchQueue1Storage('83kUh4HmuS3d%2FZaawqdQzWEtP0Ufgw3kQLNMdnQlipc',"1",'1','1');

function deleEntityFromQueue1(hash) {
    var task = {
        PartitionKey: { '_': 'transactionDetail4Hash' },
        RowKey: { '_': hash }
    };
    let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
    tableSvc.deleteEntity('b2sTransactionDetails', task, function (error, response) {
        if (!error) {
            console.log("entity sucessfully deleted!");;
            // Entity deleted
        }
    });
};

//deleEntityFromQueue1("1");
