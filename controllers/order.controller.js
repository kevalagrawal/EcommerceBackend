const { createOrder, getOrdersByUserId } = require('../data/orders');
const { getCart, clearCart } = require('../data/carts');
const { getProductById } = require('../data/products');
const ApiError = require('../utils/ApiError');

// Place order
const placeOrder = (req, res, next) => {
  try {
    const cart = getCart(req.user.id);

    if (cart.items.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = getProductById(item.productId);
      if (!product) {
        throw new ApiError(404, `Product ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal: product.price * item.quantity
      });

      // Reduce stock
      product.stock -= item.quantity;
    }

    // Create order
    const order = createOrder(req.user.id, orderItems, totalAmount);

    // Clear cart
    clearCart(req.user.id);

    res.status(201).json({
      status: 'success',
      message: 'Order placed successfully',
      data: {
        orderId: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        items: order.items,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user orders
const getUserOrders = (req, res, next) => {
  try {
    const orders = getOrdersByUserId(req.user.id);

    res.status(200).json({
      status: 'success',
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getUserOrders
};