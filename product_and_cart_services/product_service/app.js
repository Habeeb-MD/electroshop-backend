const express = require("express");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const productTypeRoutes = require("./routes/productTypeRoutes");

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/product-types", productTypeRoutes);

module.exports = app;
