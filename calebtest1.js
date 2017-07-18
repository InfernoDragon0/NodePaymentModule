var DocumentClient = require('documentdb').DocumentClient;

var host = "https://jepayphrase1.documents.azure.com:443/";                     // Add your endpoint
var masterKey = "WNkCU96wTrjNXtXUknl1BTbyCdMMFZpigVBilvudK0CDnAC1Mfi16W4N1OhYgXrGvk73AaWX1EqctHxegWigFg==";  // Add the masterkey of the endpoint
var client = new DocumentClient(host, {masterKey: masterKey});

var databaseDefinition = { id: "jElement1" };
var collectionDefinition = { id: "customerBTdetails1" };
var documentDefinition = { customer_id: "1", BTwallet_token: "token1" };

client.createDatabase(databaseDefinition, function(err, database) {
    if(err) return console.log(err);
    console.log('created db');
    console.log('test 1: '+ database.content);

    client.createCollection(database._self, collectionDefinition, function(err, collection) {
        if(err) return console.log(err);
        console.log('created collection');
        console.log('test 1: '+ database.content);
        console.log('test 2: '+ collection.content);

        client.createDocument(collection._self, documentDefinition, function(err, document) {
            if(err) return console.log(err);
            console.log('Created Document with content: ', document.content);
                    console.log('----------------------');
                    console.log('test 1: '+ database.content);
                    console.log('test 2: '+ collection.content);
                    console.log('test 3: '+ document.content);


            cleanup(client, database);
        });
    });
});
/*
function cleanup(client, database) {
    client.deleteDatabase(database._self, function(err) {
        if(err) console.log(err);
    })
}
*/