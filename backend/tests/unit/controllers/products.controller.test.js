const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { validateNewProducts } = require('../../../src/middlewares');
// const salesController = require('../../../src/controllers/sales.controller');
// const salesService = require('../../../src/services/sales.service');

chai.use(require('sinon-chai'));

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

  it('Testa se não recupera um produto do BD', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(productsService, 'findProductsById').resolves(undefined);
    await productsController.findProductsById(req, res);

    expect(res.status).to.be.calledWith(404); 
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  it('Service Testa se produto foi criado no DB', async function () {
    const req = { body: { id: 4, name: 'Disparador de Teia' } };
    const res = {};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    sinon.stub(productsService, 'createProduct').resolves({ id: 4, name: 'Disparador de Teia' });

    await productsController.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({ id: 4, name: 'Disparador de Teia' });
  });

  describe('Testes dos middlewares', function () {
    it('Teste de sucessoo do middleware de criação de produto', function () {
      const req = { body: { id: 4, name: 'Joias' } };
      const res = {};

      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub();
      const next = sinon.stub().returns();

      validateNewProducts(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('Teste de falha do middleware para nome ausente', function () {
      const req = { body: { } };
      const res = {};

      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub();
      const next = sinon.stub().returns();

      validateNewProducts(req, res, next);

      expect(res.status).to.be.calledWith(400); 
      expect(res.json).to.be.calledWith({ message: '"name" is required' });
    });
    it('Teste de falha do middleware para tamanho do nome', function () {
      const req = { body: { id: 4, name: 'Disp' } };
      const res = {};

      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub();
      const next = sinon.stub().returns();

      validateNewProducts(req, res, next);

      expect(res.status).to.be.calledWith(422); 
      expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
