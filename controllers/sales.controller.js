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

module.exports = { add, getAll };