const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');

describe('Controller add sales to Database', () => {
  describe('Add sales successfully', () => {
    const response = {};
    const request = { body: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]
    };
    const stubResolve = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'add').resolves(stubResolve);
    });

    after(() => salesService.add.restore());

    it('is called with status 201', async () => {
      await salesController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      const expected = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };
      await salesController.add(request, response);
      expect(response.json.calledWith(expected)).to.be.equal(true);
    });
  });
});

describe('Controller get sales from Database', () => {
  describe('Get all sales', () => {
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

  describe('Get sale by id', () => {
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
    })
  });
});