const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
// const salesController = require('../../../src/controllers/sales.controller');
// const salesService = require('../../../src/services/sales.service');

chai.use(require('sinon-chai'));

// const saleDate = '2024-07-24T00:55:57.000Z';
describe('Testes da Products Controller', function () {
  it('Recupera todos os produtos do BD', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(productsService, 'findAllProducts').resolves([
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },   
    ]);
    await productsController.findAllProducts(req, res);

    expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
    // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
    expect(res.json).to.be.calledWith([
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },   
    ]);
  });

  it('Recupera um produto do BD', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(productsService, 'findProductsById').resolves({ id: 1, name: 'Martelo de Thor' });
    await productsController.findProductsById(req, res);

    expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
    // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
    expect(res.json).to.be.calledWith({ id: 1, name: 'Martelo de Thor' });
  });
  // it('Recupera todos as Sales do BD', async function () {
  //   const req = {};
  //   const res = {};

  //   res.status = sinon.stub().returnsThis();
  //   res.json = sinon.stub();

  //   sinon.stub(salesService, 'findAllSales').resolves([
  //     {
  //       saleId: 1,
  //       date: saleDate,
  //       productId: 1,
  //       quantity: 5,
  //     },
  //     {
  //       saleId: 1,
  //       date: saleDate,
  //       productId: 2,
  //       quantity: 10,
  //     },
  //     {
  //       saleId: 2,
  //       date: saleDate,
  //       productId: 3,
  //       quantity: 15,
  //     },
  //   ]);
  //   await salesController.findAllSales(req, res);

  //   expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
  //   // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
  //   expect(res.json).to.be.calledWith([
  //     {
  //       saleId: 1,
  //       date: saleDate,
  //       productId: 1,
  //       quantity: 5,
  //     },
  //     {
  //       saleId: 1,
  //       date: saleDate,
  //       productId: 2,
  //       quantity: 10,
  //     },
  //     {
  //       saleId: 2,
  //       date: saleDate,
  //       productId: 3,
  //       quantity: 15,
  //     },
  //   ]);
  // });
  // it('Recupera sale do BD', async function () {
  //   const req = { params: { id: 1 } };
  //   const res = {};

  //   res.status = sinon.stub().returnsThis();
  //   res.json = sinon.stub();

  //   sinon.stub(salesService, 'findSalesById').resolves([
  //     {
  //       date: saleDate,
  //       productId: 1,
  //       quantity: 5,
  //     },
  //     {
  //       date: saleDate,
  //       productId: 2,
  //       quantity: 10,
  //     },
  //   ]);
  //   await salesController.findSalessById(req, res);

  //   expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
  //   // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
  //   expect(res.json).to.be.calledWith([
  //     {
  //       date: saleDate,
  //       productId: 1,
  //       quantity: 5,
  //     },
  //     {
  //       date: saleDate,
  //       productId: 2,
  //       quantity: 10,
  //     },
  //   ]);
  // });
});