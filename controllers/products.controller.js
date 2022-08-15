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

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await productsService.update({ id, name });
  return res.status(200).json(response);
};

const erase = async (req, res) => {
  const { id } = req.params;
  await productsService.erase(id);
  return res.status(204).end();
};

module.exports = { add, getAll, getByPK, update, erase };