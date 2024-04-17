// services/sentimentService.js
const axios = require('axios');

exports.analyzeSentiment = async (text) => {
  const response = await axios.post('/sentiment-analysis', { text });
  return response.data.sentiment;
};
