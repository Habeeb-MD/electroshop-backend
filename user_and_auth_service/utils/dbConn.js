const mongoose = require("mongoose");

module.exports = () => {
  const DB = process.env.DATABASE;

  mongoose.connect(DB).then(() => console.log("DB connection successful!"));
};
