const axios = require('axios');
const qs = require('qs'); // נשתמש ב-qs כדי לעבד את הנתונים לפורמט הנכון

const accessToken = process.env.FACEBOOK_ACCESS_TOKEN; // טוקן הגישה שקיבלת
const pageId = process.env.FACEBOOK_PAGE_ID; // ID של העמוד שלך

exports.postToFacebook = async (name, description, price) => {
    const message = `ALERT! NEW PRODUCT JUST ADDED TO OUR WEB! COME VIST:) : ${name}\nDescription: ${description}\nPrice: $${price}`;

    try {
        const response = await axios.post(`https://graph.facebook.com/${pageId}/feed`, 
        qs.stringify({
            message: message,
            access_token: accessToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Successfully posted to Facebook:', response.data);
    } catch (error) {
        console.error('Error posting to Facebook:', error.response ? error.response.data : error.message);
    }
};
