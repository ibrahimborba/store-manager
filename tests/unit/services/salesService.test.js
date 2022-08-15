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

describe('Service get sales from Database', () => {
  describe('Get all sales', () => {
    before(() => {
      const stubResolve = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(productsModel, 'getAll').resolves(stubResolve);
    });

    after(() => productsModel.getAll.restore());

    it('returns an array of objects', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });
    it('array elements are objects', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Get sale by id', () => {
    const ID = 1;
    describe('Success case', () => {
      before(() => {
        const stubResolve = { id: 1, name: "Martelo de Thor" };
        sinon.stub(productsModel, 'getByPK').resolves(stubResolve);
      });

      after(() => productsModel.getByPK.restore());

      it('returns an object if sale exists in database', async () => {
        const result = await productsService.getByPK('1');
        expect(result).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await productsService.getByPK('1');
        expect(result).to.include.all.keys('id', 'name');
      });
    });

    describe('Error case', () => {
      it('checks if sale exists in database', async () => {
        const stubResolve = null;
        sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

        await productsService.getByPK('id').catch((err) => {
          expect(err.message).to.equal('Product not found');
        });

        productsModel.getByPK.restore();
      });
      
     it('throws expected error', async () => {
        const stubThrows = { message: 'Product not found'};
        sinon.stub(productsModel, 'getByPK').throws(stubThrows);

        await productsService.getByPK('id').catch((err) => {
          expect(err.message).to.equal('Product not found');
        });

        productsModel.getByPK.restore();
      });
    });
  });
});