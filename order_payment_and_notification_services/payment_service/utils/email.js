const axios = require("axios");

const sendNotifications = async (message) => {
  console.log("Notification sent :- ", message);
  return await axios.post(
    process.env.NOTIFICATION_SERVICE + "/api/notifications/",
    message,
  );
};
module.exports = {
  sendNotifications,
};
