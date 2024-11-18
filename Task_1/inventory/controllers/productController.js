const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const { plu, name, shopId } = req.body;
    const product = await Product.create(plu, name, shopId);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Unable to create product' });
  }
};

exports.editProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable, shopId } = req.body;
    const product = await Product.editProductStatus(id, isAvailable, shopId);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ error: 'Unable to update product' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.allProducts();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get products' });
  }
};


