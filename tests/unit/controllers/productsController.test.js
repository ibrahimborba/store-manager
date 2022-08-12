const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('Controllers get products from Database', () => {
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
      it('to be called with object', async () => {
        await productsController.getByPK(request, response);
        expect(response.json.calledWith({ id: 1, name: "Martelo de Thor" })).to.be.equal(true);
      });
    })
  });
});