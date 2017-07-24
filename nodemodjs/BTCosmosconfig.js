var cosmosConfig = {}

cosmosConfig.endpoint = "https://jepayphrase1.documents.azure.com:443/";
cosmosConfig.primaryKey = "WNkCU96wTrjNXtXUknl1BTbyCdMMFZpigVBilvudK0CDnAC1Mfi16W4N1OhYgXrGvk73AaWX1EqctHxegWigFg==";

cosmosConfig.database = {
    "id": "jElement"
};

cosmosConfig.collection = {
    "id": "customerBTDetail"
};
// insert data here


cosmosConfig.replaceDocuments = [
    {
        "id": "1",

    }
    ];

cosmosConfig.deleteDocuments = [
    {
        "id": "1",

    }
    ];

cosmosConfig.customerBTDetaildocuments = [
    {
        "id": "1",
        "customer_id": "1",
        "customer_BTwalletToken":"token1"
    },
        {
        "id": "2",
        "customer_id": "2",
        "customer_BTwalletToken":"token1"
    },
        {
        "id": "3",
        "customer_id": "3",
        "customer_BTwalletToken":"token1"
    }
    ];
///////////////////////////////////////////////////
cosmosConfig.transactionDocuments = [
    {
        "id": "1",
        "transaction_id": "1",
        "customer_id": "1",
        "merchant_id": "1",
        "btTransaction_id": "test_transaction_1",
        "datetime" : "test date",
        "amount": "100.00",
        "order_id": "1",
        "transcation_detail" : "Sucessful - purchase"
    }
    ];
    
cosmosConfig.orderDetailDocuments = [
    {
        "id": "1",
        "order_id": "1",
        "order_details": "food 1 x 2 , food 2 x 3"
    }
    ];
    
cosmosConfig.merchantDetailDocuments = [
    {
        "id": "1",
        "merchant_id": "1",
        "merchant_bankno":"xxxx-xxxx-xxxx-xxx",
        "bank_type":"DBS",
        "total_owing":"1000.00"
    }
    ];
    
cosmosConfig.customerJEPayDetailDocuments = [
    {
        "id": "1",
        "jePayWallet_id": "1",
        "customer_id":"1",
        "amount":"100.00",
        "description":"test wallet"
    }
    ];
module.exports = cosmosConfig;

