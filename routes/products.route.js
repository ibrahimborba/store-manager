const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.route('/')
  .get(productsController.getAll)
  .post(productsController.add);

router.get('/:id', productsController.getByPK);

module.exports = router;