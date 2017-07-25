const azure = require('azure-storage')
// connection to queue 1
let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=calebqueue1hashcreation;AccountKey=fNArUQy/Z3uvwhPUefMeYes/bv/FkuckFlJ40xzBxS8CfaBdUBJHQa8F7S0vsHmVPHqpqzCWDtpj15bx1kIhSA==;EndpointSuffix=core.windows.net'

module.exports.sendBotTransactionDetailsToTable = sendBotTransactionDetailsToTable;
module.exports.searchQueue1Storage=searchQueue1Storage;


var retryOperations = new azure.ExponentialRetryPolicyFilter();
var entGen = azure.TableUtilities.entityGenerator;

function sendBotTransactionDetailsToTable(genHash,address,payment,merchantID,clientID){
var tDetails = {
                PartitionKey: entGen.String('transactionDetail4Hash'),
                //rowkey in the future will be hash, in order to avoid colision
                RowKey: entGen.String('1'),
                hashAssociated: entGen.String(genHash),
                savedAddress:entGen.String(address),
                payment:entGen.String(payment),
                merchantId:entGen.String(merchantID),
                clientId:entGen.String(clientID)
                
            }
let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
tableSvc.createTableIfNotExists('b2sTransactionDetails', function(error, result, response){
  if(!error){
      let tDetailsBuffer = new Buffer(JSON.stringify(tDetails)).toString('base64');
      tableSvc.insertEntity('b2sTransactionDetails',tDetails, function (error, result, response) {
        if(!error){
            console.log("Entity insertion Succesful!");
            console.log("-----");
            // console.log ("Table : "+ tableName);
            // console.log("Associated Hash :" + hashAssociated);
            console.log("Entity inserted: " +tDetails);
                console.log("-----");
                console.log("test");
                console.log("-----");
                console.log(result);
                console.log("-----");
                console.log(response);
        }
        else{
            console.log(error);
        }
            });
    // Table exists or created
  }
  else{
      console.log(error);
  }
});


};

//sendBotTransactionDetailsToTable("genhash1","address1","payment1","merchantID-1","clientID-1");

function searchQueue1Storage(hash){
let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
tableSvc.retrieveEntity('b2sTransactionDetails', 'transactionDetail4Hash',hash, function(error, result, response){
  if(!error){
    // result contains the entity
    console.log (result);
    var testDescription = result.description;
    // var test11=result.description.test1;
    console.log ("test Description :" + JSON.stringify(testDescription));
    // console.log ("test11 :" + JSON.stringify(test11));

  }
});
};

//searchQueue1Storage('1');

function deleEntityFromQueue1(hash){
var task = {
  PartitionKey: {'_':'transactionDetail4Hash'},
  RowKey: {'_': hash}
};
let tableSvc = azure.createTableService(AzureWebJobsStorage).withFilter(retryOperations);
tableSvc.deleteEntity('b2sTransactionDetails', task, function(error, response){
  if(!error) {
      console.log("entity sucessfully deleted!");;
    // Entity deleted
  }
});
};

//deleEntityFromQueue1("1");
