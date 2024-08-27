const { salesService, productsService } = require('../services');

const findAllSales = async (_req, res) => {
  const sales = await salesService.findAllSales();
  return res.status(200).json(sales);
};

const findSalessById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSalesById(id);
  if (sale.length !== 0) return res.status(200).json(sale);
  return res.status(404).json({ message: 'Sale not found' });
};

const createSale = async (req, res) => {
  const saleData = req.body;

  const tasks = saleData.map((item) => productsService.findProductsById(item.productId));

  const products = await Promise.all(tasks);

  if (products.some((item) => item === undefined || item === null)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const sale = await salesService.processSale(saleData);
  return res.status(201).json(sale);
};

module.exports = {
  findAllSales,
  findSalessById,
  createSale,
};