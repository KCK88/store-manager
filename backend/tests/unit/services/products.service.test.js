const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

chai.use(require('sinon-chai'));

describe('Testes da Products Model', function () {
  it('Recupera todos os produtos do BD', async function () {
    sinon.stub(productsModel, 'findAll').resolves([
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ]);
    const products = await productsModel.findAll();

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
});
