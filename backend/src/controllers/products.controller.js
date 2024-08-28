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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.createProduct({ name });
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productName = req.body;

  const productData = await productsService.updateProduct(productName, id);
  res.status(200).json(productData);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log('Entrei antes');  
  await productsService.deleteProduct(id);  
  console.log('Entrei depois');
  return res.status(204).send();
  // res.status(200).json();
};
module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
