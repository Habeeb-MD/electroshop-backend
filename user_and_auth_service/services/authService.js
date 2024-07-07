const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { sendNotifications } = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = async (userData) => {
  return User.create(userData);
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }
  return user;
};

const validateToken = async (token) => {
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new AppError(
      "User recently changed password! Please log in again.",
      401,
    );
  }
  return currentUser;
};

const restrictTo = (roles, userRole) => {
  if (!roles.includes(userRole)) {
    throw new AppError(
      "You do not have permission to perform this action",
      403,
    );
  }
};

const forgotPassword = async (req) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("There is no user with email address.", 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.get("origin")}/reset-password/${resetToken}`;

  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendNotifications({
      userId: user.id,
      recipientEmail: user.email,
      templateId: 0,
      subject: "Your password reset token (valid for 10 min)",
      data: {
        resetURL,
      },
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log("notification service ERROR :- ", err.message);
    throw new AppError(
      "There was an error sending the email. Try again later!",
      500,
    );
  }
};

const resetPassword = async (req) => {
  const token = req.params.token;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Token is invalid or has expired", 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return user;
};

module.exports = {
  signup,
  login,
  validateToken,
  restrictTo,
  forgotPassword,
  resetPassword,
  createSendToken,
};
