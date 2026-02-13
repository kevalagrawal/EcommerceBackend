const { verifyToken } = require('../config/jwt');
const { findUserById } = require('../data/users');
const ApiError = require('../utils/ApiError');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new ApiError(401, 'Missing authorization token');
    }

    const decoded = verifyToken(token);
    const user = findUserById(decoded.userId);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || 'Unauthorized'));
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };