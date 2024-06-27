const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService");
const authService = require("../services/authService");

exports.updateMe = catchAsync(async (req, res, next) => {
  const updatedUser = await userService.updateMe(req.user.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await userService.deleteMe(req.user.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  const error = userService.createUser();
  res.status(500).json({
    status: "error",
    message: error.message,
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userService.getUser(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await userService.updatePassword(req.user.id, req.body);
  authService.createSendToken(user, 200, res);
});

exports.parseUserMiddleware = catchAsync(async (req, res, next) => {
  const authUserHeader = req.headers["x-auth-user"];
  if (authUserHeader) req.user = JSON.parse(authUserHeader);
  next();
});
