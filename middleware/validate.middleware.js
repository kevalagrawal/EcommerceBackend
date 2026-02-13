const { validationResult, body, param, query } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Validation rules
const validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer')
];

const validateAddToCart = [
  body('productId').isInt().withMessage('Valid product ID required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

const validateProductId = [
  param('id').isInt().withMessage('Valid product ID required')
];

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, 'Validation failed: ' + errors.array().map(e => e.msg).join(', ')));
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateProduct,
  validateAddToCart,
  validateProductId,
  handleValidationErrors
};