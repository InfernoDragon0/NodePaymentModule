const cosmosConfig = require("./BTCosmosconfig");
const docdbClient = require("documentdb").DocumentClient;

const client = new docdbClient(cosmosConfig.endpoint,{masterKey: cosmosConfig.primaryKey});

const HttpStatusCodes = { NOTFOUND: 404 }


const databaseUrl =`dbs/${cosmosConfig.database.id}`;
const collectionUrl = `${databaseUrl}/colls/${cosmosConfig.collection.id}`;
const collectionUrlcustomerBTDetail = `${databaseUrl}/colls/customerBTDetail`;
const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;

module.exports.insertNewCustomer = insertNewCustomer;
module.exports.findBTtoken = findBTtoken;
module.exports.insertTransaction=insertTransaction;

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

function createCollectionIfNotExists(){
    client.readCollection(collectionUrlcustomerBTDetail, (err, result) => {
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





////////////////////////////////////Functions in Use////////////////////////////////////
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
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrlcustomerBTDetail,
        "Select * from root r where r.customer_id='"+newcustomer_id+"'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            }
            else{
                if (results.length < 1) {
                    console.log("No existing customer found");
                    insertNewCustomerDataInput({'id': newcustomer_id,'customer_id': newcustomer_id,'customer_BTwalletToken':newBTwalletToken});
                    resolve('-1');
                    return;
                }
                else{
                    console.log("Customer Exists");
                }

            }
        });
    });
};

 // find client token for existing client ID
function findBTtoken(customerID) {
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrlcustomerBTDetail,
        "Select * from root r where r.customer_id='"+customerID+"'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            }
            else{
                if (results.length < 1) {
                    console.log("No data found");
                    resolve('-1');
                    return;
                }
                for (let result of results) {
                console.log("----------");
                var scustmoer_id = result["customer_id"];
                var scustomer_BTtoken= result["customer_BTwalletToken"];
                console.log("----------");
                console.log("Searching Client ID: "+scustmoer_id);
                console.log("Coresponding BT Token: "+scustomer_BTtoken);
                resolve(scustomer_BTtoken);
                }
            }
        });
    });
};

function addTransaction2db(data) {
    client.createDocument(collectionUrltransactionDetail, data, (err, created) => {
        if (err) {
            console.log(JSON.stringify(err));
        }
        else {
            console.log(JSON.stringify(created));
        }
    });
}
function insertTransaction(customer_id, merchant_id, btTransaction_id, datetime, amount, order_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                }
                else {
                    var id1 = results.length;
                    var id = JSON.stringify(id1 + 1);
                    var transaction_id = id;
                    Console.log("Transaction Sucessful");
                    Console.log("Transaction ID : "+transaction_id);
                    addTransaction2db({
                        'id': id,
                        'transaction_id': transaction_id,
                        'customer_id': customer_id,
                        'merchant_id': merchant_id,
                        'btTransaction_id': btTransaction_id,
                        'datetime': datetime,
                        'amount': amount,
                        'order_id': order_id,
                        'transaction_detail': 'Sucessful - Purchase'
                    });
                };
            });
    });
};



////////////////////////////////////Functions here not in use yet////////////////////////////////////
//Change BT wallet token
function replace(documents,token) {
    let documentUrl=`${collectionUrl}/docs/${documents.customer_id}`;
    documents.id = documents.customer_id;
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


