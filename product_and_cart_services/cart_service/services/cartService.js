const redisClient = require("../config/redis");
const { CartItem } = require("../models");
const { fetchProductDetails } = require("../utils/utils");

const CART_PREFIX = "cart:";
const CACHE_TTL = 3600; // Cache time-to-live in seconds, same as in productService for consistency

const addToCart = async (userId, productId, quantity) => {
  const cartKey = `${CART_PREFIX}${userId}`;
  const cartItemKey = `${productId}`;

  let product = await fetchProductDetails(productId);
  const currentQuantity = await redisClient.hGet(cartKey, cartItemKey);
  const newQuantity = currentQuantity
    ? parseInt(currentQuantity) + quantity
    : quantity;

  await redisClient.hSet(cartKey, cartItemKey, newQuantity);
  await redisClient.expire(cartKey, CACHE_TTL); // Set expiration for the entire hash

  // Save to DB
  const [cartItem, created] = await CartItem.findOrCreate({
    where: { user_id: userId, product_id: productId },
    defaults: { quantity: newQuantity },
  });

  if (!created) {
    cartItem.quantity = newQuantity;
    await cartItem.save();
  }

  return getCart(userId);
};

const updateCartItem = async (userId, productId, quantity) => {
  const cartKey = `${CART_PREFIX}${userId}`;
  await redisClient.hSet(cartKey, productId, quantity);
  await redisClient.expire(cartKey, CACHE_TTL); // Reset expiration after update

  // Update DB
  await CartItem.update(
    { quantity },
    { where: { user_id: userId, product_id: productId } },
  );

  return getCart(userId);
};

const removeFromCart = async (userId, productId) => {
  const cartKey = `${CART_PREFIX}${userId}`;
  const cartItemKey = `${productId}`;
  await redisClient.hDel(cartKey, cartItemKey);
  // If the hash is not empty, reset its expiration
  const remainingItems = await redisClient.hLen(cartKey);
  if (remainingItems > 0) {
    await redisClient.expire(cartKey, CACHE_TTL);
  }

  // Remove from DB
  await CartItem.destroy({ where: { user_id: userId, product_id: productId } });

  return getCart(userId);
};

const getCart = async (userId) => {
  const cartKey = `${CART_PREFIX}${userId}`;
  const cartItems = await redisClient.hGetAll(cartKey);

  // Reset expiration on read
  if (Object.keys(cartItems).length > 0) {
    await redisClient.expire(cartKey, CACHE_TTL);
  }

  const formattedCartItems = await Promise.all(
    Object.keys(cartItems).map(async (productId) => {
      const product = await fetchProductDetails(productId);
      return {
        product_id: productId,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: parseInt(cartItems[productId]),
      };
    }),
  );

  return formattedCartItems;
};

const clearCart = async (userId) => {
  const cartKey = `${CART_PREFIX}${userId}`;
  await redisClient.del(cartKey);

  // Clear DB
  await CartItem.destroy({ where: { user_id: userId } });

  return [];
};

module.exports = {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCart,
};
