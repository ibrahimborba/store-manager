const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');

describe('Model add sales to Database', () => {
  describe('Add sales successfully', () => {
    const response = {};
    const request = { body: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]
    };
    const stubResolve = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    
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