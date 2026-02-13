const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/product.controller');
const { validateProduct, validateProductId, handleValidationErrors } = require('../middleware/validate.middleware');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getAll);
router.get('/:id', validateProductId, handleValidationErrors, getOne);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, validateProduct, handleValidationErrors, create);
router.put('/:id', authMiddleware, adminMiddleware, validateProductId, validateProduct, handleValidationErrors, update);
router.delete('/:id', authMiddleware, adminMiddleware, validateProductId, handleValidationErrors, remove);

module.exports = router;