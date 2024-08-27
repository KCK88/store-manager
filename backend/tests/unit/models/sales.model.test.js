const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
// const { 
//   productsFromBD,
//   productsFromModel } = require('./mocks/products.mock');
const saleDate = '2024-07-25T19:50:29.000Z';

describe('Testes da Sales Model', function () {
  it('Recuperando todas as vendas do BD', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        saleId: 1,
        date: saleDate,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: saleDate,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: saleDate,
        productId: 3,
        quantity: 15,
      },
    ]]);
    
    const product = await salesModel.findAll();
    
    expect(product).to.be.an('Array');
    expect(product).to.be.deep.equal([
      {
        saleId: 1,
        date: saleDate,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: saleDate,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: saleDate,
        productId: 3,
        quantity: 15,
      },
    ]);
  });
  
  it('Recuperando uma venda do BD por id', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        date: saleDate,
        productId: 1,
        quantity: 5,
      },
      {
        date: saleDate,
        productId: 2,
        quantity: 10,
      },
    ]]);
    
    const inputData = 1;
    const product = await salesModel.findById(inputData);
    
    expect(product).to.be.an('Array');
    expect(product).to.be.deep.equal([
      {
        date: saleDate,
        productId: 1,
        quantity: 5,
      },
      {
        date: saleDate,
        productId: 2,
        quantity: 10,
      },
    ]);
  });

  it('Teste de criação de venda', async function () {
    sinon.stub(connection, 'execute').resolves([{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 3,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    }]);

    const sale = await salesModel.createSale();

    expect(sale).to.be.an('Number');
    expect(sale).to.be.deep.equal(3);
  });  

  it('Teste de registro de venda', async function () {
    sinon.stub(connection, 'execute').resolves([
      {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      },
      undefined,
    ]);

    const sale = await salesModel.registerSale(3, 1, 1);

    expect(sale).to.be.an('Array');
    expect(sale).to.be.deep.equal([
      {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      },
      undefined,
    ]);
  });
  afterEach(function () {
    sinon.restore();
  });
});