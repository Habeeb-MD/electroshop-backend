const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router
  .route("/cart-item")
  .post(cartController.addToCart)
  .put(cartController.updateCartItem)
  .delete(cartController.removeFromCart);

router.get("/:user_id", cartController.getCart);
router.delete("/clear", cartController.clearCart);

module.exports = router;
