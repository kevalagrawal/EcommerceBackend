const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../data/products');
const ApiError = require('../utils/ApiError');

// Get all products
const getAll = (req, res, next) => {
  try {
    const products = getAllProducts();
    res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
const getOne = (req, res, next) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Create product (admin only)
const create = (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = addProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock)
    });
    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Update product (admin only)
const update = (req, res, next) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const updatedProduct = updateProduct(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

// Delete product (admin only)
const remove = (req, res, next) => {
  try {
    const product = deleteProduct(req.params.id);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};