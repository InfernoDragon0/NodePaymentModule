var cosmosConfig = {}

cosmosConfig.endpoint = "https://jepayphrase1.documents.azure.com:443/";
cosmosConfig.primaryKey = "WNkCU96wTrjNXtXUknl1BTbyCdMMFZpigVBilvudK0CDnAC1Mfi16W4N1OhYgXrGvk73AaWX1EqctHxegWigFg==";

cosmosConfig.database = {
    "id": "jElement"
};

cosmosConfig.collection = {
    "id": "customerBTdetails"
};
// insert data here
cosmosConfig.documents = [
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

cosmosConfig.replaceDocuments = [
    {
        "id": "2",

    }
    ];

cosmosConfig.deleteDocuments = [
    {
        "id": "1",

    }
    ];
module.exports = cosmosConfig;

