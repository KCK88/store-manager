const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const salesDate = '2024-08-21T15:42:50.000Z';

describe('Testes da Sales Service', function () {
  it('Recupera todas as Sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves([
      {
        saleId: 1,
        date: salesDate,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: salesDate,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: salesDate,
        productId: 3,
        quantity: 15,
      },
    ]);

    const sales = await salesService.findAllSales();

    expect(sales).to.be.an('Array');
    expect(sales).to.be.deep.equal([
      {
        saleId: 1,
        date: salesDate,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: salesDate,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: salesDate,
        productId: 3,
        quantity: 15,
      },
    ]);
  });
  it('Recupera uma Sale', async function () {
    sinon.stub(salesModel, 'findById').resolves([
      {
        date: salesDate,
        productId: 1,
        quantity: 5,
      },
      {
        date: salesDate,
        productId: 2,
        quantity: 10,
      },
    ]);

    const sales = await salesService.findSalesById(1);

    expect(sales).to.be.an('Array');
    expect(sales).to.be.deep.equal([
      {
        date: salesDate,
        productId: 1,
        quantity: 5,
      },
      {
        date: salesDate,
        productId: 2,
        quantity: 10,
      },
    ]);
  });

  it('Testa processo de criação de venda', async function () {
    sinon.stub(salesModel, 'createSale').resolves(3);
    sinon.stub(salesModel, 'registerSale').resolves(3, 1, 1);

    const newSale = await salesService.processSale([
      {
        productId: 1,
        quantity: 1,
      },
    ]);

    expect(newSale).to.be.an('object');
    expect(newSale).to.be.deep.equal({ id: 3, itemsSold: [{ productId: 1, quantity: 1 }] });
  });
  afterEach(function () {
    sinon.restore();
  });
});