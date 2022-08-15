const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products.model');
const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service');

describe('Service add sales to Database', () => {
  describe('Add sales successfully', () => {
    const sales =  [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    before(() => {
      const stubResolve = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };
      sinon.stub(salesModel, 'add').resolves(stubResolve);
    });

    after(() => salesModel.add.restore());

    it('returns an object', async () => {
      const result = await salesService.add(sales);
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
      const result = await salesService.add(sales);
      expect(result).to.eql(expected);
    });
  });

  describe('Error case', () => {
    const sales =  [
      { productId: 5, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];

    it('checks if product exists in database', async () => {
      const stubResolve = null;
      sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

      await salesService.add(sales).catch((err) => {
        expect(err.message).to.equal('Product not found');
      });

      productsModel.getByPK.restore();
    });
    it('throws expected error', async () => {
      const stubThrows = { message: 'Product not found'};
      sinon.stub(productsModel, 'getByPK').throws(stubThrows);

      await salesService.add(sales).catch((err) => {
        expect(err.message).to.equal('Product not found');
      });

      productsModel.getByPK.restore();
    });
  });
});