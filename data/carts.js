// In-memory cart storage
let carts = {};

const getCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = {
      userId,
      items: []
    };
  }
  return carts[userId];
};

const addToCart = (userId, productId, quantity) => {
  const cart = getCart(userId);
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  return cart;
};

const removeFromCart = (userId, productId) => {
  const cart = getCart(userId);
  const index = cart.items.findIndex(item => item.productId === productId);
  if (index !== -1) {
    cart.items.splice(index, 1);
  }
  return cart;
};

const clearCart = (userId) => {
  carts[userId] = {
    userId,
    items: []
  };
  return carts[userId];
};

module.exports = {
  carts,
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};