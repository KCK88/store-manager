const { validateNewProducts } = require('./validateNewProduct');
const { validateHasSale, validateAmountSale } = require('./validateNewSale');
const { validateProductHasName, 
  validateProductNameLength, validateHasProduct } = require('./validateProduct');

module.exports = {
  validateNewProducts,
  validateHasSale,
  validateAmountSale,
  validateHasProduct,
  validateProductHasName,
  validateProductNameLength,
};