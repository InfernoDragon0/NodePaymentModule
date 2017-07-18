var cosmosConfig = require("./calebtest2config");
var docdbClient = require("documentdb").DocumentClient;

var client = new docdbClient(cosmosConfig.uri,{masterKey: cosmosConfig.primaryKey});

var HttpStatusCodes = { NOTFOUND: 404 }

var databaseUrl = `dbs/${cosmosConfig.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${cosmosConfig.collection.id}`;

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
createDbIfNotExists();