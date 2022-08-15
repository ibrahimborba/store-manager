const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales.model');

describe('Model add sales to Database', () => {
  describe('Add sales successfully', () => {
    before(() => {
      const stubResolve = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ];
      sinon.stub(connection, 'execute').resolves(stubResolve);
    });

    after(() => connection.execute.restore());

    it('returns an object', async () => {
      const result = await salesModel.add();
      expect(result).to.be.an('object');
    });
    it('object has expected keys and values', async () => {
      const expected = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };
      const result = await salesModel.add();
      expect(result).to.eql(expected);
    });
  });
});