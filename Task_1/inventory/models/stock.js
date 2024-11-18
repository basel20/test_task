const pool = require('../../config/db');

const Stock = {
  // Fetch all products with is_available = true and their stock details
  create: async () => {
    const result = await pool.query(
      `SELECT 
         p.id AS product_id, 
         p.name, 
         p.is_available, 
         s.shop_id, 
         s.quantity_on_shelf, 
         s.quantity_in_order, 
         (s.quantity_on_shelf - s.quantity_in_order) AS available_quantity
       FROM products p
       LEFT JOIN stocks s ON p.id = s.product_id`
    );
    return result.rows;
  },

  // Increase stock when creating a product or canceling an order
  increaseStock: async (productId, shopId, quantity) => {
    const result = await pool.query(
      `INSERT INTO stocks (product_id, shop_id, quantity_on_shelf)
       VALUES ($1, $2, $3)
       ON CONFLICT (product_id, shop_id) 
       DO UPDATE SET quantity_on_shelf = stocks.quantity_on_shelf + $3 
       RETURNING *`,
      [productId, shopId, quantity]
    );
    return result.rows[0];
  },

  // Decrease stock when marking a product unavailable or making an order
  decreaseStock: async (productId, shopId, quantity) => {
    const result = await pool.query(
      `UPDATE stocks 
       SET quantity_on_shelf = quantity_on_shelf - $3 
       WHERE product_id = $1 AND shop_id = $2
       RETURNING *`,
      [productId, shopId, quantity]
    );
    return result.rows[0];
  },

  // Automatically handle stock updates for product status changes
  adjustStockForProductStatus: async (productId, shopId, isAvailable) => {
    if (isAvailable) {
      // Increase stock when product becomes available
      return await Stock.increaseStock(productId, shopId, 1);
    } else {
      // Decrease stock when product becomes unavailable
      return await Stock.decreaseStock(productId, shopId, 1);
    }
  },
};

module.exports = Stock;
