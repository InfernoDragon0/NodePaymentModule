var cosmosConfig = require("./calebtest2config");
var docdbClient = require("documentdb").DocumentClient;

var client = new docdbClient(cosmosConfig.endpoint,{masterKey: cosmosConfig.primaryKey});

var HttpStatusCodes = { NOTFOUND: 404 }


var databaseUrl =`dbs/${cosmosConfig.database.id}`;
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
//createCollectionIfNotExists();

function getUserDocument(documents) {
    for (let i=0;i< documents.length; i++){
        let documentUrl=`${collectionUrl}/docs/${documents[i].customer_id}`;

        client.readDocument(documentUrl, null, (err,result)=>{
            if(err){
                if (err.code == HttpStatusCodes.NOTFOUND){
                    client.createDocument(collectionUrl, documents[i], (err,created)=>{
                        if(err){
                            console.log(JSON.stringify(err));
                        
                        }
                         else{
                           console.log(JSON.stringify(created));
                    

                        }
                    });
                }
                else{
                    console.log(JSON.stringify(err));
                }
            }
            else {
                console.log(JSON.stringify(result));
            }
        });
    }
}

getUserDocument(cosmosConfig.documents);