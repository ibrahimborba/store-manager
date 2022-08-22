const productsModel = require('../models/products.model');
const errors = require('../errors');

const PRODUCT_NOT_FOUND = 'Product not found';

const getAll = async () => productsModel.getAll();

const getByPK = async (id) => {
  const product = await productsModel.getByPK(id);
  if (!product) return errors.notFound(PRODUCT_NOT_FOUND);
  return product;
};

const add = async (name) => productsModel.add(name);

const update = async ({ id, name }) => {
  const product = await productsModel.getByPK(id);
  if (!product) return errors.notFound(PRODUCT_NOT_FOUND);
  return productsModel.update(id, name);
};

const erase = async (id) => {
  const product = await productsModel.getByPK(id);
  if (!product) return errors.notFound(PRODUCT_NOT_FOUND);
  return productsModel.erase(id);
};

const search = async (query) => productsModel.search(query);

module.exports = { add, getAll, getByPK, update, erase, search };