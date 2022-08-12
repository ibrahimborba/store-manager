const productsService = require('../services/products.service');

const { error } = console;

const getAll = async (_req, res) => {
  try {
    const response = await productsService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    error(err);
    return res.status(500).json(err.message);
  }
};

module.exports = { getAll };