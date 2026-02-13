// In-memory product storage
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    stock: 10,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29.99,
    stock: 50,
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: 149.99,
    stock: 30,
    createdAt: new Date()
  }
];

let productIdCounter = 4;

const getAllProducts = () => products;

const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

const addProduct = (product) => {
  const newProduct = {
    id: productIdCounter++,
    ...product,
    createdAt: new Date()
  };
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, updatedData) => {
  const product = getProductById(id);
  if (!product) return null;
  Object.assign(product, updatedData);
  return product;
};

const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;
  const deleted = products.splice(index, 1);
  return deleted[0];
};

module.exports = {
  products,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};