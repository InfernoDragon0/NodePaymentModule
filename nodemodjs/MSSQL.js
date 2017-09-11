var crypto = require('crypto');
var encryption = 'sha256';

module.exports.insertNewCustomer = insertNewCustomer;

function insertNewCustomer(newcustomer_id, newBTwalletToken, customer_contact_no, pin_6digit) {
    pin_6digit = crypto.createHash('sha256').update(pin_6digit).digest('base64');
    return new Promise((resolve, reject) => {

        var Connection = require('tedious').Connection;//mssql library module
        var Request = require('tedious').Request;

        // Create connection to database
        var config =
            {
                userName: 'accountant', // database owner name
                password: 'Abcd1234Abcd1234',
                server: 'ASUS', // database server host

                options:
                {
                    port: 1433,
                    database: 'testDB',
                    encrypt: true

                }
            }
        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }
            else {
                console.log('\nConnection Successful!\n')
                request = new Request("select * from jpay.customerDetails where customerId = '" + newcustomer_id + "'",
                    function (err, rowCount, rows) {
                        if (err) { console.log(err) };
                        if (rowCount >= 1) {
                            console.log('customer exists...\n')
                        } else {
                            console.log('no existing customer found ...\n')
                            var data = "'" + newcustomer_id + "','" + newBTwalletToken + "','" + customer_contact_no + "','" + newcustomer_id + "','" + 0 + "','" + pin_6digit + "',''"
                            insertNewCustomerDataInput(data);
                            resolve('-1')
                            return;
                        }
                    });

                connection.execSql(request);
            }
        });



        function insertNewCustomerDataInput(data1) {

            var Connection = require('tedious').Connection;//mssql library module
            var Request = require('tedious').Request;

            // Create connection to database
            var config =
                {
                    userName: 'accountant', // database owner name
                    password: 'Abcd1234Abcd1234',
                    server: 'ASUS', // database server host

                    options:
                    {
                        port: 1433,
                        database: 'testDB',
                        encrypt: true

                    }
                }
            var connection = new Connection(config);

            // Attempt to connect and execute queries if connection goes through
            connection.on('connect', function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    request2 = new Request("insert into jpay.customerDetails values (" + data1 + ")", function (err, rowCount, rows) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('inserting customer ...\n')
                            process.exit();
                        }
                    });

                    connection.execSql(request2);

                };

            });

        };

    });

};


// insertNewCustomer('20008', 'customerToken6', '96969696', '123456');

module.exports.findBTtoken = findBTtoken;

function findBTtoken(customerID) {
    return new Promise((resolve, reject) => {
        var Connection = require('tedious').Connection;//mssql library module
        var Request = require('tedious').Request;

        // Create connection to database
        var config =
            {
                userName: 'accountant', // database owner name
                password: 'Abcd1234Abcd1234',
                server: 'ASUS', // database server host

                options:
                {
                    port: 1433,
                    database: 'testDB',
                    encrypt: true

                }
            }
        var connection = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }
            else {
                console.log('\nConnection Successful!\n')
                request1 = new Request("select customerToken from jpay.customerDetails where customerId = '" + customerID + "'",
                    function (err, rowCount, rows) {
                        if (err) { console.log(err) };
                        if (rowCount == '1') {
                            console.log('customer token found for id = ' + customerID)

                        } else {
                            console.log('no customer found\n')
                            resolve('-1');
                            return;
                        }
                    });

                request1.on('row', function (columns) {
                    var scustomer_BTtoken = 0;
                    columns.forEach(function (column) {
                        scustomer_BTtoken = column.value;
                    })
                    console.log(scustomer_BTtoken);
                    resolve(scustomer_BTtoken);
                })

                connection.execSql(request1);
            }
        });

    });
};

// findBTtoken(20000);

module.exports.addRefund = addRefund;

function addRefund(transactionId, transactAmt) {

    return new Promise((resolve, reject) => {
    var Connection = require('tedious').Connection;//mssql library module
    var Request = require('tedious').Request;

    // Create connection to database
    var config =
        {
            userName: 'accountant', // database owner name
            password: 'Abcd1234Abcd1234',
            server: 'ASUS', // database server host

            options:
            {
                port: 1433,
                database: 'testDB',
                encrypt: true

            }
        }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\nConnection Successful!\n')
            console.log('retrieving transaction details ... \n')
            request1 = new Request("select * from jpay.transactions where transactionsId = '" + transactionId + "'",
                function (err, rowCount, rows) {
                });
            var data = []

            request1.on('row', function (columns) {
                columns.forEach(function (column) {
                    data.push(column.value);
                });

                var customerId = data[1];
                var merchantId = data[2];
                var branchId = data[3];
                var braintreeId = data[4];
                // var transactDate = new Date();// use later

                if (transactAmt > data[6]) {
                    console.log('transaction amount is more than refundable amount...\n')
                    resolve('0');
                    process.exit();
                } if (transactAmt <= data[6]) {
                    console.log('good to go with transaction amount\n')
                }

                // var transactDesc = 'Refund for transaction id: ' + transactionId //maybe implemented later
                // var transactType = '3' //maybe implemented later
                // var transactCheck = 'N' //maybe implemented later

                // console.log('customerId : ' +customerId)
                // console.log('merchantId : ' +merchantId)
                // console.log('branchId : ' + branchId)
                // console.log('braintreeId : ' +braintreeId)
                // console.log('refundDate : ' +transactDate)
                // console.log('refundAmt : ' +transactAmt)
                // console.log('refundDesc : ' +transactDesc) //maybe implemented later
                // console.log('refundType : ' +transactType) // maybe implemented later
                // console.log('transactCheck : ' +transactCheck) // maybe implemented later
                searchRows (transactionId,customerId, merchantId, branchId, braintreeId, transactAmt)
                resolve('1')
            });

            connection.execSql(request1);


        }
    });

    });//close promise

    function searchRows(transactionsId,customerId1, merchantId1, branchId1, braintreeId1, transactAmt1) {
        var Connection = require('tedious').Connection;//mssql library module
        var Request = require('tedious').Request;
    
    
        // Create connection to database
        var config =
            {
                userName: 'accountant', // database owner name
                password: 'Abcd1234Abcd1234',
                server: 'ASUS', // database server host
    
                options:
                {
                    port: 1433,
                    database: 'testDB',
                    encrypt: true
    
                }
            }
        var connection = new Connection(config);
    
    
        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
            }
            else {
                requestSearch = new Request(
                    "select * from jpay.transactions", function (err, rowCount, rows) {
                    if (err){console.log(err)}
                        var transactionsId1 = rowCount + 1;
                        insertRefund(transactionsId,transactionsId1, customerId1, merchantId1, branchId1, braintreeId1, transactAmt1)
                    });
    
                connection.execSql(requestSearch);
            }
        });
    
        function insertRefund(transactionId0,transactionsId2, customerId2, merchantId2, branchId2, braintreeId2, transactAmt2){
            var Connection = require('tedious').Connection;//mssql library module
            var Request = require('tedious').Request;
        
        
            // Create connection to database
            var config =
                {
                    userName: 'accountant', // database owner name
                    password: 'Abcd1234Abcd1234',
                    server: 'ASUS', // database server host
        
                    options:
                    {
                        port: 1433,
                        database: 'testDB',
                        encrypt: true
        
                    }
                }
            var connection = new Connection(config);
        
        
            // Attempt to connect and execute queries if connection goes through
            connection.on('connect', function (err) {
                if (err) {
                }
                else {
                    var transactDate2 = new Date();
                    var transactDesc2 = 'Refund for transaction id: ' + transactionId0 //maybe implemented later
                    var transactType2 = '3' //maybe implemented later
                    var transactCheck2 = 'N' //maybe implemented later
    
                    console.log('transactionsId : ' +transactionsId2)
                    console.log('customerId : ' +customerId2)
                    console.log('merchantId : ' +merchantId2)
                    console.log('branchId : ' + branchId2)
                    console.log('braintreeId : ' +braintreeId2)
                    console.log('refundDate : ' +transactDate2)
                    console.log('refundAmt : ' +transactAmt2)
                    console.log('refundDesc : ' +transactDesc2) //maybe implemented later
                    console.log('refundType : ' +transactType2) // maybe implemented later
                    console.log('transactCheck : ' +transactCheck2) // maybe implemented later
    
                    console.log('inserting refund transactions')
                    requestInsert = new Request(
                        "insert into jpay.transactions values ('"+transactionsId2+"','"+customerId2+"','"+merchantId2+"','"+branchId2+"','"+braintreeId2+"','"+transactDate2+"','"+transactAmt2+"','"+transactDesc2+"','"+transactType2+"','"+transactCheck2+"')", function (err, rowCount, rows) {
                        if (err){console.log(err)}
                            
                        });
        
                    connection.execSql(requestInsert);
                }
            });
        }
    };
}

// addRefund('4', '100');

module.exports.checkRefund = checkRefund;

function checkRefund(transactionId){
    return new Promise((resolve, reject) => {
        var Connection = require('tedious').Connection;//mssql library module
        var Request = require('tedious').Request;
    
    
        // Create connection to database
        var config =
            {
                userName: 'accountant', // database owner name
                password: 'Abcd1234Abcd1234',
                server: 'ASUS', // database server host
    
                options:
                {
                    port: 1433,
                    database: 'testDB',
                    encrypt: true
    
                }
            }
        var connection = new Connection(config);
    
    
        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', function (err) {
            if (err) {
            }
            else {
                requestSearch = new Request(
                    "select * from jpay.transactions where transactDesc = 'Refund for transaction id: "+transactionId+"'", function (err, rowCount, rows) {
                    if (err){console.log(err)}
                        if (rowCount == '0'){
                            console.log('this transaction can be refunded')
                        }else{
                            console.log('this transaction cannot be refunded')
                        }
                        resolve(rowCount);
                        reject(rowCount);
                    });
    
                connection.execSql(requestSearch);
            }
    });
});//close promise
};

// checkRefund('4')

module.exports.checkModified = checkModified;

function checkModified(transaction_id){
    
        return new Promise((resolve, reject) => {
    
            var Connection = require('tedious').Connection;//mssql library module
            var Request = require('tedious').Request;
        
            var q = {
    
                schema : 'jpay',
                table : 'transactions',
                cName : 'transactionsId',
                cValue : transaction_id
    
            }
        
            // Create connection to database
            var config =
                {
                    userName: 'accountant', // database owner name
                    password: 'Abcd1234Abcd1234',
                    server: 'ASUS', // database server host
        
                    options:
                    {
                        port: 1433,
                        database: 'testDB',
                        encrypt: true
        
                    }
                }
            var connection = new Connection(config);
        
        
            // Attempt to connect and execute queries if connection goes through
            connection.on('connect', function (err) {
                if (err) {
                }
                else {
                    request = new Request(
                        "select * from "+q.schema+"."+q.table+" where "+q.cName+" = '"+q.cValue+"'", function (err, rowCount, rows) {
                        if (err){console.log(err)}
                            if (rowCount >= '1'){
                                console.log('this transaction has been modified')
                            }else{
                                console.log('this transaction has not been modified')
                            }
                            resolve(rowCount);
                            reject(rowCount);
                        });
        
                    connection.execSql(request);
                }
        });
    });//close promise
    }
    
    checkModified('1');