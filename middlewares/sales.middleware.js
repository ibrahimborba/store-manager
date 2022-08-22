const joi = require('joi');
const errors = require('../errors');

const saleSchema = joi.object({
  productId: joi.number().required().messages({
    'any.required': '400|"productId" is required',
  }),
  quantity: joi.number().min(1).required().messages({
    'any.required': '400|"quantity" is required',
    'number.min': '422|"quantity" must be greater than or equal to {#limit}',
  }),
});

const validator = (req, _res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    const { error } = saleSchema.validate(sale);
    if (error) {
    const [status, message] = error.message.split('|');
    return errors.customError(status, message);
  }
  });
  next();
};

module.exports = { validator };