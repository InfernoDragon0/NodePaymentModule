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
        "customer_id": "4",
        "customer_BTwalletToken":"token1"
    },
        {
        "customer_id": "5",
        "customer_BTwalletToken":"token1"
    },
        {
        "customer_id": "6",
        "customer_BTwalletToken":"token1"
    }
    ];

module.exports = cosmosConfig;

