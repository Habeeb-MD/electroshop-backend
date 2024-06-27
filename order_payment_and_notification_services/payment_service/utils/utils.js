const axios = require("axios");
const email = require("./email");
// Mock function to simulate external payment gateway
const processPaymentWithGateway = async (
  amount,
  paymentGateway,
  paymentDetails,
) => {
  // Simulate a call to an external payment gateway
  return {
    status: "success",
    gateway_response: {
      transaction_id: Math.trunc(Math.random() * 1e9),
      amount: amount,
      paymentGateway: paymentGateway,
      paymentDetails: paymentDetails,
    },
  };
};

const sendNotifications = async (userId, recipientEmail, message) => {
  await email.sendNotifications({
    userId,
    recipientEmail,
    templateId: 1,
    subject: "Transaction completed Successfully",
    data: message,
  });
  console.log("notification sent successfully");
};

const getUser = async (userID) => {
  const USER_SERVICE = process.env.USER_SERVICE_URL + "/users";
  try {
    const response = await axios.get(`${USER_SERVICE}/${userID}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with ID ${userID}: ${error.message}`);
  }
};
module.exports = {
  processPaymentWithGateway,
  sendNotifications,
  getUser,
};
