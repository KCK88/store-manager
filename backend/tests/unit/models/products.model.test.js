const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
// const { 
//   productsFromBD,
//   productsFromModel } = require('./mocks/products.mock');

describe('Testes da Products Model', function () {
  it('Recuperando todos os  produtos do bd', async function () {
    sinon.stub(connection, 'execute').resolves(
      [[{
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
      }]],
    );

    const product = await productsModel.findAll();

    expect(product).to.be.an('Array');
    expect(product).to.be.deep.equal([{
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
  it('Recuperando um produto do bd por id', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: 'Martelo de Thor',
    }]]);
    
    const inputData = 1;
    const product = await productsModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Testa se produto foi criado no DB', async function () {
    sinon.stub(connection, 'execute').resolves([{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
    }]);

    const name = { name: 'Disparador de Teia' };
    const product = await productsModel.createProduct(name);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({
      id: 4,
      name: 'Disparador de Teia',
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
