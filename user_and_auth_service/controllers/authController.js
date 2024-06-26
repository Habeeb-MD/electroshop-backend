const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");
const AppError = require("./../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await authService.signup(req.body);
  authService.createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await authService.login(email, password);
  authService.createSendToken(user, 200, res);
});

exports.validateToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }
  const user = await authService.validateToken(token);
  const userData = JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.set("X-Auth-User", userData);

  res.status(200).json({
    status: "success",
    data: {
      user: userData,
    },
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError("Unauthorized, user info(role) is missing", 401),
      );
    }
    authService.restrictTo(roles, req.user.role);
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  await authService.forgotPassword(req);
  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await authService.resetPassword(req);
  authService.createSendToken(user, 200, res);
});
