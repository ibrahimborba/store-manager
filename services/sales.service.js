const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const errors = require('../errors/customErrors');

const add = async (sales) => {
  const notFound = await sales.reduce(async (acc, sale) => {
    const product = await productsModel.getByPK(sale.productId);
    if (!product) return true;
    return acc;
  }, false);

  if (notFound) return errors.customError(404, 'Product not found');
  return salesModel.add(sales);
};

const getAll = async () => salesModel.getAll();

module.exports = { add, getAll };