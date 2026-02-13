const express = require('express');
const { getCartItems, addItem, removeItem, emptyCart } = require('../controllers/cart.controller');
const { validateAddToCart, validateProductId, handleValidationErrors } = require('../middleware/validate.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getCartItems);
router.post('/add', validateAddToCart, handleValidationErrors, addItem);
router.delete('/remove/:productId', validateProductId, handleValidationErrors, removeItem);
router.delete('/', emptyCart);

module.exports = router;