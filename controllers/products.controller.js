const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const response = await productsService.getAll();
  return res.status(200).json(response);
};

const getByPK = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getByPK(id);
  return res.status(200).json(response);
};

const add = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.add(name);
  return res.status(201).json(response);
};

module.exports = { getAll, getByPK, add };