const { Transaction } = require("../models");
const { processPaymentWithGateway } = require("../utils/utils");

const createTransaction = async (
  orderId,
  amount,
  paymentGateway,
  paymentDetails,
) => {
  // Check if a transaction already exists for this order
  const existingTransaction = await Transaction.findOne({
    where: { order_id: orderId },
  });

  if (existingTransaction) {
    if (
      existingTransaction.status === "initiated" ||
      existingTransaction.status === "approved"
    ) {
      throw new Error(
        `Transaction for Order ID ${orderId} is already ${existingTransaction.status}.`,
      );
    }
  }

  // Create new transaction
  return await Transaction.create({
    order_id: orderId,
    amount,
    payment_gateway: paymentGateway,
    payment_details: paymentDetails,
    status: "pending",
  });
};

const processTransaction = async (transactionId) => {
  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    throw new Error(`Transaction with ID ${transactionId} not found.`);
  }

  if (transaction.status === "approved") {
    throw new Error(
      `Transaction with ID ${transactionId} is already completed.`,
    );
  }

  if (transaction.status === "initiated") {
    throw new Error(
      `Transaction with ID ${transactionId} is already in progress.`,
    );
  }

  // Update transaction status to in_progress
  await transaction.update({ status: "initiated" });

  try {
    // Process payment through payment gateway
    const paymentResult = await processPaymentWithGateway(
      transaction.amount,
      transaction.payment_gateway,
      transaction.payment_details,
    );

    // Update transaction status to completed
    await transaction.update({
      status: "approved",
    });

    return paymentResult;
  } catch (error) {
    // Update transaction status to failed in case of error
    console.log({ "transaction error": error });
    await transaction.update({ status: "failed" });
    throw error;
  }
};

const getTransactions = async () => {
  return await Transaction.findAll();
};

const getTransactionById = async (id) => {
  return await Transaction.findByPk(id);
};

module.exports = {
  createTransaction,
  processTransaction,
  getTransactions,
  getTransactionById,
};
