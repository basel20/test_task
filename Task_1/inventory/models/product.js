const pool = require('../../config/db');
const Stock = require('./stock');

const Product = {
  // Create a new product and initialize its stock
  create: async (plu, name, shopId) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert the product into the products table
      const productResult = await client.query(
        'INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *',
        [plu, name]
      );

      const product = productResult.rows[0];

      // Initialize stock for the new product
      await Stock.increaseStock(product.id, shopId, 1);

      await client.query('COMMIT');
      return product;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Update product status and automatically adjust stock
  editProductStatus: async (id, isAvailable, shopId) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update product availability status
      const productResult = await client.query(
        'UPDATE products SET is_available = $1 WHERE id = $2 RETURNING *',
        [isAvailable, id]
      );

      const product = productResult.rows[0];

      // Adjust stock based on the updated status
      await Stock.adjustStockForProductStatus(id, shopId, isAvailable);

      await client.query('COMMIT');
      return product;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = Product;
