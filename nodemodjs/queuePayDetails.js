const storageAzure = require('azure-storage')
// const retryOperations = new azure.ExponentialRetryPolicyFilter();
// const tblSvc = azure.createTableService(config.tblAccountName, config.tblAccessKey1).withFilter(retryOperations);

let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=jiraffeteststorage;AccountKey=aojV/ZUm2XJWgE31TYp4SK4igk5/6UVCjn+fagDG0Hr0BemXs9PipCJy5Sca+VwpaT7eYLozaCDL9YHyCdq9AA==;EndpointSuffix=core.windows.net'
// test link to caleb azure storage , dele in finnal
// let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=testqueuecaleb;AccountKey=1zBghaTPU9cjp5J8Ea/LSGp8B5EtUWPnL0V6P+8JnW60eCkuZhNGCoZ6/rEeXneVVOFVnwKiwS/FUtd1b6f+vw==;EndpointSuffix=core.windows.net'
// let successMessage = { address: 'get address from bot', type: 'PAY_SUCCESS', text: 'send necessary details' };
// let failureMessage = { address: 'get address from bot', type: 'PAY_FAILURE', text: 'send necessary details' }; // json text : card details , amount

module.exports.sendPayDetailsToQueueSucess = sendPayDetailsToQueueSucess;
module.exports.sendPayDetailsToQueueFailure = sendPayDetailsToQueueFailure;

//Send pay details to azure queue if pay is sucess 
function sendPayDetailsToQueueSucess(storageAddress, transactionDetails){
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

