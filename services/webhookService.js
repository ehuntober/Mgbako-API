const axios = require('axios');

exports.sendWebhook = async (url, event, data) => {
  try {
    const response = await axios.post(url, { event, data });
    console.log('Webhook sent successfully:', response.status);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Webhook Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Webhook Error: No response received');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Webhook Error:', error.message);
    }
  }
};