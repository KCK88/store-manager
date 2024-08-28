const { validateNewProducts } = require('./validateNewProduct');
const { validateHasSale, validateAmountSale } = require('./validateNewSale');

module.exports = {
  validateNewProducts,
  validateHasSale,
  validateAmountSale,
};