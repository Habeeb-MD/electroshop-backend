const paymentService = require("../services/paymentService");
const catchAsync = require("../utils/catchAsync");

const createTransaction = catchAsync(async (req, res) => {
  const { orderId, amount, paymentGateway, paymentDetails } = req.body;
  const transaction = await paymentService.createTransaction(
    orderId,
    amount,
    paymentGateway,
    paymentDetails,
  );
  res.status(201).json(transaction);
});

const processTransaction = catchAsync(async (req, res) => {
  const transactionId = req.params.id;
  const paymentResult = await paymentService.processTransaction(transactionId);
  res.status(200).json(paymentResult);
});

//this function is doing both the above tasks(create and process) in one single function
const createAndProcessTransaction = catchAsync(async (req, res) => {
  const { orderId, amount, paymentGateway, paymentDetails } = req.body;
  const transaction = await paymentService.createTransaction(
    orderId,
    amount,
    paymentGateway,
    paymentDetails,
  );
  const paymentResult = await paymentService.processTransaction(transaction.id);
  res.status(200).json(paymentResult);
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
  createAndProcessTransaction,
  getTransactions,
  getTransactionById,
};
