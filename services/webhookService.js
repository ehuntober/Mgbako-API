// services/webhookService.js
const axios = require('axios');

exports.sendWebhook = async (url, event, data) => {
  await axios.post(url, { event, data });
};
