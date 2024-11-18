const axios = require('axios');

exports.logAction = async (actionData) => {
  try {
    await axios.post(`${process.env.HISTORY_SERVICE_URL}`, actionData);
  } catch (error) {
    console.error('Failed to log action:', error);
  }
};
