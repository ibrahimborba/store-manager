const salesModel = require('../models/sales.model');

const add = async (sales) => salesModel.add(sales);

module.exports = { add };