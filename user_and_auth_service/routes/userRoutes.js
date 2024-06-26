const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

//all routes{except GET(/:id)} need current user object, so these must be called only after calling auth/validateToken
router.use(userController.parseUserMiddleware);

router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/updatePassword", userController.updatePassword);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers)
  .post(authController.restrictTo("admin"), userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.restrictTo("admin"), userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
