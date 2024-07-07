const axios = require("axios");

const sendNotifications = async (message) => {
  console.log("sending notification :- ", message);
  return await axios.post(process.env.NOTIFICATION_SERVICE_URL, message);
};
module.exports = {
  sendNotifications,
};
