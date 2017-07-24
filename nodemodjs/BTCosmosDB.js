var cosmosConfig = require("./BTCosmosconfig");
var docdbClient = require("documentdb").DocumentClient;
var BTDatabasefunction = {};

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


// insert documents, edit documents in the config file
function getUserDocument(documents) {
    for (let i=0;i< documents.length; i++){
        let documentUrl=`${collectionUrl}/docs/${documents[i].id}`;

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
//getUserDocument(cosmosConfig.customerBTDetaildocuments);


// insert new client with new bttoken
function insertNewCustomerDataInput(data){
client.createDocument(collectionUrl, data, (err,created)=>{
    if(err){
     console.log(JSON.stringify(err));                 
    }
    else{
    console.log(JSON.stringify(created));
    }
    });
};
    function insertNewCustomer(newcustomer_id,newBTwalletToken){
    var new_id = newcustomer_id;
    // var newcustomer_id = '6';
    // var newBTwalletToken = 'token1';

    insertNewCustomerDataInput({'id': new_id,'customer_id': newcustomer_id,'customer_BTwalletToken':newBTwalletToken});
}
// how to use - inserNewClient("enter new customer_id here", "corresponding bt token")
//insertNewCustomer('17','token 17');





 // find client token for existing client ID
function findBTtoken(customerID) {
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrl,
        "Select * from root r where r.customer_id='"+customerID+"'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
            }
            else{
                for (let result of results) {
                    // console.log(JSON.stringify(result));
                //                     console.log("----------");
                // console.log(JSON.stringify(result));
                console.log("----------");
                var scustmoer_id = result["customer_id"];
                var scustomer_BTtoken= result["customer_BTwalletToken"]
               // console.log(result);
                console.log("----------");
                console.log("Searching Client ID: "+scustmoer_id);
                console.log("Coresponding BT Token: "+scustomer_BTtoken);
                resolve(result);
                
                }

              //resolve(results);
            }
        });
    });
};
// // findBTtoken(<customer_id>)
//findBTtoken(16);


//Change BT wallet token
function replace(documents,token) {
    let documentUrl=`${collectionUrl}/docs/${documents.customer_id}`;
    console.log (documentUrl);
    documents.id = documents.customer_id;
    //documents.customer_id = documents.id;
    documents.customer_BTwalletToken = token;
    console.log ("Updated Documents");
    console.log (documents);
    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, documents, (err, result) => {
             if (err) {
                console.log(JSON.stringify(err));
            }
            else{
                resolve(result);
            }
        });
    });
}
// // id = client id 
// // replace(customer_id,token)
//replace({"customer_id": "16"}, "token 16");


//Delete document, change the id in the config file before running the function
function deleteDoc(documents) {
    let documentUrl=`${collectionUrl}/docs/${documents.id}`;
    return new Promise((resolve, reject) => {
        client.deleteDocument(documentUrl, documents, (err, result) => {
             if (err) {
                console.log(JSON.stringify(err));
            }
            else{
                resolve(result);
                console.log("Deleted customer_id: " +documents.id);
            }
        });
    });
}
//deleteDoc(cosmosConfig.deleteDocuments[0]);


module.exports = BTDatabasefunction;
module.exports.insertNewCustomer = insertNewCustomer;