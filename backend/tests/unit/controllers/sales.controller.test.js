const { expect } = require('chai');
const sinon = require('sinon');
const { salesService, productsService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { validateHasSale } = require('../../../src/middlewares');

const saleDate = '2024-07-24T00:55:57.000Z';

describe('Testes da Sales Controller', function () {
  it('Recupera todos as Sales do BD', async function () {
    const req = {};
    const res = {};
    
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    
    sinon.stub(salesService, 'findAllSales').resolves([
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
    await salesController.findAllSales(req, res);
    
    expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
    // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
    expect(res.json).to.be.calledWith([
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
  it('Recupera sale do BD', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    
    sinon.stub(salesService, 'findSalesById').resolves([
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
    await salesController.findSalessById(req, res);
    
    expect(res.status).to.be.calledWith(200); // esperar que seja chamado com o status
    // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
    expect(res.json).to.be.calledWith([
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
  it('Testa se não recupera sale do BD', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    
    sinon.stub(salesService, 'findSalesById').resolves([]);
    await salesController.findSalessById(req, res);
    
    expect(res.status).to.be.calledWith(404); // esperar que seja chamado com o status
    // expect(res.status.calledWith(200)).to.equal(true); // esperar que a chamada do status seja true
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });
  it('Teste de criação de Sale ', async function () {
    const req = { body: [{
      productId: 1,
      quantity: 1,
    }] };
    const res = {};
    
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(productsService, 'findProductsById').resolves({ id: 1, name: 'produto' });
    sinon.stub(salesService, 'processSale').resolves({ id: 3, itemsSold: req.body });
    
    await salesController.createSale(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    });
  });

  it('Teste se ao criar a sale o produto existe', async function () {
    const req = { body: [{
      productId: 1,
      quantity: 1,
    }] };
    const res = {};
    
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(productsService, 'findProductsById').resolves();

    await salesController.createSale(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('Testa validações de vendas', function () {
    // Defina req.body corretamente
    const req = { body: [{ productId: 1, quantity: 1 }] };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.stub().returns();

    validateHasSale(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testa erros de validações de vendas (venda sem produto)', function () {
    // Defina req.body corretamente
    const req = { body: [{ quantity: 1 }] };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.stub().returns();

    validateHasSale(req, res, next);

    expect(res.status).to.be.calledWith(400); 
    expect(res.json).to.be.calledWith({ message: '"productId" is required' });
  });

  it('Testa erros de validações de vendas (venda sem quantidade) ', function () {
    // Defina req.body corretamente
    const req = { body: [{ productId: 1 }] };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.stub().returns();

    validateHasSale(req, res, next);

    expect(res.status).to.be.calledWith(400); 
    expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
  });
  beforeEach(function () {
    sinon.restore();
  });
});