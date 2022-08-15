const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products.model');
const salesModel = require('../../../models/sales.model');
const salesService = require('../../../services/sales.service');

describe('Service add sales to Database', () => {
  describe('Success case', () => {
    const sales =  [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    before(() => {
      const stubResolve = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };
      sinon.stub(salesModel, 'add').resolves(stubResolve);
    });

    after(() => salesModel.add.restore());

    it('returns an object', async () => {
      const result = await salesService.add(sales);
      expect(result).to.be.an('object');
    });
    it('object has expected keys and values', async () => {
      const expected = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ],
      };
      const result = await salesService.add(sales);
      expect(result).to.eql(expected);
    });
  });

  describe('Error case', () => {
    const sales =  [
      { productId: 5, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];

    afterEach(() => productsModel.getByPK.restore());

    it('checks if product exists in database', async () => {
      const stubResolve = null;
      sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

      await salesService.add(sales).catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
    it('throws expected error', async () => {
      const stubThrows = { message: 'Product not found'};
      sinon.stub(productsModel, 'getByPK').throws(stubThrows);

      await salesService.add(sales).catch((err) => {
        expect(err.message).to.equal('Product not found');
      });
    });
  });
});

describe('Service get sales from Database', () => {
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
      sinon.stub(salesModel, 'getAll').resolves(stubResolve);
    });

    after(() => salesModel.getAll.restore());

    it('returns an array of objects', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('array elements are objects', async () => {
      const result = await salesService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('object has expected keys', async () => {
      const result = await salesService.getAll();
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
        sinon.stub(salesModel, 'getByPK').resolves(stubResolve);
      });

      after(() => salesModel.getByPK.restore());

      it('returns an array of objects', async () => {
        const result = await salesService.getByPK('1');
        expect(result).to.be.an('array');
      });
      it('array elements are objects', async () => {
        const result = await salesService.getByPK('1');
        expect(result[0]).to.be.an('object');
      });
      it('object has expected keys', async () => {
        const result = await salesService.getByPK('1');
        expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
      });
    });

    describe('Error case', () => {
      it('checks if sale exists in database', async () => {
        const stubResolve = null;
        sinon.stub(salesModel, 'getByPK').resolves(stubResolve);

        await salesService.getByPK('id').catch((err) => {
          expect(err.message).to.equal('Sale not found');
        });

        salesModel.getByPK.restore();
      });
      
     it('throws expected error', async () => {
        const stubThrows = { message: 'Sale not found'};
        sinon.stub(salesModel, 'getByPK').throws(stubThrows);

        await salesService.getByPK('id').catch((err) => {
          expect(err.message).to.equal('Sale not found');
        });

        salesModel.getByPK.restore();
      });
    });
  });
});

describe('Service delete product in Database', () => {
  describe('Success case', () => {
    before(() => {
      const stubResolve = [{}];
      sinon.stub(salesModel, 'erase').resolves(stubResolve);
    });

    after(() => salesModel.erase.restore());

    it('to be called', async () => {
      await salesService.erase("1");
    });
  });

  describe('Error case', () => {
    afterEach(() => salesModel.getByPK.restore());

    it('checks if sale exists in database', async () => {
      const stubResolve = null;
      sinon.stub(salesModel, 'getByPK').resolves(stubResolve);

      await salesService.erase('id').catch((err) => {
        expect(err.message).to.equal('Sale not found');
      });
    });
    
    it('throws expected error', async () => {
      const stubThrows = { message: 'Sale not found' };
      sinon.stub(salesModel, 'getByPK').throws(stubThrows);

      await salesService.erase('id').catch((err) => {
        expect(err.message).to.equal('Sale not found');
      });
    });
  });
});

describe('Service update sale in Database', () => {
  describe('Success case', () => {
    const saleUpdate =  {
      saleId: 1,
      itemsUpdated: [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 50 },
      ],
    };

    before(() => {
      const stubResolve = {
        saleId: 1,
        itemsUpdated: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      };
      sinon.stub(salesModel, 'update').resolves(stubResolve);
    });

    after(() => salesModel.update.restore());

    it('returns an object if product exists in database', async () => {
      const result = await salesService.update(saleUpdate);
      expect(result).to.be.an('object');
    });
    it('object has expected keys and values', async () => {
      const expected = {
        saleId: 1,
        itemsUpdated: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      };
      const result = await salesService.update(saleUpdate);
      expect(result).to.eql(expected);
    });
  });

  describe('Error cases', () => {
    const saleNotFound =  {
      saleId: 'id',
      itemsUpdated: [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 50 },
      ],
    };

    const productNotFound =  {
      saleId: '1',
      itemsUpdated: [
        { quantity: 10 },
        { productId: 2, quantity: 50 },
      ],
    };

    it('checks if sale exists in database', async () => {
      const stubResolve = null;
      sinon.stub(salesModel, 'getByPK').resolves(stubResolve);

      await salesService.update(saleNotFound).catch((err) => {
        expect(err.message).to.equal('Sale not found');
      });

      return salesModel.getByPK.restore();
    });
    it('checks if product exists in database', async () => {
      const stubResolve = null;
      sinon.stub(productsModel, 'getByPK').resolves(stubResolve);

      await salesService.update(productNotFound).catch((err) => {
        expect(err.message).to.equal('Product not found');
      });

      return productsModel.getByPK.restore();
    });
    it('throws expected error', async () => {
      const stubThrows = { message: 'Sale not found' };
      sinon.stub(salesModel, 'getByPK').throws(stubThrows);

      await salesService.update(saleNotFound).catch((err) => {
        expect(err.message).to.equal('Sale not found');
      });
    });
  });
});