const utils = require("../utils/utils");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next({ message: "No token, authorization denied" });
  }
  try {
    const response = await utils.authStatus(token);
    req.user = response.data.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
