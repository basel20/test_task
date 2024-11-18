const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products/:id', productController.editProductStatus);

module.exports = router;

