// In-memory order storage
let orders = [];
let orderIdCounter = 1;

const createOrder = (userId, items, totalAmount) => {
  const newOrder = {
    id: orderIdCounter++,
    userId,
    items,
    totalAmount,
    status: 'pending',
    createdAt: new Date()
  };
  orders.push(newOrder);
  return newOrder;
};

const getOrdersByUserId = (userId) => {
  return orders.filter(order => order.userId === userId);
};

const getOrderById = (id) => {
  return orders.find(order => order.id === parseInt(id));
};

module.exports = {
  orders,
  createOrder,
  getOrdersByUserId,
  getOrderById
};