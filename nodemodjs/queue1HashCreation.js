const storageAzure = require('azure-storage')
// const retryOperations = new azure.ExponentialRetryPolicyFilter();
// const tblSvc = azure.createTableService(config.tblAccountName, config.tblAccessKey1).withFilter(retryOperations);

let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=calebqueue1hashcreation;AccountKey=fNArUQy/Z3uvwhPUefMeYes/bv/FkuckFlJ40xzBxS8CfaBdUBJHQa8F7S0vsHmVPHqpqzCWDtpj15bx1kIhSA==;EndpointSuffix=core.windows.net'

module.exports.sendBotTransactionDetailsToTable = sendBotTransactionDetailsToTable;

var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableSvc = azure.createTableService().withFilter(retryOperations);
var entGen = azure.TableUtilities.entityGenerator;

function sendBotTransactionDetailsToTable(storageAddress, bottransactionDetails, genHash){
var tDetails = {
                PartitionKey: entGen.String('transactionDetail4Hash'),
                RowKey: entGen.String('1'),
                description: entGen.String(bottransactionDetails),
                hashAssociated: entGen.String(genHash)
            }
var tableName ='b2sTransactionDetails';
tableSvc.insertEntity(tableName,tDetails, function (error, result, response) {
  if(!error){
    console.log("Entity insertion Succesful!");
    console.log("-----");
    consoloe.log ("Table : "+ tableName);
    console.log("Associated Hash :" + hashAssociated);
    console.log("Entity inserted: " +description);
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
    };

































let queueMessage = { address: storageAddress, type: 'PAY_SUCCESS', text: transactionDetails };

let queueSvc = storageAzure.createQueueService(AzureWebJobsStorage);
queueSvc.createQueueIfNotExists('payqueue', function(err, result, response){
    if(!err){
        let queueMessageBuffer = new Buffer(JSON.stringify(queueMessage)).toString('base64');
        queueSvc.createMessage('payqueue', queueMessageBuffer, function(err, result, response){
            if(!err){
                // success here
            } else {
                console.log("Error sending queue");
                console.log ("details =" + JSON.stringify(queueMessage));
                // error adding message to queue
            }
        });
    } else {
        // error creating queue
        console.log("Error creating queue");
                console.log (JSON.stringify(err));
    }
});
};

function sendPayDetailsToQueueFailure(storageAddress, transactionDetails){
let queueMessage = { address: storageAddress, type: 'PAY_FAILURE', text: transactionDetails };

let queueSvc = storageAzure.createQueueService(AzureWebJobsStorage);
queueSvc.createQueueIfNotExists('payqueue', function(err, result, response){
    if(!err){
        let queueMessageBuffer = new Buffer(JSON.stringify(queueMessage)).toString('base64');
        queueSvc.createMessage('payqueue', queueMessageBuffer, function(err, result, response){
            if(!err){
                // success here
            } else {
                console.log("Error sending queue");
                console.log ("details =" + JSON.stringify(queueMessage));
                // error adding message to queue
            }
        });
    } else {
        // error creating queue
        console.log("Error creating queue");
                console.log (JSON.stringify(err));
    }
});
};

