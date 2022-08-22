const joi = require('joi');
const errors = require('../errors');

const productSchema = joi.object({
  name: joi.string().min(5).required().messages({
    'any.required': '400|"name" is required',
    'string.min': '422|"name" length must be at least {#limit} characters long',
  }),
});

const validator = (req, _res, next) => {
  const product = { ...req.body };
  const { error } = productSchema.validate(product);

  if (error) {
    const [status, message] = error.message.split('|');
    return errors.customError(status, message);
  }
  next();
};

module.exports = { validator };
