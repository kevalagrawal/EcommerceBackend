const ApiError = require('../utils/ApiError');

const errorMiddleware = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  // Handle validation errors
  if (error.validation) {
    statusCode = 400;
    message = 'Validation failed';
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorMiddleware;