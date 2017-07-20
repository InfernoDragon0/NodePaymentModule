/**
 * Authenticator to do 6 digit pin and 2FA things
 */

var fakepinAuths = {"1" : "wUKw1LaFWay2weUen7Ru6PMNfLMJp3o375Ie4R6VHWw=", "2" : "v1r2UoZHJtDuMSRufnsv68sLuNYlEyS5kNjFqy6ap70=", "3" : "g+e+RBczVGl5XME9OvPu+c5jw/YllUkoY2aOR01EnsI="};
var timetoexpire = 15000;
var crypto = require('crypto');
var encryption = 'sha256';

module.exports.checkAuthorized = checkAuthorized;
module.exports.authRequest = authRequest;

function checkAuthorized(session) {
    var timenow = Math.floor(Date.now() / 1000);
    if (timenow - session.authorized > timetoexpire) {
        return true;
    }
    else {
        return false;
    }
}

function authRequest(sess, user, pin) {
    console.log("pin is " + pin);
    console.log("user is" + user);   
    if (fakepinAuths.hasOwnProperty(user)) {
        var hashverify = crypto.createHash('sha256').update(pin).digest('base64');
        console.log("hash is " + fakepinAuths[user]);
        console.log("hashed pin is " + crypto.createHash('sha256').update(pin).digest('base64'));
        if (hashverify == fakepinAuths[user]) {
            sess.authorized = Math.floor(Date.now() / 1000); //sets current time as authorized timing
            return true;
        }
        else {       
            return false;
        }
    }
    else {
        return false;
    }
}
