const Stock = require('../models/stock');
const ActionService = require('../services/actionService');

exports.createStock = async (req, res) => {
  try {
    const stocks = await Stock.create();
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Unable to fetch stocks' });
  }
};


exports.increaseStock = async (req, res) => {
  try {
    const { productId, shopId, quantity } = req.body;

    const updatedStock = await Stock.increaseStock(productId, shopId, quantity);

    await ActionService.logAction({ productId, shopId, action: 'increaseStock' });
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error('Error increasing stock:', error);
    res.status(500).json({ error: 'Unable to increase stock' });
  }
};


exports.decreaseStock = async (req, res) => {
  try {
    const { productId, shopId, quantity } = req.body;

    const updatedStock = await Stock.decreaseStock(productId, shopId, quantity);

    await ActionService.logAction({ productId, shopId, action: 'decreaseStock' });
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error('Error decreasing stock:', error);
    res.status(500).json({ error: 'Unable to decrease stock' });
  }
};

