const paypal = require('@paypal/checkout-server-sdk');

// הגדרת משתני סביבת עבודה
const clientId = 'process.env.PAYPAL_CLIENT_ID  ';
const clientSecret = 'process.env.PAYPAL_CLIENT_SECRET';

// הגדרת סביבת Sandbox
function environment() {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// הגדרת סביבת Live
// function environment() {
//     return new paypal.core.LiveEnvironment(clientId, clientSecret);
// }

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
