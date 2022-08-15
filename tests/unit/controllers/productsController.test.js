const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('Controller get products from Database', () => {
  describe('Get all products', () => {
    const response = {};
    const request = {};
    const stubResolve = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(stubResolve);
    });

    after(() => productsService.getAll.restore());

    it('to be called with status 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith([
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },])).to.be.equal(true);
    });
  });

  describe('Get product by id', () => {
    describe('Success case', () => {
      const response = {};
      const request = { params: '1' };
      const stubResolve = { id: 1, name: "Martelo de Thor" };
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getByPK').resolves(stubResolve);
      });

      after(() => productsService.getByPK.restore());

      it('to be called with status 200', async () => {
        await productsController.getByPK(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        await productsController.getByPK(request, response);
        expect(response.json.calledWith({ id: 1, name: "Martelo de Thor" })).to.be.equal(true);
      });
    });
  });
});

describe('Controller add product to Database', () => {
  describe('Add product successfully', () => {
      const response = {};
      const request = { body: { id: 4, name: "ProdutoX" } };
      const stubResolve = { id: 4, name: "ProdutoX" };
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'add').resolves(stubResolve);
      });

    after(() => productsService.add.restore());

    it('to be called with status 201', async () => {
      await productsController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      await productsController.add(request, response);
      expect(response.json.calledWith({ id: 4, name: "ProdutoX" })).to.be.equal(true);
    });
  });
});

describe('Controller update product in Database', () => {
  describe('Success case', () => {
    const response = {};
    const request = { params: '1', body: { name: "Martelo do Batman" } };
    const stubResolve = { id: 1, name: "Martelo do Batman" };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'update').resolves(stubResolve);
    });

    after(() => productsService.update.restore());

    it('to be called with status 200', async () => {
      await productsController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      await productsController.update(request, response);
      expect(response.json.calledWith({ id: 1, name: "Martelo do Batman" })).to.be.equal(true);
    });
  });
});

describe('Controller delete product in Database', () => {
  describe('Success case', () => {
    const response = {};
    const request = { params: '1' };
    const stubResolve = [{}];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(productsService, 'erase').resolves(stubResolve);
    });

    after(() => productsService.erase.restore());

    it('to be called with status 204', async () => {
      await productsController.erase(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

describe('Controller search products in Database', () => {
  describe('Get all products', () => {
    const response = {};
    const request = { query: "Martelo"};
    const stubResolve = [{ id: 1, name: "Martelo de Thor" }];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'search').resolves(stubResolve);
    });

    after(() => productsService.search.restore());

    it('to be called with status 200', async () => {
      await productsController.search(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      await productsController.search(request, response);
      expect(response.json.calledWith([{ id: 1, name: "Martelo de Thor" }])).to.be.equal(true);
    });
  });
});