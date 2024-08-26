const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

chai.use(require('sinon-chai'));

describe('Testes da Products Service', function () {
  it('Recupera todos os produtos do BD', async function () {
    sinon.stub(productsModel, 'findAll').resolves([
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ]);
    const products = await productsService.findAllProducts();

    expect(products).to.be.an('Array');
    expect(products).to.be.deep.equal([{
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    }]);
  });

  it('Recupera um produto do BD', async function () {
    sinon.stub(productsModel, 'findById').resolves(
      { id: 1, name: 'Martelo de Thor' },
    );
    const product = await productsService.findProductsById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Testa se produto foi criado no DB', async function () {
    sinon.stub(productsModel, 'createProduct').resolves({ id: 4, name: 'Disparador de Teia' });

    const name = { id: 4, name: 'Disparador de Teia' };
    const product = await productsService.createProduct(name);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({ id: 4, name: 'Disparador de Teia' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
