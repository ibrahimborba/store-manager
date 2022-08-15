const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products.model');

describe('Model get products from Database', () => {
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
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });
    it('array elements are objects', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await productsModel.getAll();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Get product by id', () => {
    describe('Success case', () => {
      before(() => {
        const stubResolve = [{ id: 1, name: "Martelo de Thor" }];
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns an object if product exists in database', async () => {
        const result = await productsModel.getByPK('1');
        expect(result).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await productsModel.getByPK('1');
        expect(result).to.include.all.keys('id', 'name');
      });
    });

    describe('Error case', () => {
      before(() => {
        const stubResolve = [];
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns null if product does not exist in database', async () => {
        const result = await productsModel.getByPK('id');
        expect(result).to.be.a('null');
      });
    });
  });
});

describe('Model add product to Database', () => {
  describe('Add product successfully', () => {
    before(() => {
      const stubResolve = [{ insertId: 4, name: "ProdutoX" }];
      sinon.stub(connection, 'execute').resolves(stubResolve);
    });

    after(() => connection.execute.restore());

    it('returns an object', async () => {
      const result = await productsModel.add();
      expect(result).to.be.an('object');
    });
    it('object has expected keys and values', async () => {
      const result = await productsModel.add("ProdutoX");
      expect(result).to.eql({ id: 4, name: "ProdutoX" });
    });
  });
});

describe('Model update product in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = [{}];
      sinon.stub(connection, 'execute').resolves(stubResolve);
    });

    after(() => connection.execute.restore());

    it('returns an object', async () => {
      const result = await productsModel.update("1", "Martelo do Batman");
      expect(result).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await productsModel.update("1", "Martelo do Batman");
      expect(result).to.include.all.keys('id', 'name');
    });
  });
});

describe('Model delete product in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = [{}];
      sinon.stub(connection, 'execute').resolves(stubResolve);
    });

    after(() => connection.execute.restore());

    it('to be called', async () => productsModel.erase("1"));
  });
});
