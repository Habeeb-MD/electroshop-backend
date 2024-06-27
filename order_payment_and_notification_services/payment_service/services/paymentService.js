const { Transaction } = require("../models");
const {
  processPaymentWithGateway,
  sendNotifications,
  getUser,
} = require("../utils/utils");

const createTransaction = async (
  userId,
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
      existingTransaction.status === "in_progress" ||
      existingTransaction.status === "completed"
    ) {
      throw new Error(
        `Transaction for Order ID ${orderId} is already in progress or completed.`,
      );
    }
  }

  // Create new transaction
  return await Transaction.create({
    user_id: userId,
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

  if (transaction.status === "completed") {
    throw new Error(
      `Transaction with ID ${transactionId} is already completed.`,
    );
  }

  if (transaction.status === "in_progress") {
    throw new Error(
      `Transaction with ID ${transactionId} is already in progress.`,
    );
  }

  // Update transaction status to in_progress
  await transaction.update({ status: "in_progress" });

  try {
    // Process payment through payment gateway
    const paymentResult = await processPaymentWithGateway(
      transaction.amount,
      transaction.payment_gateway,
      transaction.payment_details,
    );

    // Update transaction status to completed
    await transaction.update({
      status: "completed",
      payment_status: paymentResult.status,
    });

    const user = await getUser(transaction.user_id);
    // Notify the Notification Service
    await sendNotifications(transaction.user_id, user.data.user.email, {
      transactionId: transaction.id,
      orderId: transaction.order_id,
      amount: transaction.amount,
    });

    return paymentResult;
  } catch (error) {
    // Update transaction status to failed in case of error
    console.log({ "transaction error": error });
    await transaction.update({ status: "failed", payment_status: "failed" });
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
