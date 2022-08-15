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
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(stubResolve);
    });

    after(() => salesService.getAll.restore());

    it('to be called with status 200', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith([
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ])).to.be.equal(true);
    });
  });

  describe('Get sale by id', () => {
    describe('Success case', () => {
      const response = {};
      const request = { params: '1' };
        const stubResolve = [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2
          }
        ];
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getByPK').resolves(stubResolve);
      });

      after(() => salesService.getByPK.restore());

      it('to be called with status 200', async () => {
        await salesController.getByPK(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        await salesController.getByPK(request, response);
        expect(response.json.calledWith([
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2
          }
        ])).to.be.equal(true);
      });
    })
  });
});