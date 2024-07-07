const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");
const AppError = require("./../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    return next(new AppError("Please provide all the details!", 400));
  }
  const name = firstName.trim() + " " + lastName.trim();
  const newUser = await authService.signup({
    name,
    email,
    password,
    passwordConfirm,
  });
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
  let token = req.cookies.jwt;
  if (
    !token &&
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
  req.user = await authService.validateToken(token);
  next();
});

exports.authStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
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

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", "", cookieOptions);
  res.status(200).json({ status: "success" });
});
