const axios = require("axios");
const email = require("./email");

const fetchProductDetails = async (productId) => {
  const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch product with ID ${productId}: ${error.message}`,
    );
  }
};
const createAndProcessTransaction = async (
  orderId,
  amount,
  paymentGateway,
  paymentDetails,
) => {
  const PAYMENT_SERVICE_URL = `${process.env.PAYMENT_SERVICE_URL}/create-and-process-transaction`;
  try {
    const response = await axios.post(`${PAYMENT_SERVICE_URL}`, {
      orderId,
      amount,
      paymentGateway,
      paymentDetails,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Transaction failed for order ID ${orderId}: ${error.message}`,
    );
  }
};

const authStatus = async (token) => {
  const AUTH_SERVICE = process.env.AUTH_SERVICE_URL + "/authStatus";
  try {
    const response = await axios.get(AUTH_SERVICE, {
      headers: {
        Cookie: `jwt=${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
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
module.exports = {
  fetchProductDetails,
  authStatus,
  createAndProcessTransaction,
  sendNotifications,
};
