const { productsModel } = require('../models');

const findAllProducts = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findProductsById = async (productId) => {
  const product = await productsModel.findById(productId);
  return product;
};

const createProduct = async (name) => {
  const product = await productsModel.createProduct(name);
  return product;
};

const updateProduct = async (productName, productId) => {
  const productToUpdate = await productsModel.updateProduct(productName, productId);
  return productToUpdate;
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,  
  updateProduct,
};