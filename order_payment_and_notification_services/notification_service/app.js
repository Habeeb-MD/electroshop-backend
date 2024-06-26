const express = require("express");
const notificationRoutes = require("./routes/notificationRoutes");
const templateRoutes = require("./routes/templateRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
app.use("/api/notifications", notificationRoutes);
app.use("/api/templates", templateRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
