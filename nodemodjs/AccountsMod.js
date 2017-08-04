const docdbClient = require("documentdb").DocumentClient;

const cosmosConfig = {}
    cosmosConfig.endpoint = 'https://jepayphrase1.documents.azure.com:443/';
    cosmosConfig.primaryKey = 'WNkCU96wTrjNXtXUknl1BTbyCdMMFZpigVBilvudK0CDnAC1Mfi16W4N1OhYgXrGvk73AaWX1EqctHxegWigFg==';
const client = new docdbClient(cosmosConfig.endpoint,{masterKey: cosmosConfig.primaryKey});

const databaseUrl =`dbs/jElement`;
const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;


function transactionDetails(transactionID) {
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrltransactionDetail,
        "Select * from c where c.id='"+transactionID+"'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            }
            else{
                if (results.length < 1) {
                    console.log('No data found');
                    resolve('-1');
                    return;
                }
                for (let result of results) {

                // retrieving variables  from results
                var transaction_id = result['transaction_id'];
                var customer_id = result['customer_id'];
                var merchant_id = result['merchant_id'];
                var btTransaction_id = result['btTransaction_id'];
                var datetime = result['datetime'];
                var amount = result['amount'];
                var order_id = result['order_id'];
                var transcation_detail = result['transcation_detail'];
                
                // for testings = outputing variables 
                console.log('transaction_id ='+transaction_id);
                console.log('customer_id ='+customer_id);
                console.log('merchant_id ='+merchant_id);
                console.log('btTransaction_id ='+btTransaction_id);
                console.log('datetime ='+datetime);
                console.log('amount ='+amount);
                console.log('order_id ='+order_id);
                console.log('transcation_detail ='+transcation_detail);
                }
            }
        });
    });
};

transactionDetails('7');