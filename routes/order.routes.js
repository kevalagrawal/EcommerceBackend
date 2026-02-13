const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/order.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', placeOrder);
router.get('/', getUserOrders);

module.exports = router;