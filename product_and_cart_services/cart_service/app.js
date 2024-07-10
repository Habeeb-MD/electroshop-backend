const express = require("express");
const cartRoutes = require("./routes/cartRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authMiddleware = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/cart", cartRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
