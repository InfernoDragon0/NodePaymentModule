var cosmosConfig = {}

cosmosConfig.endpoint = "~your DocumentDB endpoint uri here~";
cosmosConfig.primaryKey = "~your primary key here~";

cosmosConfig.database = {
    "id": "jElement"
};

cosmosConfig.collection = {
    "id": "customerBTdetails"
};

cosmosConfig.documents = [
    {
        "customer_id": "1",
        "customer_BTwalletToken":"token1"
    },
        {
        "customer_id": "2",
        "customer_BTwalletToken":"token1"
    },
        {
        "customer_id": "3",
        "customer_BTwalletToken":"token1"
    }
    ];

module.exports = cosmosConfig;

