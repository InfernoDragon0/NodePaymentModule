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










// PLEASE HELP HERE //

 //getUserDocument(cosmosConfig.documents);
 
//  // Run select query in Document DB
// function query() {
//     return new Promise((resolve, reject) =>{
//         client.queryDocuments(collectionUrl,
//         "Select * from root r where r.customer_id='1'").toArray((err, results)=>{
//             if (err) {
//                 console.log(JSON.stringify(err));
//             }
//             else{
//                 for (let result of results) {
//                     console.log(JSON.stringify(result));
//                 }
//                 resolve(results);
//             }
//         });
//     });
// };
// //query();

// function query() {
//     return new Promise((resolve, reject) =>{
//         client.queryDocuments(collectionUrl,
//         "Select * from root r where r.customer_id='1'").toArray((err, results)=>{
//             console.log("adsadsa"+JSON.stringify(results));
//             if (err) {
//                 console.log(JSON.stringify(err));
//             }
//             else{
//                 for (let result of results) {
//                     let resultString = JSON.stringify(result);
//                     console.log(`\tQuery returned ${resultString}`);




//                     console.log(JSON.stringify(result));
//                     var test1 = JSON.stringify(result)
//                     db.close();
//             }
//                             console.log("tester: "+test1);
//                             var retrieved_client_id = results["customer_id"];
//                             var retrieved_client_token = results["customer_BTwalletToken"];
//                             console.log("---");
//                             console.log("---");
//                             console.log("return data from server");
//                             console.log("Client ID :" + retrieved_client_id);
//                             console.log("Corresponding token :" + retrieved_client_token);
//                 resolve(results);
//                 console.log("testest"+results);
//             }
//         });
//     });
// };
// query();

 // Run select query in Document DB
function query() {
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrl,
        "Select * from root r where r.customer_id='1'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
            }
            else{
                for (let result of results) {
                    console.log(JSON.stringify(result));
                }
                resolve(results);
            }
        });
    });
};
//query();

function queryCollection() {
    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
             "Select * from root r where r.customer_id='1'"
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                  //  console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
                
            }
        });
    });
};
queryCollection();





// here//
// i wan to run the query and store the result, i have no idea how to store the result




















//update database
function replace(documents) {
    let documentUrl=`${collectionUrl}/docs/${documents.id}`;
    console.log (documentUrl);
    documents.customer_BTwalletToken = "token2";
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
// // [0] = 1 and [1] = 2
replace(cosmosConfig.replaceDocuments[0]);


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


