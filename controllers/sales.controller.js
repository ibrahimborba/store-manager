const salesService = require('../services/sales.service');

const add = async (req, res) => {
  const sales = req.body;
  const response = await salesService.add(sales);
  return res.status(201).json(response);
};

const getAll = async (_req, res) => {
  const response = await salesService.getAll();
  return res.status(200).json(response);
};

const getByPK = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getByPK(id);
  return res.status(200).json(response);
};

const erase = async (req, res) => {
  const { id } = req.params;
  await salesService.erase(id);
  return res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = req.body;
  const response = await salesService.update({ saleId: id, itemsUpdated });
  return res.status(200).json(response);
};

module.exports = { add, getAll, getByPK, update, erase };