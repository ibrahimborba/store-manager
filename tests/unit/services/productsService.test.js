const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products.model');
const productsService = require('../../../services/products.service');

describe('Service get products from Database', () => {
  describe('Get all products', () => {
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

  describe('Get product by id', () => {
    describe('Success case', () => {
      before(() => {
        const stubResolve = { id: 1, name: "Martelo de Thor" };
        sinon.stub(productsModel, 'getByPK').resolves(stubResolve);
      });

      after(() => productsModel.getByPK.restore());

      it('returns an object if product exists in database', async () => {
        const result = await productsService.getByPK('1');
        expect(result).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await productsService.getByPK('1');
        expect(result).to.include.all.keys('id', 'name');
      });
    });

    describe('Error case', () => {
      it('checks if product exists in database', async () => {
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

describe('Service add product to Database', () => {
  describe('Add product successfully', () => {
    before(() => {
      const stubResolve = { id: 4, name: "ProdutoX" };
      sinon.stub(productsModel, 'add').resolves(stubResolve);
    });

    after(() => productsModel.add.restore());

    it('returns an object', async () => {
      const result = await productsService.add();
      expect(result).to.be.an('object');
    });
    it('object has expected keys and values', async () => {
      const result = await productsService.add();
      expect(result).to.eql({ id: 4, name: "ProdutoX" });
    });
  });
});

describe('Service update product in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = {id: "1", name: "Martelo do Batman"};
      sinon.stub(productsModel, 'update').resolves(stubResolve);
    });

    after(() => productsModel.update.restore());

    it('returns an object if product exists in database', async () => {
      const result = await productsService.update({id: "1", name: "Martelo do Batman"});
      expect(result).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await productsService.update({id: "1", name: "Martelo do Batman"});
      expect(result).to.include.all.keys('id', 'name');
    });
  });

  describe('Error case', () => {
    afterEach(() => productsModel.getByPK.restore());

    it('checks if product exists in database', async () => {
      const stubResolve = null;
      sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

      await productsService.update('id').catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
    
    it('throws expected error', async () => {
      const stubThrows = { message: 'Product not found' };
      sinon.stub(productsModel, 'getByPK').throws(stubThrows);

      await productsService.update('id').catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
  });
});

describe('Service delete product in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = [{}];
      sinon.stub(productsModel, 'erase').resolves(stubResolve);
    });

    after(() => productsModel.erase.restore());

    it('to be called', async () => {
      await productsService.erase("1");
    });
  });

  describe('Error case', () => {
    afterEach(() => productsModel.getByPK.restore());

    it('checks if product exists in database', async () => {
      const stubResolve = null;
      sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

      await productsService.erase('id').catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
    
    it('throws expected error', async () => {
      const stubThrows = { message: 'Product not found' };
      sinon.stub(productsModel, 'getByPK').throws(stubThrows);

      await productsService.erase('id').catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
  });
});