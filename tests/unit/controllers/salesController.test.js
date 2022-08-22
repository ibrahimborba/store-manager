const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');
const testController =require('../../helpers/testController');

describe('Controller add sales to Database', () => {
  describe('Add sales successfully', () => {
    const stubResolve = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    
    before(() => sinon.stub(salesService, 'add').resolves(stubResolve));

    after(() => salesService.add.restore());

    it('is called with status 201', async () => {
      const response = await testController(salesController.add, {
        body: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ]
      });
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
      const response = await testController(salesController.add, {
        body: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ]
      });
      expect(response.json.calledWith(expected)).to.be.eql(true);
    });
  });
});

describe('Controller get sales from Database', () => {
  describe('Get all sales', () => {
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
    before(() => sinon.stub(salesService, 'getAll').resolves(stubResolve));

    after(() => salesService.getAll.restore());

    it('to be called with status 200', async () => {
      const response = await testController(salesController.getAll);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with array where elements are objects', async () => {
      const response = await testController(salesController.getAll);
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
      before(() => sinon.stub(salesService, 'getByPK').resolves(stubResolve));

      after(() => salesService.getByPK.restore());

      it('to be called with status 200', async () => {
        const response = await testController(salesController.getByPK, { params: '1' });
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        const response = await testController(salesController.getByPK, { params: '1' });
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

describe('Controller delete sale in Database', () => {
  describe('Success case', () => {
    const stubResolve = [{}];
    before(() => sinon.stub(salesService, 'erase').resolves(stubResolve));

    after(() => salesService.erase.restore());

    it('to be called with status 204', async () => {
      const response = await testController(salesController.erase, { params: '1' });
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

describe('Controller update sale in Database', () => {
  describe('Success case', () => {
    const stubResolve = {
      saleId: 1,
      itemsUpdated: [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 50 },
      ],
    };

    before(() => sinon.stub(salesService, 'update').resolves(stubResolve));

    after(() => salesService.update.restore());

    it('to be called with status 200', async () => {
      const response = await testController(salesController.update, {
        params: '1', body: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      });
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      const expected = {
        saleId: 1,
        itemsUpdated: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      };
      const response = await testController(salesController.update, {
        params: '1', body: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      });
      expect(response.json.calledWith(expected)).to.be.equal(true);
    });
  });
});