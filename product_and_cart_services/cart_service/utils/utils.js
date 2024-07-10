const axios = require("axios");

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
module.exports = { authStatus, fetchProductDetails };
