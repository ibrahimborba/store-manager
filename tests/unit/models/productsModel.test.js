const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

describe('Get products from Database', () => {
  describe('Get all products', () => {
    before(() => {
      const stubResolve = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(connection, 'execute').resolves([stubResolve]);
    });

    after(() => connection.execute.restore());

    it('returns an array of objects', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });
    it('array elements are objects', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Get product by id', () => {
    const ID = 1;
    describe('Success case', () => {
      before(() => {
        const stubResolve = [{ id: 2, name: "Traje de encolhimento" }];
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns an object if product exists in database', async () => {
        const result = await productsModel.getByPK('1');
        expect(result).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await productsModel.getByPK('1');
        expect(result[0]).to.include.all.keys('id', 'name');
      });
    })

    describe('Error case', () => {
      before(() => {
        const stubResolve = [];
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns null if product does not exist in database', async () => {
        const result = await productsModel.getByPK('100000');
        expect(result).to.be.a('null');
      });
    })
  });
});