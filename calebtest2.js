var cosmosConfig = require("./calebtest2config");
var docdbClient = require("documentdb").DocumentClient;

var client = new docdbClient(cosmosConfig.endpoint,{masterKey: cosmosConfig.primaryKey});

var HttpStatusCodes = { NOTFOUND: 404 }


var databaseUrl =`dbs/${cosmosConfig.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${cosmosConfig.collection.id}`;
console.log (databaseUrl);
 
 var testUrl = "dbs/jElement";

function createDbIfNotExists(){
    client.readDatabase(databaseUrl, (err, result) => {
        if(err){
            client.createDatabase(cosmosConfig.database, (err, created) => {
                    if(err){
                        console.log(JSON.stringify(err));
                        
                    }
                    else{
                        console.log(JSON.stringify(created));
                    }
            });
        }
        else{
            console.log(JSON.stringify(result));
        }
    });
};

console.log(testUrl);
//createDbIfNotExists();

function createCollectionIfNotExists(){
    client.readCollection(collectionUrl, (err, result) => {
        if(err){
            client.createCollection(databaseUrl, cosmosConfig.collection, null, (err, created) => {
                    if(err){
                        console.log(JSON.stringify(err));
                        
                    }
                    else{
                        console.log(JSON.stringify(created));
                    }
            });
        }
        else{
            console.log(JSON.stringify(result));
        }
    });
};
createCollectionIfNotExists();