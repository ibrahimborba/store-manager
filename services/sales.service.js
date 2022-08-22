const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const errors = require('../errors');

const PRODUCT_NOT_FOUND = 'Product not found';
const SALE_NOT_FOUND = 'Sale not found';

const add = async (sales) => {
  const notFound = await sales.reduce(async (acc, sale) => {
    const product = await productsModel.getByPK(sale.productId);
    if (!product) return true;
    return acc;
  }, false);

  if (notFound) return errors.notFound(PRODUCT_NOT_FOUND);
  return salesModel.add(sales);
};

const getAll = async () => salesModel.getAll();

const getByPK = async (id) => {
  const sale = await salesModel.getByPK(id);
  if (!sale) return errors.notFound(SALE_NOT_FOUND);
  return sale;
};

const erase = async (id) => {
  const sale = await salesModel.getByPK(id);
  if (!sale) return errors.notFound(SALE_NOT_FOUND);
  return salesModel.erase(id);
};

const update = async ({ saleId, itemsUpdated }) => {
  const sale = await salesModel.getByPK(saleId);
  if (!sale) return errors.notFound(SALE_NOT_FOUND);

  const productNotFound = await itemsUpdated.reduce(async (acc, item) => {
    const product = await productsModel.getByPK(item.productId);
    if (!product) return true;
    return acc;
  }, false);
  if (productNotFound) return errors.notFound(PRODUCT_NOT_FOUND);

  return salesModel.update(saleId, itemsUpdated);
};

module.exports = { add, getAll, getByPK, update, erase };