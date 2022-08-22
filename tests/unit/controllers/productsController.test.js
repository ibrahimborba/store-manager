const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');
const testController =require('../../helpers/testController');

describe('Controller get products from Database', () => {
  describe('Get all products', () => {
    const stubResolve = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ];
    before(() => sinon.stub(productsService, 'getAll').resolves(stubResolve));

    afterEach(() => productsService.getAll.restore());

    it('to be called with status 200', async () => {
      const response = await testController(productsController.getAll);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      const response = await testController(productsController.getAll);
      expect(response.json.calledWith([
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },])).to.be.equal(true);
    });
  });

  describe('Get product by id', () => {
    describe('Success case', () => {
      const stubResolve = { id: 1, name: "Martelo de Thor" };
      before(() => sinon.stub(productsService, 'getByPK').resolves(stubResolve));

      after(() => productsService.getByPK.restore());

      it('to be called with status 200', async () => {
        const response = await testController(productsController.getByPK, { params: '1' });
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        const response = await testController(productsController.getByPK, { params: '1' });
        expect(response.json.calledWith({ id: 1, name: "Martelo de Thor" })).to.be.equal(true);
      });
    });
  });
});

describe('Controller add product to Database', () => {
  describe('Add product successfully', () => {
      const stubResolve = { id: 4, name: "ProdutoX" };
      before(() => sinon.stub(productsService, 'add').resolves(stubResolve));

    after(() => productsService.add.restore());

    it('to be called with status 201', async () => {
      const response = await testController(productsController.add, {
        body: { id: 4, name: "ProdutoX" }
      });
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      const response = await testController(productsController.add, {
        body: { id: 4, name: "ProdutoX" }
      });
      expect(response.json.calledWith({ id: 4, name: "ProdutoX" })).to.be.equal(true);
    });
  });
});

describe('Controller update product in Database', () => {
  describe('Success case', () => {
    const stubResolve = { id: 1, name: "Martelo do Batman" };
    before(() => sinon.stub(productsService, 'update').resolves(stubResolve));

    after(() => productsService.update.restore());

    it('to be called with status 200', async () => {
      const response = await testController(productsController.update, {
        params: '1', body: { name: "Martelo do Batman" }
      });
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      const response = await testController(productsController.update, {
        params: '1', body: { name: "Martelo do Batman" }
      });
      expect(response.json.calledWith({ id: 1, name: "Martelo do Batman" })).to.be.equal(true);
    });
  });
});

describe('Controller delete product in Database', () => {
  describe('Success case', () => {
    const stubResolve = [{}];
    before(() => {
      sinon.stub(productsService, 'erase').resolves(stubResolve);
    });

    after(() => productsService.erase.restore());

    it('to be called with status 204', async () => {
      const response = await testController(productsController.erase, { params: '1' });
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

describe('Controller search products in Database', () => {
  describe('Get all products', () => {
    const stubResolve = [{ id: 1, name: "Martelo de Thor" }];

    before(() => sinon.stub(productsService, 'search').resolves(stubResolve));

    after(() => productsService.search.restore());

    it('to be called with status 200', async () => {
      const response = await testController(productsController.search, {
        query: { q: "Martelo" }
      });
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      const response = await testController(productsController.search, {
        query: { q: "Martelo" }
      });
      expect(response.json.calledWith([{ id: 1, name: "Martelo de Thor" }])).to.be.equal(true);
    });
  });
});