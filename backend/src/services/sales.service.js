const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findSalesById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  return sale;
};

module.exports = {
  findAllSales,
  findSalesById,
};
