const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

//all routes need current user object, so these must be called only after calling authController/validateToken
router.use(authController.validateToken);

router.get("/me", userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/updatePassword", userController.updatePassword);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers)
  .post(authController.restrictTo("admin"), userController.createUser);

router
  .route("/:id")
  .patch(authController.restrictTo("admin"), userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
