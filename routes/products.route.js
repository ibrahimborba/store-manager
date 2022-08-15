const express = require('express');
const productsController = require('../controllers/products.controller');
const productsMiddleware = require('../middlewares/products.middleware');

const router = express.Router();

router.route('/')
  .get(productsController.getAll)
  .post(productsMiddleware.validator, productsController.add);

router.get('/:id', productsController.getByPK);

module.exports = router;