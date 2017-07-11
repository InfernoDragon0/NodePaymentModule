var button = document.querySelector('#submit-button');
    
braintree.dropin.create({
    authorization: clienttoken,
    container: '#dropin-container'
}, function (createErr, instance) {
    button.addEventListener('click', function () {
        if (createErr) {
         // Handle any errors that might've occurred when creating Drop-in 
         console.error(createErr);
         return;
        }
        instance.requestPaymentMethod(function (err, payload) {
            if (err) {
                alert("There is an error processing the card: " + err);
                console.error(err);
                return;
            }
            // Submit payload.nonce to your server
            console.log("payload is " + payload.nonce);
            alert("nonce is " + payload.nonce + "\n Use nonce for payment stuffs");
        });
    });
});