const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service');

describe('Model add sales to Database', () => {
  describe('Add sales successfully', () => {
    before(() => {
      const stubResolve = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ];
      sinon.stub(salesModel, 'add').resolves(stubResolve);
    });

    after(() => salesModel.add.restore());

    it('returns an object', async () => {
      const result = await salesService.add();
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
      const result = await salesService.add();
      expect(result).to.eql(expected);
    });
  });
});