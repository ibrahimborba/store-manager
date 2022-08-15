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

const getByPK = async (id) => {
  const sale = await salesModel.getByPK(id);
  if (!sale) return errors.customError(404, 'Sale not found');
  return sale;
};

module.exports = { add, getAll, getByPK };