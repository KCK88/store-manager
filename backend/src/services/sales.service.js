const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findSalesById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  return sale;
};

const processSale = async (saleData) => {
  const saleId = await salesModel.createSale();
  const sale = saleData
    .map(({ productId, quantity }) => salesModel.registerSale(saleId, productId, quantity));
  
  await Promise.all(sale);
  const newSale = {
    id: saleId,
    itemsSold: saleData,
  };
  return newSale;
};

module.exports = {
  findAllSales,
  findSalesById,
  processSale,
};
