const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

// Route to fetch all available stocks
router.get('/stock', stockController.createStock);

// Route to increase stock
router.put('/stock/increase', stockController.increaseStock);

// Route to decrease stock
router.put('/stock/decrease', stockController.decreaseStock);

module.exports = router;
