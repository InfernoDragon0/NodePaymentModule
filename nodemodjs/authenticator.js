/**
 * Authenticator to do 6 digit pin and 2FA things
 */

var fakepinAuths = {"1" : "121312", "2" : "131154", "3" : "665544"};
var timetoexpire = 15000;

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

function authRequest(sess, res, user, pin) {
    if (fakepinAuths.hasOwnProperty(user)) {
        if (pin == fakepinAuths[user]) {
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
