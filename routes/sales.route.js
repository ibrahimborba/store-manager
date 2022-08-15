const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.route('/')
  .post(salesController.add);

module.exports = router;