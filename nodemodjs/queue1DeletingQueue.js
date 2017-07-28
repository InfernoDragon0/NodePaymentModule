const storageAzure = require('azure-storage')

let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=calebqueue1hashcreation;AccountKey=fNArUQy/Z3uvwhPUefMeYes/bv/FkuckFlJ40xzBxS8CfaBdUBJHQa8F7S0vsHmVPHqpqzCWDtpj15bx1kIhSA==;EndpointSuffix=core.windows.net'

module.exports.deleteQueue = deleteQueue;


function deleteQueue(Hash, timeStamp) {
    let queueMessage = { PartitionKey: 'transactionUriHash', RowKey: Hash, unixTimestamp: timeStamp._ };

    let queueSvc = storageAzure.createQueueService(AzureWebJobsStorage);
    queueSvc.createQueueIfNotExists('transactionqueue', function (err, result, response) {
        if (!err) {
            let queueMessageBuffer = new Buffer(JSON.stringify(queueMessage)).toString('base64');
            queueSvc.createMessage('transactionqueue', queueMessageBuffer, function (err, result, response) {
                if (!err) {
                    // success here
                } else {
                    console.log("Error sending queue");
                    console.log("details =" + JSON.stringify(queueMessage));
                    // error adding message to queue
                }
            });
        } else {
            // error creating queue
            console.log("Error creating queue");
            console.log(JSON.stringify(err));
        }
    });
};

function sendPayDetailsToQueueFailure(storageAddress, transactionDetails) {
    let queueMessage = { address: storageAddress, type: 'PAY_FAILURE', text: transactionDetails };

    let queueSvc = storageAzure.createQueueService(AzureWebJobsStorage);
    queueSvc.createQueueIfNotExists('payqueue', function (err, result, response) {
        if (!err) {
            let queueMessageBuffer = new Buffer(JSON.stringify(queueMessage)).toString('base64');
            queueSvc.createMessage('payqueue', queueMessageBuffer, function (err, result, response) {
                if (!err) {
                    // success here
                } else {
                    console.log("Error sending queue");
                    console.log("details =" + JSON.stringify(queueMessage));
                    // error adding message to queue
                }
            });
        } else {
            // error creating queue
            console.log("Error creating queue");
            console.log(JSON.stringify(err));
        }
    });
};

