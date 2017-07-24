const storageAzure = require('azure-storage')
const retryOperations = new azure.ExponentialRetryPolicyFilter();
const tblSvc = azure.createTableService(config.tblAccountName, config.tblAccessKey1).withFilter(retryOperations);

let AzureWebJobsStorage = 'DefaultEndpointsProtocol=https;AccountName=jiraffeteststorage;AccountKey=aojV/ZUm2XJWgE31TYp4SK4igk5/6UVCjn+fagDG0Hr0BemXs9PipCJy5Sca+VwpaT7eYLozaCDL9YHyCdq9AA==;EndpointSuffix=core.windows.net'

// let successMessage = { address: 'get address from bot', type: 'PAY_SUCCESS', text: 'send necessary details' };
// let failureMessage = { address: 'get address from bot', type: 'PAY_FAILURE', text: 'send necessary details' }; // json text : card details , amount
let queueMessage = { address: 'get address from bot', type: 'PAY_SUCCESS', text: 'send necessary details' };

let queueSvc = storageAzure.createQueueService(AzureWebJobsStorage);
queueSvc.createQueueIfNotExists('payqueue', function(err, result, response){
    if(!err){
        let queueMessageBuffer = new Buffer(JSON.stringify(queueMessage)).toString('base64');
        queueSvc.createMessage('payqueue', queueMessageBuffer, function(err, result, response){
            if(!err){
                // success here
            } else {
                // error adding message to queue
            }
        });
    } else {
        // error creating queue
    }
});
