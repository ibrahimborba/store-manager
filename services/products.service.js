const productsModel = require('../models/products.model');

const getAll = async () => productsModel.getAll();

module.exports = { getAll };