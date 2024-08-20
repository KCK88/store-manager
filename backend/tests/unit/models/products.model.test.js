const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel /* salesModel */ } = require('../../../src/models');
// const { 
//   productsFromBD,
//   productsFromModel } = require('./mocks/products.mock');
// const saleDate = '2024-07-25T19:50:29.000Z';

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
  afterEach(function () {
    sinon.restore();
  });
});