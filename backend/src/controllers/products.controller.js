const { productsService } = require('../services');

const findAllProducts = async (_req, res) => {
  const products = await productsService.findAllProducts();
  return res.status(200).json(products);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findProductsById(id);
  if (!product) { 
    return res.status(404).json({ message: 'Product not found' }); 
  }
  return res.status(200).json(product);
};

module.exports = {
  findAllProducts,
  findProductsById,

};