const { productsService } = require('../services');

const validateProductHasName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

const validateProductNameLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateHasProduct = async (req, res, next) => {
  const { id } = req.params;
  const validateId = await productsService.findProductsById(id);
  
  if (!validateId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { validateProductHasName, validateProductNameLength, validateHasProduct };