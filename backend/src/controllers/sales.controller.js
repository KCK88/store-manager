const { salesService /* productsService */ } = require('../services');

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

module.exports = {
  findAllSales,
  findSalessById,
};