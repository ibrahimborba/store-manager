const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales.model');

describe('Model add sales to Database', () => {
  describe('Add sales successfully', () => {
    const sales =  [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    
    before(() => {
      const stubFirstResolve = [3];
      const stubSecResolve = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ];
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves(stubFirstResolve)
        .onSecondCall().resolves(stubSecResolve);
    });

    after(() => connection.execute.restore());

    it('returns an object', async () => {
      const result = await salesModel.add(sales);
      expect(result).to.be.an('object');
    });
  });
});

describe('Model get sales from Database', () => {
  describe('Get all sales', () => {
    before(() => {
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
      sinon.stub(connection, 'execute').resolves([stubResolve]);
    });

    after(() => connection.execute.restore());

    it('returns an array of objects', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });
    it('array elements are objects', async () => {
      const result = await salesModel.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await salesModel.getAll();
      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Get sale by id', () => {
    describe('Success case', () => {
      before(() => {
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
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns an array of objects', async () => {
        const result = await salesModel.getByPK('1');
        expect(result).to.be.an('array');
      });
      it('array elements are objects', async () => {
        const result = await salesModel.getByPK('1');
        expect(result[0]).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await salesModel.getByPK('1');
        expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
      });
    })

    describe('Error case', () => {
      before(() => {
        const stubResolve = [];
        sinon.stub(connection, 'execute').resolves([stubResolve]);
      });

      after(() => connection.execute.restore());

      it('returns null if sale does not exist in database', async () => {
        const result = await salesModel.getByPK('id');
        expect(result).to.be.a('null');
      });
    })
  });
});

describe('Model delete sale in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = [{}];
      sinon.stub(connection, 'execute').resolves(stubResolve);
    });

    after(() => connection.execute.restore());

    it('to be called', async () => salesModel.erase("1"));
  });
});
