const { productsModel } = require('../models');

const findAllProducts = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findProductsById = async (productId) => {
  const product = await productsModel.findById(productId);
  return product;
};

module.exports = {
  findAllProducts,
  findProductsById,
  
};