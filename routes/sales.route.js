const express = require('express');
const salesController = require('../controllers/sales.controller');
const salesMiddleware = require('../middlewares/sales.middleware');

const router = express.Router();

router.route('/')
  .get(salesController.getAll)
  .post(salesMiddleware.validator, salesController.add);

router.route('/:id')
  .get(salesController.getByPK)
  .delete(salesController.erase);

module.exports = router;