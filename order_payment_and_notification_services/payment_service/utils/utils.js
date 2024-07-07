// Mock function to simulate external payment gateway
const processPaymentWithGateway = async (
  amount,
  paymentGateway,
  paymentDetails,
) => {
  // Simulate a call to an external payment gateway
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("transaction completed successfully");
      resolve();
    }, 500);
  });

  return {
    status: "success",
    gatewayResponse: {
      transactionId: Math.trunc(Math.random() * 1e9),
      amount: amount,
      paymentGateway: paymentGateway,
    },
  };
};

module.exports = {
  processPaymentWithGateway,
};
