const express = require("express");
const cookieParser = require("cookie-parser");

const orderRoutes = require("./routes/orderRoutes");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(authMiddleware);
app.use("/api/orders", orderRoutes);

module.exports = app;
