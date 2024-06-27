const User = require("../models/userModel");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateMe = async (userId, body) => {
  if (body.password || body.passwordConfirm) {
    throw new AppError(
      "This route is not for password updates. Please use /updateMyPassword.",
      400,
    );
  }

  const filteredBody = filterObj(body, "name", "email");
  return User.findByIdAndUpdate(userId, filteredBody, {
    new: true,
    runValidators: true,
  });
};

const deleteMe = async (userId) => {
  await User.findByIdAndUpdate(userId, { active: false });
};

const createUser = () => {
  throw new AppError(
    "This route is not defined! Please use /signup instead",
    500,
  );
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError("No document found with that ID", 404);
  }
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
  return user;
};

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("No document found with that ID", 404);
  }
  return user;
};

const getAllUsers = async () => {
  return User.find();
};

const updatePassword = async (userId, requestBody) => {
  // 1) Get user from collection
  const user = await User.findById(userId).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !(await user.correctPassword(requestBody.passwordCurrent, user.password))
  ) {
    throw new AppError("Your current password is wrong.", 401);
  }

  // 3) If so, update password
  user.password = requestBody.password;
  user.passwordConfirm = requestBody.passwordConfirm;
  await user.save();
  return user;
};

module.exports = {
  createUser,
  updateMe,
  deleteMe,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updatePassword,
};
