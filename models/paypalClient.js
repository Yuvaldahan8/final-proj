
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv')env.;(); // טוען את משתני הסביבה מקובץ .env

// הגדרת משתני סביבת עבודה
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// הגדרת סביבת Sandbox
function environment() {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// הגדרת סביבת Live (השתמש בסביבת Live כאשר תעבור לייצור)
// function environment() {
//     return new paypal.core.LiveEnvironment(clientId, clientSecret);
// }

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
