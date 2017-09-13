const request = require('superagent');

var url = 'http://858585d5.ngrok.io/api'

// createToken('NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ==');
function createToken() {
    return new Promise((resolve, reject) => {
        var primary_key = 'NnGUnatosykldCDs6m5Ma4tBGlb6Wyue912JLQ==';
        request.post(url + '/account/token')
            .set('Content-Type', 'application/json')
            .send({ "primary_key": primary_key })
            .end((err, res) => {
                console.log(res.statusCode);
                if (res.statusCode >= 200 && res.statusCode < 299) {
                    console.log("haha" + res.body.token);
                    resolve(res.body.token)
                }
                else if (res.statusCode == 401) {
                    console.log('Unauthorized')
                    resolve('unauthorized')
                }
                else {
                    console.log('err =', err);
                    reject(err)
                }
            })
    });
};

var promiseTest = retrieveUserByID(2);
promiseTest.then((value)=>{
    console.log(value)
})
// retrieveUserByID(2);

function retrieveUserByID(userID) {
     return new Promise((resolve, reject) => {
        var openPromise = createToken(); //move this 2 below return new promise
        openPromise.then((value) => {
            request.get(url + '/user/' + userID)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + value)
                .end((err, res) => {
                    console.log(res.statusCode);
                    if (res.statusCode >= 200 && res.statusCode < 299) {
                        // console.log("Retrieved Sucessfuly");
                        console.log(res.body)
                        resolve(res.body) // <<--- this one idk how
                    }
                    else if (res.statusCode == 401) {
                        console.log('Unauthorized')
                        resolve('unauthorized')
                    }
                    else {
                        console.log('err =', err);
                        reject(err)
                    }
                })
        });
    });
}

// createNewUserAccount("caleb12345","caleb","cheong","caleb@gmail.com","84828482","12345")
function createNewUserAccount(username, firstname, lastname, email, mobile_number, password) {
    
        return new Promise((resolve, reject) => {
            var openPromise = createToken();
        openPromise.then((value) => {
            request.post(url + '/user')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + value)
                .send({
                    "username": username,
                    "first_name": firstname,
                    "last_name": lastname,
                    "email": email,
                    "mobile_number": mobile_number,
                    "password": password
                })
                .end((err, res) => {
                    console.log(res.statusCode);
                    if (res.statusCode >= 200 && res.statusCode < 299) {
                        console.log("User account sucessfully created");
                        console.log(res.body)
                        resolve(res.body)
                    }
                    else if (res.statusCode == 401) {
                        console.log('Unauthorized')
                        resolve('unauthorized')
                    }
                    else {
                        console.log('err =', err);
                        reject(err)
                    }
                })
        });
    });
}
// createNewBrainTreeAccount(4,'testBrainTreeID12345')
function createNewBrainTreeAccount(user_id, braintree_ID) {
    
        return new Promise((resolve, reject) => {

            var openPromise = createToken();
    openPromise.then((value) => {
            request.post(url + '/braintree')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + value)
                .send({
                    "fk_user_id": user_id,
                    "braintree_user_id": braintree_ID
                })
                .end((err, res) => {
                    console.log(res.statusCode);
                    if (res.statusCode >= 200 && res.statusCode < 299) {
                        console.log("Braintree account sucessfully created, Linked to User :" + user_id);
                        console.log(res.body)
                        resolve(res.body)
                    }
                    else if (res.statusCode == 401) {
                        console.log('Unauthorized')
                        resolve('unauthorized')
                    }
                    else {
                        console.log('err =', err);
                        reject(err)
                    }
                })
        });
    });
}

// var testpromise = retrieveBrainTreeAccount(4)
// testpromise.then((value)=>{
//     console.log(value);
// })


// okay den i talk here , all got this problem uh but i show u 1 example 



function retrieveBrainTreeAccount(user_id) {
    var found = 0 // 0 = no existing, 1=found
    var openPromise = createToken();
    openPromise.then((value) => {
        return new Promise((resolve, reject) => {
            request.get(url + '/braintree')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + value)
                .end((err, res) => {
                    console.log(res.statusCode);
                    if (res.statusCode >= 200 && res.statusCode < 299) {

                        for (var counter = 0; counter < res.body.length; counter++) {
                            if (res.body[counter].fk_user_id == user_id) {
                                console.log(res.body[counter].fk_user_id)
                                console.log(res.body[counter].braintree_user_id)
                                found = 1
                                resolve(res.body[counter])
                            }
                        }
                        if (found == 0) {
                            console.log("No Braintree Account Found for User ID: " + user_id)
                            console.log("Please Create A Braintree Acount First")
                            resolve('No BrainTree Account found!')
                        }
                        else if (found == 1) {
                            console.log("Retrieved Sucessfuly");
                            resolve('boo')
                        }

                    }
                    else if (res.statusCode == 401) {
                        console.log('Unauthorized')
                        reject('unauthorized')
                    }
                    else {
                        console.log('err =', err);
                        reject(err)
                    }
                })
        });
    });
};







/*
  
 functions needed
  1. insertNewCustomer
  2. findBTtoken
  6. wallet transaction - top up
  7. wallet transaction - wallet payment
  8. wallet amt - check if sufficent fundss
  9. process wallet transaction - run function 8 , if sucess run 6/7
 
 
 
 
 
 */