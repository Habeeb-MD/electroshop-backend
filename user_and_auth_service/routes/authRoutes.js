const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get(
  "/authStatus",
  authController.validateToken,
  authController.authStatus,
);

module.exports = router;
