const paymentService = require("../services/paymentService");
const catchAsync = require("../utils/catchAsync");

const createTransaction = catchAsync(async (req, res) => {
  const { user_id, order_id, amount, payment_gateway, payment_details } =
    req.body;
  const transaction = await paymentService.createTransaction(
    user_id,
    order_id,
    amount,
    payment_gateway,
    payment_details,
  );
  res.status(201).json(transaction);
});

const processTransaction = catchAsync(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await paymentService.processTransaction(transactionId);
  res.status(200).json(transaction);
});

const getTransactions = catchAsync(async (req, res) => {
  const transactions = await paymentService.getTransactions();
  res.status(200).json(transactions);
});

const getTransactionById = catchAsync(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await paymentService.getTransactionById(transactionId);
  res.status(200).json(transaction);
});

module.exports = {
  createTransaction,
  processTransaction,
  getTransactions,
  getTransactionById,
};
