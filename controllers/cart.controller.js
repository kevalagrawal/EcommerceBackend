const { getCart, addToCart, removeFromCart, clearCart } = require('../data/carts');
const { getProductById } = require('../data/products');
const ApiError = require('../utils/ApiError');

// Get cart
const getCartItems = (req, res, next) => {
  try {
    const cart = getCart(req.user.id);
    
    // Enrich cart with product details
    const enrichedItems = cart.items.map(item => {
      const product = getProductById(item.productId);
      return {
        ...item,
        product: product || null
      };
    });

    res.status(200).json({
      status: 'success',
      data: {
        userId: cart.userId,
        items: enrichedItems
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add to cart
const addItem = (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product exists
    const product = getProductById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    // Validate stock
    if (product.stock < quantity) {
      throw new ApiError(400, 'Insufficient stock');
    }

    const cart = addToCart(req.user.id, productId, quantity);

    res.status(200).json({
      status: 'success',
      message: 'Product added to cart',
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

// Remove from cart
const removeItem = (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = removeFromCart(req.user.id, parseInt(productId));

    res.status(200).json({
      status: 'success',
      message: 'Product removed from cart',
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

// Clear cart
const emptyCart = (req, res, next) => {
  try {
    const cart = clearCart(req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartItems,
  addItem,
  removeItem,
  emptyCart
};