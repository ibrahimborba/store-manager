const productsModel = require('../models/products.model');
const errors = require('../errors/customErrors');

const getAll = async () => productsModel.getAll();

const getByPK = async (id) => {
  const product = await productsModel.getByPK(id);
  if (!product) return errors.customError(404, 'Product not found');
  return product;
};

const add = async (name) => productsModel.add(name);

module.exports = { getAll, getByPK, add };